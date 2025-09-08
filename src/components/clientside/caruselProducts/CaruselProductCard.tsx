import React from 'react';
import { useAppDispatch } from '../../../app/Hooks';
import { addToCart } from '../../../features/cart/CartSlice';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

const CaruselProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  category,
  price,
  description,
}) => {
console.log("dispatching to cart ", {id,name,price,image})
  const dispatch = useAppDispatch();


  return (

    
  <div
  className="bg-[#ffffff] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.6),0_0_10px_rgba(0,0,0,0.1)] transition-all
                w-full max-w-[290px] md:max-w-[320px] lg:max-w-[300px]
                  border border-[#81C408] mt-8 mb-4"
>

      <div className="overflow-hidden mt-">
        <div className='relative'>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-125"
        />
        <span className="absolute top-2 right-4 bg-[#81C408] text-white text-xs px-3 py-1 rounded-full">{category}</span>
        </div>
      </div>

      <div className="p-4  space-y-2">
        <h3 className="text-2xl text-center  font-lighterbold text-gray-800 ">{name}</h3>
        <p className="text-sm text-center text-gray-600 h-[80px]">{description}</p>
        <div className=" flex flex-col items-start mt-4">
          <span className="text-lg mx-auto  font-semibold text-black mt-5">{price}</span>
          <button 
            onClick={() => dispatch(addToCart({  id,  name, price, image,}) )}
            className="text-[#81C408] mx-auto mt-3  px-6 py-2 rounded-full hover:bg-[#ffb524] transition-colors duration-200 border border-[#ffb524]">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaruselProductCard;
