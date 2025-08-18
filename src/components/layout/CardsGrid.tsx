
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
      textColor: "white",
    },
    {
      image: `${strwberrynext2}`,
      title: "Tasty Fruits",
      offer: "Free delivery",
      badgeColor: "#F4F6F8",
      footerColor: "#374151",
      textColor: "green",
    },
    {
      image: `${vegetableNext3}`,
      title: "Exotic Vegetable",
      offer: "Discount 30$",
      badgeColor: "#FBBF24",
      footerColor: "#84CC16",
      textColor: "white",
    },
  ];

  return (
    <div className="w-full  bg-[red] flex justify-center items-center p-6">
      <div className="grid bg-[#FFFFFF] grid-cols-1 md:grid-cols-3 gap-14">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-[330px] h-[460px] md:w-[300px] lg:w-[330px] rounded-xl border border-gray-200 shadow-md overflow-hidden flex flex-col bg-red"
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
                <p
                  className={`font-bold ${card.textColor === "green" ? "text-green-600" : "text-white"}`}
                >
                  {card.title}
                </p>

                <p className="text-2xl font-bold text-[#45595B]">
                  {card.offer}
                </p>

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
