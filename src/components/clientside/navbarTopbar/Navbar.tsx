import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../../app/Hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
  isAuthenticated: boolean;
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

  const totalItems = useAppSelector((state) => state.cart.totalItems);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("logedInUser");
    onLogout();
    navigate("/");
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const TOPBAR_HEIGHT = 56;
  const pagesRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setAtTop(currentScrollPos === 0);

      if (currentScrollPos === 0) {
        setTopBarVisible(true);
        setPrevScrollPos(currentScrollPos);
        return;
      }

      const isScrollingUp = currentScrollPos < prevScrollPos;

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
      if (
        pagesRef.current &&
        !pagesRef.current.contains(event.target as Node)
      ) {
        setPagesOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchOpen
      ) {
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

  const navigateToCartPage = () => {
    navigate("/cart");
    setPagesOpen(false);
    setMobilePagesOpen(false);
  };

  const navigateToCheckOutPage = () => {
    navigate("/check-out");
    setPagesOpen(false);
    setMobilePagesOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };
  const handleNotFoundPage = () => {
    setPagesOpen(false);
    setMobilePagesOpen(false);
  }
  const handleCurrentUserPage = () => {
    navigate('/order-confirmation');
    setPagesOpen(false);
    setMobilePagesOpen(false);
  }
  const handleViewHistoryPage = () => {
     setPagesOpen(false);
    setMobilePagesOpen(false);
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ${
          topBarVisible || atTop ? "translate-y-0" : "-translate-y-full"
        } hidden lg:block`}
        style={{ height: `${TOPBAR_HEIGHT}px` }}
      >
        <div className="h-full bg-[#FFFFFF]">
          <div className="md:max-w-[1290px] md:w-[95%] mx-auto h-full">
            <div className="bg-[#81C408] rounded-tl-[99px] rounded-br-[99px] rounded-tr-[36px] rounded-bl-[36px] py-4 px-6 h-full">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-white text-xs sm:text-sm font-normal h-full">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4 text-[#FFB524]" />
                    <span className="font-opensans">123 Street, New York</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4 text-[#FFB524]" />
                    <a
                      href="mailto:Email@example.com"
                      className="font-Open-Sans"
                    >
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

      {searchOpen && (
        <div
          ref={searchRef}
          className="fixed inset-0 bg-[rgba(237,231,231,0.89)] z-50 p-4 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl text-gray-900 font-semibold">
                Search by Keywords
              </p>
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

      <div
        className={`transition-all duration-300 bg-[#FFFFFF] ${
          topBarVisible || atTop ? "mt-0" : "mt-[-56px]"
        }`}
      >
        <header
          className={`flex justify-center items-center lg:h-[100px] h-[80px] ${
            !atTop ? "shadow-md" : ""
          }`}
        >
          <div className="p-5 max-w-[1320px] w-full mx-auto flex justify-between items-center">
            <Link
              to="/counter"
              className="text-[27px] md:text-[40px] font-bold text-[#81C408]"
              style={{ fontFamily: "'Raleway', 'Pecifico', 'system-ui'" }}
            >
              Fruitables
            </Link>

            <nav className="hidden xl:flex justify-center space-x-6 text-gray-700 items-center text-sm sm:text-base">
              <Link to="/" className="hover:text-[#81C408]">
                Home
              </Link>
              <Link to="/reduxdashboard" className="hover:text-[#81C408]">
                Shop
              </Link>
              {/* <Link to="/order-management" className="hover:text-[#81C408]">
                Order Management
              </Link> */}

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
                        onClick={navigateToCartPage}
                        className="block w-full text-left px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                      >
                        Cart
                      </button>
                      <button
                        onClick={navigateToCheckOutPage}
                        className="block w-full text-left px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                      >
                        Checkout
                      </button>

                      <Link
                        to="/order-history"
                        className="block w-full text-left px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                        onClick={handleViewHistoryPage}
                      >
                        View Order History
                      </Link>

                      <Link
                        to="/testimonial"
                        className="block px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                        onClick={() => setPagesOpen(false)}
                      >
                        Testimonial
                      </Link>
                      <Link
                        to="/not-found-page"
                        className="block px-4 py-2 hover:text-[#81C408] hover:bg-gray-100"
                        onClick={handleNotFoundPage}
                      >
                        404 Page
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <Link to="/contact-us" className="hover:text-[#81C408]">
                Contact
              </Link>
            </nav>

            <div className="hidden xl:flex items-center space-x-4 text-gray-700">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="nav-button hover:text-[#81C408]"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-button">
                  Login
                </Link>
              )}

              <button
                onClick={() => setSearchOpen(true)}
                className=" w-10 h-10 flex items-center justify-center border border-[#FFB524] rounded-full  text-[#81C408] hover:bg-[#FFB524] cursor-pointer transition-colors"
                aria-label="Search"
              >
                <FaSearch />
              </button>

              <div className="relative">
                <button
                  onClick={handleCartClick}
                  className="hover:text-green-600 text-[#81C408] text-2xl"
                  aria-label="Shopping cart"
                >
                  <FaShoppingCart className="text-3xl" />
                </button>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#FFB524] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>

              <button
                className="hover:text-green-600 text-[#81C408] text-2xl"
                aria-label="User account"
                onClick={handleCurrentUserPage}
              >
                <FaUser className="text-3xl" />
              </button>
            </div>

            <div className="xl:hidden flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="  rounded-md text-gray-700 hover:bg-gray-100 border border-gray-100"
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-[#81C408] w-10 h-6 p-1"
                />
              </button>
            </div>
          </div>
        </header>

        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="xl:hidden bg-white shadow-lg p-4 space-y-3 border-t border-gray-200"
          >
            <Link
              to="/"
              className="block py-2 hover:text-[#81C408]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 hover:text-[#81C408]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            {/* <Link
              to="/order-management"
              className="block py-2 hover:text-[#81C408]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order Management
            </Link> */}
            <div>
              <button
                onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
                className="w-full flex justify-between items-center  py-2 hover:text-[#81C408]"
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
                <div className="pl-4 mt-2 space-y-2 bg-gray-100 border-gray-200 border-1 rounded-xl">
                  <button
                    onClick={navigateToCartPage}
                    className="block w-full text-left hover:text-[#81C408] hover:bg-gray-100"
                  >
                    Cart
                  </button>
                  <button
                    onClick={navigateToCheckOutPage}
                    className="block w-full text-left hover:text-[#81C408]"
                  >
                    Checkout
                  </button>
                  <Link
                    to="/testimonial"
                    className="block hover:text-[#81C408]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonial
                  </Link>

                  <Link
                    to="/order-history"
                    className="block w-full text-left py-2 hover:text-[#81C408] hover:bg-gray-100"
                    onClick={handleViewHistoryPage}
                  >
                    View Order History
                  </Link>

                  <Link
                    to="/not-found-page"
                    className="block py-2 hover:text-[#81C408]"
                    onClick={handleNotFoundPage}
                  >
                    404 Page
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/contact-us"
              className="block py-2 hover:text-[#81C408]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="nav-button hover:text-[#81C408]"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-button">
                Login
              </Link>
            )}

            <div className="flex items-center justify-start pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={() => setSearchOpen(true)}
                className=" w-10 h-10 sm:w-12 sm:h-12 border border-[#FFB524] rounded-full text-[#81C408] hover:bg-[#FFB524]
                            flex items-center justify-center ml-3 mr-3 "
                aria-label="Search"
              >
                <FaSearch />
              </button>
              <div className="relative">
                <button
                  onClick={handleCartClick}
                  className="text-[#81C408] ml-2"
                  aria-label="Shopping cart"
                >
                  <FaShoppingCart className="text-3xl hover:text-green-600" />
                </button>

                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#FFB524] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                className="text-[#81C408] ml-6 mb-1 hover:text-green-600"
                aria-label="User account"
                onClick={handleCurrentUserPage}
              >
                <FaUser className="text-3xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartHeader;
