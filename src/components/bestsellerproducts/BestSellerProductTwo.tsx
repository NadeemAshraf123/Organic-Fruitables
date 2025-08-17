import React from "react";
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      {/* <h2 className="text-center text-5xl md:text-6xl font-extrabold text-gray-800">
        Bestseller Products
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-gray-500">
        Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
      </p> */}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-transparent rounded-lg flex flex-col items-center p-4"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />

            {/* Name */}
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex justify-center items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < product.rating ? "text-green-500 text-lg" : "text-gray-300 text-lg"
                  }
                >
                  ★
                </span>
              ))}
            </div>

            {/* Price */}
            <p className="mt-2 text-lg font-bold text-gray-800">
              {product.price} <span className="text-sm font-medium">$</span>
            </p>

            {/* Button */}
            <button
              onClick={() => onAddToCart?.(product)}
              className="mt-3 flex items-center gap-2 border border-yellow-400 text-green-600 font-medium py-1.5 px-4 rounded-full hover:bg-yellow-50 transition-colors"
            >
              <span className="text-yellow-500">🛒</span> Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestsellerProductTwo;
