import React, { useState } from "react";
import "../../assets/css/Navbar.css";
import { NavLink } from "react-router-dom";
import { Logo } from "../../assets/constant/Images";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="header-topbar-main" dir="ltr">
        <div className="header-topbar-sections">
          <NavLink to="tel:9974241074">
            <i
              className="fa-solid fa-phone me-2"
              style={{ marginRight: "15px" }}
            ></i>
            <span>Phone: 99742 41074</span>
          </NavLink>
          <NavLink to="mailto: ahmadpadarwala4@gmail.com">
            <i
              className="fa-solid fa-envelope me-2"
              style={{ marginRight: "15px" }}
            ></i>
            <span>Email: ahmadpadarwala4@gmail.com</span>
          </NavLink>
        </div>
        <div className="header-topbar-sections">
          <span className="topbar_follow"> Follow </span>
          <span className="topbar-icons">
            <NavLink to="/" className="topbar-icon-link">
              <i className="fa-brands fa-facebook-f"></i>
            </NavLink>
            <NavLink to="/" className="topbar-icon-link">
              <i className="fa-brands fa-x-twitter"></i>
            </NavLink>
            <NavLink to="/" className="topbar-icon-link">
              <i className="fa-brands fa-linkedin-in"></i>
            </NavLink>
            <NavLink to="/" className="topbar-icon-link">
              <i className="fa-brands fa-instagram"></i>
            </NavLink>
          </span>
        </div>
      </div>

      <div id="Navbar_container" dir="ltr">
        <NavLink to="/">
          <img src={Logo} alt="Logo" width="144px" height="auto" />
        </NavLink>
        <div id="navbar_number_email_icon">
          <NavLink to="tel:9974241074">
            <i className="fa-solid fa-phone"></i>
          </NavLink>
          <NavLink to="mailto: ahmadpadarwala4@gmail.com">
            <i className="fa-solid fa-envelope"></i>
          </NavLink>
        </div>
        <div
          id="navbar_menu"
          className={isMenuOpen ? "navbar-menu open" : "navbar-menu"}
        >
          <ul>
            <li>
              <NavLink
                to="/news"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Islamic Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/books"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Islamic Books
              </NavLink>
            </li>
          </ul>
          <form className="search_form">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="toggle-btn" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
