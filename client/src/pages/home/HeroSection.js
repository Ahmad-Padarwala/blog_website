import React from "react";

const HeroSection = () => {
  return (
    <>
      <div id="banner_container">
        <div style={{ textAlign: " -webkit-center" }}>
          <img
            src={require("../../assets/image/kalma-text-img.png")}
            alt="kalma-text"
          />
          <h2 id="banner_text">السلام علیکم</h2>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
