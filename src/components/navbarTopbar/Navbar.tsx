import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const SmartHeader: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);



  const TOPBAR_HEIGHT = 56;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setAtTop(currentScrollPos === 0);

      if (currentScrollPos === 0) {
        setTopBarVisible(true);
        return;
      }

      const isScrollingUp = currentScrollPos < prevScrollPos;

      if (currentScrollPos > 100) {
        setTopBarVisible(isScrollingUp);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] transition-all duration-2000 ${!topBarVisible && !atTop ? "shadow-md" : ""} h-fit`}>

      <div className={`transition-all sticky flex items-center justify-center duration-3000 ${topBarVisible || atTop ? "translate-y-0" : "-translate-y-full hidden"}`}>
        <div className="max-w-6xl min-w-[90%]">
          <div className="bg-[#81C408] rounded-tl-[99px] rounded-br-[99px] rounded-tr-[36px] rounded-bl-[36px] py-3 px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-white text-xs sm:text-sm font-normal">

              {/* Location & Email */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-[#FFB524]" />
                  <span>123 Street, New York</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <FaEnvelope className="w-4 h-4 text-[#FFB524]" />
                  <a href="mailto:Email@example.com">Email@example.com</a>
                </div>
              </div>

              {/* Policy Links */}
              {/* CHANGED: Smaller font on mobile & reduced gaps */}
              <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap text-xs sm:text-sm">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <span className="hidden sm:inline">/</span>
                <a href="#" className="hover:underline">Terms of Use</a>
                <span className="hidden md:inline">/</span>
                <a href="#" className="hover:underline">Sales and Refunds</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- TOPBAR --- */}
      {/* CHANGED: flex-col on mobile so items stack vertically */}

      {/* --- MAIN HEADER --- */}
      {/* CHANGED: smaller padding on mobile & justify-between instead of space-around */}
      <header className={`bg-[white] flex justify-center items-center h-auto sm:h-[100px] transition-all duration-300 ${!topBarVisible && !atTop ? `mt-[-${TOPBAR_HEIGHT}px]` : ""}`}>

        <div className="w-[90%] flex justify-between item-center">

          {/* Logo */}
          {/* CHANGED: font size responsive */}
          <div className="text-2xl sm:text-4xl font-bold text-[#81C408]">
            Fruitables
          </div>

          {/* Desktop Navigation */}
          {/* CHANGED: hidden on mobile */}
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

          {/* Icons */}
          {/* CHANGED: smaller icons on mobile */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700">
            <FaSearch className="border border-[#FFB524] rounded-full p-2 text-2xl sm:text-4xl text-[#81C408] hover:bg-[#FFB524] cursor-pointer" />
            <div className="relative">
              <FaShoppingCart className="hover:text-green-600 text-[#81C408] text-2xl sm:text-[34px] cursor-pointer" />
              <span className="absolute -top-2 -right-3 bg-[#FFB524] hover:bg-green-600 text-white text-xs rounded-full px-1 cursor-pointer">3</span>
            </div>
            <FaUser className="hover:text-green-600 text-[#81C408] text-2xl sm:text-[34px] cursor-pointer" />
          </div>

          {/* Mobile Hamburger Button */}
          {/* NEW: shows only on mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {/* Simple hamburger icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* {mobileMenuOpen && ( */}



      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-3">
          <a href="#" className="block hover:text-[#81C408]">Home</a>
          <a href="#" className="block hover:text-[#81C408]">Shop</a>
          <a href="#" className="block hover:text-[#81C408]">Shop Detail</a>

          {/* Mobile Pages dropdown */}
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


      {/* // <div className="md:hidden bg-white shadow-lg p-4 space-y-3">
        //   <a href="#" className="block hover:text-[#81C408]">Home</a>
        //   <a href="#" className="block hover:text-[#81C408]">Shop</a>
        //   <a href="#" className="block hover:text-[#81C408]">Shop Detail</a>
        //   <a href="#" className="block hover:text-[#81C408]">Pages</a>
        //   <a href="#" className="block hover:text-[#81C408]">Contact</a>
        // </div> */}
      {/* )} */}
    </div>
  );
};

export default SmartHeader;
