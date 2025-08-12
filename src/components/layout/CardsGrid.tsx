
import React from "react";
import nextFruite1 from '../../assets/discountedItems/nextFruite1.jpg'
import strwberrynext2 from '../../assets/discountedItems/strawberrynext2.jpg';
import vegetableNext3 from '../../assets/discountedItems/vegetableNext3.jpg';


const CardsGrid: React.FC = () => {
  const cards = [
    {
      image: `${nextFruite1}`,
      title: "Fresh Apples",
      offer: "20% OFF",
      badgeColor: "#81C408", 
      footerColor: "#FBBF24", 
    },
    {
      image: `${strwberrynext2}`,
      title: "Tasty Fruits",
      offer: "Free delivery",
      badgeColor: "#d2d4d9ff",
      footerColor: "#374151", 
    },
    {
      image: `${vegetableNext3}`,
      title: "Exotic Vegetable",
      offer: "Discount 30$",
      badgeColor: "#FBBF24",
      footerColor: "#84CC16", 
    },
  ];

  return (
    <div className=" bg-secondary flex justify-center items-center p-6 mb-10 mt-40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-[370px] h-[460px] rounded-xl border border-gray-200 shadow-md overflow-hidden flex flex-col bg-red"
          >
            {/* Image Section */}
            <div className="bg-transparent flex justify-center items-center p-4">
              <img
                src={card.image}
                alt={card.title}
                className="object-contain w-full h-[300px]"
              />
            </div>

            {/* Footer Section */}
            <div
              className="relative h-[130px]" 
              style={{ backgroundColor: card.footerColor }}
            >
              {/* Badge */}
              <div
                className="absolute w-[250px] h-[120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg px-6 py-6 text-center "
                style={{ backgroundColor: card.badgeColor }}
              >
                <p className="text-white font-bold">{card.title}</p>
                <p className="text-[#45595B] text-2xl font-bold">{card.offer}</p>
              </div>
              {/* Spacer for Footer Height */}
              <div className="h-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
