"use client";

import { useFetchAgent } from "@/hooks/useFetchAgent";
import { useFetchAgents } from "@/hooks/useFetchAgents";
import { AgentContextProps } from "@/interfaces/agentContext";
import { useParams } from "next/navigation";
import React from "react";

export const AgentContext = React.createContext<AgentContextProps | null>(null);

const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const { slug } = useParams();

  const {
    agent,
    loading: agentLoading,
    error: agentError,
    //@ts-ignore
  } = useFetchAgent(slug[0]);

  const {
    agents,
    loading: agentsLoading,
    error: agentsError,
  } = useFetchAgents();

  return (
    <AgentContext.Provider
      value={{
        agent,
        agentLoading,
        agentError,
        agents,
        agentsLoading,
        agentsError,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export default AgentProvider;
