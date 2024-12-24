import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant.js";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleDeleteApplication = async (applicationId) => {
    try {
      const res = await axios.delete(
        `${APPLICATION_API_END_POINT}/delete/${applicationId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // Update Redux state to remove the application
        const updatedApplications = allAppliedJobs.filter(
          (job) => job._id !== applicationId
        );
        dispatch(setAllAppliedJobs(updatedApplications));
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div>
      <Table className="mb-10">
        <TableCaption className="text-sm text-gray-700">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Job Role</TableHead>
            <TableHead className="text-center">Company</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <span className="text-sm font-medium text-red-600">
                  *You haven't applied to any job yet.
                </span>
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="text-center">
                  {job.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-center">{job.job?.title}</TableCell>
                <TableCell className="text-center">
                  {job.job?.company?.name}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`${
                      job?.status === "rejected"
                        ? "text-red-600 font-medium"
                        : job?.status === "pending"
                        ? "text-gray-600 font-medium"
                        : "text-green-600 font-medium"
                    }`}
                  >
                    {job.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleDeleteApplication(job._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
