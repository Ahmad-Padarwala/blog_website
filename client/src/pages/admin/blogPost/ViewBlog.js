import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
const PORT = process.env.REACT_APP_URL;

const ViewBlog = () => {
  const [viewBlogPost, setViewBlogPost] = useState("");
  const [blogCategory, setBlogCategory] = useState([]);

  const { id } = useParams("");

  const getBlogDetail = async () => {
    try {
      const res = await axios.get(`${PORT}getblogpostdetail/${id}`);
      setViewBlogPost(res.data[0]);
    } catch (error) {
      window.alert(error);
    }
  };
  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getblogcategory`);
      setBlogCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
    getData();
  }, []);
  const flag = blogCategory.some((x) => viewBlogPost.blog_category === x.id);
  return (
    <>
      <section className="dashboard relative px-6 py-3 bg-slate-950 shadow-md">
        <div className="flex justify-between items-center">
          <div className="relative flex items-center w-5/12 ml-auto">
            <input
              type="text"
              placeholder="Search Blog Post..."
              className="border border-gray-300 w-full rounded-md px-3 py-2 pr-10 focus:outline-none"
            />
            <i className="fa-solid fa-search text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"></i>
          </div>
        </div>
      </section>

      <div className="relative dashboard px-5 mt-8">
        <div className="flex align-center">
          <i className="fa-regular fa-clock py-1 px-2 relative bg-blue-500 rounded-md cursor-pointer text-white text-2xl"></i>
          <span className="font-bold ml-3 text-2xl pt-1">View Blog Posts</span>
        </div>

        <div className="shadow-lg rounded-md p-3 mt-5">
          <div className="flex justify-between mb-3">
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Id:-</p>
              <p className="bg-gray-200 rounded-md p-2">{viewBlogPost.id}</p>
            </div>
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Title:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {viewBlogPost.blog_title || "Data not available"}
              </p>
            </div>
          </div>
          <div className="mb-3">
            <p className="text-sm font-bold">Blog Description:-</p>
            <p className="bg-gray-200 rounded-md p-2">
              {viewBlogPost.blog_description || "Data not available"}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-sm font-bold">Blog Content:-</p>
            <p
              className="bg-gray-200 rounded-md p-2"
              dangerouslySetInnerHTML={{
                __html: viewBlogPost.blog_content || "Data not available",
              }}
            ></p>
          </div>
          <div className="flex justify-between mb-3">
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Author:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {viewBlogPost.blog_author || "Data not available"}
              </p>
            </div>
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Publish Date:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {viewBlogPost.blog_publish_date || "Data not available"}
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3">
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Likes:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {viewBlogPost.blog_likes}
              </p>
            </div>
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Category:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {flag
                  ? blogCategory.find(
                      (x) => viewBlogPost.blog_category === x.id
                    ).category_name
                  : "null"}
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3">
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Keywords:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {viewBlogPost.blog_keywords || "Data not available"}
              </p>
            </div>
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Tags:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {viewBlogPost.blog_tags || "Data not available"}
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-3">
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Slug:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {viewBlogPost.blog_slug || "Data not available"}
              </p>
            </div>
            <div style={{ width: "48%" }}>
              <p className="text-sm font-bold">Blog Publish Time:-</p>
              <p className="bg-gray-200 rounded-md p-2">
                {viewBlogPost.blog_time || "Data not available"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold mb-2">Blog Image:-</p>
            <img
              src={`../upload/blog/${viewBlogPost.blog_image}`}
              alt="blogs"
              width="100px"
              height="auto"
            />
          </div>
          <NavLink
            to="/allblogpost"
            type="button"
            className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 rounded-lg text-sm py-2.5 text-center w-full"
          >
            BACK
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
