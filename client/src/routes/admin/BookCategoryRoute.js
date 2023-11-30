import React from "react";
import { Routes, Route } from "react-router-dom";
import BookCategory from "../../pages/admin/bookCategory";

const BookCategoryRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="bookcategory"
          element={
            <>
              <BookCategory />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default BookCategoryRoute;