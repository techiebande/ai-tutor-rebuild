"use client";
// hooks/useTutors.ts
import { useQuery } from "@tanstack/react-query";

const fetchTutors = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured/agents`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tutors");
  }
  return response.json();
};

export const useTutors = () => {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: fetchTutors,
    staleTime: 1000 * 60 * 10, // 10 minutes
    // cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: 1, // Retry once if the request fails
  });
};
