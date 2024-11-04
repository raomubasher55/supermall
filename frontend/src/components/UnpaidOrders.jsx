import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './ProductCard/Loader';

const UnpaidOrders = () => {
  const [orders, setOrders] = useState([]);
  const [timers, setTimers] = useState({});
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoader(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/all-order?status=unpaid`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const result = await response.json();
        setOrders(result.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate the remaining time for each order
  const calculateRemainingTime = (order) => {
    const createdAt = new Date(order.createdAt);
    const now = new Date();
    const elapsedSeconds = Math.floor((now - createdAt) / 1000);
    const remainingSeconds = 3600 - elapsedSeconds; // Assuming 1 hour limit
    return remainingSeconds > 0 ? remainingSeconds : 0; // Ensure non-negative value
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      orders.forEach((order) => {
        newTimers[order._id] = calculateRemainingTime(order);
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const handlePayment = (sessionId) => {
    if (sessionId) {
      const paymentUrl = `https://checkout.stripe.com/c/pay/${sessionId}`;
      window.location.href = paymentUrl;
    } else {
      console.error('Invalid sessionId:', sessionId);
      alert('Payment session is invalid. Please try again.');
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="max-w-4xl mx-auto my-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Unpaid Orders</h1>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <div className="space-y-4">
                {/* Order Date and Status */}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Date not available'}</span>
                  <span
                    className={`bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'unpaid' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
        
                {/* Product Image and Name */}
                <div className="flex items-center space-x-4">
                  <img
                    src={order.image || 'https://placehold.co/80x80'}
                    alt={order.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{order.productName}</h3>
                    <p className="text-sm text-gray-500">97 x 6</p>
                  </div>
                </div>
        
                {/* Order Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order Total</span>
                    <span className="font-semibold">₹{order.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission</span>
                    <span className="font-semibold">₹{order.commission || '0'}</span>
                  </div>
                </div>
        
                {/* Task Time Limit */}
                <div className="flex justify-between text-sm">
                  <span>Task Time Limit</span>
                  <span className="text-blue-500 font-semibold">
                    {timers[order._id] !== undefined && timers[order._id] >= 0
                      ? new Date(timers[order._id] * 1000).toISOString().substr(11, 8)
                      : '00:00:00'}
                  </span>
                </div>
              </div>

              <div className="bg-color py-2 px-1 text-white rounded-lg text-center mt-2">
                Payment
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No unpaid orders found.</p>
        )}
      </div>
    </>
  );
};

export default UnpaidOrders;
  