import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderConfirmation: React.FC = () => {
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders?_sort=createdAt&_order=desc&_limit=1");
        setLatestOrder(res.data[0]);
      } catch (error) {
        console.error("Failed to fetch latest order", error);
      }
    };

    fetchLatestOrder();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-50">
      <h2 className="text-2xl font-bold text-green-700 mb-4"> Order Placed Successfully!</h2>
      <p className="text-gray-700 mb-6">Your order has been received and is currently <strong>pending</strong>.</p>

      {latestOrder && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <ul className="list-disc pl-6">
            {latestOrder.items.map((item: any) => (
              <li key={item.id}>
                {item.name} × {item.quantity} — ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: ${latestOrder.total.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Placed at: {new Date(latestOrder.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
