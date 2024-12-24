import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar.jsx";
import FilterCard from "./shared/FilterCard.jsx";
import CardForJob from "./shared/CardForJob.jsx";
import Footer from "./shared/Footer.jsx";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();

        // Check salary match
        let isSalaryMatch = false;
        if (job?.salary) {
          const salaryRanges = {
            "0 - 40k": [0, 40000],
            "42k - 1lakh": [42000, 100000],
            "1lakh - 5lakh": [100000, 500000],
            "6lakh - 12lakh": [600000, 1200000],
            "12lakh - 20lakh": [1200000, 2000000],
          };

          const salaryKey = String(job.salary).toLowerCase(); // Ensure `job.salary` is a string
          if (salaryRanges[salaryKey]) {
            const [minSalary, maxSalary] = salaryRanges[salaryKey];
            const queryValue = parseInt(
              query.replace(/[^\d]/g, ""), // Remove non-numeric characters
              10
            );

            if (!isNaN(queryValue)) {
              isSalaryMatch =
                queryValue >= minSalary && queryValue <= maxSalary;
            }
          }
        }

        return (
          job?.title.toLowerCase().includes(query) ||
          job?.location.toLowerCase().includes(query) ||
          isSalaryMatch
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5 mb-10">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[90vh] mt-10 overflow-y-auto pb-5">
              <div className="grid grid-cols-2 gap-6 scroll-container overflow-y-auto h-[calc(100vh-100px)]">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    key={job?._id}
                  >
                    <CardForJob job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
