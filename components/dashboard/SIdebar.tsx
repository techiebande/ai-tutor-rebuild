import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  CopyIcon,
  LogOut,
  NotebookTabsIcon,
  UserCircle,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/contexts/dashboard";
import { useRouter } from "next/navigation";

const tabItems = [
  {
    icon: <CopyIcon />,
    name: "My AI Room",
  },
  {
    icon: <UserCircle />,
    name: "My Account",
  },
  {
    icon: <NotebookTabsIcon />,
    name: "My Purchases",
  },
  {
    icon: <VideoIcon />,
    name: "Resources",
  },
  {
    icon: <LogOut />,
    name: "Logout",
  },
];

const SidebarItem = ({
  icon,
  name,
  isActive,
}: {
  icon: React.ReactNode;
  name: string;
  isActive: boolean;
}) => {
  const context = useDashboard();

  const { setCurrentTabItem } = context;

  return (
    <Button
      onClick={() => setCurrentTabItem(name)}
      className={cn(
        " bg-white w-full h-[65px] justify-start flex items-center gap-2 pl-5 text-black border-b rounded-none",
        isActive ? "border-l-4 border-l-blue-500" : ""
      )}
    >
      {icon}
      {name}
    </Button>
  );
};

export default function Sidebar() {
  const { currentTabItem } = useDashboard();

  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "GET" });

    router.push("/signin");
  };
  return (
    <div className="col-span-12 md:col-span-4">
      {tabItems.map((item, index) => {
        if (item.name === "Logout") {
          return (
            <div
              key={index}
              onClick={() => {
                logout();
              }}
            >
              <SidebarItem
                isActive={currentTabItem === item.name}
                icon={item.icon}
                name={item.name}
              />
            </div>
          );
        } else {
          return (
            <SidebarItem
              key={index}
              isActive={currentTabItem === item.name}
              icon={item.icon}
              name={item.name}
            />
          );
        }
      })}
    </div>
  );
}
