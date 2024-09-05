import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Fail = () => {
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');

    const navigate = useNavigate();

  useEffect(() => {
    const updatePaymentStatus = async (status) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/update-purchase`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, status }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update payment status');
        }
  
        const result = await response.json();
        console.log('Payment status updated:', result);
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
    };
  
    if (sessionId) {
      updatePaymentStatus('unpaid'); // Change status to 'unpaid' on cancellation
    }
  }, [sessionId]);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed or Canceled</h1>
        <p className="text-gray-700 mb-6">
          Unfortunately, your payment was not successful. Please try again or contact support if you continue to experience issues.
        </p>
        <Link to={'/'} className="bg-blue-500 mx-1 text-white font-semibold md:py-2 md:px-4 py-2 px-1 rounded hover:bg-blue-600 transition duration-200">
          Go Back to Home
        </Link>
        <Link  to={'/unpaid-orders'} className="bg-red-500 text-white font-semibold md:py-2 md:px-4 py-2 px-1 rounded hover:bg-red-600 transition duration-200">
          See All Unpaid Orders
        </Link>
      </div>
    </div>
  );
};

export default Fail;
