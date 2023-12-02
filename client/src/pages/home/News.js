import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import ShimerUi from "../component/ShimerUi";
const PORT = process.env.REACT_APP_URL;

const News = () => {
  const [blogPost, setBlogPost] = useState([]);
  const [blogCategory, setBlogCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
    getData();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get(`${PORT}getblogpostwithlimit`);
      setBlogPost(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${PORT}getblogcategory`);
      setBlogCategory(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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

  return (
    <>
      <div className="mt-5" id="books_heding" dir="rtl">
        <div id="books_name">
          <h2>مضامین</h2>
          <p>
            اسلامی مضامین اسلام کے ستونوں، قرآنی تعلیمات، تاریخی حکایات، اور
            عصری مسائل کے بارے میں بصیرت انگیز نقطہ نظر فراہم کرتے ہیں۔
          </p>
        </div>
      </div>
      <div className="ManiofArtical">
        {loading ? (
          <>
            <div id="artical_card">
              <ShimerUi height={"335px"} width={"245px"} />
            </div>
            <div id="artical_card">
              <ShimerUi height={"335px"} width={"245px"} />
            </div>
            <div id="artical_card">
              <ShimerUi height={"335px"} width={"245px"} />
            </div>
            <div id="artical_card">
              <ShimerUi height={"335px"} width={"245px"} />
            </div>
          </>
        ) : blogPost.length > 0 ? (
          blogPost.map((e, idx) => {
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
      </div>
    </>
  );
};

export default News;
