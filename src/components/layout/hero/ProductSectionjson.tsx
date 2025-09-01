// import React, { useState, useEffect } from 'react';
// import ProductCard from './ProductsCards';
// import type { RootState } from '../../app/store';
// import { fetchProducts } from '../../features/products/ProductsSlice';
// import { useDispatch, useSelector } from 'react-redux';


// interface Product {
//   id: string;
//   name: string;
//   images: string[];
//   category: { name: string };
//   price: string;
//   description?: string;
// }

// const categories = ['All Products', 'Vegetables', 'Fruits', 'Bread', 'Meat'];

// const ProductSection: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All Products');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);


// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:3000/products");
//       const data = await res.json();
//       setProducts(data);

//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   fetchProducts();
// }, []);


//  const filteredProducts = 
//   selectedCategory === 'All Products'
//     ? products
//     : products.filter((p) => p.category.name === selectedCategory);

//   return (
//     <section className='bg-[#FFFFF] mx-auto px-4 mt-20'>
//       <div className='max-w-full w-[1320px] mx-auto'>
//         <div className='flex flex-col md:flex-row justify-between mb-5'>
//           <h2 className='text-[27px] font-semibold text-[#45595B] mb-10'>
//             Our Organic Products
//           </h2>

//           <div className='flex gap-6 flex-wrap'>
//             {categories.map((cat) => (
//               <button 
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-8 py-2 h-fit text-left rounded-full border ${
//                   selectedCategory === cat
//                   ? 'bg-[#FDC700] text-white'
//                   : 'bg-gray-100 text-[#456D84] border-0'
//                 } transition-colors duration-500`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <ProductCard 
//                 key={product.id}
//                 id={product.id}
//                 name={product.name}
//                 image={product.images && product.images.length > 0 ? product.images[0] : ''}
//                 category={product.category.name}
//                 price={`$${product.price}`}
//                 description={product.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt.'}
//               />
//             ))
//           ) : (
//             <div className="col-span-full py-12 text-center">
//               <p className="text-gray-500 text-lg">No products found. Add some products to see them here.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductSection;