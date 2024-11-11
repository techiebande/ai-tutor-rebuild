"use client";
import { useQuery } from "@tanstack/react-query";

const fetchAgent = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/agents/${slug}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tutors");
  }
  return response.json();
};

export const useAgent = (slug: string) => {
  return useQuery({
    queryKey: ["agent"],
    queryFn: () => fetchAgent(slug),
    staleTime: 0,
    retry: 1,
  });
};
