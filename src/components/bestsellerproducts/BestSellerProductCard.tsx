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
    <div className='max-w-7xl mx-auto px-4 '>
      <div className="max-w-6xl mx-auto">
    <div className="rounded-2xl bg-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-35 h-35 rounded-full object-cover shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">{product.name}</h3>
          <Rating rating={product.rating} className="mt-1 text-[#81C408]" />
          <div className="mt-2 text-2xl font-semibold text-gray-700">
            {product.price.toFixed(2)} <span className="text-2xl align-middle">$</span>
          </div>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="mt-4 inline-flex items-center  rounded-full border border-amber-400 px-6 py-1 text-lg font-sm text-[#81C408] hover:bg-[#FFB524] hover:text-[#FFFFFF] focus:outline-none focus:ring-4 focus:ring-amber-200"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="mb-5 mr-2 " />
            Add to cart
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default BestSellerProductCard;
