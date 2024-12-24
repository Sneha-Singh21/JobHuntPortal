import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-14">
        <span className="mx-auto px-6 py-2 rounded-full bg-[#f9f3f3] text-[#F83002] font-medium">
          No. 1 Job Hunting Website
        </span>

        <h1 className="text-4xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#ad38c2] text-5xl">
            <Typewriter
              words={["Dream Jobs", "Career Goals"]} // Add phrases here
              loop={0} // Infinite loop
              cursor
              cursorStyle="|"
              typeSpeed={120} // Slower typing speed (default is 70)
              deleteSpeed={80} // Slower deleting speed (default is 50)
              delaySpeed={2000} // Delay before typing next word (in ms)
            />
          </span>
        </h1>

        <p className="font-medium text-[15px] text-gray-600">
          Connecting job seekers with their ideal roles - because every career
          journey deserves a perfect start.
        </p>

        <div className="flex mt-5 w-[42%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            className="outline-none border-none w-full pl-3"
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find your dream jobs"
          />
          <Button
            onClick={searchHandler}
            className="rounded-r-full cursor-pointer bg-[#ad38c2] hover:bg-[#882599] text-white hover:text-white font-bold"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
