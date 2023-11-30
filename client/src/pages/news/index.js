import React from "react";
import Navbar from "../component/Navbar";
import HeroSection from "../home/HeroSection";
import News from "./News";
import Footer from "../component/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <News />
      <Footer />
    </>
  );
};

export default index;
