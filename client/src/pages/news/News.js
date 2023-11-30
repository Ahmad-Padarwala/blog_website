import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
const PORT = process.env.REACT_APP_URL;

const News = () => {
  const [blogPost, setBlogPost] = useState([]);
  const [blogCategory, setBlogCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  useEffect(() => {
    getPosts();
    getData();
    setShowBackButton(currentPage > 1);
    setShowNextButton(currentPage < Math.ceil(blogPost.length / postsPerPage));
  }, [currentPage, postsPerPage, selectedCategory]);

  useEffect(() => {
    getPosts();
    getData();
  }, [selectedCategory]);

  const getPosts = async () => {
    try {
      const res = await axios.get(
        `${PORT}getblogpostswithcategory/${selectedCategory}`
      );
      console.log(res.data);
      setBlogPost(res.data);
    } catch (err) {
      console.log(err);
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

  function formatDate(inputDate) {
    const parts = inputDate.split("-");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return `${day}/${month}/${year}`;
  }

  const gotoNewsViewPage = (newsId) => {
    navigate(`/viewnews/${newsId}`, {
      state: { id: newsId },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPost.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setShowBackButton(currentPage > 1);
    setShowNextButton(currentPage < Math.ceil(blogPost.length / postsPerPage));
  }, [currentPage, blogPost, postsPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="category_select_box">
        <span className="mb-2">اقسام:-</span>
        <select
          name="category"
          id="category"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="0">تمام</option>
          {blogCategory.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="ManiofArtical">
        {currentPosts.length > 0 ? (
          currentPosts.map((e, idx) => {
            let flag = 0;
            return (
              <div
                id="artical_card"
                key={idx}
                onClick={() => {
                  gotoNewsViewPage(e.id);
                }}
              >
                <div className="artical_Img">
                  <img
                    src={`./upload/blog/${e.blog_image}`}
                    alt="news-img"
                    style={{ width: "370px" }}
                  />
                </div>
                <div className="divide-y"></div>
                <div className="auth_time">
                  <p>
                    {blogCategory.map((x) => {
                      if (e.blog_category === x.id) {
                        flag = 1;
                        return x.category_name;
                      }
                      return null;
                    })}
                    {flag === 0 ? "null" : ""}
                  </p>
                  <p>{formatDate(e.blog_publish_date)}</p>
                </div>
                <div className="divide-y"></div>
                <div className="title">
                  <p>
                    {e.blog_title.length > 80
                      ? `${e.blog_title.slice(0, 80)}...`
                      : e.blog_title}
                  </p>
                </div>
                <NavLink className="news_read_btn">
                  مکمل مضمون<i className="fa-solid fa-arrow-left"></i>
                </NavLink>
              </div>
            );
          })
        ) : (
          <p className="not_avial_text">خبریں دستیاب نہیں ہیں۔</p>
        )}

        <div className="pagination" dir="rtl">
          {showNextButton && (
            <div className="arrow">
              <span
                className="fa-solid fa-arrow-right"
                onClick={() => paginate(currentPage + 1)}
              ></span>
            </div>
          )}
          {showBackButton && (
            <div className="arrow">
              <span
                className="fa-solid fa-arrow-left"
                onClick={() => paginate(currentPage - 1)}
              ></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
