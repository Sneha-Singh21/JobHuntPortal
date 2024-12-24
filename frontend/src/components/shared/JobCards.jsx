import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-[10px] shadow-xl bg-white border border-gray-100 cursor-pointer"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col mb-3">
        <h1 className="text-lg font-semibold text-[#000000]">{job?.company?.name}</h1>
        <p className="text-gray-700 font-medium text-[15px]">{job?.location}</p>
      </div>
      <div>
        <h1 className="text-xl font-bold text-[#000000]">{job?.title}</h1>
        <p className="text-gray-700 text-[15px]">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"}>{job?.position} Positions</Badge>
        <Badge className={"text-[#F83002] font-bold"}>{job?.jobType}</Badge>
        <Badge className={"text-[#ad38c2] font-bold"}>{job?.salary} LPA</Badge>
      </div>
    </motion.div>
  );
};

export default JobCards;
