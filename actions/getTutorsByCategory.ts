"use server";

export const getTutorsByCategory = async (category: string) => {
  let tutors;
  if (category) {
    try {
      let data = await fetch(
        `https://api.7x95.com/api/v1/agent/category/${category}`
      );
      tutors = await data.json();

      return tutors.data;
    } catch (e: any) {
      console.log("Error getting tutors by category", e?.message);
    }
  }
};
