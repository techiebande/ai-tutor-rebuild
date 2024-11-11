import React from "react";
import Navbar from "./Navbar";
import NavbarContextProvider from "@/contexts/navbarContext";
import HomepageContent from "./HomepageContent";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <NavbarContextProvider>
      <Navbar />
      <HomepageContent />
      <Footer />
    </NavbarContextProvider>
  );
};

export default Homepage;
