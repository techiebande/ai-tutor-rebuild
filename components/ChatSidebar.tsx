"use client";

import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { ChatContext } from "./Chat";
import { AgentContext } from "@/contexts/agent";
import AITutor from "./AITutor";

const ChatSidebar = () => {
  const agentContext = useContext(AgentContext);

  if (!agentContext) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }

  const { agents, agentsLoading, agentsError } = agentContext;

  const sideBarContext = useContext(ChatContext);

  if (!sideBarContext) {
    throw new Error("ChatSidebar must be used within a ChatProvider");
  }

  const { isSidebarOpen } = sideBarContext;

  return (
    <div
      className={cn(
        "hidden relative lg:col-span-3 h-[calc(100vh-110px)] rounded-bl-xl rounded-br-xl pt-[70px] bg-no-repeat bg-[url('/sidebar-bg.png')] bg-contain",
        isSidebarOpen ? "lg:block" : ""
      )}
    >
      <div className="from-[#5e6147] absolute top-0 left-0 z-50 w-full to-[#9c6e5f] bg-gradient-to-r p-2 lg:justify-between rounded-tl-xl rounded-tr-xl text-center text-white">
        <p className="text-xl font-boldn ">Speak with our AI Tutors</p>
        <p>Animated AI Tutors</p>
      </div>
      <div className="z-40 overflow-y-auto  h-full  relative p-10 bg-no-repeat w-full flex flex-col gap-2">
        {agentsLoading
          ? "Loading agents..."
          : agentsError
          ? "There was an error loading agents..."
          : agents.map((agent) => <AITutor key={agent.id} tutor={agent} />)}
      </div>
    </div>
  );
};

export default ChatSidebar;
