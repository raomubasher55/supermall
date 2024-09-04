import React, { useEffect, useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { TbUsersGroup } from "react-icons/tb";
import { MdLibraryAdd } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { FaAddressCard } from "react-icons/fa";
import { IoMdUnlock } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { FaPowerOff } from "react-icons/fa6";
import Userdetail from './Userdetail';
import Menu from '../components/Menu'
import { Link } from 'react-router-dom';


export default function User() {
   const [user, setUser] = useState()

   const alertMessage = () => {
      alert("Your current level is an experience account and you can't participate.");
   };


   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const response = await fetch('http://localhost:3000/api/profile', {
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
         <div className='fixed left-0 top-0 top-notify w-full h-[65px] bg-[rgba(255,255,255,0.75)]  flex justify-end items-center'>
            <Link to={'/notify'}>
               <IoMdNotificationsOutline className='text-3xl mr-8' />
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
               <div className='flex justify-between items-center w-full h-[70px] shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                        <GoArrowUpRight />
                     </div>
                     <h1 className='ml-3 font-medium'>Withdraw</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link 2  */}

            <Link to={'/all-orders'} className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2' onClick={alertMessage}>
               <div className='w-auto h-full flex justify-between items-center'>
                  <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                     <TbUsersGroup />
                  </div>
                  <h1 className='ml-3 font-medium'>Orders</h1>
               </div>

               <MdKeyboardArrowRight className='text-2xl' />
            </Link>
            

            <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2' onClick={alertMessage}>
               <div className='w-auto h-full flex justify-between items-center'>
                  <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                     <TbUsersGroup />
                  </div>
                  <h1 className='ml-3 font-medium'>Team Report</h1>
               </div>

               <MdKeyboardArrowRight className='text-2xl' />
            </div>

            {/* link 3  */}
            <Link to={'/rechargerecord'}>
               <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                        <MdLibraryAdd />
                     </div>
                     <h1 className='ml-3 font-medium'>Recharge Record</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link 4  */}

            <Link to={'/withdrawrecord'}>
              <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                        <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                           <MdLibraryAddCheck />
                        </div>
                        <h1 className='ml-3 font-medium'>Withdraw Record</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
             </div> 


             </Link> 
            {/* link 5  */}
            <Link to={'/accountdetail'}>
               <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                        <TbArrowsExchange />
                     </div>
                     <h1 className='ml-3 font-medium'>Account Details</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>
            {/* link 6  */}
            <Link to={'/notify'}>
               <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                        <IoMdNotificationsOutline />
                     </div>
                     <h1 className='ml-3 font-medium'>Message</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link 7  */}
            <Link to={'/address'}>
               <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                        <FaAddressCard />
                     </div>
                     <h1 className='ml-3 font-medium'>Recieving Address</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link  8*/}
            <Link to={'/bankform'}>
               <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                        <FaAddressCard />
                     </div>
                     <h1 className='ml-3 font-medium'>Bind Bank Card</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>

            </Link>


            {/* link  9*/}
            <Link to={'/changepassword'}>
               <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                        <IoMdUnlock />
                     </div>
                     <h1 className='ml-3 font-medium'>Change Passowrd</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link  10*/}
            <Link to={'/passwordwithdraw'}>
               <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
                  <div className='w-auto h-full flex justify-between items-center'>
                     <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                        <IoMdUnlock />
                     </div>
                     <h1 className='ml-3 font-medium'>Modify The Withdraw Passowrd</h1>
                  </div>

                  <MdKeyboardArrowRight className='text-2xl' />
               </div>
            </Link>

            {/* link  11*/}

            <div className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
               <div className='w-auto h-full flex justify-between items-center'>
                  <div className='w-[50px] h-[50px] bg-[#F4BDCB] rounded-md flex justify-center items-center text-xl'>
                     <TbWorld />
                  </div>
                  <h1 className='ml-3 font-medium'>Select Language</h1>
               </div>

               <MdKeyboardArrowRight className='text-2xl' />
            </div>


            {/* link  12*/}

            <Link to={'/'} className='flex justify-between items-center w-full h-[70px] mt-1 shadow-md links cursor-pointer text-[#E91E63] p-2'>
               <div className='w-auto h-full flex justify-between items-center'>
                  <div className='w-[50px] h-[50px] bg-[#f3ecee] rounded-md flex justify-center items-center text-xl'>
                     <FaPowerOff />
                  </div>
                  <h1 className='ml-3 font-medium'>Exit</h1>
               </div>

               <MdKeyboardArrowRight className='text-2xl' />
            </Link>


            <div className='empty mt-[50px] h-[70px]'></div>
         </section>



         {/* menu link  */}
         <Menu />

      </div>
   )
}
