import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PORT = process.env.REACT_APP_URL;

const AddBooks = () => {
  const navigate = useNavigate();
  // Store Input Date in this State
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookThumnail, setBookThumnail] = useState("");
  const [bookPDF, setBookPDF] = useState("");
  const [bookIsDownloadable, setBookIsDownloadable] = useState(0);
  const [bookCategory, setBookCategory] = useState(null);

  // const [blogStatus, setBlogStatus] = useState(1);

  // Store the Category Data in this State
  const [category, setCategory] = useState([]);

  // Get Category Data
  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getbookcategory`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // book thumnail
  const handlethumnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        toast.error("Only .jpg/.png/.jpeg File Allowded");
        return;
      }
      setBookThumnail(file);
    } else {
      toast.error("No file selected.");
    }
  };

  // handle pdf
  const handletPDF = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF File Allowded");
        return;
      }
      setBookPDF(file);
    } else {
      toast.error("No file selected.");
    }
  };

  // Save the data in database
  const savedata = async (e) => {
    e.preventDefault();
    try {
      if (bookCategory == null) {
        toast.error("Select Category");
        return;
      }
      const formdata = new FormData();
      formdata.append("bookTitle", bookTitle);
      formdata.append("bookAuthor", bookAuthor);
      formdata.append("bookDesc", bookDesc);
      formdata.append("bookthumnail", bookThumnail);
      formdata.append("bookpdf", bookPDF);
      formdata.append("bookIsDownloadable", bookIsDownloadable);
      formdata.append("bookCategory", bookCategory);
      axios
        .post(`${PORT}addbook`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          toast.success("Book Added");
          navigate("/allbooks", { replace: true });
        })
        .catch((e) => {
          toast.error("Book Upload Failed");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const [open, setOpen] = React.useState(false);

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // readio button
  const handleRadioChange = (event) => {
    setBookIsDownloadable(event.target.value);
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
          <span className="font-bold ml-3 text-2xl pt-1">Add Books</span>
        </div>

        <div className="flex justify-between">
          <div className="mt-4 shadow-lg h-min p-4" style={{ width: "47%" }}>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="book_title"
                  className="block mb-2 text-sm font-medium"
                >
                  Book Title:
                </label>
                <input
                  type="text"
                  id="book_title"
                  value={bookTitle}
                  onChange={(e) => {
                    setBookTitle(e.target.value);
                  }}
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter Book Title..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="book_author"
                  className="block mb-2 text-sm font-medium"
                >
                  Book Author:
                </label>
                <input
                  type="text"
                  id="book_author"
                  value={bookAuthor}
                  onChange={(e) => {
                    setBookAuthor(e.target.value);
                  }}
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter Book Author..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="book_description"
                  className="block mb-2 text-sm font-medium"
                >
                  Book Description:
                </label>
                <textarea
                  placeholder="Enter Book Description..."
                  type="text"
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  value={bookDesc}
                  onChange={(e) => {
                    setBookDesc(e.target.value);
                  }}
                  id="book_description"
                  required
                />
              </div>
              <div>
                <label className="text-lg mb-2 block">Book Download ?</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bookDownloadYes"
                    name="bookDownload"
                    value={1}
                    checked={bookIsDownloadable === 1}
                    onChange={handleRadioChange}
                    className="mr-2 w-3 h-3 appearance-none bg-white border border-gray-400 rounded-md focus:bg-blue-600"
                  />
                  <label
                    htmlFor="bookDownloadYes"
                    className="text-sm mr-4 cursor-pointer"
                  >
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="bookDownloadNo"
                    name="bookDownload"
                    value={0}
                    checked={bookIsDownloadable === 0}
                    onChange={handleRadioChange}
                    className="mr-2 w-3 h-3 appearance-none bg-white border border-gray-400 rounded-md focus:bg-blue-600"
                  />
                  <label
                    htmlFor="bookDownloadNo"
                    className="text-sm cursor-pointer"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 shadow-lg h-min p-4" style={{ width: "47%" }}>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="book_category"
                  className="block mb-2 text-sm font-medium"
                >
                  Select Book Category:
                </label>
                <select
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  name="blog_category"
                  id="book_category"
                  value={bookCategory}
                  onChange={(e) => {
                    setBookCategory(e.target.value);
                  }}
                >
                  <option selected value={null}>
                    Select Book Category
                  </option>
                  {category.map((e) => {
                    return (
                      <>
                        <option value={e.id}>{e.category_name}</option>
                      </>
                    );
                  })}
                </select>
                <NavLink to="/bookcategory">
                  <div className="mb-4 mt-1 text-blue-500 text-sm hover:underline">
                    Add New Category
                  </div>
                </NavLink>
              </div>
              <div>
                <label
                  htmlFor="bookimg"
                  className="block mb-2 text-sm font-medium"
                >
                  Book Thumnail:
                </label>
                <input
                  type="file"
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Book Thumnail"
                  name="bookthumnail"
                  onChange={handlethumnail}
                  id="bookimg"
                />
              </div>
              <div>
                <label
                  htmlFor="pdfimg"
                  className="block mb-2 text-sm font-medium"
                >
                  Book PDF:
                </label>
                <input
                  type="file"
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Book PDF"
                  id="pdfimg"
                  name="bookpdf"
                  onChange={handletPDF}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 rounded-lg text-sm py-2.5 text-center w-full"
                  onClick={savedata}
                >
                  PUBLISH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBooks;