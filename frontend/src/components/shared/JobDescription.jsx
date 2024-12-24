import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant.js";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);
  const [hasDeletedApplication, setHasDeletedApplication] = useState(false);

  const { _id: userId } = user || {};

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          // Check if the user has applied for the job before
          const application = res.data.job.applications?.find(
            (application) => application.applicant === userId
          );

          // If application exists, set isApplied to true
          if (application) {
            setIsApplied(true);
            setHasDeletedApplication(false); // No need to re-apply if application exists
          } else {
            setIsApplied(false);
            setHasDeletedApplication(false); // User has never applied
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobDetails();
  }, [jobId, dispatch, userId]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // User has applied
        setHasDeletedApplication(false); // Reset the "deleted" flag

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: userId },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Something went wrong while applying!"
      );
    }
  };

  const handleDeleteApplication = async () => {
    try {
      const res = await axios.delete(
        `${APPLICATION_API_END_POINT}/delete/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(false); // Reset application status
        setHasDeletedApplication(true); // Allow re-apply only after deletion
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Something went wrong while deleting!"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-3xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold text-[15px]"}>
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold text-[15px]"}>
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#ad38c2] font-bold text-[15px]"}>
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? handleDeleteApplication : applyJobHandler}
          aria-disabled={isApplied}
          className={`rounded-[8px] ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed text-white hover:bg-gray-500 hover:text-white"
              : "bg-[#ad38c2] hover:bg-[#882599] text-white hover:text-white"
          }`}
          variant="outline"
        >
          {isApplied
            ? "Already Applied"
            : hasDeletedApplication
            ? "Re-apply"
            : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-semibold py-3 mt-5 text-2xl text-gray-950">
        Job Description
      </h1>
      <div className="mt-5">
        <h1 className="font-bold my-1 text-gray-950">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-950">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-950">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-950">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-950">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-950">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-gray-950">
          Posted on:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0] || "N/A"}
          </span>
        </h1>
      </div>

      <div className="mt-10">
        <Button
          onClick={() => navigate("/jobs")}
          className="bg-[#ad38c2] hover:bg-[#882599] text-white hover:text-white"
          variant="outline"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;
