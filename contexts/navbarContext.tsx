"use client";

import { ParentComponentProps } from "@/interfaces/parentComponentProps";
import { createContext, SetStateAction, useState, Dispatch } from "react";

interface NavbarContextType {
  navbarState: { isOpen: boolean };
  setNavbarState: Dispatch<SetStateAction<{ isOpen: boolean }>>;
}

export const NavbarContext = createContext<NavbarContextType>({
  navbarState: { isOpen: false },
  setNavbarState: () => {},
});

const NavbarContextProvider = ({ children }: ParentComponentProps) => {
  const [navbarState, setNavbarState] = useState({ isOpen: false });
  return (
    <NavbarContext.Provider value={{ navbarState, setNavbarState }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;
