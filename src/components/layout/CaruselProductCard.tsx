import React from 'react';

interface ProductCardProps {
  name: string;
  image: string;
  category: string;
  price: string;
  description: string;
}

const CaruselProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  category,
  price,
  description,
}) => {
  return (
  <div
  className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_70px_rgba(128,128,128,0.6),0_0_30px_rgba(128,128,128,0.4)] transition-all
  w-full sm-w-[300px] lg:w-[260px] border border-[#81C408] mt-8 "
>

      <div className="overflow-hidden">
        <div className='relative'>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-125"
        />
        <span className="absolute top-2 right-4 bg-[#81C408] text-white text-xs px-3 py-1 rounded-full">{category}</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-2xl font-lighterbold text-gray-800 ">{name}</h3>
        <p className="text-sm text-gray-600 h-[80px]">{description}</p>
        <div className=" flex flex-col items-start mt-4">
          <span className="text-md font-semibold text-black mt-4">{price}</span>
          <button className="text-[#81C408] px-6 py-2 rounded-full hover:bg-[#ffb524] transition-colors duration-200 border border-[#ffb524]">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaruselProductCard;
