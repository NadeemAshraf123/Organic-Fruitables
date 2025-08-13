import React, { useState } from 'react';
import ProductCard from './ProductsCards';
import bananas from '../../assets/products/bananas.jpg';
import grapes from '../../assets/products/grapes.jpg';
import oranges from '../../assets/products/oranges.jpg';
import redBarries from '../../assets/products/redBarries.jpg';
import appricot from '../../assets/products/appricot.jpg';
import applefruite from '../../assets/products/applefruite.jpg';
import chickenBreast from '../../assets/products/chickenBreast.jpg';




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
    name: 'Approcot',
    image: `${appricot}`,
    category: 'Vegetables',
    price: '$2.49/kg',
    description: 'Crunchy and full of vitamins.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
  {
    id: 3,
    name: 'Red-Barries',
    image: `${redBarries}`,
    category: 'Bread',
    price: '$1.99/loaf',
    description: 'Freshly baked every morning.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
  {
    id: 4,
    name: 'Chicken Breast',
    image: `${chickenBreast}`,
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
    name: 'Apples',
    image: `${applefruite}`,
    category: 'Fruits',
    price: '$1.29/kg',
    description: 'Freshly baked every morning.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',

  },
   {
    id: 7,
    name: 'Approcot',
    image: `${appricot}`,
    category: 'Fruits',
    price: '$2.49/kg',
    description: 'Crunchy and full of vitamins.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
  {
    id: 8,
    name: 'Oranges',
    image: `${oranges}`,
    category: 'Fruits',
    price: '$2.49/kg',
    description: 'Crunchy and full of vitamins.Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
  },
];

const categories = ['All Products', 'Fruits' , 'Vegetables', 'Bread', 'Meat'];


const ProductSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Products');

    const filteredProducts = 
        selectedCategory === 'All Products'
                ? products
                : products.filter((p) => p.category === selectedCategory);

                return (
                    <section className='max-w-7xl mx-auto px-4 py-10 mt-20'>

                      <div  className='max-w-6xl mx-auto'>



                        <div className='flex flex-col md:flex-row justify-evenly items-center mb-18'>
                            <h2 className='text-3xl font-bold text-[#45595B] mb-4 md:mb-0'>
                                Our Organic Products
                            </h2>

                            <div className='flex gap-10 flex-wrap'>
                                {categories.map((cat) => (
                                    <button 
                                      key={cat}
                                      onClick={() => setSelectedCategory(cat)}
                                      className={`px-4 py-2 rounded-full border ${
                                        selectedCategory === cat
                                        ? 'bg-[#FDC700] text-white'
                                        : 'bg-[#F4F6F8] text-[#456D84] border-0'
                                      } transition-colors duration-500`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"> */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">


                            {filteredProducts.map((product) => (
                                <ProductCard 
                                    key={product.id}
                                    name={product.name}
                                    image={product.image}
                                    category={product.category}
                                    price={product.price}
                                    description={product.description}
                                />
                            ))}
                        </div>
                      </div>

                    </section>
                )
            }
export default ProductSection;
