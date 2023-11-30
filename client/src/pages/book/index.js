import React from "react";
import Navbar from "../component/Navbar";
import HeroSection from "../home/HeroSection";
import Book from "./Book";
import Footer from "../component/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Book />
      <Footer />
    </>
  );
};

export default index;
