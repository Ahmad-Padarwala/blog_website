import React, { useEffect, useState } from "react";
import "../../assets/css/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../../assets/constant/Images";
import axios from "axios";
const PORT = process.env.REACT_APP_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${PORT}getblogpostswithsearchcategory?q=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (searchQuery.length > 4 && searchQuery.trim() !== "") {
      setSearchQuery(searchQuery.trim());
      fetchData();
    }
    if (searchQuery.length == 0) {
      setSearchResults([]);
    }
  }, [searchQuery]);
  const gotoNewsViewPage = (newsId) => {
    navigate(`/viewnews/${newsId}`, {
      state: { id: newsId },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <NavLink to="mailto:  id.m.m.nandoliya@gmail.com ">
            <i
              className="fa-solid fa-envelope me-2"
              style={{ marginRight: "15px" }}
            ></i>
            <span>Email: nandoliya@gmail.com </span>
          </NavLink>
        </div>
        <div className="header-topbar-sections">
          <span className="topbar_follow"> Follow </span>
          <span className="topbar-icons">
            <NavLink
              to="https://www.facebook.com/profile.php?id=61554332454501"
              target="_blank"
              className="topbar-icon-link"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </NavLink>
            <NavLink
              to="https://twitter.com/mohsin_nodoliya"
              target="_blank"
              className="topbar-icon-link"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </NavLink>
            <NavLink
              to="https://www.linkedin.com/in/mohsin-nodoliya-8253212a3/"
              target="_blank"
              className="topbar-icon-link"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </NavLink>
            <NavLink
              to="https://www.instagram.com/mohsin_nodoliya/"
              target="_blank"
              className="topbar-icon-link"
            >
              <i className="fa-brands fa-instagram"></i>
            </NavLink>
            <NavLink
              to="https://wa.me/channel/0029VaA77f0CHDyjl8IRXd32"
              className="topbar-icon-link"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </NavLink>
          </span>
        </div>
      </div>

      <div id="Navbar_container" dir="ltr">
        <NavLink to="/">
          <img src={Logo} alt="Logo" width="140px" height="auto" />
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
                to="/"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/books"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/warriors"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                warriors
              </NavLink>
            </li>
          </ul>
          <form action="" method="post" className="search_form">
            <div className="form-input">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            {searchResults.length > 0 && (
              <div id="search_result_section">
                {searchResults.map((result) => (
                  <p
                    key={result.id}
                    onClick={() => {
                      gotoNewsViewPage(result.id);
                    }}
                  >
                    {result.blog_title}
                  </p>
                ))}
              </div>
            )}
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
