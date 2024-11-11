import React, { createContext, useContext, useState } from "react";
import { CopyIcon, LogOut, NotebookTabsIcon, UserCircle } from "lucide-react";

export const dashboardTabItems = {
  room: {
    icon: <CopyIcon />,
    name: "My AI Room",
  },
  account: {
    icon: <UserCircle />,
    name: "My Account",
  },
  purchases: {
    icon: <NotebookTabsIcon />,
    name: "My Purchases",
  },
  resources: {
    icon: <NotebookTabsIcon />,
    name: "Resources",
  },
  logout: {
    icon: <LogOut />,
    name: "Logout",
  },
};

interface DashboardContextProps {
  currentTabItem: string;
  setCurrentTabItem: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardContext = createContext<DashboardContextProps>({
  currentTabItem: "",
  setCurrentTabItem: () => {},
});

const DashboardContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTabItem, setCurrentTabItem] = useState(
    dashboardTabItems.room.name
  );

  return (
    <DashboardContext.Provider
      value={{
        currentTabItem,
        setCurrentTabItem,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    console.log("No dashboard context");
  }

  return context;
};
