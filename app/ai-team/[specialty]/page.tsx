import { NextPage } from "next";
import React from "react";
import TutorsBySpecialty from "@/components/TutorsBySpecialty";
import { TutorProps } from "@/interfaces/tutorProps";
import { capitalize } from "@/lib/utils copy";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type SpecialtyPageProps = {
  params: {
    specialty: string;
  };
};

const SpecialtyPage = async ({ params }: any) => {
  let tutors: { data: TutorProps[] } = { data: [] };

  try {
    const response = await fetch(
      `${BASE_URL}/agent/category/${params.specialty}`
    );
    tutors = await response.json();
  } catch (error) {
    console.error("Error fetching tutors:", error);
  }

  return (
    <div>
      <TutorsBySpecialty
        category={capitalize(params.specialty)}
        tutors={tutors.data}
      />
    </div>
  );
};

export default SpecialtyPage;
