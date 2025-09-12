import React from "react";
import { useAppDispatch } from '../../../app/Hooks';
import { addToCart } from '../../../features/cart/CartSlice';
import { ShoppingBag } from "lucide-react";



interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

const OurOrganicProductsCard: React.FC<ProductCardProps> = ({ id, name, image, category, price, description}) => {
  
const dispatch = useAppDispatch();
        
  
  // const handleAddToCart = () => {
  //       dispatch(addToCart({
  //         id: ProductCard.displayName,
  //         name: ProductCard.name,
  //         price: ProductCard.price,
  //         image: ProductCard.image,
  //         quantity: 1,
  //       }));
  //   };


  return (
    <div
      className="bg-white rounded-xl overflow-hidden transition-all duration-300 
  hover:shadow-[0_0_40px_rgba(64,64,64,0.7),0_0_20px_rgba(64,64,64,0.5)] 
  w-full max-w-[330px] h-auto border border-[#FDC700]"
    >
      <div className="overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-[230px] object-cover transition-transform duration-500 hover:scale-125"
          />
          <span className="absolute top-4 left-4 bg-[#FFB524] text-white text-xs px-4 py-2 rounded-xl">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4 space-y">
        <h3 className="text-[21px] font-semibold text-gray-800">{name}</h3>
        
      
        {/* <div className="text-sm text-gray-500 font-medium">
          Category: {category}
        </div> */}
        
        <p className="text-sm text-gray-600 h-[80px]">{description}</p>
        <div className="flex flex-row gap-10 md:flex-col items-center mt-4">
          <span className="text-[20px] font-semibold text-black mb-0">
            {price}
          </span>

          <button
          onClick={() => dispatch(addToCart({
            id, name, price, image,quantity: 1
          }))}
            type="button"
            className="rounded-full border border-amber-400 px-3 py-1 text-[#81C408] hover:bg-[#FFB524] hover:text-[#FFFFFF] focus:outline-none focus:ring-4 focus:ring-amber-200"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="ml-1/2 w-4 h-4 text-[#81C408]" />
              Add to cart
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurOrganicProductsCard;