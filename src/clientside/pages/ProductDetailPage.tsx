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
  const [quantity, setQuantity] = useState(1); 

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images?.[0] || "",
        quantity: quantity, 
      })
    );
  };


  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
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
    <div className="max-w-9xl mx-auto px-4 py-8 mt-50">
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg shadow-md"
          />
        </div>

      
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <p className="text-2xl font-semibold text-[#FDC700]">
            ${Number(product.price).toFixed(2)}
          </p>
          
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-1 border-l border-r border-gray-300">
                {quantity}
              </span>
              <button 
                onClick={increaseQuantity}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            {product.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt."}
          </p>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Category:</span> {product.category?.name || "Uncategorized"}
            </p>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-[#FDC700] hover:bg-yellow-500 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;