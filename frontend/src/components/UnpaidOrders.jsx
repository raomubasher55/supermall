import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnpaidOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/product/orders?status=unpaid');
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
    <div className="max-w-4xl mx-auto my-8">
  <h1 className="text-2xl font-bold text-gray-800 mb-6">Unpaid Orders</h1>
  <button onClick={()=>navigate('/compeleted-orders')} className='px-3 py-2 bg-green-500 text-white rounded-lg mb-2 '>Paid Order </button>
  {orders.length > 0 ? (
    orders.map((order) => (
      <div
        key={order._id}
        className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200"
      >
        <div className="flex items-center justify-between w-full mb-2">
          <span className="text-gray-600 text-sm">{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Date not available'}</span>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${order.status === 'unpaid' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
            {order.status}
          </span>
        </div>
        <div className="flex items-center mb-4 w-full">
          <img src={order.image || "https://placehold.co/80x80"} alt={order.productName} className="mr-2 rounded w-[15%] md:w-[10%]" />
          <div className="text-gray-600 font-semibold">{order.productName}</div>
        </div>
        <div className="w-full border-t border-gray-200 py-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-red-500 font-semibold">₹{order.amount}</span>
          </div>
       
        </div>
      </div>
    ))
  ) : (
    <p className="text-lg text-gray-500">No unpaid orders found.</p>
  )}
</div>

  );
};

export default UnpaidOrders;
