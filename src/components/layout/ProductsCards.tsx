import React from 'react';
import { ShoppingBag } from "lucide-react";


interface ProductCardProps {
  name: string;
  image: string;
  category: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  category,
  price,
  description,
}) => {
  return (

    <div
      className="bg-white rounded-xl overflow-hidden transition-all duration-300 
  hover:shadow-[0_0_40px_rgba(64,64,64,0.7),0_0_20px_rgba(64,64,64,0.5)] 
  w-full border border-[#FDC700]"
    >


      <div className="overflow-hidden">
        <div className='relative'>
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-125"
          />
          <span className="absolute top-4 left-4 bg-[#FFB524] text-white text-xs px-4 py-2 rounded-xl">Fruits</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-[24px] font-lightbold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 h-[80px]">{description}</p>
        <div className=" flex flex-row gap-10 md:flex-col items-center mt-4">
          <span className="text-md font-semibold text-black mb-0">{price}</span>

           <button
            type="button"
            className=" rounded-full border border-amber-400 px-2 py-0.5  text-[#81C408] hover:bg-[#FFB524] hover:text-[#FFFFFF] focus:outline-none focus:ring-4 focus:ring-amber-200"
          >
            <div className="flex items-center gap-2">
            <ShoppingBag className="ml-1/2 w-3 h-3 text-[#81C408]" />

            Add to  cart
            </div>
          </button>


        </div>
      </div>
    </div>
  );
};

export default ProductCard;
