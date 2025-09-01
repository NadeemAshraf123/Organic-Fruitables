import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/ProductsSlice';
import type { RootState } from '../../app/Store';





interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const ProductreduxDashboard = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
   <ul className="grid grid-cols-3 gap-4">
  {items.map(product => (
    <li key={product.id} className="border p-4 rounded shadow">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category.name}</p>
      <p className="text-sm mt-1">{product.description}</p>
      <p className="text-green-600 font-semibold mt-2">Rs {product.price}</p>
      <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded">Add to Cart</button>
    </li>
  ))}
</ul>

  );
};

export default ProductreduxDashboard;
