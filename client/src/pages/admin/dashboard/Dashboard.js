import React, { useState, useEffect } from "react";
import "../../../assets/css/admin/style.css";
import axios from "axios";
const PORT = process.env.REACT_APP_URL;

const Dashboard = () => {
  const [pb, setPb] = useState(0);
  const [df, setDf] = useState(0);
  const [getBlogCate, setGetBlogCate] = useState(0);
  const [getPublishBlog, setGetPublishBlog] = useState(0);
  const [getBookCate, setGetBookCate] = useState(0);
  const [getBookPost, setGetBookPost] = useState(0);
  const [getNameCate, setGetNameCate] = useState(0);
  const [getNames, setGetNames] = useState(0);
  let published = 0;
  let draft = 0;

  useEffect(() => {
    getPosts();
    getCategoryData();
    getPublishedPost();
    getBookCateData();
    getBooksData();
    getNameCategory();
    getNamesPost();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get(`${PORT}getblogposts`);
      res.data.map((e, idx) => {
        if (e.blog_status) {
          published = published + 1;
        } else {
          draft = draft + 1;
        }
      });
      setPb(published);
      setDf(draft);
    } catch (err) {
      console.log(err);
    }
  };
  //GET BLOG CATEGORY DATA
  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${PORT}getblogcategory`);
      setGetBlogCate(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  //GET PUBLISH BLOG
  const getPublishedPost = async () => {
    try {
      const res = await axios.get(`${PORT}getpublishedblogpost`);
      setGetPublishBlog(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  //GET BOOK CATEGORY
  const getBookCateData = async () => {
    try {
      const res = await axios.get(`${PORT}getbookcategory`);
      setGetBookCate(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  //GET BOOK DATA
  const getBooksData = async () => {
    try {
      const res = await axios.get(`${PORT}getbooks`);
      setGetBookPost(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  //GET NAME CATEGORY
  const getNameCategory = async () => {
    try {
      const res = await axios.get(`${PORT}getnamescategory`);
      setGetNameCate(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  //GET NAME POST
  const getNamesPost = async () => {
    try {
      const res = await axios.get(`${PORT}getnames`);
      setGetNames(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="px-5 dashboard relative">
        <div className="overview mt-8">
          <div className="title flex align-center">
            <i className="fa-regular fa-clock py-1 px-2 relative bg-blue-500 rounded-md cursor-pointer text-white text-2xl"></i>
            <span className="font-bold ml-3 text-2xl pt-1">Dashboard</span>
          </div>
          <div className="flex items-center justify-between flex-wrap mt-5">
            <div className="boxes flex flex-col items-center">
              <i className="fa-solid fa-c"></i>
              <span>Blog Category</span>
              <span>{getBlogCate}</span>
            </div>
            <div className="boxes flex flex-col items-center">
              <i className="fa-solid fa-p"></i>
              <span>Total Blogs</span>
              <span>{df + pb}</span>
            </div>
            <div className="boxes flex flex-col items-center">
              <i className="fa-solid fa-p"></i>
              <span>Publish Blogs</span>
              <span>{getPublishBlog}</span>
            </div>
            <div className="boxes boxe1 flex flex-col items-center">
              <i className="fa-solid fa-p"></i>
              <span>Book Category</span>
              <span>{getBookCate}</span>
            </div>
            <div className="boxes boxe1 flex flex-col items-center">
              <i className="fa-solid fa-p"></i>
              <span>Book Posts</span>
              <span>{getBookPost}</span>
            </div>
            <div className="boxes boxe1 flex flex-col items-center">
              <i className="fa-solid fa-p"></i>
              <span>Name Category</span>
              <span>{getNameCate}</span>
            </div>
            <div className="boxes boxe1 flex flex-col items-center">
              <i className="fa-solid fa-p"></i>
              <span>Names Post</span>
              <span>{getNames}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
