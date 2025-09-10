import { useState, useEffect } from 'react';
import axios from 'axios';


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
  status: 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt?: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        if (user.role !== 'admin') {
          setError('Access denied. Admin privileges required.');
        }
      } catch (err) {
        setError('Invalid user data in storage.');
      }
    } else {
      setError('Please log in to access this page.');
    }
  }, []);

  
  useEffect(() => {
    if (currentUser?.role !== 'admin') return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/orders');
        
        const validOrders = response.data.map((order: Order) => ({
          ...order,
          total: order.total || 0,
          items: order.items || [], 
          shippingAddress: order.shippingAddress || {
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          }
        }));
        setOrders(validOrders);
        setError(null);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const updateOrderStatus = async (orderId: number, newStatus: Order['status']) => {
    try {
    
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });

      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            : order
        )
      );
    } catch (err) {
      setError('Failed to update order status.');
      console.error('Error updating order:', err);
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);


  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return 'Invalid date';
    }
  };


  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'dispatched': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null || isNaN(amount)) return '$0.00';
    return `$${amount.toFixed(2)}`;
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">{error || 'You do not have permission to access this page.'}</p>
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Manage and update order statuses</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-700 font-medium">Filter by status:</span>
            {(['all', 'pending', 'processing', 'dispatched', 'delivered', 'cancelled'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

    
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-gray-500">No orders match the current filter criteria.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                      {order.updatedAt && (
                        <p className="text-sm text-gray-500">Last updated: {formatDate(order.updatedAt)}</p>
                      )}
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <p className="text-gray-600">
                    {order.shippingAddress.name}<br />
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>

                <div className="p-6 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
                  <ul className="space-y-4">
                    {order.items && order.items.map(item => (
                      <li key={item.id} className="flex justify-between">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">{formatCurrency(item.price)}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="text-lg font-bold text-gray-900">Total: {formatCurrency(order.total)}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Update status:</span>
                    {(['pending', 'processing', 'dispatched', 'delivered', 'cancelled'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(order.id, status)}
                        disabled={order.status === status}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === status
                          ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;