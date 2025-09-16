import React from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import { useAppDispatch } from "../../app/Hooks";
import { addToCart } from "../../features/cart/CartSlice";
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

const BestSellerProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 

  
  const handleCardClick = () => {
    navigate(`/product/${product.id}`); 
  };

  
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div 
      className="w-[272px] h-[249px] sm:w-[327px] mx-auto sm:h-auto md:w-[696px] md:h-[360px] lg:w-[456px] lg:h-[240px] xl:w-[416px] sm:p-6 md:p-6 flex bg-[#F4F6F8] rounded-xl cursor-pointer" // ADDED cursor-pointer
      onClick={handleCardClick} 
    >
      <div className="">
        <img
          src={product.image}
          alt={product.name}
          className="p-4 mt-8 md:mt-0 w-[127px] h-[127px] md:w-[312px] md:h-[312px] lg:w-[192px] lg:h-[192px] rounded-full object-cover shrink-0"
        />
      </div>

      <div className="mt-10 md:p-4 ml-4 md:ml-0 md:mt-20 lg:mt-0">
        <h3 className="text-[20px] md:text-[20px] font-sans font-lightbold text-gray-500 leading-tight">
          {product.name}
        </h3>
        <Rating
          rating={product.rating}
          className="mt-2 sm:mt-2 md:mt-2 text-gray-500"
        />
        <div className="mt-2 sm:mt-3 md:mt-2 text-1xl font-serif md:text-[22px] font-semibold text-[#747d88]">
          {product.price.toFixed(2)}{" "}
          <span className="mt-2 text-1xl md:text-[30px] font-serif align-middle">
            $
          </span>
        </div>

        <div className="">
          <button
            type="button"
            onClick={handleAddToCartClick} 
            className="mt-0 rounded-full border border-amber-400 px-2 py-0.5 text-[#81C408] hover:bg-[#FFB524] hover:text-[#FFFFFF] focus:outline-none focus:ring-4 focus:ring-amber-200"
            aria-label={`Add ${product.name} to cart`}
          >
            <div className="flex sm:flex items-center gap-2">
              <ShoppingBag className="ml-1/2 w-3 h-3 text-[#81C408]" />
              Add to <span>cart</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellerProductCard;