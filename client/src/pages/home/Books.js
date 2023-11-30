import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PORT = process.env.REACT_APP_URL;

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getBooksWithLimits/${parseInt(8)}`);
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
      <div id="books_card_main_section" dir="rtl">
        {books.map((book, index) => (
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
      </div>
    </>
  );
};

export default Books;
