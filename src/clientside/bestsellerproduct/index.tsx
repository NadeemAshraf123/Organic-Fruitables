import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD FOR NAVIGATION
import { useDispatch, useSelector } from 'react-redux'; // ADD FOR REDUX
import { fetchProducts } from '../../features/products/ProductsSlice'; // ADD FOR PRODUCT FETCHING
import type { RootState } from '../../app/Store'; // ADD FOR REDUX TYPING
import { addToCart } from "../../features/cart/CartSlice"; // ADD FOR CART FUNCTIONALITY
import { MdStar } from 'react-icons/md';

interface BestsellerProductsSectionProps {
  onAddToCart?: (product: any) => void;
}

const BestsellerProductTwo: React.FC<BestsellerProductsSectionProps> = ({
  onAddToCart,
}) => {
  const navigate = useNavigate(); // ADD FOR NAVIGATION
  const dispatch = useDispatch(); // ADD FOR REDUX
  
  // REDUX STATE FOR PRODUCTS
  const {
    items: allProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  // STATE FOR BESTSELLER PRODUCTS
  const [bestsellerProducts, setBestsellerProducts] = useState<any[]>([]);

  // FETCH PRODUCTS FROM API
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // FILTER BESTSELLER PRODUCTS
  useEffect(() => {
    if (allProducts.length > 0) {
      const bestsellers = allProducts
        .filter(product => product.rating >= 4) // Products with rating 4 or higher
        .slice(0, 8); // Get first 8 products for 4-column layout
      
      setBestsellerProducts(bestsellers);
    }
  }, [allProducts]);

  // HANDLE CARD CLICK - NAVIGATE TO PRODUCT DETAIL
  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // HANDLE ADD TO CART BUTTON CLICK
  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); // Prevent card click from triggering
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        quantity: 1,
      })
    );
    // Also call parent's onAddToCart if provided
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <section className="w-full px-2">
        <div className="mx-auto max-w-[1320px] w-full">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <section className="w-full px-2">
        <div className="mx-auto max-w-[1320px] w-full">
          <div className="text-center py-12">
            <p className="text-red-500">Error loading products: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-2">
      <div className="mx-auto max-w-[1320px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:gap-8 place-items-center">
          {bestsellerProducts.map((product) => (
            <div
              key={product.id}
              className="bg-transparent rounded-lg flex flex-col items-center cursor-pointer" // ADDED cursor-pointer
              onClick={() => handleCardClick(product.id)} // ADDED CARD CLICK
            >
              <img
                src={product.images?.[0] || ""} // CHANGED TO API IMAGE
                alt={product.name}
                className="mt-5 w-[306px] h-[214px] md:w-[336px] md:h-[235px] lg:w-[456px] lg:h-[300px] xl:h-[214px] object-cover rounded-md"
              />

              <h3 className="mt-4 md:mt-5 text-[20px] font-sans text-[#747d88]">
                {product.name}
              </h3>

              <div className="flex justify-center items-center mt-1 md:mt-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < (product.rating || 4) ? "text-[#81C408] text-[20px]" : "text-[#747D88] text-[20px]"
                    }
                  >
                    <MdStar className="w-6 h-6" />
                  </span>
                ))}
              </div>

              <p className="mt-2 text-[20px] font-bold text-[#747D88]">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'} {/* UPDATED PRICE FORMATTING */}
              </p>

              <button
                onClick={(e) => handleAddToCart(e, product)} // UPDATED CLICK HANDLER
                className="mt-2 flex items-center gap-1 border border-yellow-400 text-[#81C408] 
                font-xm py-1 px-4 rounded-full cursor-pointer hover:bg-[#FFB524] hover:text-[#FFFFFF]"
              >
                <span className="w-3 h-3 text-gray-500 mb-3 font-serif mr-2">🛒</span> Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellerProductTwo;