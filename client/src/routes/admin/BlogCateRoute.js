import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogCategory from "../../pages/admin/blogCategory";

const BlogCateRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="blogcategory"
          element={
            <>
              <BlogCategory />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default BlogCateRoute;
