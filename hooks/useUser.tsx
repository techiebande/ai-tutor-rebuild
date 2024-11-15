import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUser = async () => {
  const response = await fetch(`/api/user`);
  if (!response.ok) {
    if (response.status === 401) {
      return null; // Return null for unauthorized instead of throwing
    }
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 10,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
