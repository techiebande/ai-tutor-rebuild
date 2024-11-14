"use client";

import { useAgent } from "@/hooks/useAgent";
import { useAgents } from "@/hooks/useAgents";
import { useFetchAgent } from "@/hooks/useFetchAgent";
import { useFetchAgents } from "@/hooks/useFetchAgents";
import { AgentContextProps } from "@/interfaces/agentContext";
import { useParams } from "next/navigation";
import React from "react";

export const AgentContext = React.createContext<AgentContextProps | null>(null);

const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useAgents();
  const {
    data: agentData,
    isLoading: agentIsLoading,
    isError: agentIsError,
    //@ts-expect-error
  } = useAgent(slug[0]);

  if (isError || isLoading) {
    return null;
  }

  return (
    <AgentContext.Provider
      value={{
        agents: data?.data,
        agentsLoading: isLoading,
        agentsError: isError,
        agent: agentData?.data,
        agentLoading: agentIsLoading,
        agentError: agentIsError,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export default AgentProvider;
