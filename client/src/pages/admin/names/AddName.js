import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const PORT = process.env.REACT_APP_URL;

const AddName = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [nameLang1, setNameLang1] = useState("");
  const [nameDesc, setNameDesc] = useState("");
  const [nameLang2, setNameLang2] = useState("");
  const [nameMeaning, setNameMeaning] = useState("");
  const [nameGender, setNameGender] = useState("male");
  const [nameCategory, setNameCategory] = useState("");
  const [namePriority, setNamePriority] = useState(1);
  const [nameMeaning2, setNameMeaning2] = useState("");
  const [nameContent, setNameContent] = useState("");

  // GET CATEGORY DATA
  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getnamescategory`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // SAVE THE DATA IN DATABASE
  const savedata = async (e) => {
    e.preventDefault();
    try {
      const names = {
        nameLang1: nameLang1,
        nameDesc: nameDesc,
        nameLang2: nameLang2,
        nameMeaning: nameMeaning,
        nameMeaning2: nameMeaning2,
        nameContent: nameContent,
        nameGender: nameGender,
        nameCategory: nameCategory,
        namePriority: namePriority,
      };
      const res = axios.post(`${PORT}addnamepost`, names);
      if (!res) {
        toast.error("Name Upload Failed");
      } else {
        toast.success("Name Added Successfully");
        navigate("/allnames", { replace: true });
      }
    } catch (e) {
      toast.error("Name Upload Failed");
    }
  };

  // RADIO BUTTON
  const handleRadioChange = (event) => {
    setNameGender(event.target.value);
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
          <span className="font-bold ml-3 text-2xl pt-1">Add Name</span>
        </div>

        <form method="POST" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name (language 1)
                </label>
                <input
                  id="name"
                  placeholder="Enter Name"
                  type="text"
                  value={nameLang1}
                  onChange={(e) => {
                    setNameLang1(e.target.value);
                  }}
                  required
                  className="mt-2 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="meaning"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name Meaning (language 1):
                </label>
                <input
                  id="meaning"
                  placeholder="Enter Name Meaning"
                  type="text"
                  value={nameMeaning}
                  onChange={(e) => {
                    setNameMeaning(e.target.value);
                  }}
                  required
                  className="mt-2 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name (Language 2):
                </label>
                <input
                  id="name2"
                  placeholder="Enter Name"
                  type="text"
                  value={nameLang2}
                  onChange={(e) => {
                    setNameLang2(e.target.value);
                  }}
                  required
                  className="mt-2 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="meaning2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name Meaning (language 2):
                </label>
                <input
                  id="meaning2"
                  placeholder="Enter Name Meaning"
                  type="text"
                  value={nameMeaning2}
                  onChange={(e) => {
                    setNameMeaning2(e.target.value);
                  }}
                  required
                  className="mt-2 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name Description:
                </label>
                <textarea
                  id="description"
                  placeholder="Enter Name Description"
                  type="text"
                  value={nameDesc}
                  onChange={(e) => {
                    setNameDesc(e.target.value);
                  }}
                  required
                  className="mt-2 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <section>
              <div className="mt-0 p-4 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                  <label
                    htmlFor="name_category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Blog Category:
                  </label>
                  <select
                    name="name_category"
                    id="name_category"
                    value={nameCategory}
                    onChange={(e) => {
                      setNameCategory(e.target.value);
                    }}
                    required
                    className="mt-2 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option selected>Select Blog Category</option>
                    {category.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name Content:
                  </label>
                  <textarea
                    id="content"
                    placeholder="Enter Name Content"
                    type="text"
                    value={nameContent}
                    onChange={(e) => {
                      setNameContent(e.target.value);
                    }}
                    required
                    className="mt-2 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  ></textarea>
                </div>

                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="block text-sm font-medium text-gray-700">
                      Gender:-
                    </div>
                    <div className="ml-2">
                      <input
                        id="male"
                        type="radio"
                        value="male"
                        checked={nameGender === "male"}
                        onChange={(e) => {
                          handleRadioChange(e);
                        }}
                        className="mt-2"
                      />
                      <label htmlFor="male" className="ml-1 text-sm">
                        Male
                      </label>
                    </div>
                    <div className="ml-4">
                      <input
                        id="female"
                        type="radio"
                        value="female"
                        checked={nameGender === "female"}
                        onChange={(e) => {
                          handleRadioChange(e);
                        }}
                        className="mt-2"
                      />
                      <label htmlFor="female" className="ml-1 text-sm">
                        Female
                      </label>
                    </div>
                    <div className="ml-4">
                      <input
                        id="both"
                        type="radio"
                        value="both"
                        checked={nameGender === "both"}
                        onChange={(e) => {
                          handleRadioChange(e);
                        }}
                        className="mt-2"
                      />
                      <label htmlFor="both" className="ml-1 text-sm">
                        Both
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block mt-2 text-sm font-medium text-gray-700">
                    Name Priority : {namePriority}
                  </label>
                  <input
                    type="range"
                    aria-label="Always visible"
                    value={namePriority}
                    onChange={(e) => {
                      setNamePriority(e.target.value);
                    }}
                    step="1"
                    min="1"
                    max="10"
                    className="mt-2 block w-full"
                  />
                  <div className="text-sm text-gray-600 flex justify-between">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-start">
                    <button
                      type="submit"
                      onClick={savedata}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddName;
