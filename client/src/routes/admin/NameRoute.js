import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../pages/admin/layout/Sidebar";
import AddName from "../../pages/admin/names/AddName";
import Name from "../../pages/admin/names/Name";
import EditName from "../../pages/admin/names/EditName";
import AllTrashNames from "../../pages/admin/names/AllTrashNames";

const NameRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="addnames"
          element={
            <>
              <Sidebar />
              <AddName />
            </>
          }
        />
        <Route
          path="allnames"
          element={
            <>
              <Sidebar />
              <Name />
            </>
          }
        />
        <Route
          path="editnames/:id"
          element={
            <>
              <Sidebar />
              <EditName />
            </>
          }
        />
        <Route
          path="alltrashname"
          element={
            <>
              <Sidebar />
              <AllTrashNames />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default NameRoute;
