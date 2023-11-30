import React from "react";
import Categories from "./Categories";
import Navbar from "../component/Navbar";
import HeroSection from "./HeroSection";
import Books from "./Books";
// import News from "./News";
import Footer from "../component/Footer";
import "../../assets/css/pages/Home.css";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Categories />
      {/* <News /> */}
      <Books />
      <Footer />
    </>
  );
};

export default index;
