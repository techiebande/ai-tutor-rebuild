import React from "react";
import AIRoom from "./AIRoom";
import MyAccount from "./MyAccount";
import Resources from "./Resources";
import Purchases from "./Purchases";
import { dashboardTabItems, useDashboard } from "@/contexts/dashboard";

const Content = () => {
  const { currentTabItem } = useDashboard();
  return (
    <div className="col-span-12 lg:col-span-8 bg-white rounded-lg shadow  p-[28px]">
      {currentTabItem === dashboardTabItems.room.name ? <AIRoom /> : ""}
      {currentTabItem === dashboardTabItems.account.name ? <MyAccount /> : ""}
      {currentTabItem === dashboardTabItems.resources.name ? <Resources /> : ""}
      {currentTabItem === dashboardTabItems.purchases.name ? <Purchases /> : ""}
    </div>
  );
};

export default Content;
