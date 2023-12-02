import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PORT = process.env.REACT_APP_URL;

function BookSidebar() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Get book category data
  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getBooksWithLimits/8`);
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const gotoBookViewpage = (bookId) => {
    navigate(`/viewBookPage/${bookId}`, {
      state: { id: bookId },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="view_news_main_section-sidebar">
        <div className="view_sidebar_img">
          <img
            src={require("../../assets/image/adverti-image-veiw-news-page.jpg")}
            alt="advertisenment-img"
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
          <p>کتابیں:-</p>
        </div>
        <div className="newsidebar_main_contant">
          {books.map((books) => {
            return (
              <div
                className="flex view_book_side_img newsidebar_main_con mt-4"
                key={books.id}
                onClick={() => {
                  gotoBookViewpage(books.id);
                }}
              >
                <div className="w-1/3">
                  <img
                    src={`../../upload/book/${books.book_thumbnail}`}
                    alt="book_thumbnail"
                  />
                </div>
                <p className="w-2/3">{books.book_title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BookSidebar;
