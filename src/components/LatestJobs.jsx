import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 sm:my-16 lg:my-20">
      
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-center sm:text-left">
        <span className="text-[#6A38C2]">Latest & top </span>
        Job Openings
      </h1>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 my-6">
        
        {allJobs.length <= 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No Job available
          </div>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            <LatestJobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </section>
  );
};

export default LatestJobs;