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
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showTabContent, setShowTabContent] = useState(false);

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

  // useEffect(() => {
  //   if (showConfirmation) {

  //     const timer = setTimeout(() => {
  //       setShowConfirmation(false);
  //       setActiveTab("current");
  //       setShowTabContent(true);
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showConfirmation]);

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
        setShowTabContent(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

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
      <div className="w-full max-w-4xl mt-30">
        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => {
              setActiveTab("user");
              setShowConfirmation(false);
              setShowTabContent(true);
            }}
            className={`font-semibold cursor-pointer ${
              activeTab === "user"
                ? "text-[#81C408] underline"
                : "text-gray-700"
            }`}
          >
            Active User
          </button>
          <button
            onClick={() => {
              setActiveTab("current");
              setShowConfirmation(false);
              setShowTabContent(true);
            }}
            className={`font-semibold cursor-pointer ${
              activeTab === "current"
                ? "text-[#81C408] underline"
                : "text-gray-700"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => {
              setActiveTab("history");
              setShowConfirmation(false);
              setShowTabContent(true);
            }}
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
          {showConfirmation && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-bold text-green-800">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-green-700">
                    Your order has been received and is currently{" "}
                    <strong>pending</strong>.
                  </p>

                  {undeliveredOrders.length > 0 && (
                    <div className="bg-green-100 p-3 rounded-lg mt-3">
                      <h3 className="text-md font-semibold mb-2 text-green-800">
                        Latest Order
                      </h3>
                      <ul className="list-disc pl-6 text-left text-green-700">
                        {undeliveredOrders[0].items.map((item: any) => (
                          <li key={item.id}>
                            {item.name} × {item.quantity} — ${fmt(item.price)}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 font-semibold text-green-800">
                        Total: ${fmt(undeliveredOrders[0].total)}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        Placed at:{" "}
                        {new Date(
                          undeliveredOrders[0].createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showTabContent && (
            <>
              {activeTab === "user" &&
                (currentUser?.id ? (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto rounded shadow">
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-[#81C408] text-white">
                          <tr>
                            <th className="py-3 px-4 text-left">Field</th>
                            <th className="py-3 px-4 text-left">Value</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                          <tr className="hover:bg-gray-50 transition">
                            <td className="py-2 px-4 border-t font-semibold">
                              ID
                            </td>
                            <td className="py-2 px-4 border-t">
                              {currentUser.id}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition">
                            <td className="py-2 px-4 border-t font-semibold">
                              Name
                            </td>
                            <td className="py-2 px-4 border-t">
                              {currentUser.name}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition">
                            <td className="py-2 px-4 border-t font-semibold">
                              Email
                            </td>
                            <td className="py-2 px-4 border-t">
                              {currentUser.email}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition">
                            <td className="py-2 px-4 border-t font-semibold">
                              Role
                            </td>
                            <td className="py-2 px-4 border-t">
                              <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {currentUser.role}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No user logged in
                    </h3>
                    <p className="text-gray-500">
                      Please log in to view user information
                    </p>
                  </div>
                ))}

              {activeTab === "current" && (
                <>
                  {loadingOrders ? (
                    <p>Loading undelivered orders...</p>
                  ) : undeliveredOrders.length === 0 ? (
                    <p>No undelivered orders found.</p>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#81C408] mb-2">
                        Undelivered Orders
                      </h3>
                      <div className="overflow-x-auto rounded shadow">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead className="bg-[#81C408] text-white">
                            <tr>
                              <th className="py-3 px-4 text-left">Order ID</th>
                              <th className="py-3 px-4 text-left">
                                Date Placed
                              </th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Items</th>
                              <th className="py-3 px-4 text-left">Total</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm text-gray-700">
                            {undeliveredOrders.map((order) => (
                              <tr
                                key={order.id}
                                className="hover:bg-gray-50 transition"
                              >
                                <td className="py-2 px-4 border-t">
                                  {order.id}
                                </td>
                                <td className="py-2 px-4 border-t">
                                  {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td className="py-2 px-4 border-t">
                                  <span
                                    className={`font-semibold px-2 py-1 rounded text-white
                                ${
                                  order.status === "pending"
                                    ? "bg-yellow-500"
                                    : order.status === "delivered"
                                    ? "bg-green-600"
                                    : order.status === "processed"
                                    ? "bg-blue-500"
                                    : order.status === "dispatched"
                                    ? "bg-purple-600"
                                    : "bg-gray-400"
                                }
                              `}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td className="py-2 px-4 border-t">
                                  <ul className="list-disc pl-4 space-y-1">
                                    {order.items.map((item: any) => (
                                      <li key={item.id}>
                                        {item.name} × {item.quantity} — $
                                        {fmt(item.price)}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="py-2 px-4 border-t font-semibold">
                                  ${fmt(order.total)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === "history" && (
                <>
                  {loadingOrders ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                      <span className="ml-3 text-gray-600">
                        Loading delivered orders...
                      </span>
                    </div>
                  ) : deliveredOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No delivered orders
                      </h3>
                      <p className="text-gray-500">
                        Your delivered orders will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-[#81C408] ">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                              >
                                Order Details
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                              >
                                Items
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {deliveredOrders.map((order) => (
                              <tr
                                key={order.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <svg
                                        className="h-6 w-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        ></path>
                                      </svg>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        Order #{order.id}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {order.items.length} items
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-900 max-w-xs">
                                    {order.items.slice(0, 2).map((item) => (
                                      <div key={item.id} className="truncate">
                                        {item.name} × {item.quantity}
                                      </div>
                                    ))}
                                    {order.items.length > 2 && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        +{order.items.length - 2} more items
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Delivered
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                  ${fmt(order.total)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Showing {deliveredOrders.length} delivered orders
                          </p>
                          <div className="flex space-x-4">
                            <button className="text-xs text-gray-500 hover:text-gray-700">
                              Previous
                            </button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
