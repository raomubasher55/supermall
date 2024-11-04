import React from 'react'

const TaskCard = () => {
  return (
    <>
        <div className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 absolute top-14">
          <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-2">Starter Plan</h3>
            <p className="text-gray-600 mb-4 text-center">
              Begin your investment journey with a modest amount. This plan is perfect for those new to investing or for those looking to test the waters. With a low entry threshold, you can start investing with just ₹100, making it accessible to everyone. The Starter Plan offers a daily bonus of ₹2, allowing you to see gradual growth.
            </p>
            <p className="text-xl font-semibold mb-4">Invest: ₹100</p>
            <p className="text-xl font-semibold mb-4">Daily Bonus: ₹2</p>
            <button
              className="bg-color  hover:bg-[#FF3366] text-white py-2 px-4 rounded-md transition duration-300"
            //   onClick={() => {
            //     handleInvestment(100, 2)  
            //   }}
            >
              Choose Plan
            </button> 
          </div>

  
        </div>
    </>
  )
}

export default TaskCard
