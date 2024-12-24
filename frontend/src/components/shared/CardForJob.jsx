import React from "react";
import { Button } from "../ui/button.jsx";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { Badge } from "../ui/badge.jsx";
import { useNavigate } from "react-router-dom";

const CardForJob = ({job}) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000*24*60*60));
  }  
  return (
    <div className="p-5 rounded-[10px] shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-xl my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"}>{job?.position} Positions</Badge>
        <Badge className={"text-[#F83002] font-bold"}>{job?.jobType}</Badge>
        <Badge className={"text-[#ad38c2] font-bold"}>{job?.salary} LPA</Badge>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button
          className="bg-[#ad38c2] hover:bg-[#882599] text-white hover:text-white"
          variant="outline"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default CardForJob;
