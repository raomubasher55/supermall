import React, { useState } from "react";
import CompletedOrders from "./CompeletedOrders";
import UnpaidOrders from "./UnpaidOrders";
import { MdNotificationsActive } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import AllOrder from "./AllOrder";
import FreezingOrders from "./FreezingOrders";

const AllOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="fixed left-0 top-0 w-full  h-[55px] bg-color text-white flex justify-between items-center px-4 text-xl z-10">
        <div onClick={() => navigate(-1)}>
          <SlArrowLeft className="cursor-pointer" />
        </div>
        <h1 className="text-lg">All Orders</h1>
        <Link to="/notify">
          <MdNotificationsActive className="cursor-pointer" />
        </Link>
      </div>



      {/* Tabs */}
      <div className="max-w-4xl mt-8">
        <div className="flex justify-center mb-4 bg-[#FA8897]  py-1 rounded-md">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2 py-2 text-sm font-medium rounded-full ${activeTab === "all" ? "bg-white" : "bg-[#FA8897] text-white"
              }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("unpaid")}
            className={`px-3 py-2 text-sm font-medium rounded-full ${activeTab === "unpaid" ? "bg-white" : "bg-[#FA8897] text-white"
              }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-3 py-2 mr-2 text-sm font-medium rounded-full ${activeTab === "submit" ? "bg-white" : "bg-[#FA8897] text-white"
              }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab("freezing")}
            className={`px-3 py-2 mr-2 text-sm font-medium rounded-full ${activeTab === "freezing" ? "bg-white" : "bg-[#FA8897] text-white"
              }`}
          >
            Freezing
          </button>

        </div>

        {/* Order Details */}
        <div className="mt-4">
          {activeTab === "unpaid" && <UnpaidOrders />}
          {activeTab === "submit" && <CompletedOrders />}
          {activeTab === "all" && <AllOrder />}
          {activeTab === "freezing" && <FreezingOrders />} {/* Add this line */}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
