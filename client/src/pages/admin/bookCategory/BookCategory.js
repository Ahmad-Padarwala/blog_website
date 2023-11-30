import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../layout/DeleteModal";
const PORT = process.env.REACT_APP_URL;

const BookCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [subCategory, setSubCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  // data store
  const [bookCategory, setbooklogCategory] = useState([]);

  // search item
  const [searchFilter, setSearchFilter] = useState("");

  // sort item
  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...bookCategory].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );

      setbooklogCategory(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...bookCategory].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setbooklogCategory(sorted);
      setOrder("ASC");
    }
  };

  // get book category data
  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getbookcategory`);
      setbooklogCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // save the book category data
  const savedata = async (e) => {
    e.preventDefault();
    const team = {
      categoryName: categoryName,
      categoryDesc: categoryDesc,
      subCategory: subCategory,
    };
    try {
      await axios
        .post(`${PORT}addbookcategory`, team)
        .then((res) => {
          toast.success(" Category Added Successfully");
          getData();
          setCategoryName("");
          setCategoryDesc("");
          setSubCategory("");
        })
        .catch((e) => {
          toast.error("Category Failed");
        });
    } catch (error) {
      toast.error("Category Failed");
    }
  };

  //DELETE BOKK CATEGORY DATA
  const openDeleteModal = (brandId) => {
    setSelectedBlogId(brandId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedBlogId(null);
    setIsDeleteModalOpen(false);
  };
  const deleteBlogCate = () => {
    if (selectedBlogId) {
      delebookBlogCategory(selectedBlogId);
      closeDeleteModal();
    }
  };
  const delebookBlogCategory = async (id) => {
    try {
      const res = await axios.delete(`${PORT}deletebookcategory/${id}`);
      toast.success("Category Delete Successfully");
      getData();
    } catch (error) {
      toast.error(error);
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
              placeholder="Search Book Category..."
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
          <span className="font-bold ml-3 text-2xl pt-1">Book Category</span>
        </div>

        <div className="flex">
          <div className="shadow-lg mt-4 w-7/12 h-min">
            <table className="text-gray-500 w-full">
              <thead className="text-md text-gray-700 bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => sorting("category_name")}
                  >
                    Category<i className="fa-solid fa-filter"></i>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Sub Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Handle
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookCategory.length > 0
                  ? bookCategory
                      .filter((item) => {
                        return searchFilter.toLowerCase() === ""
                          ? item
                          : item.category_name
                              .toLowerCase()
                              .startsWith(searchFilter);
                      })

                      .map((e, idx) => {
                        let flag = 0;
                        return (
                          <>
                            <tr
                              key={e.id}
                              className="text-center border-b border-gray-300 group"
                            >
                              <th scope="row" className="py-4">
                                {idx + 1}
                              </th>
                              <td className="py-4">{e.category_name}</td>
                              <td className="py-4">
                                {bookCategory.map((x) => {
                                  if (e.sub_category === x.id) {
                                    flag = 1;
                                    return x.category_name;
                                  }
                                })}
                                {flag === 0 ? "null" : ""}
                              </td>
                              <td>{e.category_description}</td>
                              <td>
                                <button
                                  className="text-red-500"
                                  onClick={() => {
                                    openDeleteModal(e.id);
                                  }}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })
                  : "Empty"}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-5/12 absolute top-8 right-0 mt-4 flex justify-center items-center">
          <div className="w-9/12 shadow-lg text-gray-500 px-3 py-2">
            <form method="post">
              <p className="font-bold text-xl text-gray-700 mb-3">
                ADD BOOK CATEGORY
              </p>
              <div className="grid gap-4 mb-6">
                <div>
                  <label
                    htmlFor="category_name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Book Category Name:
                  </label>
                  <input
                    type="text"
                    id="category_name"
                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Category Name..."
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="book_subcategory"
                    className="block mb-2 text-sm font-medium"
                  >
                    Book Sub Category:
                  </label>
                  <select
                    name="book_subcategory"
                    placeholder=""
                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    id="book_subcategory"
                    value={subCategory}
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                    }}
                    required
                  >
                    <option value="Null">Null</option>
                    {bookCategory.map((e) => {
                      return (
                        <>
                          <option value={e.id}>{e.category_name}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="category_desc"
                    className="block mb-2 text-sm font-medium"
                  >
                    Book Description:
                  </label>
                  <input
                    type="text"
                    id="category_desc"
                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Category Description..."
                    value={categoryDesc}
                    onChange={(e) => {
                      setCategoryDesc(e.target.value);
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={savedata}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 rounded-lg text-sm py-2.5 text-center"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={deleteBlogCate}
      />
    </>
  );
};

export default BookCategory;
