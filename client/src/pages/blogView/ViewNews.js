import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewsSidebar from "./NewsSidebar";
const PORT = process.env.REACT_APP_URL;

const ViewNews = () => {
  const location = useLocation();
  const [newsId, setNewsId] = useState(location.state.id);
  const [viewNews, setViewNews] = useState([]);

  useEffect(() => {
    getNewsViewData();
  }, [newsId]);

  const getNewsViewData = async () => {
    try {
      const res = await axios.get(`${PORT}getblogpostdetail/${newsId}`);
      setViewNews(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (inputDate) => {
    if (!inputDate) {
      return "Date not available";
    }

    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const { id } = useParams();

  useEffect(() => {
    setNewsId(id);
  }, [id]);
  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }

  return (
    <>
      <div className="main-news-view-page">
        <div className="view_news_main_section">
          <div className="view_news_image">
            <img
              src={`../upload/blog/${viewNews.blog_image}`}
              alt="news"
              className="w-full"
            />
          </div>
          <div className="view_main_contant">
            <div className="view_news_title ">{viewNews.blog_title}</div>
            <div className="view_news_content">
              <p>
                <span className="special-text">
                  {stripHtmlTags(viewNews.blog_content) || "Data not available"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-between view_news_main">
            <p className="view_news_date">
              <span>مصنف :</span> {viewNews.blog_author}
            </p>
            <p className="view_news_date">
              <span>اشاعت کی تاریخ :</span>
              {formatDate(viewNews.blog_publish_date)}
            </p>
          </div>
        </div>
        <div className="sidebar-news-page ms-5">
          <NewsSidebar />
        </div>
      </div>
    </>
  );
};

export default ViewNews;
