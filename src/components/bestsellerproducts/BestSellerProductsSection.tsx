import React from "react";
import BestSellerProductCard from "./BestSellerProductCard";
import oranges from '../../assets/products/oranges.jpg';
import redbarries from '../../assets/products/redBarries.jpg'
import applefruite from '../../assets/products/applefruite.jpg'
import bananas from '../../assets/products/bananas.jpg'
import appricot from '../../assets/products/appricot.jpg'
import grapes from '../../assets/products/grapes.jpg'


const demoProducts: any[] = [
  {
    id: "1",
    name: "Organic Tomato",
    price: 3.12,
    image:  `${oranges}`,
    rating: 4,
  },
  
  {
    id: "2",
    name: "Organic Tomato",
    price: 3.12,
    image: `${redbarries}`,
    rating: 5,
  },
  {
    id: "3",
    name: "Organic Tomato",
    price: 3.12,
    image: `${grapes}`,
    rating: 4,
  },
   {
    id: "4",
    name: "Organic Tomato",
    price: 3.12,
    image: `${appricot}`,
    rating: 4,
  },
   {
    id: "5",
    name: "Organic Tomato",
    price: 3.12,
    image: `${applefruite}`,
    rating: 4,
  },
   {
    id: "6",
    name: "Organic Tomato",
    price: 3.12,
    image: `${oranges}`,
    rating: 4,
  },
];

interface BestsellerProductsSectionProps {
  products?: any[];
  onAddToCart?: (product: any) => void;
}

const BestsellerProductsSection: React.FC<BestsellerProductsSectionProps> = ({
  products = demoProducts,
  onAddToCart,
}) => {


  return (


    <section className="py-16 bg-[#FFFFFF]">
      <div className="max-w-[1320px] w-full mx-auto">
      <h2 className="text-center text-[33px] font-Sans md:text-[43px] font-bold  text-[#45595B]">
        Bestseller Products
      </h2>
      <p className="mx-auto mt-4 text-[16px] text-center text-gray-500">
        Latin words, combined with a handful of model sentence structures, to generate Lorem <span className="flex justify-center"> Ipsum which looks reasonable.</span>
      </p>
      <div className="mt-6 gap-6 lg:gap-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
        {products.map((product) => (
          <BestSellerProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      </div>
    </section>
  );
};

export default BestsellerProductsSection;
