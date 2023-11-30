import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PORT = process.env.REACT_APP_URL;

const AllTrashBook = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [BookCategory, setBookCategory] = useState([]);
  const [Books, setBooks] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [TotalBooks, setTotalBooks] = useState(0);

  const getBooks = async () => {
    try {
      const res = await axios.get(`${PORT}gettrashbooks`);
      setBooks(res.data);
      setTotalBooks(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getbookcategory`);
      setBookCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
    getData();
  }, []);

  const [filterBooks, setfilterBooks] = useState(Books);
  const filterBook = () => {
    const searchTerm = searchFilter.toLowerCase();
    const filteredBooks = Books.filter((item) => {
      const title = item.book_title.toLowerCase().includes(searchTerm);
      const author = item.book_author.toLowerCase().startsWith(searchTerm);
      const bookdesc = item.book_description
        .toLowerCase()
        .startsWith(searchTerm);
      const categoryMatches =
        categoryFilter === "" || item.books_category == categoryFilter;

      return (title || author || bookdesc) && categoryMatches;
    });
    setfilterBooks(filteredBooks);
  };

  useEffect(() => {
    filterBook();
  }, [searchFilter, categoryFilter, Books]);

  const itemPerPage = 10;
  const numberOfPage = Math.ceil(filterBooks.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const rows = filterBooks.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const trashBackBook = async (id) => {
    try {
      const res = await axios.patch(`${PORT}trashbackbook/${id}`);
      getBooks();
    } catch (error) {
      toast.error(error);
    }
  };

  const DeleteBook = async (id) => {
    try {
      const res = await axios.delete(`${PORT}deletebook/${id}`);
      toast.success("Book Delete Successfully");
      getBooks();
    } catch (error) {
      toast.error(error);
    }
  };

  const DeleteAlert = async (id) => {
    let title;
    try {
      const res = await axios.get(`${PORT}getbookdetail/${id}`);
      title = res.data[0].book_title;
    } catch (error) {
      toast.error(error);
    }
    let x = window.prompt(`Enter Title Name = ${title} `, "");
    if (x == title) {
      DeleteBook(id);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <section className="dashboard relative px-6 py-3 bg-slate-950 shadow-md">
        <div className="flex justify-between items-center">
          <div className="relative flex items-center w-5/12 ml-auto">
            <input
              type="text"
              placeholder="Search Books..."
              className="border border-gray-300 w-full rounded-md px-3 py-2 pr-10 focus:outline-none"
            />
            <i className="fa-solid fa-search text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"></i>
          </div>
        </div>
      </section>
      <div className="relative dashboard px-5 mt-8">
        <div className="flex align-center">
          <i className="fa-regular fa-clock py-1 px-2 relative bg-blue-500 rounded-md cursor-pointer text-white text-2xl"></i>
          <span className="font-bold ml-3 text-2xl pt-1">Trash Books</span>
        </div>
        <div className="flex mt-5 mb-2 text-sm">
          <NavLink to={"/allbooks"}>
            <p className="text-blue-500">
              <i className="fa-solid fa-arrow-left-long"></i> Back
            </p>
          </NavLink>
          <p className="mx-2">|</p>
          <p className="text-red-500">Trash</p>
        </div>
        <div className="flex">
          <div className="shadow-lg w-full h-min">
            <table className="text-gray-500 w-full">
              <thead className="text-md text-gray-700 bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Thumbnail
                  </th>
                  <th scope="col" className="px-4 py-3 cursor-pointer">
                    PDF
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Download
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((e) => {
                    let flag = 0;

                    return (
                      <>
                        <tr
                          key={e.id}
                          className="text-center border-b border-gray-300 group align-top"
                        >
                          <td style={{ textAlign: "-webkit-center" }}>
                            {e.book_thumbnail != "" ? (
                              <img
                                src={`./upload/book/${e.book_thumbnail}`}
                                height="50px"
                                width="50px"
                                alt="books"
                              />
                            ) : (
                              <p>Not Found</p>
                            )}
                          </td>
                          <td className="pb-3 pt-1">
                            {e.book_pdf != "" ? (
                              <img
                                src={require(`../../../assets/image/pdf2.webp`)}
                                height="50px"
                                width="50px"
                                alt="book_pdf"
                              />
                            ) : (
                              <p>Not Found</p>
                            )}
                          </td>
                          <td>
                            {e.book_title}
                            <p className="text-sm opacity-0 group-hover:opacity-100">
                              <div className="flex">
                                <p
                                  onClick={() => {
                                    trashBackBook(e.id);
                                  }}
                                >
                                  <p className="text-blue-400 cursor-pointer">
                                    Restore
                                  </p>
                                </p>
                                <p className="mx-1">|</p>
                                <p
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => {
                                    DeleteAlert(e.id);
                                  }}
                                >
                                  Permenently Delete
                                </p>
                              </div>
                            </p>
                          </td>
                          <td> {e.book_author}</td>
                          <td>{e.book_description}</td>
                          <td>
                            {e.book_isdownload == 0 ? <p>No</p> : <p>Yes</p>}
                          </td>

                          <td>
                            {BookCategory.map((x) => {
                              if (e.books_category === x.id) {
                                flag = 1;
                                return x.category_name;
                              }
                            })}
                            {flag === 0 ? "null" : ""}
                          </td>
                          <td>
                            <p>{e.upload_date}</p>
                            <p>{e.book_publish_time}</p>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">Empty</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            disabled={currentPage <= 0}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          {pageIndex.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page - 1)}
              className={`px-3 py-1 mx-1 text-gray-600 rounded-md ${
                currentPage === page - 1
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage >= numberOfPage - 1}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default AllTrashBook;
