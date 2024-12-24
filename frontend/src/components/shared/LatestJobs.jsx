import React from "react";
import JobCards from "./JobCards.jsx";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-6xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#ad38c2]"> Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {allJobs.length <= 0 ? (
          <span className="font-medium text-gray-600">No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            // Return JobCards here with a unique key
            <JobCards  key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
