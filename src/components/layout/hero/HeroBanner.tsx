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
            className="bg-cover bg-center min-h-[533px]"
        >
            <div className="max-w-[1320px] w-full mx-auto mt-20  md:py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 min-h-[70vh]">
                    
                    {/* Left Side - Text Content */}
                    <div className="flex-1 text-left  max-w-7xl">
                        <h1 className="text-[24px] md:text-3xl lg:text-2xl text-[#FFB524] mb-4 font-medium">
                            100% Organic Foods
                        </h1>
                        <h2 className="text-[64px] font-sansserif md:text-5xl lg:text-[64px] font-bold text-[#81C408] mb-8 leading-tight">
                            Organic Veggies &  <span className="block font-bold" style={{fontFamily: "sans-serif"}}>Fruits Foods </span>
                        </h2>

                        <form className="relative  w-[552px] max-w-full" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full px-6 py-4 border-2 border-[#FFB524] bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFB524] text-base pr-32"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#81C408] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#FFB524] transition text-sm border-2 border-[#ffb524]"
                            >
                                Submit Now
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Image Carousel */}
                    <div className="flex-1 relative max-w-lg mr-3 mt-10 w-full">
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={images[currentIndex]?.image}
                                style={{background:'#ffb524'}}
                                alt="Organic food selection"
                                className="w-full h-[400px] md:h-[341px] object-cover transition-opacity duration-500"
                            />
                            
                        
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-[#FFB524] text-white text-2xl md:text-3xl font-bold px-6 py-3 rounded-xl shadow-lg">
                                    {images[currentIndex]?.title}
                                </span>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={goLeft}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#81C408] hover:bg-[#6fa007] text-white text-xl px-3 py-3 rounded-full shadow-lg z-10 w-12 h-12 flex items-center justify-center transition-colors"
                            aria-label="Previous image"
                        >
                            <FaChevronLeft />
                        </button>

                        <button
                            onClick={goRight}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#81C408] hover:bg-[#6fa007] text-white text-xl px-3 py-3 rounded-full shadow-lg z-10 w-12 h-12 flex items-center justify-center transition-colors"
                            aria-label="Next image"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroBanner;