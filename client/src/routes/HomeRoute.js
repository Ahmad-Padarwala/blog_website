import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import News from "../pages/news";
import Book from "../pages/book";
import Warriors from "../pages/warriors";

const HomeRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <News />
            </>
          }
        />
        <Route
          path="/books"
          element={
            <>
              <Book />
            </>
          }
        />
        <Route
          path="/warriors"
          element={
            <>
              <Warriors />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default HomeRoute;
