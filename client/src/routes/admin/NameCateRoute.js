import React from "react";
import { Routes, Route } from "react-router-dom";
import NameCategory from "../../pages/admin/nameCategory";

const NameCateRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="addnamecategory"
          element={
            <>
              <NameCategory />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default NameCateRoute;
