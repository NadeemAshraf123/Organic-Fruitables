import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  isAuthenticated : boolean;
  onLogout: () => void;
}

const SmartHeader: React.FC = ({ isAuthenticated, onLogout }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('logedInUser');
    onLogout();
    navigate('/');
  }

  const TOPBAR_HEIGHT = 56;
  const pagesRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll handling for top bar only
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setAtTop(currentScrollPos === 0);

      // Always show topbar when at top
      if (currentScrollPos === 0) {
        setTopBarVisible(true);
        setPrevScrollPos(currentScrollPos);
        return;
      }

      // Determine scroll direction
      const isScrollingUp = currentScrollPos < prevScrollPos;

      // Show/hide topbar based on scroll direction with threshold
      if (Math.abs(currentScrollPos - prevScrollPos) > 10) {
        setTopBarVisible(isScrollingUp);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pagesRef.current && !pagesRef.current.contains(event.target as Node)) {
        setPagesOpen(false);
      }
      
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && searchOpen) {
        setSearchOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setSearchOpen(false);
  };


  const handleAddProduct = () => {
    navigate("/add-product");
    setPagesOpen(false);
    setMobilePagesOpen(false);
  };

  const handleAddCategory = () => {
    navigate("/add-category");
    setPagesOpen(false);
    setMobilePagesOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - This is the part that hides/shows on scroll */}
      <div
        className={`transition-all duration-300 ${
          topBarVisible || atTop ? "translate-y-0" : "-translate-y-full"
        } hidden sm:block`}
        style={{ height: `${TOPBAR_HEIGHT}px` }}
      >
        <div className="h-full bg-[#FFFFFF]">
          <div className="md:max-w-[1290px] md:w-full mx-auto h-full">
            <div className="bg-[#81C408] rounded-tl-[99px] rounded-br-[99px] rounded-tr-[36px] rounded-bl-[36px] py-4 px-6 h-full">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-white text-xs sm:text-sm font-normal h-full">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4 text-[#FFB524]" />
                    <span className="font-opensans">123 Street, New York</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4 text-[#FFB524]" />
                    <a href="mailto:Email@example.com" className="font-Open-Sans">
                      Email@Example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap text-xs sm:text-sm">
                  <a href="#" className="font-opensans hover:underline">
                    Privacy Policy
                  </a>
                  <span className="hidden sm:inline">/</span>
                  <a href="#" className="font-opensans hover:underline">
                    Terms of Use
                  </a>
                  <span className="hidden md:inline">/</span>
                  <a href="#" className="font-opensans hover:underline">
                    Sales and Refunds
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div 
          ref={searchRef}
          className="fixed inset-0 bg-[rgba(237,231,231,0.89)] z-50 p-4 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl text-gray-900 font-semibold">Search by Keywords</p>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-700 hover:text-gray-900"
                aria-label="Close search"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter keyword..."
                className="w-full bg-[#FFFFFF] rounded-xl p-4 border-2 border-[#81C408] focus:outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#81C408] text-white px-6 py-4 rounded-xl hover:bg-[#6da80a] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Main Header - This moves up/down with the top bar */}
      <div
        className={`transition-all duration-300 bg-[#FFFFFF] ${
          topBarVisible || atTop ? "mt-0" : "mt-[-56px]"
        }`}
      >
        <header className={`flex justify-center items-center lg:h-[100px] h-[80px] ${!atTop ? "shadow-md" : ""}`}>
          <div className="p-5 max-w-[1320px] w-full mx-auto flex justify-between items-center">
            <Link 
              to="/"
              className="text-[27px] md:text-[40px] font-bold text-[#81C408]"
              style={{ fontFamily: "'Raleway', 'Pecifico', 'system-ui'" }}
            >
              Fruitables
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 text-gray-700 items-center text-sm sm:text-base">
              <Link to="/" className="hover:text-[#81C408]">
                Home
              </Link>
              <Link to="/shop" className="hover:text-[#81C408]">
                Shop
              </Link>
              <Link to="/shop-detail" className="hover:text-[#81C408]">
                Shop Detail
              </Link>

              {isAuthenticated && (
              <div className="relative" ref={pagesRef}>
                <button
                  onClick={() => setPagesOpen(!pagesOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#81C408] cursor-pointer"
                  aria-expanded={pagesOpen}
                >
                  <span>Pages</span>
                  <MdKeyboardArrowDown
                    className={`transition-transform duration-200 ${
                      pagesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {pagesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-lg rounded-md z-10 border border-gray-200">
                    <button
                      onClick={handleAddProduct}
                      className="block w-full text-left px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                    >
                      Add Product
                    </button>
                    <button
                      onClick={handleAddCategory}
                      className="block w-full text-left px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                    >
                      Add Category
                    </button>
                    <Link
                      to="/testimonial"
                      className="block px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                      onClick={() => setPagesOpen(false)}
                    >
                      Testimonial
                    </Link>
                    <Link
                      to="/404"
                      className="block px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                      onClick={() => setPagesOpen(false)}
                    >
                      404 Page
                    </Link>
                  </div>
                )}
              </div>
              )}


              <Link to="/contact" className="hover:text-[#81C408]">
                Contact
              </Link>
            </nav>

            {/* Icons section */}
            <div className="hidden md:flex items-center space-x-4 text-gray-700">

              {/* <Link to= "/loginpage" className="hover:text-[#81C408]" > Login</Link> */}
                  {isAuthenticated ? (
                    <button onClick={handleLogout} className="nav-button hover:text-[#81C408]"> 
                    Logout
                    </button>
                  ) : (
                    <Link to="/loginpage" className="nav-button" >
                      Login
                    </Link>
                  )}


              <button
                onClick={() => setSearchOpen(true)}
                className="border border-[#FFB524] rounded-full p-3 text-[#81C408] hover:bg-[#FFB524] cursor-pointer transition-colors"
                aria-label="Search"
              >
                <FaSearch className="text-sm" />
              </button>
              <div className="relative">
                <button 
                  className="hover:text-green-600 text-[#81C408] text-2xl"
                  aria-label="Shopping cart"
                >
                  <FaShoppingCart className="text-2xl" />
                </button>
                <span className="absolute -top-2 -right-3 bg-[#FFB524] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <button 
                className="hover:text-green-600 text-[#81C408] text-2xl"
                aria-label="User account"
              >
                <FaUser className="text-2xl" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg p-4 space-y-3 border-t border-gray-200">
            <Link to="/" className="block py-2 hover:text-[#81C408]" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" className="block py-2 hover:text-[#81C408]" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/shop-detail" className="block py-2 hover:text-[#81C408]" onClick={() => setMobileMenuOpen(false)}>
              Shop Detail
            </Link>
            <div>
              <button
                onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
                className="w-full flex justify-between items-center py-2 hover:text-[#81C408]"
                aria-expanded={mobilePagesOpen}
              >
                Pages
                <MdKeyboardArrowDown
                  className={`transition-transform duration-200 ${
                    mobilePagesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobilePagesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <button
                    onClick={handleAddProduct}
                    className="block w-full text-left py-2 hover:text-[#81C408]"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="block w-full text-left py-2 hover:text-[#81C408]"
                  >
                    Add Category
                  </button>
                  <Link 
                    to="/testimonial" 
                    className="block py-2 hover:text-[#81C408]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonial
                  </Link>
                  <Link 
                    to="/404" 
                    className="block py-2 hover:text-[#81C408]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    404 Page
                  </Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="block py-2 hover:text-[#81C408]" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            {/* Mobile Icons Row */}
            <div className="flex items-center justify-around pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="border border-[#FFB524] rounded-full p-2 text-[#81C408] hover:bg-[#FFB524]"
                aria-label="Search"
              >
                <FaSearch />
              </button>
              <div className="relative">
                <button className="text-[#81C408]" aria-label="Shopping cart">
                  <FaShoppingCart className="text-xl" />
                </button>
                <span className="absolute -top-2 -right-3 bg-[#FFB524] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <button className="text-[#81C408]" aria-label="User account">
                <FaUser className="text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartHeader;