import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DeleteModal from "../layout/DeleteModal";
const PORT = process.env.REACT_APP_URL;

const AllBlog = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogPost, setBlogPost] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pb, setPb] = useState(0);
  const [df, setDf] = useState(0);
  let published = 0;
  let draft = 0;

  useEffect(() => {
    getPosts();
    getData();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get(`${PORT}getblogposts`);
      setBlogPost(res.data);
      res.data.map((e, idx) => {
        if (e.blog_status) {
          published = published + 1;
        } else {
          draft = draft + 1;
        }
      });
      setPb(published);
      setDf(draft);
    } catch (err) {
      console.log(err);
    }
  };

  const getDraftPost = async () => {
    try {
      const res = await axios.get(`${PORT}getdraftblogpost`);
      setBlogPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPublishedPost = async () => {
    try {
      const res = await axios.get(`${PORT}getpublishedblogpost`);
      setBlogPost(res.data);
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

  //DELETE BRAND DATA
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
      trashBlogPost(selectedBlogId);
      closeDeleteModal();
    }
  };
  const trashBlogPost = async (id) => {
    try {
      const res = await axios.patch(`${PORT}trashblogpost/${id}`);
      getPosts();
    } catch (error) {
      window.alert(error);
    }
  };

  const [filteredBlogPost, setFilteredBlogPost] = useState(blogPost);
  const filterBlogPosts = () => {
    const searchTerm = searchFilter.toLowerCase();
    const filteredPosts = blogPost.filter((item) => {
      const titleMatches = item.blog_title.toLowerCase().includes(searchTerm);
      const authorMatches = item.blog_author
        .toLowerCase()
        .startsWith(searchTerm);
      const tagsMatches = item.blog_tags.toLowerCase().startsWith(searchTerm);
      const publishDateMatches = item.blog_publish_date
        .toLowerCase()
        .startsWith(searchTerm);

      // Apply category filter
      const categoryMatches =
        categoryFilter === "" || item.blog_category === categoryFilter;

      return (
        (titleMatches || authorMatches || tagsMatches || publishDateMatches) &&
        categoryMatches
      );
    });
    setFilteredBlogPost(filteredPosts);
  };

  useEffect(() => {
    filterBlogPosts();
  }, [searchFilter, categoryFilter, blogPost]);

  const itemPerPage = 10;

  const numberOfPage = Math.ceil(filteredBlogPost.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = filteredBlogPost.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  return (
    <>
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
          <span className="font-bold ml-3 text-2xl pt-1">Blog Posts</span>
          <NavLink
            to="/addblogpost"
            className="absolute right-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            <i className="fa-solid fa-plus mr-2"></i>ADD BLOGS
          </NavLink>
        </div>

        <div className="flex mt-5 mb-2 text-sm justify-between">
          <div className="flex">
            <NavLink onClick={getPosts}>
              <p>All ({df + pb})</p>
            </NavLink>
            <p className="mx-2">|</p>
            <NavLink onClick={getPublishedPost}>
              <p>Published ({pb})</p>
            </NavLink>
            <p className="mx-2">|</p>
            <NavLink onClick={getDraftPost}>
              <p>Draft ({df})</p>
            </NavLink>
            <p className="mx-2">|</p>
            <NavLink to={"/alltrashblogpost"}>
              <p className="text-red-500">Trash</p>
            </NavLink>
          </div>
        </div>

        <div className="flex">
          <div className="shadow-lg w-full h-min">
            <table className="text-gray-500 w-full">
              <thead className="text-md text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3 cursor-pointer">Blog Title</th>
                  <th className="px-4 py-3">Blog Author</th>
                  <th className="px-4 py-3">Blog Category</th>
                  <th className="px-4 py-3">Blog Tags</th>
                  <th className="px-4 py-3">Published Date</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((e, idx) => {
                    let flag = 0;

                    return (
                      <>
                        <tr
                          key={e.id}
                          className="text-center border-b border-gray-300 group align-top"
                        >
                          <td
                            className="pb-3"
                            style={{ textAlign: "-webkit-center" }}
                          >
                            <img
                              src={`./upload/blog/${e.blog_image}`}
                              style={{
                                height: "50px",
                                width: "50px",
                              }}
                              alt="blog_post"
                            />
                          </td>
                          <td className="group hover:visible">
                            {e.blog_title}
                            <p className="text-sm opacity-0 group-hover:opacity-100">
                              <div className="flex">
                                <NavLink to={`/blogpreview/${e.id}`}>
                                  <p className="text-lime-500">View |</p>
                                </NavLink>
                                <NavLink
                                  to={`/editblogpost/${e.id}`}
                                  state={{ content: e.blog_content }}
                                >
                                  <p className="text-blue-400">&nbsp;Edit |</p>
                                </NavLink>
                                <p
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => {
                                    openDeleteModal(e.id);
                                  }}
                                >
                                  &nbsp;Trash
                                </p>
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
                            {e.blog_status === 0 ? (
                              <p>Draft</p>
                            ) : (
                              <p>Published</p>
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
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={deleteBlogPost}
      />
    </>
  );
};

export default AllBlog;
