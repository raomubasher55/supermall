import React, { useState } from 'react';
import CompletedOrders from './CompeletedOrders';
import UnpaidOrders from './UnpaidOrders';
import { MdNotificationsActive } from 'react-icons/md';
import { SlArrowLeft } from 'react-icons/sl';
import { Link, useNavigate } from 'react-router-dom';

const AllOrders = () => {
  const [activeTab, setActiveTab] = useState('paid');
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed left-0 top-0 w-full   h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
        <div onClick={() => navigate(-1)}>
          <SlArrowLeft className="cursor-pointer" />
        </div>
        <h1 className="text-lg">All Order</h1>
        <Link to="/notify">
          <MdNotificationsActive className="cursor-pointer" />
        </Link>
      </div>



      <div className="max-w-4xl mx-auto my-8 mt-16">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab('paid')}
            className={`px-4 py-2 mr-2 text-sm font-medium rounded-lg ${activeTab === 'paid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Paid Orders
          </button>
          <button
            onClick={() => setActiveTab('unpaid')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'unpaid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Unpaid Orders
          </button>
        </div>

        <div>
          {activeTab === 'paid' && <CompletedOrders />}
          {activeTab === 'unpaid' && <UnpaidOrders />}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
