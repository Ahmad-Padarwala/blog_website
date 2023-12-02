import React from "react";
import "../../assets/css/Navbar.css";

const ShimerUi = ({ height, width }) => {
  return (
    <div className="shimmer-container" style={{ height, width }}>
      <div className="shimmer"></div>
    </div>
  );
};

export default ShimerUi;
