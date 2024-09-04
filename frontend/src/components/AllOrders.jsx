import React, { useState } from 'react';
import CompletedOrders from './CompeletedOrders';
import UnpaidOrders from './UnpaidOrders';

const AllOrders = () => {
  const [activeTab, setActiveTab] = useState('paid');

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Orders</h1>
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
  );
};

export default AllOrders;
