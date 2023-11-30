import React from "react";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/admin/LoginRoute";
import DashRoute from "./routes/admin/DashRoute";
import BlogCateRoute from "./routes/admin/BlogCateRoute";
import BlogPostRoute from "./routes/admin/BlogPostRoute";
import BookCategoryRoute from "./routes/admin/BookCategoryRoute";
import BookRoute from "./routes/admin/BookRoute";
import NameCateRoute from "./routes/admin/NameCateRoute";
import NameRoute from "./routes/admin/NameRoute";
import ViewNewsRoute from "./routes/ViewNewsRoute";
import ViewBookRoute from "./routes/ViewBookRoute";

const App = () => {
  return (
    <>
      <HomeRoute />
      <LoginRoute />
      <DashRoute />
      <BlogCateRoute />
      <BlogPostRoute />
      <BookCategoryRoute />
      <BookRoute />
      <NameCateRoute />
      <NameRoute />
      <ViewNewsRoute />
      <ViewBookRoute />

    </>
  );
};

export default App;
