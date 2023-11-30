import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import slugify from "slugify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const PORT = process.env.REACT_APP_URL;

const EditBlog = () => {
  const { id } = useParams("");

  const location = useLocation();
  const navigate = useNavigate();

  // Store Input Date in this State
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogPublishDate, setBlogPublishDate] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogKeywords, setBlogKeywords] = useState([]);
  const [blogTags, setBlogTags] = useState([]);
  const [blogSlug, setBlogSlug] = useState("");

  // Store the Category Data in this State
  const [category, setCategory] = useState([]);

  // Function to handle Enter key press
  const handleKeyword = (event) => {
    if (event.key === "Enter" || event.key == ",") {
      event.preventDefault();
      setBlogKeywords([...blogKeywords, event.target.value]);
      event.target.value = "";
    }
  };

  const RemoveKeyword = (idx) => {
    const newArray = [...blogKeywords];
    newArray.splice(idx, 1);
    setBlogKeywords(newArray);
  };

  // Function to handle Enter key press
  const handleTags = (event) => {
    if (event.key === "Enter" || event.key == ",") {
      // Add the entered keyword to the keywords array
      event.preventDefault();
      setBlogTags([...blogTags, event.target.value]);
      event.target.value = "";
    }
  };

  const RemoveTags = (idx) => {
    const newArray = [...blogTags];
    newArray.splice(idx, 1);
    setBlogTags(newArray);
  };

  // Get Category Data
  const getData = async () => {
    try {
      const res = await axios.get(`${PORT}getblogcategory`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //get blog detail
  const getBlogDetail = async () => {
    try {
      const res = await axios.get(`${PORT}getblogpostdetail/${id}`);
      setBlogTitle(res.data[0].blog_title);
      setBlogDesc(res.data[0].blog_description);
      setBlogContent(res.data[0].blog_content);
      setBlogAuthor(res.data[0].blog_author);
      setBlogPublishDate(res.data[0].blog_publish_date);
      setBlogCategory(res.data[0].blog_category);
      setBlogImage(res.data[0].blog_image);
      const str = res.data[0].blog_keywords;
      setBlogKeywords(str.split(","));
      const strtags = res.data[0].blog_tags;
      setBlogTags(strtags.split(","));
      setBlogSlug(res.data[0].blog_slug);
    } catch (error) {
      toast.error(error);
    }
  };

  const blocksFromHtml = htmlToDraft(location.state.content);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState)
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    getBlogDetail();
    getData();
  }, []);

  const getBlockStyle = (data) => {
    let styles = "";
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        styles += `${key}:${value},`;
      }
    });
    return `{{${styles}}}`;
  };

  function getSectionText(text) {
    if (text && text.length > 0) {
      const chars = text.map((ch) => {
        switch (ch) {
          case "\n":
            return "<br />";
          case "&":
            return "&amp;";
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          default:
            return ch;
        }
      });
      return chars.join("");
    }
    return "";
  }

  useEffect(() => {
    getData();

    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const markup = draftToHtml(rawContentState, {
      blockStyleFn: (block) => getBlockStyle(block.data),
      customInlineFn: getSectionText,
    });

    setConvertedContent(markup);
  }, [editorState]);

  const handleImageUpload = async (file) => {
    return new Promise((resolve, reject) => {
      var reader = new window.FileReader();
      reader.onloadend = () => {
        const formData = new FormData();
        formData.append("image", file);
        axios
          .post(`${PORT}saveimg`, formData)

          .then((data) => {
            const { imageLink } = data.data;
            resolve({ data: { link: imageLink } });
          });
      };
      reader.readAsDataURL(file);
    });
  };

  // Save the data in database
  const savedata = async (e, blogStatus) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("blogTitle", blogTitle);
      formdata.append("blogDesc", blogDesc);
      formdata.append("blogContent", convertedContent);
      formdata.append("blogAuthor", blogAuthor);
      formdata.append("blogPublishDate", blogPublishDate);
      formdata.append("blogImage", blogImage);
      formdata.append("blogCategory", blogCategory);
      formdata.append("blogKeywords", blogKeywords);
      formdata.append("blogTags", blogTags);
      formdata.append("blogSlug", blogSlug);
      formdata.append("blogStatus", blogStatus);

      const res = axios.patch(`${PORT}editblogpost/${id}`, formdata);

      if (!res) {
        toast.error("Blog Update Failed");
      } else {
        toast.success("Blog Updated Successfully");
        navigate("/allblogpost", { replace: true });
      }
    } catch (e) {
      toast.error("Blog Update Failed");
    }
  };

  const generateSlug = (blogTitle) => {
    const options = {
      replacement: "-", // Replace spaces with -
      remove: /[*+~.()'"!:@]/g, // Remove special characters
      lower: true, // Convert to lowercase
    };
    const newSlug = slugify(blogTitle, options);
    setBlogSlug(newSlug);
  };

  const checkSlugAvailability = async (slug) => {
    try {
      const response = await axios.get(
        `${PORT}checkSlugAvailability/${slug}/${id}`
      );
      const { isAvailable } = response.data;

      if (isAvailable) {
        incrementSlug(blogSlug);
      } else {
        toast.success("Slug is same as original");
      }
    } catch (error) {
      console.error("Error checking slug availability:", error);
    }
  };

  const incrementSlug = (slug) => {
    const lastChar = slug[slug.length - 1];

    if (!isNaN(lastChar)) {
      const newLastChar = parseInt(lastChar, 10) + 1;
      setBlogSlug(slug.slice(0, -1) + newLastChar);
    } else {
      setBlogSlug(slug + "1");
    }
  };

  useEffect(() => {
    checkSlugAvailability(blogSlug);
  }, [blogSlug]);

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
            />
            <i className="fa-solid fa-search text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"></i>
          </div>
        </div>
      </section>

      <div className="relative dashboard px-5 mt-8">
        <div className="flex align-center">
          <i className="fa-regular fa-clock py-1 px-2 relative bg-blue-500 rounded-md cursor-pointer text-white text-2xl"></i>
          <span className="font-bold ml-3 text-2xl pt-1">Edit Blog Post</span>
        </div>

        <div className="flex shadow-lg">
          <div className="mt-4 w-8/12 h-min p-4">
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="blog_title"
                  className="block mb-2 text-sm font-medium"
                >
                  Blog Name:
                </label>
                <input
                  type="text"
                  id="blog_title"
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter Blog Title..."
                  value={blogTitle}
                  onChange={(e) => {
                    setBlogTitle(e.target.value);
                  }}
                  required
                />
              </div>
              <div
                className="border border-gray-300"
                style={{
                  minHeight: 300,
                }}
              >
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={{
                    image: {
                      uploadCallback: handleImageUpload,
                      alt: { present: true, mandatory: false },
                    },
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="meta_desc"
                  className="block mb-2 text-sm font-medium"
                >
                  Meta Description
                </label>
                <textarea
                  id="meta_desc"
                  placeholder="Enter Meta Description"
                  type="text"
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  value={blogDesc}
                  onChange={(e) => {
                    setBlogDesc(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-l border-gray-300 mt-4 w-4/12 h-min p-4">
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="blog_author"
                  className="block mb-2 text-sm font-medium"
                >
                  Blog Author:
                </label>
                <input
                  type="text"
                  id="blog_author"
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter Blog Author..."
                  value={blogAuthor}
                  onChange={(e) => {
                    setBlogAuthor(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="blog_date"
                  className="block mb-2 text-sm font-medium"
                >
                  Blog Publish Date:
                </label>
                <input
                  id="blog_date"
                  placeholder="Blog Publish Date..."
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  type="date"
                  format="dd-MM-yyyy"
                  value={blogPublishDate}
                  onChange={(e) => {
                    setBlogPublishDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label className="px-3">Old Image</label>
                <img
                  src={`../upload/blog/${blogImage}`}
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
              <div>
                <label
                  htmlFor="blog_image"
                  className="block mb-2 text-sm font-medium"
                >
                  Blog Image:
                </label>
                <input
                  id="blog_image"
                  placeholder="Blog Image..."
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  name="blog_image"
                  type="file"
                  onChange={(e) => {
                    setBlogImage(e.target.files[0]);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="blog_category"
                  className="block mb-2 text-sm font-medium"
                >
                  Select Blog Category:
                </label>
                <select
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  name="blog_category"
                  placeholder="Select Blog Category"
                  value={blogCategory}
                  onChange={(e) => {
                    setBlogCategory(e.target.value);
                  }}
                  id="blog_category"
                >
                  <option value="">Select Blog Category</option>
                  {category.map((e) => {
                    return (
                      <option key={e.id} value={e.id}>
                        {e.category_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label
                  htmlFor="blog_keyword"
                  className="block mb-2 text-sm font-medium"
                >
                  Blog Keywords:
                </label>
                <input
                  id="blog_keyword"
                  placeholder="Enter Blog Keywords..."
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  onKeyDown={handleKeyword}
                  type="text"
                />

                <div>
                  {blogKeywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded p-2 my-2 flex justify-between items-center"
                    >
                      <div className="w-10/12">{keyword}</div>
                      <div className="w-2/12 text-right">
                        <i
                          className="fa-solid fa-xmark text-black border-2 border-black w-5 h-5 rounded-full text-center cursor-pointer"
                          onClick={() => {
                            RemoveKeyword(index);
                          }}
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="blog_tags"
                  className="block mb-2 text-sm font-medium"
                >
                  Blog Tags:
                </label>
                <input
                  id="blog_tags"
                  placeholder="Enter Blog Tags..."
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  onKeyDown={handleTags}
                  type="text"
                />
                <div>
                  {blogTags.map((tags, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded p-2 my-2 flex justify-between items-center"
                    >
                      <div className="w-10/12">{tags}</div>
                      <div className="w-2/12 text-right">
                        <i
                          className="fa-solid fa-xmark text-black border-2 border-black w-5 h-5 rounded-full text-center cursor-pointer"
                          onClick={() => {
                            RemoveTags(index);
                          }}
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="blog_slug"
                  className="block mb-2 text-sm font-medium"
                >
                  Blog slug:
                </label>
                <input
                  id="blog_slug"
                  placeholder="Enter Blog slug..."
                  className="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  value={blogSlug}
                  onChange={(e) => {
                    setBlogSlug(e.target.value);
                    generateSlug(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="flex flex-row">
                <button
                  className="w-5/12 ml-2 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
                  type="submit"
                  onClick={(e) => savedata(e, 1)}
                >
                  Publish
                </button>
                <button
                  className="w-5/12 ml-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                  type="submit"
                  onClick={(e) => savedata(e, 0)}
                >
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
