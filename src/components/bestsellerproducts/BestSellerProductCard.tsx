import React from "react";
import { ShoppingBag } from "lucide-react";
import Rating from "./Rating";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const BestSellerProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {


  return (
    <div className='max-w-7xl mx-auto'>
      <div className="max-w-6xl mx-auto flex bg-[#F4F6F8] rounded-xl ">

      <div className="">
        <img
          src={product.image}
          alt={product.name}
          className="w-[172px] h-[172px] rounded-full p-3 object-cover shrink-0"
        />
        </div>


        <div className=" p-4  ">
          <h3 className="text-[16px] font-sans font-lightbold text-gray-500 leading-tight">{product.name}</h3>
          <Rating rating={product.rating} className="mt-1 text-gray-500" />
          <div className="mt-1 text-1xl font-semibold text-[#747d88]">
            {product.price.toFixed(2)} <span className="text-1xl align-middle">$</span>
          </div>

          <div className="">
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="mt-2 rounded-full border border-amber-400 px-2 py-0.5  text-[#81C408] hover:bg-[#FFB524] hover:text-[#FFFFFF] focus:outline-none focus:ring-4 focus:ring-amber-200"
            aria-label={`Add ${product.name} to cart`}
          >
            <div className="flex items-center gap-2">
            <ShoppingBag className="ml-1/2 w-3 h-3 text-[#81C408]" />

            Add to  cart
            </div>
          </button>
          </div>

        </div>
      
    </div>
    </div>
  
  );
};

export default BestSellerProductCard;
