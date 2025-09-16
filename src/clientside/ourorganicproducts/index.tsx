import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/ProductsSlice";
import type { RootState } from "../../app/Store";
import OurOrganicProductsCard from "./organiccard";

export interface Category {
  id: string;
  name: string;
}

interface OurOrganicProductsProps {
  showSearchBar?: boolean;
  filterByCategory?: boolean;
}

const OurOrganicProducts: React.FC<OurOrganicProductsProps> = ({
  showSearchBar = false,
  filterByCategory = true,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");


  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);


  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        const names = data.map((cat) => cat.name);
        setCategories(["All Products", ...names]);
      })
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  let filteredProducts = products;

  if (filterByCategory && selectedCategory !== "All Products") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.name === selectedCategory
    );
  }

  if (showSearchBar && searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

   if (sortOrder === "asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => parseFloat(`${a.price}`) - parseFloat(`${b.price}`)
    );
  } else if (sortOrder === "desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => parseFloat(`${b.price}`) - parseFloat(`${a.price}`)
    );
  }

  return (
    <section className="bg-[#FFFFF] mx-auto px-4 mt-50">
      <div className="max-w-full w-[1320px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-5">
          <h2 className="text-[27px] font-semibold text-[#45595B] mb-10">
            Our Organic Products
          </h2>

      
          {showSearchBar && (
            <div className="w-full  md:w-sm md:mr-5 mb-4 md:mb-0">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by name..."
                className="w-full md:w-xs px-4 py-2 border-2 border-[#81C408] focus:border-[#81C408] rounded-full text-sm outline-amber-300"
              />
            </div>
          )}

          {showSearchBar && (
            <div className="w-full md:w-sm">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#81C408] rounded-md text-sm focus:border-[#81C408] outline-none text-[#81C408]" 
                >
                  <option value="">Sort by price</option>
                  <option value="desc">Price: High to Low</option>
                  <option value="asc">Price: Low to High</option>

                </select>
            </div>
          )}

          
          {filterByCategory && (
            <div className="flex gap-6 flex-wrap">
              {categories.map((cat, index) => (
                <button
                  key={`${cat}-${index}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-2 h-fit text-left rounded-full border ${
                    selectedCategory === cat
                      ? "bg-[#FDC700] text-white"
                      : "bg-gray-100 text-[#456D84] border-0"
                  } transition-colors duration-500`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        
        <div className="grid grid-cols-1 text-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {loading ? (
            <p className="text-gray-500 text-lg">Loading products...</p>
          ) : error ? (
            <p className="text-red-500 text-lg">Error: {error}</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <OurOrganicProductsCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.images?.[0] || ""}
                category={product.category?.name || "Uncategorized"}
                price={`$${product.price ? parseFloat(`${product.price}`).toFixed(2) : "0.00"}`}
                description={
                  product.description ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt."
                }
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500 text-lg">
                No products found. Add some products to see them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurOrganicProducts;
