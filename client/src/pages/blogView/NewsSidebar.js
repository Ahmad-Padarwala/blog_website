import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PORT = process.env.REACT_APP_URL;

const NewsSidebar = () => {
  const [blogPost, setBlogPost] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      const res = await axios.get(`${PORT}getblogpostwithlimit`);
      setBlogPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const gotoNewsViewPage = (newsId) => {
    navigate(`/viewnews/${newsId}`, {
      state: { id: newsId },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <div className="view_news_main_section-sidebar">
        <div className="view_sidebar_img">
          <img
            src={require("../../assets/image/adverti-image-veiw-news-page.jpg")}
            alt="adverisenment-img"
          />
        </div>
        <div className="mt-5 relative w-full text-grey-600" dir="ltr">
          <form action="" method="post" className="search_form">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="button" className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="view_news_content ms-1">
          <p>حالیہ پوسٹ :-</p>
        </div>
        <div className="newsidebar_main_contant">
          {blogPost.map((post, index) => (
            <div
              className="flex newsidebar_main_con"
              key={index}
              onClick={() => {
                gotoNewsViewPage(post.id);
              }}
            >
              <div className="w-4/12 newsidebar_img mt-5">
                <img src={`/upload/blog/${post.blog_image}`} alt="blog_img" />
              </div>

              <div className="w-8/12 ">
                <p className="sidbar-veiw-content  ms-3">
                  {truncateText(post.blog_title, 50)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsSidebar;
