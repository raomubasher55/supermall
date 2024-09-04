import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDetailsModal = ({orderDetail , setShowModal}) => {
  
  console.log(orderDetail);
  const navigate = useNavigate();
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-black bg-black bg-opacity-50">
      <div className="bg-[#ebebeb] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
         <p className="mb-2">Product Name: {orderDetail.name} </p>
        <p className="mb-2">Order ID: {orderDetail.order_id} </p>
        {/* <p className="mb-2">Order Date: {orderDetail.order_date} </p> */  }
        <span   className="mb-2 px-1 py-1 rounded-lg bg-yellow-100 text-yellow-600">Order Status: {orderDetail.order_status} </span>
        <p className="mb-2">Order Price: {orderDetail.investAmount} </p>
        <p className="mb-2">Commission: ₹ {orderDetail.commission}</p>
        <button
          className="mt-4 bg-[#DB2252] hover:bg-[#FF3366] text-white py-2 px-4 rounded-md transition duration-300"
          onClick={()=>setShowModal(false)}
        >
          Sure
        </button>
      </div>
    </div>  
  );
};

export default OrderDetailsModal;
