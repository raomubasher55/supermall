import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './ProductCard/Loader';

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoader(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/all-order?status=paid` , {
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const result = await response.json();
        setOrders(result.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }finally{
        setLoader(false)
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
    {loader && <Loader/>}
    <div className="max-w-4xl mx-auto my-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Completed Orders</h1>

    {orders.length > 0 ? (
      orders.map((order , index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="space-y-4">
          {/* Order Date and Status */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Date not available'}</span>
            <span
              className={`bg-green-400 text-white px-2 py-1 rounded-full text-xs font-semibold ${
                order.status === 'paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
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
            <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-semibold">
              {/* {order.status === 'submitted' ? 'Submitted' : 'Pending'} */}
            </span>
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
            <div className="flex justify-between">
              <span>Frozen Amount</span>
              <span className="font-semibold">₹{order.frozenAmount || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Progress</span>
              <span className="font-semibold">{order.currentProgress || '0/0'}</span>
            </div>
          </div>
  
          {/* Task Time Limit */}
          <div className="flex justify-between text-sm">
            <span>Task Time Limit</span>
            <span className="text-blue-500 font-semibold">{order.timeLimit || '00:00:00'}</span>
          </div>
        </div>
      </div>
      ))
    ) : (
      <p className="text-lg text-gray-500">No completed orders found.</p>
    )}
  </div>
    </>
  
  );
};

export default CompletedOrders;
