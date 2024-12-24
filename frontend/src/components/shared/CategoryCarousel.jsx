import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel.jsx";
import { Button } from "../ui/button.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice.js";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Flutter Developer",
  "Data Science",
  "Artificial Intelligence",
  "Graphic Designer",
  "FullStack Developer",
  "MERN Stack Developer",
  "Python Developer",
  "Android Developer",
  "Machine Learning",
  "Data Analyst",
];

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto mt-16 mb-24">
        <CarouselContent>
          {categories.map((item, index) => (
            <CarouselItem
              key={index} // Add a unique key for each item
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => searchHandler(item)}
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
