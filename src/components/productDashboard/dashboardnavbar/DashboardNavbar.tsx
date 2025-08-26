import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear, faSearch, faUserCircle,faBars  } from '@fortawesome/free-solid-svg-icons';
import './DashboardNavbar.css';




const DashboardNavbar = ( {toggleSidebar } ) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 992);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const location = useLocation();
    const currentPath = location.pathname;

    let heading = '';
    if (currentPath === '/dashboard/authenticatedUsers') {
        heading = 'Admin Dashboard';
    } else if (currentPath === '/dashboard/adddashboardcategory') {
        heading = 'Categories';
    } else if (currentPath === '/dashboard/adddashboardproduct') {
        heading = 'Products';
    };


    return(

    <div className='navbar'> 
    <div className='navbar-left'>

        {isMobile && (
            <button className='hamburger' onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
        )}


        {heading ? (
            <h2 className='page-heading'>{heading}</h2>
        ) : (
            
             <div className='search-bar'>
                <FontAwesomeIcon icon={faSearch} className='search-icon' />
                <input type='text' placeholder='Search...' />
            </div>
        )}
    </div>

    <div className='navbar-right'>
        <div className='notifications'>
            <FontAwesomeIcon icon={faBell} />
            <span className='badge'>3</span>
        </div>

        <div className='user-profile'>
            <FontAwesomeIcon icon={faUserCircle} className='user-icon' />
            <div className='user-info'>
                <span className='user-name'>Nabila A.</span>
                <span className='user-role'>Admin</span>


            </div>
        </div>
    </div>
    </div>
);
};

export default DashboardNavbar;