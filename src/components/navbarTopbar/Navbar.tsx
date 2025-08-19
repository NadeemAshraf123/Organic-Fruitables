import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaMapMarkerAlt, FaEnvelope, FaTimes } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const SmartHeader: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  // NEW: State for search functionality
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const TOPBAR_HEIGHT = 56;

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.pageYOffset;
  //     setAtTop(currentScrollPos === 0);

  //     if (currentScrollPos === 0) {
  //       setTopBarVisible(true);
  //       return;
  //     }

  //     const isScrollingUp = currentScrollPos < prevScrollPos;

  //     if (currentScrollPos > 100) {
  //       setTopBarVisible(isScrollingUp);
  //     }

  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [prevScrollPos]);

useEffect(() => {
  let hideTimeout: NodeJS.Timeout;

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setAtTop(currentScrollPos === 0);

    if (currentScrollPos === 0) {
      setTopBarVisible(true);
      return;
    }

    const isScrollingUp = currentScrollPos < prevScrollPos;

    if (currentScrollPos > 100) {
      if (isScrollingUp) {
        setTopBarVisible(true);
        clearTimeout(hideTimeout);
      } else {
      
        hideTimeout = setTimeout(() => {
          setTopBarVisible(false);
        }, 300);
      }
    }

    setPrevScrollPos(currentScrollPos);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
    clearTimeout(hideTimeout);
    window.removeEventListener("scroll", handleScroll);
  };
}, [prevScrollPos]);



  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setSearchOpen(false);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] transition-all duration-2000 ${!topBarVisible && !atTop ? "shadow-md" : ""} h-fit`}>


      {searchOpen && (
        <div className="fixed inset-0 bg-[rgba(237,231,231,0.89)] z-50 p-4">

          <p className="text-xl text-gray-900">Search by Keywords</p>

          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-700"
          >
            <FaTimes className="text-3xl" />
          </button>


          <div className="flex items-center justify-center h-full">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-6xl flex gap-2">
              <input
                type="text"
                placeholder="keyword"
                className="w-full bg-[#FFFFFF] rounded-xl p-4 border-b-2 border-[#81C408] focus:outline-none text-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="mt-1 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-[#6da80a]"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
      {/* =========================================== */}

      {/* Existing top bar - unchanged */}
      <div className={`transition-all sticky flex items-center justify-center duration-8000 ${topBarVisible || atTop ? "translate-y-0" : "-translate-y-full hidden"}`}>
        <div className="max-w-[1320px] w-full mx-auto ">
          <div className="bg-[#81C408] rounded-tl-[99px] rounded-br-[99px] rounded-tr-[36px] rounded-bl-[36px] py-4 px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-white text-xs sm:text-sm font-normal">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-[#FFB524]" />
                  <span className="font-opensans">123 Street, New York</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <FaEnvelope className="w-4 h-4 text-[#FFB524]" />
                  <a href="mailto:Email@example.com" className="font-Open-Sans">Email@Example.com</a>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap text-xs sm:text-sm">
                <a href="#" className="font-opensans hover:underline">Privacy Policy</a>
                <span className="hidden sm:inline">/</span>
                <a href="#" className="font-opensans hover:underline">Terms of Use</a>
                <span className="hidden md:inline">/</span>
                <a href="#" className="font-opensans hover:underline">Sales and Refunds</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`bg-[#FFFFFF] flex justify-center items-center lg:h-[100px] sm:h-[100px] transition-all duration-300 ${!topBarVisible && !atTop ? `mt-[-${TOPBAR_HEIGHT}px]` : ""}`}>
        <div className="max-w-[1320px] w-full mx-auto flex justify-between item-center">
      
          <div className="text-2xl sm:text-4xl font-bold text-[#81C408]" style={{ fontFamily: "'Raleway', 'Pecifico' , 'system-ui'" }}>
            Fruitables
          </div>

          {/* Desktop Navigation - unchanged */}
          <nav className="hidden md:flex space-x-6 text-gray-700 items-center text-sm sm:text-base">
            <a href="#" className="hover:text-[#81C408]">Home</a>
            <a href="#" className="hover:text-[#81C408]">Shop</a>
            <a href="#" className="hover:text-[#81C408]">Shop Detail</a>
            <div className="relative">
              <button
                onClick={() => setPagesOpen(!pagesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-[#81C408] cursor-pointer"
              >
                <span>Pages</span>
                <MdKeyboardArrowDown
                  className={`transition-transform duration-200 ${pagesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {pagesOpen && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-[#F3F4F6] shadow-lg rounded-md z-10">
                  <a href="#" className="block px-4 py-2 hover:text-[#81C408] hover:bg-[#FFB524]">Cart</a>
                  <a href="#" className="block px-4 py-2 hover:text-[#81C408] hover:bg-[#FFB524]">Checkout</a>
                  <a href="#" className="block px-4 py-2 hover:text-[#81C408] hover:bg-[#FFB524]">Testimonial</a>
                  <a href="#" className="block px-4 py-2 hover:text-[#81C408] hover:bg-[#FFB524]">404 Page</a>
                </div>
              )}
            </div>
            <a href="#" className="hover:text-[#81C408]">Contact</a>
          </nav>

          {/* Icons section - MODIFIED search icon */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700">
            {/* CHANGED: Wrapped search icon in button and added click handler */}
            <button
              onClick={() => setSearchOpen(true)}
              className="border border-[#FFB524] rounded-full p-3 text-3xl sm:text-4xl text-[#81C408] hover:bg-[#FFB524] cursor-pointer"
            >
              <FaSearch className="text-sm" />
            </button>
            <div className="relative">
              <FaShoppingCart className="hover:text-green-600 text-[#81C408] text-2xl sm:text-[34px] cursor-pointer" />
              <span className="absolute -top-2 -right-3 bg-[#FFB524] hover:bg-green-600 text-white text-xs rounded-full px-1 cursor-pointer">3</span>
            </div>
            <FaUser className="hover:text-green-600 text-[#81C408] text-2xl sm:text-[34px] cursor-pointer" />
          </div>

          {/* Mobile Hamburger Button - unchanged */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - unchanged */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-3">
          <a href="#" className="block hover:text-[#81C408]">Home</a>
          <a href="#" className="block hover:text-[#81C408]">Shop</a>
          <a href="#" className="block hover:text-[#81C408]">Shop Detail</a>
          <div>
            <button
              onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
              className="w-full flex justify-between items-center hover:text-[#81C408]"
            >
              Pages
              <MdKeyboardArrowDown
                className={`transition-transform duration-200 ${mobilePagesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobilePagesOpen && (
              <div className="pl-4 mt-2 space-y-2">
                <a href="#" className="block hover:text-[#81C408]">Cart</a>
                <a href="#" className="block hover:text-[#81C408]">Checkout</a>
                <a href="#" className="block hover:text-[#81C408]">Testimonial</a>
                <a href="#" className="block hover:text-[#81C408]">404 Page</a>
              </div>
            )}
          </div>
          <a href="#" className="block hover:text-[#81C408]">Contact</a>
        </div>
      )}
    </div>
  );
};

export default SmartHeader;