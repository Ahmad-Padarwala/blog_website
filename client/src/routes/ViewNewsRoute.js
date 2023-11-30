import React from "react";
import { Routes, Route } from "react-router-dom";
import ViewNews from "../pages/blogView";

const ViewNewsRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/viewnews/:id"
          element={
            <>
              <ViewNews />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default ViewNewsRoute;
