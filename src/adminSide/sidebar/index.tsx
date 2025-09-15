import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./Style.module.css";
import { FaBoxOpen, FaPlus, FaThList, FaUserShield } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};


const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [showClosedButton, setShowedCloseButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        setShowedCloseButton(true);
      }, 500);
    } else {
      setShowedCloseButton(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleItemClick = () => {
    if (window.innerWidth < 992) {
      toggleSidebar();
    }
  };



  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
     
      <h2 className={styles.logo}>Admin Panel</h2>

      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${isActive("/dashboard/authenticatedUsers") ? styles.active : ""}`}
          onClick={() => {
            navigate("/dashboard/authenticatedUsers");
            if (window.innerWidth < 992) toggleSidebar();
          }}
        >
          <FaUserShield className={`${styles.icon} ${isActive("/dashboard/authenticatedUsers") ? styles.activeIcon : ""}`} />
          Admin
        </li>

        <li
          className={`${styles.menuItem} ${isActive("/dashboard/adddashboardproduct") ? styles.active : ""}`}
          onClick={() => { navigate("/dashboard/adddashboardproduct")
          if (window.innerWidth < 992) toggleSidebar()
          }}
        >
          <FaPlus className={`${styles.icon} ${isActive("/dashboard/adddashboardproduct") ? styles.activeIcon : ""}`} />
          Add Product
        </li>

        <li
          className={`${styles.menuItem} ${isActive("/dashboard/adddashboardcategory") ? styles.active : ""}`}
          onClick={() => { 
                         navigate("/dashboard/adddashboardcategory")
                         if (window.innerWidth < 992) toggleSidebar()
                         }}
        >
          <FaBoxOpen className={`${styles.icon} ${isActive("/dashboard/adddashboardcategory") ? styles.activeIcon : ""}`} />
          Add Category
        </li>


         <li
          className={`${styles.menuItem} ${isActive("/dashboard/ordermanagement") ? styles.active : ""}`}
          onClick={() => { 
                         navigate("/dashboard/ordermanagement")
                         if (window.innerWidth < 992) toggleSidebar()
                         }}
        >
          <FaBoxOpen className={`${styles.icon} ${isActive("/dashboard/ordermanagement") ? styles.activeIcon : ""}`} />
          Order Management
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;