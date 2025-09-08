import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("loggedInUserId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders?userId=${userId}&_sort=createdAt&_order=desc`);
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h2 className="text-2xl font-bold mb-6">📦 Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Order #{order.id}</h3>
              <ul className="list-disc pl-6">
                {order.items.map((item: any, idx: number) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} — ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">Total: ${order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-sm text-blue-600 mt-1">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
