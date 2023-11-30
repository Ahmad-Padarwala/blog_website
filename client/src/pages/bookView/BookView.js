import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookSidebar from "./BookSidebar";
const PORT = process.env.REACT_APP_URL;

function BookView() {
  const location = useLocation();
  const [bookId, setBookId] = useState(null);
  const [viewBook, setViewBook] = useState([]);
  const [selectedTab, setSelectedTab] = useState("details");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    setBookIdTOLocation(location.state.id);
  }, [location]);

  useEffect(() => {
    if (bookId) {
      getBookData(bookId);
    }
  }, [bookId]);

  const setBookIdTOLocation = (id) => {
    if (id) {
      setBookId(id);
    }
  };

  const getBookData = async () => {
    try {
      const res = await axios.get(`${PORT}getbookviewdetail/${bookId}`);
      setViewBook(res.data[0]);
      setPdfUrl(`../upload/book/${res.data[0].book_pdf}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row my-6 mx-auto all_main_div">
        <div className="mx-auto book_main_tabs">
          <div>
            <ul className="flex book_view_tab flex-wrap text-xs md:text-sm font-medium text-center dark:border-gray-700 dark:text-gray-400">
              <li>
                <button
                  onClick={() => setSelectedTab("details")}
                  className={`inline-block p-2 md:p-4 ${
                    selectedTab === "details"
                      ? ""
                      : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  } rounded-t-lg`}
                >
                  تفصیل
                </button>
              </li>
              <li className="md:mr-2">
                <button
                  onClick={() => setSelectedTab("reading")}
                  className={`inline-block p-2 md:p-4 ${
                    selectedTab === "reading"
                      ? "text-blue-600 bg-gray-100"
                      : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  } rounded-t-lg`}
                >
                  مطالعہ
                </button>
              </li>
            </ul>
          </div>

          {selectedTab === "details" && (
            <>
              <div className="border-b py-3">
                <p className="text-center text-2xl font-semibold p-2.5">
                  {viewBook.book_title}
                </p>
              </div>
              <div className="details-content flex flex-col mt-2">
                <img
                  src={`../../upload/book/${viewBook.book_thumbnail}`}
                  alt="news"
                />

                <p className="book_description">{viewBook.book_description}</p>
              </div>
              <p className="book_description">{viewBook.book_author}</p>
            </>
          )}

          {selectedTab === "reading" && pdfUrl && (
            <iframe
              title="PDF Viewer"
              src={pdfUrl}
              width="100%"
              height="800px"
            />
          )}
        </div>
        <div className="sidebar-news-page mt-5 md:mt-0">
          <BookSidebar />
        </div>
      </div>
    </>
  );
}

export default BookView;
