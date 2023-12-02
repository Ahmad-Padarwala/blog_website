import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShimerUi from "../component/ShimerUi";
const PORT = process.env.REACT_APP_URL;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getBooksWithLimits/${parseInt(8)}`);
      setBooks(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      <div id="books_heding" dir="rtl">
        <div id="books_name">
          <h2>کتابیں</h2>
          <p>
            اسلامی کتابیں اسلام کے متنوع پہلوؤں کی گہرائی سے تحقیق کرتی ہیں، جو
            مومنین اور متلاشیوں کے لیے یکساں علم اور رہنمائی کا ذریعہ بنتی ہیں۔
          </p>
        </div>
      </div>
      <div id="books_card_main_section" dir="rtl">
        {loading ? (
          <>
            <div id="books_card_main">
              <ShimerUi height={"300px"} width={"283px"} />
            </div>
            <div id="books_card_main">
              <ShimerUi height={"300px"} width={"283px"} />
            </div>
            <div id="books_card_main">
              <ShimerUi height={"300px"} width={"283px"} />
            </div>
            <div id="books_card_main">
              <ShimerUi height={"300px"} width={"283px"} />
            </div>
          </>
        ) : (
          books.map((book, index) => (
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
          ))
        )}
      </div>
    </>
  );
};

export default Books;
