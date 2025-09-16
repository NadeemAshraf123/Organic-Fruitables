import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/ProductsSlice';
import type { RootState } from '../../app/Store';
import FreshOrganicVegatablesCard from './freshorganiccard';

const FreshOrganicVegatables: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  // Fetch products from Redux (same as OurOrganicProducts)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    if (cardRef.current && scrollRef.current && products.length > 0) {
      const first = cardRef.current;
      const second = first.nextElementSibling as HTMLElement | null;

      if (second) {
        setCardWidth(second.offsetLeft - first.offsetLeft); 
      } else {
        setCardWidth(first.offsetWidth);
      }
    }
  }, [products]); 

  
  useEffect(() => {
    if (!cardWidth) return; 

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - cardWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [cardWidth]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  
  if (loading) {
    return (
      <section className="w-full px-3 md:px-5 mt-40">
        <div className="max-w-full w-[1320px] mx-auto min-h-[500px] md:h-[655px] flex items-center justify-center">
          <div className="text-xl text-[#45595B]">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-3 md:px-5 mt-40">
        <div className="max-w-full w-[1320px] mx-auto min-h-[500px] md:h-[655px] flex items-center justify-center">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-3 md:px-5 mt-40">
      <div className="max-w-full w-[1320px] mx-auto min-h-[500px] md:h-[655px]">
        
        <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center mb-6">
          <h2 className="text-2xl md:text-[27px] lg:text-4xl font-lightbold text-[#45595B]">
            Fresh Organic <span className="block md:inline">Vegetables</span>
          </h2>
          <div className="flex justify-end gap-4 md:gap-6">
            <button
              onClick={scrollLeft}
              className="w-16 h-8 bg-transparent font-bold border border-[#FFB524] hover:bg-[#FFB524] hover:text-white text-[#81C408] rounded-full flex items-center justify-center transition"
            >
              →
            </button>
            <button
              onClick={scrollRight}
              className="w-16 h-8 bg-transparent font-bold border border-[#FFB524] hover:bg-[#FFB524] hover:text-white text-[#81C408] rounded-full flex items-center justify-center transition"
            >
              <span className='font-bold' style={{fontSize: "bold"}}> ← </span>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scrollbar-hide scroll-smooth"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={index === 0 ? cardRef : null}
              className="flex-shrink-0"
            >
              <FreshOrganicVegatablesCard
                id={product.id}
                name={product.name}
                image={product.images?.[0] || ''} 
                category={product.category?.name || 'Uncategorized'} 
                price={`$${product.price ? parseFloat(`${product.price}`).toFixed(2) : '0.00'}`}
                description={
                  product.description ||
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.'
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreshOrganicVegatables;