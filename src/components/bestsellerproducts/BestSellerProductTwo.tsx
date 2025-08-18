import React from "react";
import { MdStar } from 'react-icons/md';
import BestSellerProductCard from "./BestSellerProductCard";
import oranges from "../../assets/products/oranges.jpg";
import redbarries from "../../assets/products/redBarries.jpg";
import applefruite from "../../assets/products/applefruite.jpg";
import bananas from "../../assets/products/bananas.jpg";
import appricot from "../../assets/products/appricot.jpg";
import grapes from "../../assets/products/grapes.jpg";

const demoProducts: any[] = [
  { id: "1", name: "Organic Tomato", price: 3.12, image: oranges, rating: 4 },
  { id: "2", name: "Organic Tomato", price: 3.12, image: redbarries, rating: 5 },
  { id: "3", name: "Organic Tomato", price: 3.12, image: grapes, rating: 4 },
  { id: "4", name: "Organic Tomato", price: 3.12, image: appricot, rating: 4 },
  //   { id: "5", name: "Organic Tomato", price: 3.12, image: applefruite, rating: 4 },
  //   { id: "6", name: "Organic Tomato", price: 3.12, image: oranges, rating: 4 },
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
    <section className="mx-auto max-w-7xl px-2">

      <div className="mx-auto max-w-6xl  ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-transparent rounded-lg flex flex-col items-center "
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-[230px] h-[150px] object-cover rounded-md"
              />

              {/* Name */}
              <h3 className="mt-4 text-md font-semibold text-[#747d88]">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex justify-center items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < product.rating ? "text-[#81C408] text-1xl" : "text-[#747D88] text-1xl"
                    }
                  >
                    <MdStar className=" w-4 h-4" />
                    {/* ★ */}
                  </span>
                ))}
              </div>

              {/* Price */}
              <p className="mt-1 text-md font-bold text-[#747D88]">
                {product.price} <span className="text-lg text-[#747D88] font-bold">$</span>
              </p>

              {/* Button */}
              <button
                onClick={() => onAddToCart?.(product)}
                className="mt-1 flex items-center gap-1 border border-yellow-400 text-[#81C408] 
                font-xm py- px-3 rounded-full cursor-pointer hover:bg-[#FFB524] hover:text-[#FFFFFF]"
              >
                {/* <div className="flex"> */}
                <span className="w-3 h-3 text-[#81C408] mb-3 mr-2">🛒</span> Add to cart
              </button>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellerProductTwo;
