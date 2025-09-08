import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/Hooks";
import { removeFromCart, updateQuantity, clearCart } from "../../../features/cart/CartSlice";
import { Trash2 } from "lucide-react";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalItems, totalPrice } = useAppSelector(
    (state) => state.cart
  );



  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-50">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600">Your cart is empty.</p>
      </div>

    );

  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-40">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

         
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                  )
                }
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                –
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>

        
            <button
              onClick={() => dispatch(removeFromCart({ id: item.id }))}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>

      
      <div className="mt-6 p-4 bg-gray-100 rounded-xl flex justify-between items-center">
        <div>
          <p className="font-semibold">Total Items: {totalItems}</p>
          <p className="font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
