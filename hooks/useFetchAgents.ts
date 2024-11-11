"use client";

import { AIAgentProps } from "@/components/Chat";
import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useFetchAgents = () => {
  const [agents, setAgents] = useState<AIAgentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await fetch(`${BASE_URL}/agents`, {
          cache: "no-store",
        });
        const agentsJson = await data.json();
        setAgents(agentsJson.data);
      } catch (err) {
        setError("Failed to fetch agents.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return { agents, loading, error };
};
