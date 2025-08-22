import React, { useState, useEffect } from 'react';
import ProductCard from './ProductsCards';

interface Product {
  id: string;
  name: string;
  images: string[];
  category: { name: string };
  price: string;
  description?: string;
}

const categories = ['All Products', 'Vegetables', 'Fruits', 'Bread', 'Meat'];

const ProductSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [products, setProducts] = useState<Product[]>([]);

  // Function to get products from localStorage
  const getProductsFromStorage = (): Product[] => {
    try {
      const storedProducts = localStorage.getItem('products');
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('Error reading products from localStorage:', error);
      return [];
    }
  };


  useEffect(() => {

    setProducts(getProductsFromStorage());

  
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'products') {
        setProducts(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    

    const handleCustomStorageChange = () => {
      setProducts(getProductsFromStorage());
    };
    
    window.addEventListener('localStorageChange', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange as EventListener);
    };
  }, []);

 const filteredProducts = 
  selectedCategory === 'All Products'
    ? products
    : products.filter((p) => p.category.name === selectedCategory);

  return (
    <section className='bg-[#FFFFF] mx-auto px-4 mt-20'>
      <div className='max-w-full w-[1320px] mx-auto'>
        <div className='flex flex-col md:flex-row justify-between mb-5'>
          <h2 className='text-[27px] font-semibold text-[#45595B] mb-10'>
            Our Organic Products
          </h2>

          <div className='flex gap-6 flex-wrap'>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-2 h-fit text-left rounded-full border ${
                  selectedCategory === cat
                  ? 'bg-[#FDC700] text-white'
                  : 'bg-gray-100 text-[#456D84] border-0'
                } transition-colors duration-500`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.images && product.images.length > 0 ? product.images[0] : ''}
                category={product.category.name}
                price={`$${product.price}`}
                description={product.description || 'Fresh organic product'}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500 text-lg">No products found. Add some products to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;