import React, { useState } from "react";
import Navbar from "./shared/Navbar.jsx";
import { Avatar, AvatarImage } from "./ui/avatar.jsx";
import { Button } from "./ui/button.jsx";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "./ui/label.jsx";
import AppliedJobTable from "./shared/AppliedJobTable.jsx";
import UpdateProfileDialog from "./shared/UpdateProfileDialog.jsx";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs.jsx";

// const skillsArray = [
//   "reactjs",
//   "html",
//   "css",
//   "javascript",
//   "python",
//   "github",
// ];

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white border shadow-md border-gray-200 rounded-2xl my-10 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="font-medium text-2xl">{user?.fullName}</h1>
              <p className="text-gray-600 py-1">{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-8">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>+91 {user?.phoneNumber}</span>
          </div>
        </div>

        {/* skills section */}
        <div>
          <h1 className="font-bold text-xl text-gray-900 mb-4">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 font-medium bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-800">No skills added</span>
            )}
          </div>
        </div>

        {/* resume section */}
        <div className="grid w-full max-w-sm items-center gap-2 my-8">
          <Label className="text-xl font-bold text-gray-900">Resume</Label>
          {isResume ? (
            <a
              className="text-medium text-[#ad38c2] w-full hover:underline cursor-pointer"
              target="blank"
              href={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>No resume added</span>
          )}
        </div>
      </div>

      {/* applied job display section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl">
        <h1 className="text-3xl font-bold mt-20 mb-5">Applied Jobs</h1>
        {/* Applied Job table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
