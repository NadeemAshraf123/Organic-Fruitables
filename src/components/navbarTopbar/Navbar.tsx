import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const SmartHeader: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);

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
    window.addEventListener('scroll' , handleScroll, { passive: true});

    window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, topBarVisible]);
  
  
      
  //     const isScrollingUp = currentScrollPos < prevScrollPos;
      
  //     if (isScrollingUp !== topBarVisible && currentScrollPos > 100) {
  //       setTopBarVisible(isScrollingUp);
  //     }
      
  //     if (currentScrollPos <= 100) {
  //       setTopBarVisible(true);
  //     }
      
  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [prevScrollPos, topBarVisible]);

  return (
    // <div className="sticky top-0 z-50 bg-[#FFFFFF]">
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${!topBarVisible && !atTop ? 'shadow-md' : ''}`}>

      {/* TopBar with smooth hide animation */}
      <div className={`transition-all duration-300 ${topBarVisible || atTop ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto px-4 ">
          <div className="bg-[#81C408] rounded-tl-[99px] rounded-br-[99px] rounded-tr-[36px] rounded-bl-[36px] py-4 px-4 h-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-white text-sm font-normal">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-[#FFB524]" />
                  <span>123 Street, New York</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <FaEnvelope className="w-4 h-4 text-[#FFB524]" />
                  <a href="mailto:Email@example.com">Email@example.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 whitespace-nowrap">
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

      {/* Header that moves up when topbar is hidden */}

      {/* <header className={`bg-white px-6 py-4 flex justify-around items-center h-[100px] transition-all duration-300 ${ */}
        {/* !topBarVisible && !atTop ? 'mt-[-56px]' : ''
      } ${!atTop ? 'shadow-md' : ''}`}> */}

      <header className={`bg-white px-6 py-4 flex justify-around items-center h-[100px] transition-all duration-300 ${!topBarVisible && !atTop ? `mt-[-${TOPBAR_HEIGHT}PX]` : '' }`} >

        <div className="text-4xl font-bold text-[#81C408]">
          Fruitables
        </div>

        <nav className="flex space-x-6 text-gray-700 font-small items-center">
          <a href="#" className="hover:text-[#81C408]">Home</a>
          <a href="#" className="hover:text-[#81C408]">Shop</a>
          <a href="#" className="hover:text-[#81C408]">Shop Detail</a>

          <div className="relative group">
            <div className="flex items-center space-x-1 text-gray-700 hover:text-[#81C408] cursor-pointer">
              <span>Pages</span>
              <MdKeyboardArrowDown />
            </div>
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#F3F4F6] shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <a href="#" className="block px-4 py-2 hover:text-[#81C408] hover:bg-[#FFB524]">Cart</a>
              <a href="#" className="block px-4 py-2 hover:text-[#81C408] hover:bg-[#FFB524]">Checkout</a>
              <a href="#" className="block px-4 py-2 hover:text-[#81C408] hover:bg-[#FFB524]">Testimonial</a>
              <a href="#" className="block px-4 py-2 hover:text-[#81C408] hover:bg-[#FFB524]">404 Page</a>
            </div>
          </div>

          <a href="#" className="hover:text-[#81C408]">Contact</a>
        </nav>

        <div className="flex items-center space-x-6 text-gray-700">
          <FaSearch className="border-1 border-[#FFB524] rounded-full p-[13px] text-[44px] flex justify-center items-center text-[#81C408] hover:bg-[#FFB524] cursor-pointer" />
          <div className="relative">
            <FaShoppingCart className="hover:text-green-600 text-[#81C408] text-[34px] cursor-pointer" />
            <span className="absolute -top-2 -right-3 bg-[#FFB524] hover:bg-green-600 text-grey-700 text-xs rounded-full px-1 cursor-pointer">3</span>
          </div>
          <FaUser className="hover:text-green-600 text-[34px] text-[#81C408] cursor-pointer" />
        </div>
      </header>
    </div>
  );
};

export default SmartHeader;