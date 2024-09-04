import React from 'react'
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link , useNavigate } from 'react-router-dom';

export default function About() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-white overflow-hidden p-5">
    <div className="fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
      <div onClick={() => navigate(-1)}>
        <SlArrowLeft className="cursor-pointer" />
      </div>
       
       <h1>About us</h1>

      <Link to="/notify">
        <MdNotificationsActive className="cursor-pointer" />
      </Link>
    </div>

    <div className="space-y-3 mt-[50px]">
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Trusted Worldwide</h3>
          <p>
            Our platform is recognized globally as a secure and reliable destination for investing money and earning daily profits. Join thousands of satisfied users who trust us with their investments.
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Easy Transactions</h3>
          <p>
            We offer seamless deposit and withdrawal options, making it convenient for you to manage your funds. Our user-friendly interface ensures a smooth experience every step of the way.
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Profitable Returns</h3>
          <p>
            We provide a guaranteed return of $2 for every $100 invested daily. Our consistent and transparent payout system ensures you see tangible growth in your investments.
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">Diverse Investment Plans</h3>
          <p>
            Explore our variety of investment plans designed to cater to different financial goals. Whether you're looking for short-term gains or long-term growth, we have the right plan for you.
          </p>
        </div>
      </div>
      
    </div>
  )
}
