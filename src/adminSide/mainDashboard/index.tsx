import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import styles from "./Style.module.css";
import DashboardNavbar from "../dashboardNavbar/index";

const MainDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 992;
      setIsSidebarOpen(isDesktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${styles.container} ${
        isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={styles.mainContent}>
        <DashboardNavbar
          setSearchTerm={setSearchTerm}
          toggleSidebar={toggleSidebar}
        />

        {isSidebarOpen && window.innerWidth < 992 && (
          <div className={styles.overlay} onClick={toggleSidebar} />
        )}
        <div className={styles.contentInner}>
          <Outlet context={{ searchTerm }} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
