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


    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-center text-5xl md:text-6xl font-extrabold text-gray-800">
        Bestseller Products
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-gray-500">
        Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <BestSellerProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default BestsellerProductsSection;
