import React, { useEffect, useState } from 'react'
import Loader from './ProductCard/Loader';
import { loadStripe } from '@stripe/stripe-js';


const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(false);


    const handleOnCheckout = async (number, name, image, task , commission , id) => {
        if (number <= 0) {
          toast.error('Please enter a valid amount');
        }
        try {
          setLoader(true); // Start the loader before starting the async operation
    
          // const stripe = await loadStripe('pk_test_51PrdT1P3NC7isVfIIwTTHH32Z5PnhyGQLbKy1k9XJYCDHqyxiA4uQxBuXRTmLAcEuYhp5KEcRT0dAu3GfznZpBwg00wCF0ALII');
          const stripe = await loadStripe('pk_test_51PsqrxFXuPSbCmw16A3R5QwCbbPRB0hF3aOP836NDXiPjDpCS2t0wBHpq8W16jeezBsZgBPpm2jAQBX6kkI9a1fp0099A2A7x7');
    
          const body = {
            package: number,
            name: name,
            image: image,
            task: task,
            commission: commission,
            id: id
          };
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          };
    
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/checkout`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
    
          const session = await response.json();
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
    
    
          setLoader(false);
    
          const result = await stripe.redirectToCheckout({
            sessionId: session.id
          });
    
    
    
          if (result.error) {
            setError(result.error.message); // Update state with error message
            // toast.error(`Payment Failed due to ${result.error.message}`);
          }
        } catch (error) {
          console.error('Error:', error);
        //   toast.error('An error occurred during the payment process.');
        } finally {
          setLoader(false); // Stop the loader in the finally block to ensure it runs regardless of success or failure
        }
      };



    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoader(true)
                // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/product/allPurchase`, {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/all-orders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const result = await response.json();
                setOrders(result.allOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoader(false)
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            {loader && <Loader />}
            <div className="max-w-4xl mx-auto my-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h1>

                {orders?.length > 0 ? (
                    orders?.map((order, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4">
                            <div className="space-y-4">
                                {/* Order Date and Status */}
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Date not available'}</span>
                                    <span
                                        className={`bg-green-400 text-white px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'paid' ? 'bg-green-200 text-green-800' : order?.status == 'unpaid' ?  'bg-yellow-500 text-yellow-800 ' : 'bg-blue-600 text-white'
                                            }`}>
                                        {/* {order.status} */}
                                        {order.status === 'paid' ? 'Submitted' : order?.status == 'unpaid' ? 'Pending' : 'freeze'}
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
                                        {/* {order.status === 'paid' ? 'Submitted' : order?.status == 'unpaid' ? 'Pending' : 'freeze'} */}
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
                                    {/* <div className="flex justify-between">
                                        <span>Frozen Amount</span>
                                        <span className="font-semibold">₹{order.frozenAmount || '0'}</span>
                                    </div> */}
                                    {/* <div className="flex justify-between">
                                        <span>Current Progress</span>
                                        <span className="font-semibold">{order.currentProgress || '0/0'}</span>
                                    </div> */}
                                </div>

                                {/* Task Time Limit */}
                                <div className="flex justify-between text-sm">
                                    <span>Task Time Limit</span>
                                    <span className="text-blue-500 font-semibold">{order.timeLimit || '00:00:00'}</span>
                                </div>
                            </div>
                           {order?.status == "unpaid" && <div onClick={()=> handleOnCheckout(order?.amount ,order?.name, "https://zaydns.com/cdn/shop/files/8_8fabb852-64a0-4cb8-ac1e-70a40510884e.png?v=1697719081&width=1080", order?.task , order?.commission,  order?._id)} className="bg-color py-2 px-1 text-white rounded-lg text-center mt-2">
                                Payment
                            </div>}
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-500">No orders found.</p>
                )}
            </div>
        </div>
    )
}

export default AllOrder
