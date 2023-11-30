import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PORT = process.env.REACT_APP_URL;

const EditName = () => {
  const navigate = useNavigate();
  const { id } = useParams("");

  // STORE INPUTS DATA IN STATE
  const [nameLang1, setNameLang1] = useState("");
  const [nameDesc, setNameDesc] = useState("");
  const [nameLang2, setNameLang2] = useState("");
  const [nameMeaning, setNameMeaning] = useState("");
  const [nameGender, setNameGender] = useState("male");
  const [nameCategory, setNameCategory] = useState("");
  const [namePriority, setNamePriority] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [nameMeaning2, setNameMeaning2] = useState("");
  const [nameContent, setNameContent] = useState("");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getData();
    getNameDetail();
  }, []);

  // GET CATEGORY DATA
  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getnamescategory`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // GET NAME DETAIL
  const getNameDetail = async () => {
    try {
      const res = await axios.get(`${PORT}getnamedetail/${id}`);
      setNameLang1(res.data[0].name_lang1);
      setNameLang2(res.data[0].name_lang2);
      setNameMeaning(res.data[0].name_meaning_lang1);
      setNameMeaning2(res.data[0].name_meaning_lang2);
      setNameContent(res.data[0].name_content);
      setNameDesc(res.data[0].name_description);
      setNameCategory(res.data[0].name_category);
      setNameGender(res.data[0].name_gender);
      setNamePriority(res.data[0].name_priority);
      setDataFetched(true);
    } catch (error) {
      toast.error(error);
    }
  };

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
      const res = axios.patch(`${PORT}editname/${id}`, names);
      if (!res) {
        toast.error("name is not Inserted 😂");
      } else {
        navigate("/allnames", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // RADIO BUTOON
  const handleRadioChange = (event) => {
    setNameGender(event.target.value);
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
                placeholder="Search Name..."
                className="border border-gray-300 w-full rounded-md px-3 py-2 pr-10 focus:outline-none"
              />
              <i className="fa-solid fa-search text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </div>
          </div>
        </section>

        <div className="relative dashboard px-5 mt-8">
          <div className="flex align-center">
            <i className="fa-regular fa-clock py-1 px-2 relative bg-blue-500 rounded-md cursor-pointer text-white text-2xl"></i>
            <span className="font-bold ml-3 text-2xl pt-1">Edit Name</span>
          </div>

          <form method="POST" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="lg:col-span-1">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="space-y-2">
                    <div className="mb-3">
                      <label htmlFor="name" className="font-bold text-sm">
                        Name (language 1) :-
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={nameLang1}
                        onChange={(e) => {
                          setNameLang1(e.target.value);
                        }}
                        required
                        className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="meaning1" className="font-bold text-sm">
                        Name Meaning (language 2) :-
                      </label>
                      <input
                        id="meaning1"
                        placeholder=""
                        type="text"
                        value={nameMeaning}
                        onChange={(e) => {
                          setNameMeaning(e.target.value);
                        }}
                        required
                        className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name2" className="font-bold text-sm">
                        Name (Language 2) :-
                      </label>
                      <input
                        id="name2"
                        placeholder=""
                        type="text"
                        value={nameLang2}
                        onChange={(e) => {
                          setNameLang2(e.target.value);
                        }}
                        required
                        className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="meaning2" className="font-bold text-sm">
                        Name Meaning (language 2) :-
                      </label>
                      <input
                        id="meaning2"
                        placeholder=""
                        type="text"
                        value={nameMeaning2}
                        onChange={(e) => {
                          setNameMeaning2(e.target.value);
                        }}
                        required
                        className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="description"
                        className="font-bold text-sm"
                      >
                        Name Description :-
                      </label>
                      <textarea
                        id="description"
                        placeholder=""
                        type="text"
                        value={nameDesc}
                        onChange={(e) => {
                          setNameDesc(e.target.value);
                        }}
                        required
                        className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <section className="bg-white p-4 rounded-lg shadow">
                  <div className="space-y-4">
                    <div className="relative">
                      <label
                        htmlFor="name_category"
                        className="font-bold text-sm"
                      >
                        Select Name Category :-
                      </label>
                      <select
                        name="name_category"
                        placeholder=""
                        id="name_category"
                        value={nameCategory}
                        onChange={(e) => {
                          setNameCategory(e.target.value);
                        }}
                        className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value="null">Select Blog Category</option>
                        {category.map((e) => (
                          <option value={e.id} key={e.id}>
                            {e.category_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="content" className="font-bold text-sm">
                        Name Content :-
                      </label>
                      <textarea
                        id="content"
                        placeholder=""
                        type="text"
                        value={nameContent}
                        onChange={(e) => {
                          setNameContent(e.target.value);
                        }}
                        required
                        className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center">
                        <div
                          id="demo-radio-buttons-group-label"
                          className="font-bold text-sm"
                        >
                          Gender :-
                        </div>
                        <div className="ml-2">
                          <input
                            id="male"
                            type="radio"
                            value="male"
                            checked={nameGender === "male"}
                            onChange={handleRadioChange}
                            className="text-indigo-600"
                          />
                          <label
                            htmlFor="male"
                            className="ml-1 text-sm text-gray-700"
                          >
                            Male
                          </label>
                        </div>
                        <div className="ml-4">
                          <input
                            id="female"
                            type="radio"
                            value="female"
                            checked={nameGender === "female"}
                            onChange={handleRadioChange}
                            className="mt-2"
                          />
                          <label
                            htmlFor="female"
                            className="ml-1 text-sm text-gray-700"
                          >
                            Female
                          </label>
                        </div>
                        <div className="ml-4">
                          <input
                            id="both"
                            type="radio"
                            value="both"
                            checked={nameGender === "both"}
                            onChange={handleRadioChange}
                            className="mt-2"
                          />
                          <label
                            htmlFor="both"
                            className="ml-1 text-sm text-gray-700"
                          >
                            Both
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <p className="font-bold text-sm">
                        Name Priority: {namePriority}
                      </p>
                      {dataFetched ? (
                        <div className="mt-2">
                          <input
                            type="range"
                            id="non-linear-slider"
                            min="1"
                            max="10"
                            step="1"
                            value={namePriority}
                            onChange={(e) => setNamePriority(e.target.value)}
                            className="w-full"
                          />
                          <div className="text-sm text-gray-600 flex justify-between">
                            <span>1</span>
                            <span>10</span>
                          </div>
                        </div>
                      ) : (
                        <p>Loading data...</p>
                      )}
                    </div>

                    <div className="flex mt-4">
                      <div className="flex-grow">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                          type="submit"
                          onClick={savedata}
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditName;
