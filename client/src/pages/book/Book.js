import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PORT = process.env.REACT_APP_URL;

const Book = () => {
  const [books, setBooks] = useState([]);
  const [bookCategory, setBookCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    getData();
    getBookCategory();
    setShowBackButton(currentPage > 1);
    setShowNextButton(currentPage < Math.ceil(books.length / postsPerPage));
  }, [currentPage, postsPerPage]);
  useEffect(() => {
    getData();
    getBookCategory();
  }, [selectedCategory]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${PORT}getAllBookCateFilter/${selectedCategory}`
      );
      setBooks(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBookCategory = async () => {
    axios
      .get(`${PORT}getBookCategory`)
      .then((res) => {
        setBookCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const gotoBookViewpage = (bookId) => {
    navigate(`/viewBookPage/${bookId}`, {
      state: { id: bookId },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = books.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setShowBackButton(currentPage > 1);
    setShowNextButton(currentPage < Math.ceil(books.length / postsPerPage));
  }, [currentPage, books, postsPerPage]);

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
          {bookCategory.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            );
          })}
        </select>
      </div>
      <div id="books_card_main_section" dir="rtl">
        {currentPosts.map((book, index) => (
          <div
            key={index}
            id="books_card_main"
            onClick={() => gotoBookViewpage(book.id)}
          >
            <div id="books_card_img">
              <img
                src={`../../upload/book/${book.book_thumbnail}`}
                width="40%"
                alt={book.title}
              />
            </div>
            <div id="books_card_text">
              <p>{book.book_title}</p>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
        ))}

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

export default Book;
