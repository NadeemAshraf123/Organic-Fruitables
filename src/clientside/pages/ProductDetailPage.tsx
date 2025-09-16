import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/Hooks";
import { addToCart } from "../../features/cart/CartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  id: string | number;
  name: string;
  images: string[]; 
  price: string | number; 
  description?: string; 
  category?: { name: string };
}


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();


  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
        addToCart({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.images?.[0] || "",
            quantity: 1,
        })
    );
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        console.log("Fetched product:", res.data);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  return (
    <>
      <h1 className="text-[black] text-center text-2xl font-bold mb-6">
        Product Detail Page
      </h1>

      <div className="max-w-4xl mx-auto p-6 mt-70">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
          
          <div className="flex-1">
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">
              {product.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt."}
            </p>

        
            <p className="text-xl font-semibold text-[#FDC700]">
              ${Number(product.price).toFixed(2)}
            </p>

            <p className="text-sm text-gray-500">
              Category: {product.category?.name || "Uncategorized"}
            </p>

            <button
            onClick={handleAddToCart}
            className="bg-[#FDC700] text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
