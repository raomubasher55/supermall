import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/grab_1.png';
import image2 from '../assets/grab_2.png';
import image3 from '../assets/grab_3.png';

const OrderDetailsModal = ({ orderDetail, setShowModal }) => {
  const navigate = useNavigate();

  const images = [image1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    orderCount();
  
  
    if (!error) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          if (prevIndex < images.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            setShowDetails(true); // Show the order details after the last image.
            return prevIndex;
          }
        });
      }, 2000); // Change image every 2 seconds.
  
      // Cleanup function to clear the interval when the component unmounts or dependencies change
      return () => clearInterval(interval);
    } 
  }, [error, images.length]); // Added dependencies
  
  const orderCount = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/unpaid-order`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
  
      const data = await response.json();
      console.log(data.count);
  
      if (data.count > 0) {
        // console.log("Please First");
        navigate('/all-orders')
        setError(true);
      }
    } catch (error) {

      setError(true);
    }
  };
  

  const createOrder = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderDetail),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();

      if (data.success) {
        navigate('/all-orders');
      } else {
        console.error('Order creation failed:', data.message);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {

  }, [])


  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md bg-white rounded-lg">
          {/* Image Carousel */}
          {!showDetails && (
            <div className="fixed flex flex-col inset-0 z-50 items-center justify-center bg-black bg-opacity-50">
              <img
                src={images[currentImageIndex]}
                alt={`Product ${currentImageIndex + 1}`}
                className="w-full h-[55%] object-fit rounded-lg p-12"
              />
              <p className="text-white text-lg mt-4">
                {currentImageIndex === 0 && 'Choosing a business'}
                {currentImageIndex === 1 && 'Matching the product'}
                {currentImageIndex === 2 && 'Match Successfully'}
              </p>
            </div>
          )}

          {/* Order Details */}
          {showDetails && (
            <div className="w-full">
              <h1 className="text-2xl font-bold text-white bg-color mb-4 py-3 pl-4">Order Details</h1>
              <div className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Number</span>
                    <span className="text-black">{orderDetail?.order_id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Product Name</span>
                    <span className="text-black">{orderDetail?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Status</span>
                    <span className="font-semibold text-yellow-600">{orderDetail?.order_status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Price</span>
                    <span className="font-semibold text-pink-500">₹ {orderDetail?.investAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Commission</span>
                    <span className="font-semibold text-pink-500">₹ {orderDetail?.commission}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between p-4">
                <button
                  className="w-1/2 text-black mr-2 p-2 border rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  CANCEL
                </button>
                <button
                  onClick={() => {
                    createOrder();
                    setShowModal(false);
                  }}
                  className="w-1/2 p-2 rounded-lg ml-2 bg-color hover:bg-pink-600 text-white">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetailsModal;
