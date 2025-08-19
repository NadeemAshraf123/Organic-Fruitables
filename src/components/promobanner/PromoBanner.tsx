import React from "react";
import storeImage from "../../assets/storeimages/storeImage.png"; // Replace with your actual image path

const PromoBanner: React.FC = () => {
  return (
    <>
      <section className="w-full bg-[#FFB524] px-8 py-20">
        {/* Left Section */}
        <div className="flex max-w-[1320px] w-full mx-auto">
            
          <div className="flex flex-col text-white">
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-[54px] md:text-[64px] font-bold leading-tight">
                Fresh Exotic Fruits
              </h2>
              <h2 className="text-[54px] md:text-[64px] font-lightbold leading-tight text-[#45595B]">
                in Our Store
              </h2>
            </div>

            <p className="text-sm md:text-base text-[#45595B] opacity-90 mb-6 leading-relaxed">
              The generated Lorem Ipsum is therefore always free from repetition
              injected humour,
              <br />
              or non-characteristic words etc.
            </p>
            <button className=" self-start bg-transparent hover:bg-[#82C508] hover:text-[#45595B] text-[#45595B] font-semibold px-14 py-4 rounded-full transition duration-300 border-2 border-white">
              BUY
            </button>
          </div>

          <div className=" relative">
            <div className="absolute top-0 left-2 bg-white w-full  rounded-full shadow flex flex-row justify-center items-center text-[#45595B] md:left-10 lg:left-14 md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px]">
              <div className="flex items-left gap-1">
                <span className="text-[52px] font-bold leading-none">1</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[22px] font-semibold mt-10 leading-none">
                  50$
                </span>
                <span className="text-[18px] font-medium ">kg</span>
              </div>
            </div>

            <img
              src={storeImage}
              alt="Basket of fruits"
              className="w-[300px] md:w-[400px] lg:w-[636px] object-contain"
            />
          </div>



        </div>
      </section>
    </>
  );
};

export default PromoBanner;
