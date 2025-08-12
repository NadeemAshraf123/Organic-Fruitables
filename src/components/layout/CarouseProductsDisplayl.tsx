import React, { useRef, useEffect } from 'react';
import CaruselProductCard from './CaruselProductCard';
import bananas from '../../assets/caruselimages/bananas.png';
import grapes from '../../assets/products/grapes.jpg';
import parsely from '../../assets/caruselimages/parsely.jpg';
import parselyCarusel from '../../assets/caruselimages/parselyCarusel.jpg';
import bellPaper from '../../assets/caruselimages/bellPaper.jpg';
import potatoes from '../../assets/caruselimages/potatoes.jpg';
import tomatoes from '../../assets/caruselimages/tomatoes.jpg';


interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: string;
  description: string;
}

const products: Product[] = [

    {
        id: 1,
        name: 'Freash Grapes',
        image: `${grapes}`,
        category: 'Fruits',
        price:  '$4.99/kg',
        description: 'Sweet and juicy organic grapes. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
    },
    {
    id: 2,
    name: 'Parsely',
    image: `${parsely}`,
    category: 'Vegetables',
    price: '$2.49/kg',
    description: 'Crunchy and full of vitamins.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
  {
    id: 3,
    name: 'Potatoes',
    image: `${potatoes}`,
    category: 'Bread',
    price: '$1.99/loaf',
    description: 'Freshly baked every morning.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
  {
    id: 4,
    name: 'Parsely',
    image: `${parsely}`,
    category: 'Meat',
    price: '$5.99/kg',
    description: 'Lean and tender cuts.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
  {
    id: 5,
    name: 'Bananas',
    image: `${bananas}`,
    category: 'Fruits',
    price: '$1.29/kg',
    description: 'Freshly baked every morning.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',

  },
  {
    id: 6,
    name: 'Tomatoes',
    image: `${tomatoes}`,
    category: 'Fruits',
    price: '$1.29/kg',
    description: 'Freshly baked every morning.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',

  },
   {
    id: 7,
    name: 'Bell Paper',
    image: `${bellPaper}`,
    category: 'Fruits',
    price: '$2.49/kg',
    description: 'Crunchy and full of vitamins.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
  {
    id: 8,
    name: 'Potatoes',
    image: `${potatoes}`,
    category: 'Fruits',
    price: '$2.49/kg',
    description: 'Crunchy and full of vitamins.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
];

const CaruselProductsDisplay: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 300, behavior: 'smooth'})
        }
      }
    }, 4000);

    return () => clearInterval(interval);
      
    }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className='max-w-7xl mx-auto px-4 py-10 mt-20'>
       <div className='flex justify-between items-center mb-6'>
    <h2 className='text-3xl font-bold text-[#45595B]'>
        Our Organic Products
      </h2>

      <div className='flex gap-3'>
        <button
          onClick={scrollLeft}
          className='bg-transparent border border-[#FFB524] hover:bg-[#FFB524] text-[#81C408] px-6 py-1 rounded-full transition'
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          className='bg-transparent border border-[#FFB524] text-[#81C408] px-6 py-1 rounded-full hover:bg-[#FFB524] transition'
        >
          →
        </button>
      </div>
      </div>

      <div >
        <div
          ref={scrollRef}
            className='flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth'

        >
          {products.map((product) => (
            <div
              key={product.id}
              className='min-w-[250px] max-w-[250px] flex-shrink-0'
            >
              <CaruselProductCard
                name={product.name}
                image={product.image}
                category={product.category}
                price={product.price}
                description={product.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaruselProductsDisplay;
