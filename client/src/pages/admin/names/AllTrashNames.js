import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PORT = process.env.REACT_APP_URL;

const AllTrashNames = () => {
  const [NameCategory, setNameCategory] = useState([]);
  const [names, setNames] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const getNames = async () => {
    try {
      const res = await axios.get(`${PORT}gettrashnames`);
      setNames(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getnamescategory`);
      setNameCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNames();
    getData();
  }, []);

  const [filterNames, setfilterNames] = useState(names);
  const filterBlogPosts = () => {
    const searchTerm = searchFilter.toLowerCase();
    const filterednames = names.filter((item) => {
      const name1 = item.name_lang1.toLowerCase().includes(searchTerm);
      const name2 = item.name_lang2.toLowerCase().startsWith(searchTerm);
      const nameMeaning = item.name_meaning_lang1
        .toLowerCase()
        .startsWith(searchTerm);
      const nameGender = item.name_gender.toLowerCase().startsWith(searchTerm);

      return name1 || name2 || nameMeaning || nameGender;
    });
    setfilterNames(filterednames);
  };

  useEffect(() => {
    filterBlogPosts();
  }, [searchFilter, names]);

  const itemPerPage = 10;

  const numberOfPage = Math.ceil(filterNames.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = filterNames.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const trashBackNames = async (id) => {
    try {
      await axios.patch(`${PORT}trashbacknames/${id}`);
      getNames();
    } catch (error) {
      toast.error(error);
    }
  };

  const DeleteName = async (id) => {
    try {
      await axios.delete(`${PORT}deletename/${id}`);
      toast.success("Name Delete Successfully");
      getNames();
    } catch (error) {
      toast.error(error);
    }
  };

  const DeleteAlert = async (id) => {
    let title;
    try {
      const res = await axios.get(`${PORT}getnamedetail/${id}`);
      title = res.data[0].name_lang1;
    } catch (error) {
      toast.error(error);
    }
    let x = window.prompt(`Enter Title Name = ${title} `, "");
    if (x == title) {
      DeleteName(id);
    } else {
      toast.error("Oops ! Title is Incorrect");
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
                placeholder="Search Name Category..."
                className="border border-gray-300 w-full rounded-md px-3 py-2 pr-10 focus:outline-none"
              />
              <i className="fa-solid fa-search text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </div>
          </div>
        </section>

        <div className="relative dashboard px-5 mt-8">
          <div className="flex align-center">
            <i className="fa-regular fa-clock py-1 px-2 relative bg-blue-500 rounded-md cursor-pointer text-white text-2xl"></i>
            <span className="font-bold ml-3 text-2xl pt-1">
              All Trash Names
            </span>
          </div>

          <div className="flex mt-5 text-sm">
            <NavLink to={"/allnames"}>
              <p className="text-blue-500">
                <i className="fa-solid fa-arrow-left-long"></i> Back
              </p>
            </NavLink>
            <p className="mx-1">|</p>
            <p className="text-red-500">Trash</p>
          </div>

          <table className="text-gray-500 shadow-lg w-full mt-4">
            <thead className="text-md text-gray-700 bg-gray-100">
              <tr>
                <th className="py-3 px-4">Name(1)</th>
                <th className="px-4">Meaning(1)</th>
                <th className="px-4">Name(2)</th>
                <th className="px-4">Meaning(2)</th>
                <th className="px-4">Description</th>
                <th className="px-4">Gender</th>
                <th className="px-4">Category</th>
                <th>Date & Time</th>
                <th className="px-4">Priority</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((e) => {
                  let flag = 0;
                  return (
                    <tr className="bg-white text-center hover:bg-gray-50">
                      <td className="py-2 px-4 w-1/6 group hover:visible">
                        {e.name_lang1}
                        <p className="text-xs opacity-0 group-hover:opacity-100">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              trashBackNames(e.id);
                            }}
                          >
                            Restore
                          </span>
                          <span className="mx-1">|</span>
                          <span
                            className="text-red-500 cursor-pointer"
                            onClick={() => {
                              DeleteAlert(e.id);
                            }}
                          >
                            Permanently Delete
                          </span>
                        </p>
                      </td>

                      <td className="py-2 px-4 w-1/6">
                        {e.name_meaning_lang1}
                      </td>
                      <td className="py-2 px-4 w-1/6">{e.name_lang2}</td>
                      <td className="py-2 px-4 w-1/6">
                        {e.name_meaning_lang2}
                      </td>
                      <td className="py-2 px-4 w-1/6">{e.name_description}</td>
                      <td className="py-2 px-4 w-1/6">{e.name_gender}</td>
                      <td className="py-2 px-4 w-1/6">
                        {NameCategory.map((x) => {
                          if (e.name_category === x.id) {
                            flag = 1;
                            return x.category_name;
                          }
                        })}
                        {flag === 0 ? "null" : ""}
                      </td>
                      <td className="py-2 px-4 w-1/6">
                        <p className="m-0">{e.upload_date}</p>
                        <p className="m-0">{e.upload_time}</p>
                      </td>
                      <td className="py-2 px-4 w-1/6">{e.name_priority}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">Empty</td>
                </tr>
              )}
            </tbody>
          </table>

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

export default AllTrashNames;
