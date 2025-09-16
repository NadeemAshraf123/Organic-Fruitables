import React, { useEffect, useState } from "react";
import BestSellerProductCard from "./BestSellerProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/ProductsSlice';
import type { RootState } from '../../app/Store';

interface BestsellerProductsSectionProps {
  onAddToCart?: (product: any) => void;
}

const BestsellerProductsSection: React.FC<BestsellerProductsSectionProps> = ({
  onAddToCart,
}) => {
  const [bestsellerProducts, setBestsellerProducts] = useState<any[]>([]);
  

  const dispatch = useDispatch();
  const {
    items: allProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  useEffect(() => {
    if (allProducts.length > 0) {

      const bestsellers = allProducts
        .filter(product => product.rating >= 4) 
        .slice(0, 6); 
      
      setBestsellerProducts(bestsellers);
    }
  }, [allProducts]);

  if (loading) {
    return (
      <section className="py-16 bg-[#FFFFFF]">
        <div className="max-w-[1320px] w-full mx-auto">
          <h2 className="text-center text-[33px] font-Sans md:text-[43px] font-bold text-[#45595B]">
            Bestseller Products
          </h2>
          <p className="mx-auto mt-4 text-[16px] text-center text-gray-500">
            Loading bestseller products...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#FFFFFF]">
        <div className="max-w-[1320px] w-full mx-auto">
          <h2 className="text-center text-[33px] font-Sans md:text-[43px] font-bold text-[#45595B]">
            Bestseller Products
          </h2>
          <p className="mx-auto mt-4 text-[16px] text-center text-red-500">
            Error loading products: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#FFFFFF]">
      <div className="max-w-[1320px] w-full mx-auto">
        <h2 className="text-center text-[33px] font-Sans md:text-[43px] font-bold text-[#45595B]">
          Bestseller Products
        </h2>
        <p className="mx-auto mt-4 text-[16px] text-center text-gray-500">
          Latin words, combined with a handful of model sentence structures, to generate Lorem <span className="flex justify-center"> Ipsum which looks reasonable.</span>
        </p>
        
        {bestsellerProducts.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-gray-500">No bestseller products found.</p>
          </div>
        ) : (
          <div className="mt-6 gap-6 lg:gap-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {bestsellerProducts.map((product) => (
              <BestSellerProductCard 
                key={product.id} 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0] || '', 
                  rating: product.rating || 4 
                }} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestsellerProductsSection;