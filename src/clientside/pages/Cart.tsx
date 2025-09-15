import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/Hooks";
import { 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleItemSelection, 
  selectAllItems, 
  deselectAllItems, 
  removeSelectedItems 
} from "../../features/cart/CartSlice";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Cart: React.FC = () => {
  const [allSelected, setAllSelected] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);

  React.useEffect(() => {
    if (items.length > 0) {
      setAllSelected(items.every(item => item.selected));
    } else {
      setAllSelected(false);
    }
  }, [items]);

  const selectedItems = items.filter(item => item.selected);
  const selectedTotal = selectedItems.reduce((sum, item) => {
    const price = typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  const selectedCount = selectedItems.length;

  const handleToggleSelectAll = () => {
    if (allSelected) {
      dispatch(deselectAllItems());
    } else {
      dispatch(selectAllItems());
    }
    setAllSelected(!allSelected);
  };

  const handleCheckout = () => {
    if (selectedCount > 0) {
      navigate('/check-out', { 
        state: { 
          orderItems: selectedItems, 
          orderTotal: selectedTotal 
        } 
      });

      setTimeout(() => {
        dispatch(removeSelectedItems());
      }, 100);
    } else {
      navigate('/check-out', { 
        state: { 
          orderItems: items, 
          orderTotal: totalPrice 
        } 
      });

      setTimeout(() => {
        dispatch(clearCart());
      }, 100);
    }
  };

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

      <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-xl shadow-md">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="select-all"
            checked={allSelected}
            onChange={handleToggleSelectAll}
            className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
          />
          <label
            htmlFor="select-all"
            className="text-lg font-medium cursor-pointer"
          >
            Select all ({items.length} items)
          </label>
        </div>
        
        {selectedCount > 0 && (
          <button 
            onClick={() => dispatch(removeSelectedItems())}
            className="text-red-500 hover:text-red-700 font-medium flex items-center"
          >
            <Trash2 size={18} className="mr-1" />
            Remove Selected ({selectedCount})
          </button>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-xl">
          <p className="font-semibold text-blue-800">
            {selectedCount} item{selectedCount !== 1 ? 's' : ''} • 
            Total: ${selectedTotal.toFixed(2)}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => {
          const price = typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => dispatch(toggleItemSelection({ id: item.id }))}
                  className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                )}
                
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">${price.toFixed(2)}</p>
                  {item.selected && (
                    <span className="text-xs text-green-600 font-medium">Selected</span>
                  )}
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
                title="Remove item"
              >
                <Trash2 />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-xl flex justify-between items-center">
        <div>
          <p className="font-semibold">Total Items: {totalItems}</p>
          <p className="font-semibold">
            Total Price: ${typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00"}
          </p>
          
          {selectedCount > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-300">
              <p className="text-sm text-blue-700">
                Selected: {selectedCount} item{selectedCount !== 1 ? 's' : ''} (${selectedTotal.toFixed(2)})
              </p>
            </div>
          )}
        </div>
          
        <div className="flex flex-col">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Clear Cart
          </button>

          <button 
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-3 rounded mt-4"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
