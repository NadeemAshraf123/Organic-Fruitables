
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
    <div className="w-full  bg-[#ffffff] flex justify-center items-center mt-10 lg:mt-20 lg:mb-15 mb-20">
      <div className=" mt-5 mx-auto md:max-w-full  md:w-[1320] md:gap-10 lg:gap-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="mt-5 w-[270px] mx-auto sm:w-[330px] sm:h-[460px] lg:h-[410px] lg:w-[414px] md:w-[334px] md:h-[397px]  rounded-xl border border-gray-100 shadow-md overflow-hidden flex flex-col"
          >
            
            <div className="bg-transparent flex justify-center items-center">
              <img
                src={card.image}
                alt={card.title}
                className="object-contain w-full  sm:h-[334px] lg:h-[283px] md:h-[267px] md:w-[334px] lg:w-[490px]"
              />
            </div>

          
            <div
              className="relative h-[130px] md:w-auto"
              style={{ backgroundColor: card.footerColor }}
            >
              
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
              
              <div className="h-16 lg:w-[416px] lg:h-[130px]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
