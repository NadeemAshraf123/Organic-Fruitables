// TopBar.tsx
import React from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const TopBar: React.FC = () => {
  return (
    <>
      {/* thin black strip at very top like in the screenshot */}
      {/* <div className="h-2 bg-[#111] w-full" /> */}

      {/* centered pill */}
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#81C408] rounded-tl-[99px] rounded-br-[99px] rounded-tr-[36px] rounded-bl-[36px] py-4 px-4 h-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-white text-sm font-normal">
              
              {/* left group: location + email */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-[#FFB524]" />
                  <span>123 Street, New York</span>
                </div>

                {/* hide email on very small screens to keep pill compact */}
                <div className="hidden sm:flex items-center gap-2">
                  <FaEnvelope className="w-4 h-4 text-[#FFB524]" />
                  <a href="mailto:Email@example.com" >
                    Email@example.com
                  </a>
                </div>
              </div>

              {/* right group: policy links */}
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
    </>
  );
};

export default TopBar;
