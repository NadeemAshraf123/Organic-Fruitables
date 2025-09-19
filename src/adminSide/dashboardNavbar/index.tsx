import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/Hooks";
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../../features/currentuser/CurrentUserSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faGear,
  faSearch,
  faUserCircle,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const DashboardNavbar = ({ toggleSidebar, setSearchTerm }) => {
  const [isMobile, setIsMobile] = useState(false);

  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = !!currentUser;

  console.log("Admin currentUser:", currentUser);
  console.log("Admin isAuthenticated:", isAuthenticated);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const location = useLocation();
  const currentPath = location.pathname;

  let heading = "";
  if (currentPath === "/dashboard/authenticatedUsers") {
    heading = "Admin Dashboard";
  } else if (currentPath === "/dashboard/adddashboardcategory") {
    heading = "Categories";
  } else if (currentPath === "/dashboard/adddashboardproduct") {
    heading = "Products";
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("logedInUser");
    dispatch(clearCurrentUser());
    navigate("/admin/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        {isMobile && (
          <button className="hamburger" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}

        {heading ? (
          <h2 className="page-heading">{heading}</h2>
        ) : (
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="navbar-right">
        {isAuthenticated && currentUser && (
          <div className="welcome-section">
            <span className="welcome-text">
              Welcome, {currentUser.name || "Admin"}
            </span>
          </div>
        )}

        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

        <div className="notifications">
          <FontAwesomeIcon icon={faBell} />
          <span className="badge">3</span>
        </div>

        <div className="user-profile-simple">
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
          <div className="user-info">
            {isAuthenticated && currentUser ? (
              <>
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">{currentUser.role}</span>
              </>
            ) : (
              <>
                <span className="user-name">Guest</span>
                <span className="user-role">Not Logged In</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
