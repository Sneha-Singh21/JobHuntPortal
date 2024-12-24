import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Track popover state for each job
  const [popoverState, setPopoverState] = useState({});

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(removeJob(jobId));
        toast.success("Job deleted successfully!");
        setPopoverState((prevState) => ({ ...prevState, [jobId]: false })); // Close popover after deletion
      } else {
        toast.error("Failed to delete job. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("An error occurred while deleting the job.");
    }
  };

  useEffect(() => {
    if (Array.isArray(allAdminJobs)) {
      const filteredJobs = allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs([]); // Fallback to empty array
    }
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(filterJobs) && filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id || job.title}>
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="cursor-pointer text-right pr-6">
                  <Popover
                    open={popoverState[job._id] || false}
                    onOpenChange={(open) =>
                      setPopoverState((prevState) => ({
                        ...prevState,
                        [job._id]: open,
                      }))
                    }
                  >
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-3">
                      <div
                        onClick={() =>
                          navigate(
                            `/admin/companies/${job.companyId || job._id}`
                          )
                        }
                        className="flex items-center gap-4 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => handleDeleteJob(job._id)}
                        className="flex items-center w-fit gap-3 cursor-pointer mt-3 text-red-500"
                      >
                        <Trash className="w-4" />
                        <span>Delete</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center w-fit gap-3 cursor-pointer mt-3"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <span className="text-sm text-red-600 font-medium">
                  *You haven't posted any jobs yet.
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
