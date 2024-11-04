import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { FaDollarSign, FaHandPointUp } from "react-icons/fa";
import { PiHandWithdrawFill } from "react-icons/pi";
import { TfiStatsUp } from "react-icons/tfi";
import { CiMoneyBill } from "react-icons/ci";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { IoShareSocial } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function BalanceData() {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState()
  const [inviteCode, SetinviteCode] = useState('');
  const [commission, setCommission] = useState(0);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const userData = await response.json();
        setUser(userData?.data);

        setCommission(userData?.data?.balance * 0.02)



      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

  }, []);

  useEffect(() => {
    const fetchData = () => {
      // Fetch current user data from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUserId = localStorage.getItem('currentUserId');
      const currentUser = users.find(user => user.id === parseInt(currentUserId));

      if (currentUser) {
        setUserName(currentUser.Name);
        SetinviteCode(currentUser.invitationCode)
      }
    };

    fetchData();
  }, []);



  return (
    <div className='w-full h-auto p-3 sm:p-10 flex flex-col items-center mb-10'>
      <div className='container w-full flex justify-between mt-[20px] sm:mt-[60px]'>

        {/* balance record  */}
        <div className='w-auto h-auto'>
          <h1 className='font-sans text-[rgb(51,51,51)] text-4xl font-bold'>{userName}</h1>
          <h3 className='text-3xl mt-2 font-medium text-gray-800'>₹{user?.balance ? user.balance : 0}</h3>
          <p className='text-md font-medium text-gray-500 mt-1'>My balance</p>

          <Link to={'/recharge'}>
            <div className='recharg2 cursor-pointer mt-2 bg-color w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] rounded-full flex justify-center items-center text-white text-xl'>
              <FaDollarSign />
            </div>
          </Link>
          <h4 className='text-[18px] mt-2 text-gray-500'><span className='text-xl font-medium text-gray-800 mr-1'>{inviteCode}</span> extension code</h4>
        </div>

        {/* recharge section link */}
        <Link to={'/recharge'}>
          <div className='w-auto h-full recharge1'>
            <div className='cursor-pointer bg-color hover:bg-[#ff5a5a] transition w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] rounded-full flex justify-center items-center text-white text-xl'>
              <FaDollarSign />
            </div>
          </div>
        </Link>

      </div>
      <Link to={'/grab'} className='container flex justify-center items-center'>
        <button className='container flex justify-center items-center bg-color hover:bg-[#ff5a5a] transition text-white p-3 mt-6 rounded-lg font-medium'>
          <FaHandPointUp className='text-2xl mr-2' /> START MAKING MONEY
        </button>
      </Link>
      {/* recharge withdraw invite buttons */}
      <div className='w-[270px] h-auto flex justify-between items-center mt-10'>

        {/* recharge */}
        <Link to={"/recharge"}>
          <div className='h-max w-max group flex flex-col items-center'>
            <div className='bg-[#ff4d6d] text-[#F5BDCC] w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] rounded-full flex justify-center items-center cursor-pointer '>
              <FaDollarSign className=' text-white rounded-full w-[20px] h-[20px]' />
            </div>
            <h1 className='mt-2 font-medium text-gray-700 group-hover:underline'>Recharge</h1>
          </div>
        </Link>

        {/* withdraw */}
        <Link to={'/withdraw'}>
          <div className='h-max w-max group flex flex-col items-center'>
            <div className='bg-[#ff4d6d] text-[#F5BDCC] w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] rounded-full flex justify-center items-center cursor-pointer '>
              <PiHandWithdrawFill className='text-white rounded-full text-3xl' />
            </div>
            <h1 className='mt-2 font-medium text-gray-700 group-hover:underline'>Withdraw</h1>
          </div>
        </Link>

        {/* share */}
        <Link to={'/invite'}>
          <div className='h-max w-max group flex flex-col items-center'>
            <div className='bg-[#ff4d6d] text-[#F5BDCC] w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] rounded-full flex justify-center items-center cursor-pointer '>
              <IoShareSocial className='text-white rounded-full text-2xl' />
            </div>
            <h1 className='mt-2 font-medium text-gray-700 group-hover:underline'>Share</h1>
          </div>
        </Link>

      </div>

      {/* gain profit section */}
    <h1 className='mt-[100px] font-bold text-xl text-gray-700'>GAIN</h1>
      <div className='flex flex-wrap justify-center sm:justify-between items-center text-center w-full sm:w-[600px] md:w-[700px] lg:w-[1000px] h-auto'>
        <div className='flex justify-center gap-2 w-full flex-wrap'>
          {/* Earnings today */}
          <div className=' p-4 bg-[#FAF0F5] border border-[#76636c] rounded-lg w-[45%] sm:w-[30%] h-auto mt-4'>
            <div className='flex mt-2'>
              <div>
                <CiMoneyBill className='text-4xl ' />
              </div>
              <div>
                <h1 className='text-xl font-bold'>₹4534{user?.balance}</h1>
                <p className='text-sm font-bold text-gray-600'>Earnings</p>
              </div>
            </div>

          </div>

          {/* Commission today */}
          <div className=' p-4 bg-[#FAF0F5] border border-[#76636c] rounded-lg w-[45%] sm:w-[30%] h-auto mt-4'>
            <div className="flex mt-2">
              <div>
                <IoExtensionPuzzleOutline  className='text-4xl ' />
              </div>
              <div>
                <h1 className='text-xl font-bold'>₹453{commission}</h1>
                <p className='text-sm font-bold text-gray-600'>Total's Commission</p>
              </div>
            </div>
          </div>

          {/* Gain */}
          <div className=' p-4 bg-[#FAF0F5] border border-[#76636c] rounded-lg w-[90%] sm:w-[30%] h-auto mt-4'>
            <div className="flex mt-2 justify-center">
              <div>
                <TfiStatsUp  className='text-4xl ' />
              </div>
              <div className='flex  justify-center items-center'>
          
                  <h1 className='text-xl text-center font-bold'>₹40</h1>
                  <p className='text-sm font-bold text-gray-600'>Gain</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
