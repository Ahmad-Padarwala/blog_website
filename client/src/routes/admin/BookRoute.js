import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../pages/admin/layout/Sidebar";
import AllBooks from "../../pages/admin/book/AllBooks";
import AddBooks from "../../pages/admin/book/AddBooks";
import EditBook from "../../pages/admin/book/EditBook";
import AllTrashBook from "../../pages/admin/book/AllTrashBook";

const BookRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="allbooks"
          element={
            <>
              <Sidebar />
              <AllBooks />
            </>
          }
        />
        <Route
          path="addbook"
          element={
            <>
              <Sidebar />
              <AddBooks />
            </>
          }
        />
        <Route
          path="editbook/:id"
          element={
            <>
              <Sidebar />
              <EditBook />
            </>
          }
        />
        <Route
          path="alltrashbooks"
          element={
            <>
              <Sidebar />
              <AllTrashBook />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default BookRoute;
