import { useState, useEffect } from "react";
import axios from "axios";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number | null;
  status: "pending" | "processing" | "dispatched" | "delivered" | "cancelled";
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt?: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "customer";
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        if (user.role !== "admin") {
          setError("Access denied. Admin privileges required.");
        }
      } catch (err) {
        setError("Invalid user data in storage.");
      }
    } else {
      setError("Please log in to access this page.");
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role !== "admin") return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/orders");

        const validOrders = response.data.map((order: Order) => ({
          ...order,
          total: order.total || 0,
          items: order.items || [],
          shippingAddress: order.shippingAddress || {
            name: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
        }));
        setOrders(validOrders);
        setError(null);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const updateOrderStatus = async (
    orderId: number,
    newStatus: Order["status"]
  ) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );
    } catch (err) {
      setError("Failed to update order status.");
      console.error("Error updating order:", err);
    }
  };

  const openEditModal = (order: Order) => {
    setEditingOrder({
      ...order,
      total: order.total || 0,
      shippingAddress: {
        name: order.shippingAddress?.name || "",
        address: order.shippingAddress?.address || "",
        city: order.shippingAddress?.city || "",
        state: order.shippingAddress?.state || "",
        zipCode: order.shippingAddress?.zipCode || "",
        country: order.shippingAddress?.country || "",
      },
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const validateEditOrder = () => {
    const newErrors: { [key: string]: string } = {};

    if (!editingOrder?.shippingAddress?.address?.trim())
      newErrors.shippingAddress = "Address is required";
    if (!editingOrder?.shippingAddress?.city?.trim())
      newErrors.shippingCity = "City is required";
    if (!editingOrder?.shippingAddress?.zipCode?.trim())
      newErrors.shippingZipCode = "ZIP Code is required";

    editingOrder?.items?.forEach((item, index) => {
      if (!item.name?.trim())
        newErrors[`itemName-${index}`] = "Item name is required";
      if (!item.price || item.price <= 0)
        newErrors[`itemPrice-${index}`] = "Valid price is required";
      if (!item.quantity || item.quantity <= 0)
        newErrors[`itemQuantity-${index}`] = "Valid quantity is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    if (!validateEditOrder()) return;

    try {
      await axios.patch(`http://localhost:3000/orders/${editingOrder.id}`, {
        ...editingOrder,
        updatedAt: new Date().toISOString(),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === editingOrder.id ? editingOrder : order
        )
      );

      closeEditModal();
    } catch (err) {
      setError("Failed to update order.");
      console.error("Error updating order:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editingOrder) return;

    const { name, value } = e.target;

    if (name.startsWith("shippingAddress.")) {
      const addressField = name.split(".")[1];
      setEditingOrder({
        ...editingOrder,
        shippingAddress: {
          ...editingOrder.shippingAddress,
          [addressField]: value,
        },
      });
    } else if (name === "total") {
      setEditingOrder({
        ...editingOrder,
        [name]: parseFloat(value) || 0,
      });
    } else if (name === "createdAt") {
      setEditingOrder({
        ...editingOrder,
        [name]: value,
      });
    } else {
      setEditingOrder({
        ...editingOrder,
        [name]: value,
      });
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    if (!editingOrder) return;

    const updatedItems = [...editingOrder.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "price" || field === "quantity" ? Number(value) : value,
    };

    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setEditingOrder({
      ...editingOrder,
      items: updatedItems,
      total: newTotal,
    });
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (err) {
      return "Invalid date";
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "dispatched":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === undefined || typeof amount !== "number") {
      return "$0.00";
    }
    return `$${amount.toFixed(2)}`;
  };

  if (currentUser?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            {error || "You do not have permission to access this page."}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto ">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-9xl mx-auto">
          <div className="">
            <h1 className="text-3xl ml-4 font-bold text-gray-900">
              Order Management
            </h1>
            <p className="text-gray-600">Manage and update order statuses</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="CurrentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow mb-2 p-2 md:p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium">
                Filter by status:
              </span>
              {(
                [
                  "all",
                  "pending",
                  "processing",
                  "dispatched",
                  "delivered",
                  "cancelled",
                ] as const
              ).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2 py-0.5 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterStatus === status
                      ? "bg-[#4A5075] text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No orders found
                </h3>
                <p className="mt-1 text-gray-500">
                  No orders match the current filter criteria.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto p-1">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#4A5075]">
                    <tr>
                      <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="md:px-6 md:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Address
                      </th>
                      <th className="md:px-6 md:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Items
                      </th>
                      <th className="md:px-6 md:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Total
                      </th>
                      <th className="md:px-6 md:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Date
                      </th>
                      <th className="md:px-6 md:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="md:px-6 md:py-4 text-sm text-left font-semibold text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-green-50 transition-colors duration-200"
                      >
                        <td className="px-4 py-8 whitespace-nowrap text-sm font-medium text-gray-900">
                          <span className="bg-gray-100 px-6 rounded-md text-gray-700">
                            #{order.id}
                          </span>
                        </td>
                        <td className="whitespace-nowrap text-sm py-4 text-gray-900">
                          <div>
                            <span className="font-medium text-gray-800">
                              {order.shippingAddress.name}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state}
                            </span>
                          </div>
                        </td>

                        <td className="text-sm text-gray-900">
                          <div className="max-w-xs">
                            {order.items.slice(0, 2).map((item, index) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center"
                              >
                                <span className=" ml-3 truncate text-gray-700">
                                  {item.name}
                                </span>
                                <span className="mr-4 text-gray-500 bg-gray-100 rounded text-xs">
                                  ×{item.quantity}
                                </span>
                              </div>
                            ))}
                            {order.items.length > 2 && (
                              <p className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded">
                                +{order.items.length - 2} more items
                              </p>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py- whitespace-nowrap text-sm font-semibold text-green-700">
                          {formatCurrency(order.total)}
                        </td>

                        <td className="px- py- whitespace-nowrap text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </td>

                        <td className="px-2 py- whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>

                        <td className="px- py- whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <div className="relative">
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  updateOrderStatus(
                                    order.id,
                                    e.target.value as Order["status"]
                                  )
                                }
                                className="text-xs border border-gray-300 rounded-md py-1 md:px-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-green-600 hover:text-green-800 text-xs bg-green-100 px-1 py-1 rounded-md hover:bg-green-200 transition-colors"
                            >
                              View
                            </button>
                            <button
                              onClick={() => openEditModal(order)}
                              className="text-blue-600 hover:text-blue-800 text-xs bg-blue-100 px-1 mr-2 py-1 rounded-md hover:bg-blue-200 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {isEditModalOpen && editingOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-[#4A5075] px-6 py-4 rounded-t-lg flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    Edit Order #{editingOrder.id}
                  </h3>
                  <button
                    onClick={closeEditModal}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                      Shipping Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          name="shippingAddress.address"
                          value={editingOrder.shippingAddress.address || ""}
                          onChange={(e) => {
                            handleInputChange(e);
                            if (errors.shippingAddress) {
                              setErrors((prev) => ({
                                ...prev,
                                shippingAddress: "",
                              }));
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.shippingAddress && (
                          <span className="text-red-500 text-xs">
                            {errors.shippingAddress}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="shippingAddress.city"
                          value={editingOrder.shippingAddress.city || ""}
                          onChange={(e) => {
                            handleInputChange(e);
                            if (errors.shippingCity) {
                              setErrors((prev) => ({
                                ...prev,
                                shippingCity: "",
                              }));
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.shippingCity && (
                          <span className="text-red-500 text-xs">
                            {errors.shippingCity}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="shippingAddress.zipCode"
                          value={editingOrder.shippingAddress.zipCode || ""}
                          onChange={(e) => {
                            handleInputChange(e);
                            if (errors.shippingZipCode) {
                              setErrors((prev) => ({
                                ...prev,
                                shippingZipCode: "",
                              }));
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.shippingZipCode && (
                          <span className="text-red-500 text-xs">
                            {errors.shippingZipCode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                      Order Items
                    </h4>
                    <div className="space-y-3">
                      {editingOrder.items.map((item, index) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 bg-gray-50 rounded-md"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) =>
                                handleItemChange(index, "name", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors[`itemName-${index}`] && (
                              <span className="text-red-500 text-xs">
                                {errors[`itemName-${index}`]}
                              </span>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price
                            </label>

                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => {
                                handleItemChange(
                                  index,
                                  "price",
                                  e.target.value
                                );
                                if (errors[`itemPrice-${index}`]) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    [`itemPrice-${index}`]: "",
                                  }));
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors[`itemPrice-${index}`] && (
                              <span className="text-red-500 text-xs">
                                {errors[`itemPrice-${index}`]}
                              </span>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quantity
                            </label>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() =>
                                  handleItemChange(
                                    index,
                                    "quantity",
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="px-2 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                              >
                                -
                              </button>
                              <input
                                // type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  handleItemChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                  );
                                  if (errors[`itemQuantity-${index}`]) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      [`itemQuantity-${index}`]: "",
                                    }));
                                  }
                                }}
                                min="1"
                                className="w-16 px-2 py-1 border-t border-b border-gray-300 text-center"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleItemChange(
                                    index,
                                    "quantity",
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                            {errors[`itemQuantity-${index}`] && (
                              <span className="text-red-500 text-xs">
                                {errors[`itemQuantity-${index}`]}
                              </span>
                            )}
                          </div>
                          <div className="flex items-end">
                            <span className="text-sm font-medium text-gray-700">
                              Subtotal:{" "}
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                      Order Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          name="status"
                          value={editingOrder.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Amount
                        </label>
                        <input
                          type="number"
                          name="total"
                          value={editingOrder.total || 0}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="datetime-local"
                          name="createdAt"
                          value={
                            editingOrder.createdAt
                              ? new Date(editingOrder.createdAt)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="px-3 py-1 md:px-6 md:py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className=" px-2 py-2 md:px-6 md:py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {selectedOrder && (
            <div className="fixed inset-0 bg-green-100 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 ">
              <div className="mt-40 md:mt-0 bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 border border-green-200 md:ml-30 ">
                <div className="bg-[#81C408] px-6 py-4 rounded-t-xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">
                      Order #{selectedOrder.id}
                    </h3>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Shipping Address
                    </h4>
                    <div className="text-gray-600 space-y-1">
                      <p className="font-medium">
                        {selectedOrder.shippingAddress.name}
                      </p>
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>
                        {selectedOrder.shippingAddress.city},{" "}
                        {selectedOrder.shippingAddress.state}{" "}
                        {selectedOrder.shippingAddress.zipCode}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Order Items
                    </h4>
                    <ul className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center bg-white p-3 rounded-md border"
                        >
                          <div>
                            <span className="font-medium text-gray-800">
                              {item.name}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              × {item.quantity}
                            </span>
                          </div>
                          <span className="font-semibold text-green-700">
                            {formatCurrency(item.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">
                        Total Amount:
                      </span>
                      <span className="text-2xl font-bold text-green-700">
                        {formatCurrency(selectedOrder.total)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Current Status:
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
