import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header: React.FC = () => {
  return (

    <header className="fixed top-0 left-0 right-0 bg-white  px-6 py-4 flex justify-around items-center h-[100px] z-50">
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

        <a href="#" className="hover:text-[#81C408] ">Contact</a>
      </nav>

      <div className="flex items-center space-x-6 text-gray-700">
        <FaSearch className="border-1 border-[#FFB524] rounded-full p-[13px] text-[44px] flex justify-center items-center text-[#81C408] hover:bg-[#FFB524]  cursor-pointer" />
        <div className="relative">
          <FaShoppingCart className="hover:text-green-600 text-[#81C408] text-[34px] cursor-pointer" />
          <span className="absolute -top-2 -right-3 bg-[#FFB524] hover:bg-green-600 text-grey-700 text-xs rounded-full px-1 cursor-pointer">3</span>
        </div>
        <FaUser className="hover:text-green-600 text-[34px] text-[#81C408] cursor-pointer " />
      </div>
    </header>
  );
};

export default Header;
