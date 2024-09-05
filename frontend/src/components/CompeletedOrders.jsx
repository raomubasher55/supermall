import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/orders?status=paid`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const result = await response.json();
        setOrders(result.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Completed Orders</h1>
    <button onClick={()=>navigate('/unpaid-orders')} className='px-3 py-2 bg-yellow-400 text-white rounded-lg mb-2 '>UnPaid Order </button>

    {orders.length > 0 ? (
      orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-gray-600 text-sm">{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Date not available'}</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${order.status === 'paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {order.status}
            </span>
          </div>
          <div className="flex items-center mb-4 w-full">
            <img src={order.image || "https://placehold.co/80x80"} alt={order.productName} className="mr-2 rounded w-[15%] md:w-[10%]" />
            <div className="text-gray-600 font-semibold">{order.productName}</div>
          </div>
          <div className="w-full border-t border-gray-200 py-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total order:</span>
              <span className="text-green-600 font-semibold">₹{order.amount}</span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-lg text-gray-500">No completed orders found.</p>
    )}
  </div>
  
  );
};

export default CompletedOrders;
