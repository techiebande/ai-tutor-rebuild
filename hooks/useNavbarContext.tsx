"use client";

import { NavbarContext } from "@/contexts/navbarContext";
import { useContext } from "react";

const useNavbarContext = () => {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error(
      "useNavbarContext must be used within a NavbarContextProvider"
    );
  }

  const { setNavbarState, navbarState } = context;

  const toggleMobileNav = () => {
    setNavbarState({
      ...navbarState,
      isOpen: !navbarState.isOpen,
    });
  };

  return { context, toggleMobileNav };
};

export default useNavbarContext;
