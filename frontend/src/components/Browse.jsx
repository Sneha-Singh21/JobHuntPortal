import React, { useEffect } from "react";
import Navbar from "./shared/Navbar.jsx";
import CardForJob from "./shared/CardForJob.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice.js";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.8, rotate: 5 },
  };

  // Container variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between children animations
        duration: 0.8,
      },
    },
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="font-semibold text-xl my-8 text-gray-900">
          Search Results ({allJobs.length})
        </h1>
        <motion.div
          className="grid grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {allJobs.map((job) => (
            <motion.div
              key={job._id}
              className="overflow-hidden rounded-lg shadow-lg bg-white p-4"
              variants={cardVariants}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { type: "spring", stiffness: 200 },
              }}
            >
              <CardForJob job={job} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;
