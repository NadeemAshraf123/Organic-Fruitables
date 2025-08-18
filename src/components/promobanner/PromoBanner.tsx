import React from 'react';
import storeImage from '../../assets/storeimages/storeImage.png'; // Replace with your actual image path

const PromoBanner: React.FC = () => {
    return (
        <section className="w-full bg-[#FFB524]  shadow-lg px-8 py-20 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto mt-20">

            {/* Left Section */}
            <div className="flex-1 text-white w-full">
                {/* Heading */}
                <div className="mb-6">
                    <h2 className="text-[54px] md:text-[64px] font-bold leading-tight">
                        Fresh Exotic Fruits
                    </h2>
                    <h2 className="text-[54px] md:text-[64px] font-lightbold leading-tight text-[#45595B]">
                        in Our Store
                    </h2>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-[#45595B] opacity-90 mb-6 leading-relaxed">
                    The generated Lorem Ipsum is therefore always free from repetition injected humour,<br />
                    or non-characteristic words etc.
                </p>

                {/* Button */}
                <button className="bg-transparent hover:bg-[#82C508] hover:text-[#45595B] text-[#45595B] font-semibold px-12 py-4 rounded-full transition duration-300 border-2 border-white">
                    BUY
                </button>
            </div>

            {/* Right Section */}
            <div className="flex-1 mt-10 md:mt-0 relative flex justify-center">
                {/* <div className="absolute flex justify-center items-center top-0 left-15 w-30 h-30 bg-white text-[#45595B] font-extrabold px-4 py-2 rounded-full shadow text-lg">
          1 50$ kg
        </div> */}

                <div className="absolute top-0 left-2 bg-white w-[120px] h-[120px] rounded-full shadow flex flex-row justify-center items-center text-[#45595B] md:left-10 lg:left-14 md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px]">
                    {/* Top row: 1 and 50$ */}
                    <div className="flex items-left gap-1">
                        <span className="text-[52px] font-bold leading-none">1</span>
                    
                    </div>

                        <div className='flex flex-col'>
                        <span className="text-[22px] font-semibold mt-10 leading-none">50$</span>
                        <span className="text-[18px] font-medium ">kg</span>
                    </div>

                    {/* Bottom row: kg */}
                </div>
                {/* Image */}
                <img
                    src={storeImage}
                    alt="Basket of fruits"
                    className="w-[300px] md:w-[400px] lg:w-[500px] object-contain"
                />
            </div>
        </section>
    );
};

export default PromoBanner;
