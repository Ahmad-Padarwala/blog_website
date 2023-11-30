import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PORT = process.env.REACT_APP_URL;

const AllTrashBlog = () => {
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogPost, setBlogPost] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pb, setPb] = useState(0);

  const getPosts = async () => {
    try {
      const res = await axios.get(`${PORT}gettrashblogpost`);
      setBlogPost(res.data);

      setPb(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getblogcategory`);
      setBlogCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    getData();
  }, []);

  const trashBackBlogPost = async (id) => {
    try {
      const res = await axios.patch(`${PORT}trashbackblogpost/${id}`);
      getPosts();
    } catch (error) {
      window.alert(error);
    }
  };

  const itemPerPage = 10;

  const numberOfPage = Math.ceil(blogPost.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = blogPost.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  const DeletePost = async (id) => {
    try {
      const res = await axios.delete(`${PORT}deletepost/${id}`);
      toast.success("Post Delete Successfully");
      getPosts();
    } catch (error) {
      toast.error(error);
    }
  };

  const DeleteAlert = async (id) => {
    let title;
    try {
      const res = await axios.get(`${PORT}getblogpostdetail/${id}`);
      title = res.data[0].blog_title;
    } catch (error) {
      toast.error(error);
    }
    let x = window.prompt(`Enter Title Name = ${title} `, "");
    if (x == title) {
      DeletePost(id);
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
              placeholder="Search Blog Post..."
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
          <span className="font-bold ml-3 text-2xl pt-1">
            All Trash Blog Post
          </span>
        </div>

        <div className="flex mt-5 mb-2 text-sm">
          <NavLink to={"/allblogpost"}>
            <p className="text-blue-500">
              <i className="fa-solid fa-arrow-left-long"></i> Back
            </p>
          </NavLink>
          <p className="mx-2">|</p>
          <NavLink to={"/allblogpost"}>
            <p className="text-red-500">Trash({pb})</p>
          </NavLink>
        </div>
        <div className="flex">
          <div className="shadow-lg w-full h-min">
            <table className="text-gray-500 w-full">
              <thead className="text-md text-gray-700 bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3 cursor-pointer">
                    Blog Title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Blog Author
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Blog Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Blog Tags
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Published Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows
                    .filter((item) => {
                      const searchTerm = searchFilter.toLowerCase();
                      return (
                        item.blog_title.startsWith(searchTerm) ||
                        item.blog_author.startsWith(searchTerm) ||
                        item.blog_tags.startsWith(searchTerm) ||
                        item.blog_publish_date.startsWith(searchTerm)
                      );
                    })

                    .map((e, idx) => {
                      let flag = 0;

                      return (
                        <>
                          <tr
                            key={e.id}
                            className="text-center border-b border-gray-300 group align-top"
                          >
                            <td className="group hover:visible">
                              {e.blog_title}
                              <p className="text-sm opacity-0 group-hover:opacity-100">
                                <div className="flex">
                                  <NavLink>
                                    <p
                                      onClick={() => {
                                        trashBackBlogPost(e.id);
                                      }}
                                    >
                                      Restore
                                    </p>
                                  </NavLink>
                                  <p className="mx-1">|</p>
                                  <NavLink>
                                    <p
                                      className="text-red-500"
                                      onClick={() => {
                                        DeleteAlert(e.id);
                                      }}
                                    >
                                      Permenently Delete
                                    </p>
                                  </NavLink>
                                </div>
                              </p>
                            </td>
                            <td>{e.blog_author}</td>
                            <td>
                              {blogCategory.map((x) => {
                                if (e.blog_category === x.id) {
                                  flag = 1;
                                  return x.category_name;
                                }
                              })}
                              {flag === 0 ? "null" : ""}
                            </td>
                            <td>{e.blog_tags}</td>
                            <td>
                              {e.blog_status == 0 ? (
                                <p className="m-0 p-0">Draft</p>
                              ) : (
                                <p className="m-0 p-0">Published</p>
                              )}
                              {e.blog_publish_date} {e.blog_time}
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

export default AllTrashBlog;
