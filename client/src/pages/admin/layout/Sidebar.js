import React, { useState, useEffect } from "react";
import "../../../assets/css/admin/style.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LogOutModal from "./LogOutModal";

const Sidebar = () => {
  document.dir = "ltr";
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUname = localStorage.getItem("unameData");
    if (!getUname) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("unameData");
    navigate("/admin");
  };

  return (
    <>
      <nav className="sidebar fixed top-0 bg-slate-950 text-white left-0 h-full py-4 px-7">
        <div className="text-2xl font-bold ml-8">BLOGS</div>
        <div className="dashboard-links mt-7">
          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-6 rounded-md ${
              location.pathname === "/dashboard"
                ? "bg-blue-500"
                : "hover:bg-blue-500"
            } transition-colors duration-300 flex items-center`}
            onClick={() => navigate("/dashboard")}
          >
            <NavLink to="/dashboard">
              <i className="fa-solid fa-house"></i>
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </div>
          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-6 rounded-md ${
              location.pathname === "/blogcategory"
                ? "bg-blue-500"
                : "hover:bg-blue-500"
            } transition-colors duration-300 flex items-center`}
            onClick={() => navigate("/blogcategory")}
          >
            <NavLink to="/blogcategory">
              <i className="fa-solid fa-layer-group"></i>
              <span className="ml-3">Blog Category</span>
            </NavLink>
          </div>
          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-6 rounded-md ${
              location.pathname === "/allblogpost"
                ? "bg-blue-500"
                : "hover:bg-blue-500"
            } transition-colors duration-300 flex items-center`}
            onClick={() => navigate("/allblogpost")}
          >
            <NavLink to="/allblogpost">
              <i className="fa-solid fa-layer-group"></i>
              <span className="ml-3">Blog Post</span>
            </NavLink>
          </div>
          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-6 rounded-md ${
              location.pathname === "/bookcategory"
                ? "bg-blue-500"
                : "hover:bg-blue-500"
            } transition-colors duration-300 flex items-center`}
            onClick={() => navigate("/bookcategory")}
          >
            <NavLink to="/bookcategory">
              <i className="fa-solid fa-book-open"></i>
              <span className="ml-3">Book Category</span>
            </NavLink>
          </div>
          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-6 rounded-md ${
              location.pathname === "/allbooks"
                ? "bg-blue-500"
                : "hover:bg-blue-500"
            } transition-colors duration-300 flex items-center`}
            onClick={() => navigate("/allbooks")}
          >
            <NavLink to="/allbooks">
              <i className="fa-solid fa-book-open"></i>
              <span className="ml-3">Books</span>
            </NavLink>
          </div>

          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-6 rounded-md ${
              location.pathname === "/addnamecategory"
                ? "bg-blue-500"
                : "hover:bg-blue-500"
            } transition-colors duration-300 flex items-center`}
            onClick={() => navigate("/addnamecategory")}
          >
            <NavLink to="/addnamecategory">
              <i className="fa-solid fa-user"></i>
              <span className="ml-3">Name Category</span>
            </NavLink>
          </div>

          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-6 rounded-md ${
              location.pathname === "/allnames"
                ? "bg-blue-500"
                : "hover:bg-blue-500"
            } transition-colors duration-300 flex items-center`}
            onClick={() => navigate("/allnames")}
          >
            <NavLink to="/allnames">
              <i className="fa-solid fa-user"></i>
              <span className="ml-3">Names</span>
            </NavLink>
          </div>

          <div
            onClick={handleLogoutClick}
            className="mb-2 cursor-pointer py-2 pl-3 pr-6 rounded-md hover:bg-blue-500 border-2 border-blue-500 transition-colors duration-300 flex items-center"
          >
            <button type="button">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span className="ml-3">Log Out</span>
            </button>
          </div>
        </div>
      </nav>
      <LogOutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;
