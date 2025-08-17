import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";


const Footer: React.FC = () => {
    return (
        <footer className="bg-[#45595B] text-white pt-16 pb-10 px-6 md:px-12 lg:px-20">

            <div className="flex flex-col lg:flex-row justify-between items-left gap-6 mb-12">
                <div className="text-left lg:text-left">
                    <h2 className="text-3xl font-bold text-left text-[#81C408]">Fruitables</h2>
                    <p className="text-md text-left text-[#FFB524] mt-1">Fresh products</p>
                </div>

                <form className="relative w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-6 py-4 bg-[#FFFFFF] text-[#6C757D] text-left  rounded-full focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#81C408] text-white font-semibold px-6 py-4.5 rounded-full hover:bg-[#FFB524] transition text-sm"
                    >
                        Submit Now
                    </button>
                </form>

                <div className="flex justify-end gap-4 text-[#FFB524]">
                    <div className="w-12 h-12 rounded-full border-2 border-[#FFB524] flex items-center justify-center hover:bg-[#FFB524] hover:text-black cursor-pointer transition">
                        <FaTwitter className="text-xl" />

                    </div>

                    <div className="w-12 h-12 rounded-full border-2 border-[#FFB524] flex items-center justify-center hover:bg-[#FFB524] hover:text-black cursor-pointer transition">
                        <FaFacebookF className="text-xl" />

                    </div>

                    <div className="w-12 h-12 rounded-full border-2 border-[#FFB524] flex items-center justify-center hover:bg-[#FFB524] hover:text-black cursor-pointer transition">
                        <FaYoutube className="text-xl" />
                    </div>

                    <div className="w-12 h-12 rounded-full border-2 border-[#FFB524] flex items-center justify-center hover:bg-[#FFB524] hover:text-black cursor-pointer transition">
                        <FaLinkedinIn className="text-xl" />
                    </div>
                </div>
            </div>
            <hr className="border-t border-[#FFB524] my-6" />


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 leading-[35px]">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-[#F4F6F8]">Why People Like Us!</h3>
                    <p className="text-md text-[#9FAAAD] mb-4 leading-[35px]">
                        Typesetting industry lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since.
                    </p>
                    <button className=" border border-[#FFB524] text-[#81C408] px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#e0b000] hover:text-[#FFFFFF] transition">
                        Read More
                    </button>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4 text-[#F4F6F8]">Shop Info</h3>
                    <ul className="space-y-2 text-md text-[#9FAAAD] leading-loose">
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About Us</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact Us</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Privacy Policy</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Terms & Conditions</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Return Policy</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>FAQs & Help</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4 text-[#F4F6F8]">Account</h3>
                    <ul className="space-y-2 text-md text-[#9FAAAD] leading-loose">
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>My Account</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Shop</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Shopping Cart</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Wishlist</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Order History</a></li>
                        <li><a href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>International Orders</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4 text-[#F4F6F8]">Contact</h3>
                    <ul className="space-y-2 text-[16px]  text-[#9FAAAD] leading-[35px]">
                        <li>1429 Netus Rd, NY 48247</li>
                        <li>Example@gmail.com</li>
                        <li>+92 300 1234567</li>
                    </ul>

                    <div className="flex gap-4 mt-4 text-4xl">
                        <FaCcVisa className=' text-white' />
                        <FaCcMastercard />
                        <FaCcPaypal />
                    </div>

                </div>
            </div>

            <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="px-4 py-2 rounded-full text-sm text-[#45595B] outline-none"
                    />

                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-start text-sm mt-6 text-white">
                <div className="flex items-center gap-2 text-left">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#45595B] text-xs font-bold">
                        C
                    </div>
                    <span className="text-[#81C408]">Your Site Name</span>, <span className="text-white">All right reserved.</span>
                </div>

                <div className="text-right text-[#9FAAAD] flex items-center gap-1">
                    <span>Designed By</span>
                    <a href="https://htmlcodex.com" className="relative inline-block text-[#81C408] hover:underline">
                        HTML Codex
                        <span className="absolute left-0 right-0 bottom-[-2px] h-[1px] bg-[#FFB524]"></span>
                    </a>
                </div>
            </div>



        </footer>
    );
};

export default Footer;
