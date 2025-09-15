import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FreshOrganicVegatablesCard from './freshorganiccard';
import bananas from '../../assets/caruselimages/bananas.png';
import grapes from '../../assets/products/grapes.jpg';
import parsely from '../../assets/caruselimages/parsely.jpg';
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

const products: Product[] = 
[
  { id: 1, name: 'Fresh Grapes', image: grapes, category: 'Fruits', price: '$4.99/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 2, name: 'Parsely', image: parsely, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 3, name: 'Potatoes', image: potatoes, category: 'Bread', price: '$1.99/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 4, name: 'Bell Paper', image: bellPaper, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 5, name: 'Bananas', image: bananas, category: 'Fruits', price: '$1.29/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 6, name: 'Tomatoes', image: tomatoes, category: 'Fruits', price: '$1.29/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 7, name: 'Potatoes', image: potatoes, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 8, name: 'Fresh Grapes', image: grapes, category: 'Fruits', price: '$4.99/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 9, name: 'Parsely', image: parsely, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 10, name: 'Potatoes', image: potatoes, category: 'Bread', price: '$1.99/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididuntg.' },
  { id: 11, name: 'Bell Paper', image: bellPaper, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 12, name: 'Bananas', image: bananas, category: 'Fruits', price: '$1.29/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 13, name: 'Tomatoes', image: tomatoes, category: 'Fruits', price: '$1.29/kg', description: 'JLorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 14, name: 'Potatoes', image: potatoes, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 15, name: 'Fresh Grapes', image: grapes, category: 'Fruits', price: '$4.99/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 16, name: 'Parsely', image: parsely, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 17, name: 'Potatoes', image: potatoes, category: 'Bread', price: '$1.99/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 18, name: 'Bell Paper', image: bellPaper, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 19, name: 'Bananas', image: bananas, category: 'Fruits', price: '$1.29/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt' },
  { id: 20, name: 'Tomatoes', image: tomatoes, category: 'Fruits', price: '$1.29/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' }

  ,{ id: 21, name: 'Fresh Grapes', image: grapes, category: 'Fruits', price: '$4.99/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 22, name: 'Parsely', image: parsely, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 23, name: 'Potatoes', image: potatoes, category: 'Bread', price: '$1.99/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 24, name: 'Bell Paper', image: bellPaper, category: 'Vegetables', price: '$2.49/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' },
  { id: 25, name: 'Bananas', image: bananas, category: 'Fruits', price: '$1.29/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt' },
  { id: 26, name: 'Tomatoes', image: tomatoes, category: 'Fruits', price: '$1.29/kg', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.' }
];

const FreshOrganicVegatables: React.FC = () => {

  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const navigate = useNavigate();


useEffect(() => {
  if (cardRef.current && scrollRef.current) {
    const first = cardRef.current;
    const second = first.nextElementSibling as HTMLElement | null;

    if (second) {
      setCardWidth(second.offsetLeft - first.offsetLeft); 
    } else {
      setCardWidth(first.offsetWidth);
    }
  }
}, []);


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
            <span className='font-bold ' style={{fontSize:"bold"}}> ←   </span>
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
                image={product.image}
                category={product.category}
                price={`$${parseFloat(product.price.replace(/[^0-9.]/g, "")).toFixed(2)}`}
                description={product.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreshOrganicVegatables;
