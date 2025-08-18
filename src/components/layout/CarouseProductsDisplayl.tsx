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
    price: '$4.99/kg',
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
          container.scrollBy({ left: 1072, behavior: 'smooth' })
        }
      }
    }, 4000);

    return () => clearInterval(interval);

  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -1072, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 1072, behavior: 'smooth' });
  };

  return (
    <section className='w-full  px-4  mt-15'>

      <div className=' w-full mx-auto'>


      <div className='flex gap-3 justify-between items-center '>
        <h2 className='text-4xl font-semibold text-[#45595B]'>
          Fresh Organic Vegetables
        </h2>

        <div className='flex gap-3 mt-5'>
          <button
            onClick={scrollLeft}
            className='bg-transparent text-[15px] font-[bold] border border-[#FFB524] hover:bg-[#FFB524] hover:text-[#FFFFFF] text-[#81C408] px-4  rounded-full transition'
          >
            →
          </button>
          <button
            onClick={scrollRight}
            className='bg-transparent text-[15px] border border-[#FFB524] text-[#81C408] px-4 rounded-full hover:bg-[#FFB524] hover:text-[#FFFFFF] transition'
          >
            ←
          </button>
        </div>
      </div>

      <div >
        <div
          ref={scrollRef}
          className='flex gap-6 overflow-x-hidden scrollbar-hide scroll-smooth mt-0'

        >
          {products.map((product) => (
            <div
              key={product.id}
              className='min-w-[230px] max-w-[230px] gap-6 flex'
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
      </div>

    </section>
  );
};

export default CaruselProductsDisplay;
