"use client";

import { AIAgentProp } from "@/interfaces/ai-agent";
import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useFetchAgent = (slug: string) => {
  const [agent, setAgent] = useState<AIAgentProp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const data = await fetch(`${BASE_URL}/agents/${slug}`, {
          cache: "no-store",
        });
        const agentJson = await data.json();
        setAgent(agentJson.data);
      } catch (err) {
        setError("Failed to fetch agent.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [slug]);

  return { agent, loading, error };
};
