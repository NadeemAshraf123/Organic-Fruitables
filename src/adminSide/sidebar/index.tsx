import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./Style.module.css";
import { FaBoxOpen, FaPlus, FaUserShield, FaBars, FaTimes } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      const wasMobile = isMobile;
      setIsMobile(mobile);
      
      if (wasMobile && !mobile && !isOpen) {
        toggleSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isOpen, toggleSidebar]);

  useEffect(() => {
    let timer: number;
    if (isOpen) {
      timer = setTimeout(() => {
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleItemClick = (path: string) => {
    if (isMobile && isOpen) {
      navigate(path);
      setTimeout(() => {
        toggleSidebar();
      }, 100);
    } else {
      navigate(path);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile && isOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      
      {isMobile && isOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick} />
      )}
      
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          <h2>Admin Panel</h2>
        
          {isMobile && (
            <button 
              className={styles.toggleButton}
              onClick={toggleSidebar}
              title={isOpen ? "Hide Sidebar" : "Show Sidebar"}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>

        <ul className={styles.menu}>
          <li
            className={`${styles.menuItem} ${isActive("/dashboard/authenticatedUsers") ? styles.active : ""}`}
            onClick={() => handleItemClick("/dashboard/authenticatedUsers")}
          >
            <FaUserShield className={`${styles.icon} ${isActive("/dashboard/authenticatedUsers") ? styles.activeIcon : ""}`} />
            Admin
          </li>

          <li
            className={`${styles.menuItem} ${isActive("/dashboard/adddashboardproduct") ? styles.active : ""}`}
            onClick={() => handleItemClick("/dashboard/adddashboardproduct")}
          >
            <FaPlus className={`${styles.icon} ${isActive("/dashboard/adddashboardproduct") ? styles.activeIcon : ""}`} />
            Add Product
          </li>

          <li
            className={`${styles.menuItem} ${isActive("/dashboard/adddashboardcategory") ? styles.active : ""}`}
            onClick={() => handleItemClick("/dashboard/adddashboardcategory")}
          >
            <FaBoxOpen className={`${styles.icon} ${isActive("/dashboard/adddashboardcategory") ? styles.activeIcon : ""}`} />
            Add Category
          </li>

          <li
            className={`${styles.menuItem} ${isActive("/dashboard/ordermanagement") ? styles.active : ""}`}
            onClick={() => handleItemClick("/dashboard/ordermanagement")}
          >
            <FaBoxOpen className={`${styles.icon} ${isActive("/dashboard/ordermanagement") ? styles.activeIcon : ""}`} />
            Order Management
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;