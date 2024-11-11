"use client";

import React, { useState, useEffect } from "react";
import { getTutorsByCategory } from "@/actions/getTutorsByCategory";
import { FilterIcon, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { TutorProps } from "@/interfaces/tutorProps";
import { capitalize } from "@/lib/utils copy";
import Tutor from "./Tutor";
import { TutorsCategoryFilter } from "./TutorsCategoriesFilter";

const TutorsBySpecialty = ({
  tutors,
  category,
}: {
  tutors: TutorProps[];
  category: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [currentTutors, setCurrentTutors] = useState(tutors);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const getTutors = async () => {
      const tutors = await getTutorsByCategory(selectedCategory);

      setCurrentTutors(tutors);
      setFetching(false);
    };

    getTutors();
  }, [selectedCategory]);

  return (
    <>
      <div className="bg-blue-800 px-5 lg:px-20 flex flex-col lg:flex-row pb-2 lg:items-center lg:justify-between">
        <h1 className="font-bold text-white text-3xl py-10">
          AI Tutor - {capitalize(selectedCategory)}
        </h1>
        <div className="rounded border border-blue-500 p-3 flex items-center gap-5 bg-blue-900">
          <TutorsCategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Button className="bg-blue-400 border border-blue-800">
            <FilterIcon className="text-white w-6 h-6" />
          </Button>
        </div>
      </div>
      {fetching ? (
        <div className="mx-auto lg:h-[400px] w-full flex flex-col items-center justify-center">
          <LoaderCircle className="w-10 h-10 text-blue-700 animate-spin" />
          <p>Fetching Tutors...</p>
        </div>
      ) : currentTutors && currentTutors.length > 0 ? (
        <div className="grid  gap-4 md:gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full px-5 lg:px-20 py-10">
          {currentTutors?.map((tutor: TutorProps) => {
            return <Tutor tutor={tutor} key={tutor.id} />;
          })}
        </div>
      ) : (
        <p className="lg:h-[380px] px-5 lg:px-20 flex items-center justify-center">
          No {selectedCategory} Tutors Yet
        </p>
      )}
    </>
  );
};

export default TutorsBySpecialty;
