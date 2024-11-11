"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/SIdebar";
import Content from "@/components/dashboard/Content";
import DashboardContextProvider from "@/contexts/dashboard";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="bg-[#f7fcff] py-10 grid grid-cols-12 gap-5 px-5 lg:px-20">
        <DashboardContextProvider>
          <Sidebar />
          <Content />
        </DashboardContextProvider>
      </div>
    </>
  );
};

export default Dashboard;
