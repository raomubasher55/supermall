import React, { useEffect, useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowRight, MdNotificationsActive } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { TbUsersGroup } from "react-icons/tb";
import { MdLibraryAdd } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { FaAddressCard } from "react-icons/fa";
import { IoMdUnlock } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { FaPowerOff } from "react-icons/fa6";
import { IoLayers } from "react-icons/io5";
import Userdetail from './Userdetail';
import Menu from '../components/Menu'
import { Link, useNavigate } from 'react-router-dom';
import { CiMoneyBill } from "react-icons/ci";
import { SlArrowLeft } from 'react-icons/sl';


export default function User() {
   const [user, setUser] = useState();
   const navigate = useNavigate();

   const alertMessage = () => {
      alert("Your current level is an experience account and you can't participate.");
   };


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


         } catch (error) {
            console.error('Error fetching user data:', error);
         }
      };

      fetchUserData();

   }, []);

   return (

      <div className='w-full h-auto bg-white flex flex-col justify-center mt-20'>
         <div className="fixed left-0 top-0 w-full h-[55px] bg-color text-white flex justify-between items-center px-4 text-xl z-10">
            <div onClick={() => navigate(-1)}>
              <SlArrowLeft className="cursor-pointer" />
            </div>
            <h1 className="text-lg">ACCOUNT</h1>
            <Link to="/notify">
              <MdNotificationsActive className="cursor-pointer" />
            </Link>
          </div>


         {/* user data  */}
         <div className='container h-auto'>
            {/* user detail */}
            <section className='container'>
               <Userdetail user={user} />
            </section>
         </div>


         {/* links sect  */}
         <section className='container h-[200px] mt-10'>

            {/* link 1  */}

            <Link to={'/withdraw'}>
               <div className='flex justify-between items-center w-full h-[70px]  border-pink-200 border-2 rounded-md  shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center '>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <CiMoneyBill className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Withdraw</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Transfer to bank</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link 2  */}

            <Link to={'/all-orders'} className='flex justify-between items-center w-full border-pink-200 border-2 rounded-md h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2' a>
               <div className='w-auto h-full flex justify-between items-center'>
                  <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                     <IoLayers className='text-white text-3xl' />
                  </div>
                  <div className='flex flex-col  '>
                  <h1 className='ml-3 text-md'>Orders</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>View Order</h1>
                     </div>
               </div>

               <MdKeyboardArrowRight className='text-2xl' />
            </Link>


            <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2' onClick={alertMessage}>
               <div className='w-auto h-full flex justify-between items-center'>
                  <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                     <TbUsersGroup className='text-white text-3xl' />
                  </div>
                  <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Tem Report</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>View your team's activity</h1>
                     </div>
               </div>

               <MdKeyboardArrowRight className='text-2xl  ' />
            </div>

            {/* link 3  */}
            <Link to={'/rechargerecord'}>
               <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <MdLibraryAdd className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Recharge Record</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Check past recharge records</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link 4  */}

            <Link to={'/withdrawrecord'}>
               <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <MdLibraryAddCheck className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Withdraw Record</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>View past withdraw history</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>


            </Link>
            {/* link 5  */}
            <Link to={'/accountdetail'}>
               <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <TbArrowsExchange className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Account Details</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Manage your account information</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>
            {/* link 6  */}
            <Link to={'/notify'}>
               <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <IoMdNotificationsOutline className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Message</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Check your Message</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link 7  */}
            <Link to={'/address'}>
               <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <FaAddressCard className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Recieving Address</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Manage your Address</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link  8*/}
            <Link to={'/bankform'}>
               <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <FaAddressCard className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Bind Bank Card</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Add or edit bank card details</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>

            </Link>


            {/* link  9*/}
            <Link to={'/changepassword'}>
               <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <IoMdUnlock className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Change Password</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Update your password</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link  10*/}
            <Link to={'/passwordwithdraw'}>
               <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                        <IoMdUnlock className='text-white text-3xl' />
                     </div>
                     <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Modify The Withdraw Password</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Change withdraw PIN</h1>
                     </div>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link  11*/}

            <div className='flex justify-between items-center w-full h-[70px] border-pink-200 border-2 rounded-md mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
               <div className='w-auto h-full flex justify-between items-center'>
                  <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-full flex justify-center items-center text-xl'>
                     <TbWorld className='text-white text-3xl' />
                  </div>
                  <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Select Language</h1>
                        <h1 className='ml-3 font-medium text-[#8f7f3b]'>Chosse app language</h1>
                     </div>
               </div>

               <MdKeyboardArrowRight className='text-2xl' />
            </div>


            {/* link  12*/}

            <div onClick={() => { navigate('/login'); localStorage.clear('token') }} className='flex justify-between items-center border-pink-200 border-2 rounded-md w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
               <div className='w-auto h-full flex justify-between items-center'>
                  <div className='w-[50px] h-[50px] bg-[#f3ecee] rounded-full flex justify-center items-center text-xl'>
                     <FaPowerOff />
                  </div>
                  <div className='flex flex-col  '>
                        <h1 className='ml-3 text-md'>Exit</h1>
                     </div>
               </div>

               <MdKeyboardArrowRight className='text-2xl' />
            </div>


            <div className='empty mt-[50px] h-[70px]'></div>
         </section>



         {/* menu link  */}
         <Menu />

      </div>
   )
}
