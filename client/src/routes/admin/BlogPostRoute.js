import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogPost from "../../pages/admin/blogPost";
import Sidebar from "../../pages/admin/layout/Sidebar";
import AddBlog from "../../pages/admin/blogPost/AddBlog";
import EditBlog from "../../pages/admin/blogPost/EditBlog";
import AllTrashBlog from "../../pages/admin/blogPost/AllTrashBlog";
import ViewBlog from "../../pages/admin/blogPost/ViewBlog";

const BlogPostRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="allblogpost"
          element={
            <>
              <BlogPost />
            </>
          }
        />
        <Route
          path="addblogpost"
          element={
            <>
              <Sidebar />
              <AddBlog />
            </>
          }
        />
        <Route
          path="editblogpost/:id"
          element={
            <>
              <Sidebar />
              <EditBlog />
            </>
          }
        />
        <Route
          path="alltrashblogpost"
          element={
            <>
              <Sidebar />
              <AllTrashBlog />
            </>
          }
        />
        <Route
          path="blogpreview/:id"
          element={
            <>
              <Sidebar />
              <ViewBlog />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default BlogPostRoute;
