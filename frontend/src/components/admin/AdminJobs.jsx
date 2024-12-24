import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable.jsx";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs.jsx";
import { setSearchJobByText } from "@/redux/jobSlice.js";
import { Typewriter } from "react-simple-typewriter";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex items-center justify-between my-8">
          <div className="relative w-full">
            <Input
              onChange={(e) => setInput(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-fit shadow-md"
              placeholder=" " // Just leave this empty or use a simple string
            />
            {!isFocused && input === "" && (
              <div className="absolute top-1/2 left-2 text-gray-500 text-sm transform -translate-y-1/2">
                <Typewriter
                  words={["Filter by company name", "Filter by role"]} // Add both phrases here
                  loop={true}
                  typeSpeed={120} // Speed of typing
                  deleteSpeed={70} // Speed of deleting
                  delaySpeed={1000} // Delay before starting the typing
                />
              </div>
            )}
          </div>
          <Button
            onClick={() => navigate("/admin/jobs/post")}
            className="bg-[#ad38c2] hover:bg-[#882599] text-white hover:text-white"
            variant="outline"
          >
            Post New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
