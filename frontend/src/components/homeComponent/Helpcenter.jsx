import React from 'react'
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link , useNavigate } from 'react-router-dom';

export default function HelpCenter() {

  const navigate = useNavigate();

  return (
<div className="flex flex-col items-center bg-white overflow-hidden p-5">
    <div className="fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
      <div onClick={() => navigate(-1)}>
        <SlArrowLeft className="cursor-pointer" />
      </div>
       
       <h1>HELP CENTER</h1>

      <Link to="/notify">
        <MdNotificationsActive className="cursor-pointer" />
      </Link>
    </div>

    <div className="container lg:w-[1100px] bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Help Center</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">How to Invest Money</h3>
          <p>
            Learn how to start investing money on our platform. Follow these simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Log in to your account.</li>
            <li>Select the investment plan that suits your goals.</li>
            <li>Enter the amount you wish to invest.</li>
            <li>Confirm your investment and start earning daily profits.</li>
          </ol>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Deposit and Withdrawal Process</h3>
          <p>
            Understand how to deposit and withdraw funds easily:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Navigate to the deposit section and choose your payment method.</li>
            <li>Enter the amount and confirm your deposit.</li>
            <li>For withdrawals, go to the withdrawal section.</li>
            <li>Enter the amount you wish to withdraw and confirm the transaction.</li>
          </ol>
        </div>
        {/* <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Receiving Money from Abroad</h3>
          <p>
            Here's how to receive money from abroad, including from India via Western Union:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Log in to your Western Union account.</li>
            <li>Start your transfer by entering Pakistan as the destination country.</li>
            <li>Provide the receiver's bank details: bank name, code, and account number.</li>
            <li>Double-check the details and hit send to complete the transfer.</li>
          </ol>
        </div> */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Customer Support</h3>
          <p>
            If you have any issues or questions, our customer support is here to help:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Visit our support page and submit a ticket.</li>
            <li>Check our FAQ section for common queries and solutions.</li>
            {/* <li>Email us at support@example.com for detailed inquiries.</li> */}
          </ol>
        </div>
      </div>
    </div>
</div>
  )
}
