import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentStatus = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');

    const navigate = useNavigate();

  
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/update-purchase`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, status: 'paid' }) // Send status as 'paid'
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch payment details');
        }
  
        const result = await response.json();
        if (result.success) {
          setPaymentDetails(result.details);
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };
  
    if (sessionId) {
      fetchPaymentDetails();
    }
  }, [sessionId]);

  const truncateSessionId = (id) => {
    if (id) {
      return id.substring(0, 10) + '...'; // Adjust length as needed
    }
    return 'N/A';
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
        
        {paymentDetails ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <img
                src={paymentDetails.image || "https://placehold.co/100x100"}
                alt={paymentDetails.productName || 'Product Image'}
                className="w-24 h-24 object-cover mb-4 rounded"
              />
              <p className="text-lg font-semibold text-gray-800">
                <span className="font-semibold">Product Name:</span> {paymentDetails.productName || 'N/A'}
              </p>
            </div>
            
            <p className="text-gray-700">
              <span className="font-semibold">Session ID:</span> {truncateSessionId(paymentDetails.sessionId)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {paymentDetails.customerEmail}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Amount:</span> ₹{paymentDetails.amount}
            </p>
            <p className={`text-gray-700`}>
              <span className="font-semibold">Status:</span> {paymentDetails.status}
            </p>
            
            {/* Display other payment details here */}
          </div>
        ) : (
          <p className="text-gray-500">Loading payment details...</p>
        )}
        
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Go Back to Home
        </button>

        <button
          onClick={() =>navigate('/compeleted-orders')}
          className="mt-6 bg-green-500 mx-2 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
        >
         See All Paid Order
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
