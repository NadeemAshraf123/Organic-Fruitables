import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../../features/currentuser/CurrentUserSlice";
import type { RootState } from "../../../app/Store";
import axios from "axios";

const OrderConfirmation: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState<"current" | "history" | "user">(
    "current"
  );
  const [phase, setPhase] = useState<"confirmation" | "tabs">("confirmation");

  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored && (!currentUser || !currentUser.id)) {
      try {
        const parsed = JSON.parse(stored);
        dispatch(setCurrentUser(parsed));
      } catch (err) {
        console.warn("Failed to parse stored user", err);
      }
    }
  }, [dispatch, currentUser]);

  
  useEffect(() => {
    const fetchUserOrders = async (userId: string) => {
      setLoadingOrders(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/orders?userId=${userId}&sort=createdAt&order=asc`
        );
        console.log("orders", res);
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch user orders", error);
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    const userId =
      currentUser?.id ??
      (() => {
        const stored = localStorage.getItem("user");
        if (!stored) return null;
        try {
          return JSON.parse(stored).id;
        } catch {
          return null;
        }
      })();

    if (userId) {
      fetchUserOrders(userId);
    }
  }, [currentUser?.id]);


  useEffect(() => {
    if (phase === "confirmation") {
      const timer = setTimeout(() => {
        setPhase("tabs");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  
  const undeliveredOrders = orders.filter(
    (order) => order.status !== "delivered"
  );
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  const fmt = (v: any) => {
    const n = typeof v === "number" ? v : Number(v);
    return (isNaN(n) ? 0 : n).toFixed(2);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4 mt-20">
      
      {phase === "confirmation" && (
        <div className="bg-white p-6 mt-25 rounded-xl shadow-md text-center w-full max-w-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-700 mb-6">
            Your order has been received and is currently{" "}
            <strong>pending</strong>.
          </p>

          {undeliveredOrders.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold mb-2">Latest Order</h3>
              <ul className="list-disc pl-6 text-left">
                {undeliveredOrders[0].items.map((item: any) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} — ${fmt(item.price)}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-semibold">
                Total: ${fmt(undeliveredOrders[0].total)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Placed at:{" "}
                {new Date(undeliveredOrders[0].createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}

    
      {phase === "tabs" && (
        <div className="w-full max-w-4xl mt-30">
          
          <div className="flex justify-center space-x-6 mb-6">
            <button
              onClick={() => setActiveTab("user")}
              className={`font-semibold cursor-pointer ${
                activeTab === "user"
                  ? "text-[#81C408] underline"
                  : "text-gray-700"
              }`}
            >
              Active User
            </button>
            <button
              onClick={() => setActiveTab("current")}
              className={`font-semibold cursor-pointer ${
                activeTab === "current"
                  ? "text-[#81C408] underline"
                  : "text-gray-700"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`font-semibold cursor-pointer ${
                activeTab === "history"
                  ? "text-[#81C408] underline"
                  : "text-gray-700"
              }`}
            >
              Orders History
            </button>
          </div>

      
          <div className="bg-white p-6 rounded-xl shadow-md">
          
            {activeTab === "user" && (
              currentUser?.id ? (
                <div className="text-left">
                  <p>
                    <strong>ID:</strong> {currentUser.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {currentUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {currentUser.role}
                  </p>
                </div>
              ) : (
                <p className="text-red-600">No user is logged in.</p>
              )
            )}

          
            {activeTab === "current" && (
              <>
                {loadingOrders ? (
                  <p>Loading undelivered orders...</p>
                ) : undeliveredOrders.length === 0 ? (
                  <p>No undelivered orders found.</p>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Undelivered Orders
                    </h3>
                    {undeliveredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-50 p-4 rounded-lg shadow"
                      >
                        <p className="font-medium">Order ID: {order.id}</p>
                        <p className="text-sm text-gray-500">
                          Placed: {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <p className="text-sm">
                          Status:{" "}
                          <span className="font-semibold">{order.status}</span>
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                          {order.items.map((item: any) => (
                            <li key={item.id}>
                              {item.name} × {item.quantity} — ${fmt(item.price)}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 font-semibold">
                          Total: ${fmt(order.total)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            
            {activeTab === "history" && (
              <>
                {loadingOrders ? (
                  <p>Loading delivered orders...</p>
                ) : deliveredOrders.length === 0 ? (
                  <p>No delivered orders found.</p>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Delivered Orders
                    </h3>
                    {deliveredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-50 p-4 rounded-lg shadow"
                      >
                        <p className="font-medium">Order ID: {order.id}</p>
                        <p className="text-sm text-gray-500">
                          Placed: {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                          {order.items.map((item: any) => (
                            <li key={item.id}>
                              {item.name} × {item.quantity} — ${fmt(item.price)}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 font-semibold">
                          Total: ${fmt(order.total)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
