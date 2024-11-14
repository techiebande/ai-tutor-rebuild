"use client";

import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const response = await fetch(`/api/user`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
