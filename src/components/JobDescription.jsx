import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id || false
  );

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-10 lg:my-14">
      
      
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        
      
        <div className="flex-1">
          <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
            {singleJob?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className="text-blue-700" variant={"ghost"}>
              {singleJob?.position}
            </Badge>
            <Badge className="text-[#F83002]" variant={"ghost"}>
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7]" variant={"ghost"}>
              {singleJob?.salary}
            </Badge>
          </div>
        </div>

        {/* Right Button */}
        <div className="w-full lg:w-auto">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`w-full lg:w-auto rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      {/* Divider */}
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6 text-lg sm:text-xl">
        Job Description
      </h1>

      
      <div className="my-4 space-y-2 text-sm sm:text-base">
        <p className="font-bold">
          Role:
          <span className="font-normal text-gray-800 pl-2 sm:pl-4">
            {singleJob?.title}
          </span>
        </p>

        <p className="font-bold">
          Location:
          <span className="font-normal text-gray-800 pl-2 sm:pl-4">
            {singleJob?.location}
          </span>
        </p>

        <p className="font-bold">
          Description:
          <span className="font-normal text-gray-800 pl-2 sm:pl-4 block sm:inline">
            {singleJob?.description}
          </span>
        </p>

        <p className="font-bold">
          Experience:
          <span className="font-normal text-gray-800 pl-2 sm:pl-4">
            {singleJob?.experienceLevel} yrs
          </span>
        </p>

        <p className="font-bold">
          Salary:
          <span className="font-normal text-gray-800 pl-2 sm:pl-4">
            {singleJob?.salary} LPA
          </span>
        </p>

        <p className="font-bold">
          Total Applicant:
          <span className="font-normal text-gray-800 pl-2 sm:pl-4">
            {singleJob?.applications?.length}
          </span>
        </p>

        <p className="font-bold">
          Posted Date:
          <span className="font-normal text-gray-800 pl-2 sm:pl-4">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>

    
  );
};

export default JobDescription;