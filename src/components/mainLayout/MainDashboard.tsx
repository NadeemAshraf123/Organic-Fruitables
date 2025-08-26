import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import styles from './MainDashboard.module.css';
import DashboardNavbar from '../dashboardnavbar/DashboardNavbar';

// const DashboardShell: React.FC = () => {
const MainDashboard: React.FC = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 992);
    };
    handleResize();
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if(window.innerWidth < 992) {

    setIsSidebarOpen(!isSidebarOpen);
  };
};


   return (
    <div className={styles.container}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* <div className={`${styles.mainContent} ${isSidebarOpen ? styles.sidebarOpen : ''}`}> */}
        <div className={styles.mainContent}>

        <DashboardNavbar 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen} 
        />
        {isSidebarOpen && window.innerWidth < 992 && (
          <div className={styles.overlay} onClick={toggleSidebar} />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default MainDashboard;
// DashboardShell;