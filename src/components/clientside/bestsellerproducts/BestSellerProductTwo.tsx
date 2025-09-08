import React from "react";
import { MdStar } from 'react-icons/md';
import BestSellerProductCard from "./BestSellerProductCard";
import oranges from "../../../assets/products/oranges.jpg";
import redbarries from "../../../assets/products/redBarries.jpg";
import applefruite from "../../../assets/products/applefruite.jpg";
import bananas from "../../../assets/products/bananas.jpg";
import appricot from "../../../assets/products/appricot.jpg";
import grapes from "../../../assets/products/grapes.jpg";

const demoProducts: any[] = [
  { id: "1", name: "Organic Tomato", price: 3.12, image: oranges, rating: 4 },
  { id: "2", name: "Organic Tomato", price: 3.12, image: redbarries, rating: 5 },
  { id: "3", name: "Organic Tomato", price: 3.12, image: grapes, rating: 4 },
  { id: "4", name: "Organic Tomato", price: 3.12, image: appricot, rating: 4 },
    { id: "5", name: "Organic Tomato", price: 3.12, image: applefruite, rating: 4 },
    { id: "6", name: "Organic Tomato", price: 3.12, image: oranges, rating: 4 },
];

interface BestsellerProductsSectionProps {
  products?: any[];
  onAddToCart?: (product: any) => void;
}

const BestsellerProductTwo: React.FC<BestsellerProductsSectionProps> = ({
  products = demoProducts,
  onAddToCart,
}) => {
  return (
    <section className="w-full px-2">

      <div className="mx-auto max-w-[1320px] w-full">

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:gap-8 place-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-transparent rounded-lg flex flex-col items-center "
            >
              <img
                src={product.image}
                alt={product.name}
                className=" mt-5 w-[306px] h-[214px] md:w-[336px] md:h-[235px] lg:w-[456px] lg:h-[300px] xl:h-[214px]  object-cover rounded-md"
              />

          
              <h3 className="mt-4 md:mt-5 text-[20px] font-sans text-[#747d88]">
                {product.name}
              </h3>

              <div className="flex justify-center items-center mt-1 md:mt-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < product.rating ? "text-[#81C408] text-[20px]" : "text-[#747D88] text-[20px]"
                    }
                  >
                    <MdStar className=" w-6 h-6" />
                    {/* ★ */}
                  </span>
                ))}
              </div>

              <p className="mt-2 text-[20px] font-bold text-[#747D88]">
                {product.price} <span className="text-[20px] md:text-[24px] text-[#747D88] font-mono font-bold">$</span>
              </p>

              <button
                onClick={() => onAddToCart?.(product)}
                className="mt-2 flex items-center gap-1 border border-yellow-400 text-[#81C408] 
                font-xm py-1 px-4 rounded-full cursor-pointer hover:bg-[#FFB524] hover:text-[#FFFFFF]"
              >
                <span className="w-3 h-3 text-gray-500 mb-3 font-serif mr-2">🛒</span> Add to cart
              </button>

            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default BestsellerProductTwo;
