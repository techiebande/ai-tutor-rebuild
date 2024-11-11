"use client";

import Navbar from "@/components/Navbar";
import ClientTutorPage from "@/components/TutorPage";
import AgentProvider from "@/contexts/agent";
import React from "react";

const TutorPage = () => {
  return (
    <AgentProvider>
      <Navbar />
      <ClientTutorPage />
    </AgentProvider>
  );
};

export default TutorPage;
