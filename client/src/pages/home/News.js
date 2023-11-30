import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PORT = process.env.REACT_APP_URL;

const News = () => {
  const [blogPost, setBlogPost] = useState([]);
  const [blogCategory, setBlogCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
    getData();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get(`${PORT}getblogpostwithlimit`);
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

    const date = new Date(year, month - 1, day);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const gotoNewsViewPage = (newsId) => {
    navigate(`/viewnews/${newsId}`, {
      state: { id: newsId },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div id="news_section_main" dir="rtl">
        {blogPost.length > 0 ? (
          blogPost.map((e, idx) => {
            let flag = 0;
            return (
              <div
                id="news_card_main"
                key={idx}
                onClick={() => {
                  gotoNewsViewPage(e.id);
                }}
              >
                <div id="news_card_img">
                  <img
                    src={`./upload/blog/${e.blog_image}`}
                    alt="news-img"
                    width="100%"
                  />
                </div>
                <div id="card_text">
                  <span>
                    {blogCategory.map((x) => {
                      if (e.blog_category === x.id) {
                        flag = 1;
                        return x.category_name;
                      }
                      return null;
                    })}
                    {flag === 0 ? "null" : ""}
                  </span>
                  <p id="card_date">{formatDate(e.blog_publish_date)}</p>
                </div>
                <p id="card_des">{e.blog_title}</p>
              </div>
            );
          })
        ) : (
          <p className="not_avial_text">خبریں دستیاب نہیں ہیں۔</p>
        )}
      </div>
    </>
  );
};

export default News;
