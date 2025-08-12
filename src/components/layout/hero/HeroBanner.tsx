import React, { useState, useEffect, use } from "react";
import heroFruits from '../../../assets/images/heroFruits.png';
import herobackroundImg from '../../../assets/images/herobackgroundImg.jpg';
import heroVegetables from '../../../assets/images/heroVegetables.jpg';


const images = [
    heroFruits,
    heroVegetables
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
            className="flex flex-col md:flex-row items-center justify-around bg-cover bg-center px-4 md:px-8 py-16 gap-16 mt-20">


            <div className="flex-1 max-w-xl">
                <h1 className="text-2xl md:text-3xl text-[#FFB524] mb-4">
                    100% Organic Foods
                </h1>
                <h2 className="md:text-5xl font-bold text-[#81C408] mb-6 px-2" style={{ fontSize: '4rem' }}>
                    Organic Veggies & Fruits Foods
                </h2>

               

                <form className="relative w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-6 py-4 border-2 border-[#FFB524] bg-[#FFFFFF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4d4dd]"
                    />
                    <button
                        type="submit"
                        className="absolute top-1/2 right-0 border border-[#FFB524] transform -translate-y-1/2 bg-[#81C408] text-white font-semibold px-8 py-4.5 rounded-full hover:bg-[#FFB524] transition text-sm"
                    >
                        Submit Now
                    </button>
                </form>

                


            </div>

            <div className="flex-1 relative max-w-md w-full">
                <button
                    onClick={goLeft}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#a5f909] text-2xl text-white px-3 py-1 rounded-full shadow hover:bg-[#8CC91E]"
                >
                    ←
                </button>
                <img
                    src={images[currentIndex]}
                    alt="Hero Slide"
                    className="w-full h-auto rounded-lg bg-[#FFB524] transition-opacity duration-500"
                />
                <button
                    onClick={goRight}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#a5f909] text-2xl text-white px-3 py-1 rounded-full shadow hover:bg-[#8CC91E]"
                >
                    →
                </button>
            </div>
        </section>
    );
};

export default HeroBanner;