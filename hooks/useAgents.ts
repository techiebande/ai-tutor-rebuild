"use client";
import { useQuery } from "@tanstack/react-query";

const fetchAgents = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/agents`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tutors");
  }
  return response.json();
};

export const useAgents = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
