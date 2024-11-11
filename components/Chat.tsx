"use client";

import React, { createContext, useState, useEffect } from "react";
import PageContainer from "./PageContainer";
import ChatSidebar from "./ChatSidebar";
import ChatInterface from "./ChatInterface";
import { toast } from "sonner";

export interface AIAgentProps {
  id: string;
  name: string;
  slug: string;
  image: string;
  expert: string;
  display_avatar: boolean;
  created_at: string;
  specialties: string[];
}

interface Conversation {
  completed_response: boolean;
  content: string;
  conversation_id: string;
  date: string;
  id: string;
  sender: string;
}

interface ChatContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const ChatContext = createContext<ChatContextProps | undefined>(
  undefined
);

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoadingSidebar, setIsLoadingSidebar] = useState<boolean>(true);

  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen;
    setIsSidebarOpen(newSidebarState);
    localStorage.setItem("isSidebarOpen", newSidebarState.toString());
  };

  useEffect(() => {
    const savedSidebarState = localStorage.getItem("isSidebarOpen");
    if (savedSidebarState !== null) {
      setIsSidebarOpen(savedSidebarState === "true");
    }
    setIsLoadingSidebar(false); // Sidebar state has been initialized, stop loading
  }, []);

  if (isLoadingSidebar) {
    return null;
  }

  return (
    <ChatContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      <PageContainer className="grid grid-cols-12 gap-[1px] rounded-xl pt-5">
        <ChatSidebar />
        <ChatInterface />
      </PageContainer>
    </ChatContext.Provider>
  );
};

export default Chat;
