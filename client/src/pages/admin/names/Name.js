import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../layout/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PORT = process.env.REACT_APP_URL;

const Name = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [NameCategory, setNameCategory] = useState([]);
  const [names, setNames] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalNames, setTotalNames] = useState(0);

  const getNames = async () => {
    try {
      const res = await axios.get(`${PORT}getnames`);
      setNames(res.data);
      setTotalNames(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  //GET NAME CATEGORY
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

  //TRASH NAMES
  const trashNames = async (id) => {
    try {
      await axios.patch(`${PORT}trashnames/${id}`);
      getNames();
    } catch (error) {
      toast.error(error);
    }
  };

  const [filterednames, setfilterNames] = useState([]);
  const filterBlogPosts = () => {
    const filteredNames = names.filter((item) => {
      const searchTerm = searchFilter.toLowerCase();
      const name1 =
        item.name_lang1 && item.name_lang1.toLowerCase().includes(searchTerm);
      const name2 =
        item.name_lang2 && item.name_lang2.toLowerCase().startsWith(searchTerm);
      const nameMeaning =
        item.name_meaning_lang1 &&
        item.name_meaning_lang1.toLowerCase().startsWith(searchTerm);
      const nameGender =
        item.name_gender &&
        item.name_gender.toLowerCase().startsWith(searchTerm);

      return name1 || name2 || nameMeaning || nameGender;
    });

    setfilterNames(filteredNames);
  };

  useEffect(() => {
    filterBlogPosts();
  }, [searchFilter, names]);

  const itemPerPage = 10;

  const numberOfPage = Math.ceil(filterednames.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = filterednames.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  //DELETE NAME DATA
  const openDeleteModal = (id) => {
    setSelectedBlogId(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedBlogId(null);
    setIsDeleteModalOpen(false);
  };
  const deleteBlogPost = () => {
    if (selectedBlogId) {
      trashNames(selectedBlogId);
      closeDeleteModal();
    }
  };

  return (
    <>
      <div className="container-scroller">
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
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                }}
              />
              <i className="fa-solid fa-search text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </div>
          </div>
        </section>
        <div className="relative dashboard px-5 mt-8">
          <div className="flex align-center">
            <i className="fa-regular fa-clock py-1 px-2 relative bg-blue-500 rounded-md cursor-pointer text-white text-2xl"></i>
            <span className="font-bold ml-3 text-2xl pt-1">All Names</span>
            <NavLink
              to="/addnames"
              className="absolute right-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <i className="fa-solid fa-plus mr-2"></i>ADD NAME
            </NavLink>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex mt-5 text-sm">
              <NavLink onClick={getNames}>
                <p>All ({totalNames})</p>
              </NavLink>
              <p className="mx-1">|</p>
              <NavLink to={"/alltrashname"}>
                <p className="text-red-500">Trash</p>
              </NavLink>
            </div>
          </div>

          {/* ALL NAMES TABLE SECTION */}
          <div className="flex">
            <div className="shadow-lg mt-4 w-full h-min">
              <div className="w-full">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2">Name(1)</th>
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
                    <tbody className="text-sm">
                      {rows.length > 0 ? (
                        rows.map((e, idx) => {
                          let flag = 0;
                          return (
                            <tr
                              key={idx}
                              className="text-center border-b border-gray-300 group align-top"
                            >
                              <td className="pb-2">
                                {e.name_lang1}
                                <p className="text-sm opacity-0 group-hover:opacity-100 ms-3 mt-1">
                                  <div className="flex">
                                    <NavLink
                                      to={`/editnames/${e.id}`}
                                      state={{ content: e.blog_content }}
                                    >
                                      <p className="text-blue-400">Edit</p>
                                    </NavLink>
                                    <p className="mx-1">|</p>
                                    <p
                                      className="text-red-500 cursor-pointer"
                                      onClick={() => {
                                        openDeleteModal(e.id);
                                      }}
                                    >
                                      Trash
                                    </p>
                                  </div>
                                </p>
                              </td>
                              <td>{e.name_meaning_lang1}</td>
                              <td>{e.name_lang2}</td>
                              <td>{e.name_meaning_lang2}</td>
                              <td>{e.name_description}</td>
                              <td>{e.name_gender}</td>
                              <td>
                                {NameCategory.map((x) => {
                                  if (e.name_category === x.id) {
                                    flag = 1;
                                    return x.category_name;
                                  }
                                  return null;
                                })}
                                {flag === 0 ? "null" : ""}
                              </td>
                              <td>
                                <p>{e.upload_date}</p>
                                <p>{e.upload_time}</p>
                              </td>
                              <td>{e.name_priority}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="9" className="px-4 py-2 text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={deleteBlogPost}
      />
    </>
  );
};

export default Name;
