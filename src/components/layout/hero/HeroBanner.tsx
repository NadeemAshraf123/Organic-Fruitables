import React, { useState, useEffect } from "react";
import heroFruits from '../../../assets/images/heroFruits.png';
import herobackroundImg from '../../../assets/images/herobackgroundImg.jpg';
import heroVegetables from '../../../assets/images/heroVegetables.jpg';
import { FaChevronLeft, FaAngleLeft, FaChevronRight } from "react-icons/fa";

const images = [
    { image: heroFruits, title: 'Fruits' },
    { image: heroVegetables, title: 'Vegetables' }
];

const HeroBanner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const goLeft = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goRight = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (

        <section
            style={{ backgroundImage: `url(${herobackroundImg})` }}
            className="flex flex-col md:flex-row items-center justify-around bg-cover bg-center px-4 md:px-8 py-8 md:py-16 gap-8 md:gap-16 mt-50 md:mt-40"
        >
            {/* Text Content */}
            <div className="flex-1 max-w-xl w-full text-left ml-[20px] md:ml-[100px]">

                <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#FFB524] mb-2">
                    100% Organic Foods
                </h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#81C408] mb-10 leading-tight">
                    Organic Veggies & Fruits Foods
                </h2>

                <form className="relative w-full max-w-md text-left" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full text-left px-4 md:px-6 py-4 border-2 border-[#FFB524] bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFB524] text-sm md:text-base"
                    />
                    <button
                        type="submit"
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#81C408] text-white font-semibold border-2 border-[#FFB524] px-6 py-1 md:py-4 rounded-full hover:bg-[#FFB524] transition text-sm"
                        style={{
                            height: 'calc(100% - 4px)',
                        }}
                    >
                        Submit Now
                    </button>
                </form>
            </div>


            <div className="flex-1 relative max-w-md w-full mx-auto mt-8  md:mt-0">
                <button
                    onClick={goLeft}
                    className="absolute left-0 md:left-2 top-1/2 transform -translate-y-1/2 bg-[#d0f984] text-xl md:text-2xl text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow hover:bg-[#a0f207] z-10 w-[50px] h-[50px] flex items-center justify-center"
                    aria-label="Previous image"
                >
                    <FaChevronLeft />
                </button>

                <div  className="relative">
                    <img
                        src={images[currentIndex]?.image}
                        alt="Organic food selection"
                        className="w-full h-auto max-h-64 md:max-h-none rounded-lg bg-[#FFB524] transition-opacity duration-500 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        
                        <span className="bg-[#E8B33A] text-white text-2xl md:text-2xl font-bold px-4 py-2 rounded-xl">
                            {images[currentIndex]?.title}
                            </span>
                        
                        
                        </div>
                </div>
                <button
                    onClick={goRight}
                    className="absolute right-0 md:right-2 top-1/2 transform -translate-y-1/2 bg-[#c8f475] text-xl md:text-2xl text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow hover:bg-[#a0f207] z-10 w-[50px] h-[50px] flex items-center justify-center"
                    aria-label="Next image"
                >
                    <FaChevronRight />

                </button>
            </div>
        </section>
    );
};

export default HeroBanner;