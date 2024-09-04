import React from 'react'
import { SlArrowLeft } from "react-icons/sl";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from 'react-router-dom'

export default function WithdrawRecord() {

    

    

  return (
    <div className='flex flex-col items-center bg-white'>
        <div className='fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl'>
                <Link to={'/user'}>
                <SlArrowLeft className='cursor-pointer' />
                </Link>
                <h1 className='text-[17px] font-medium'>WITHDRAWAL RECORD</h1>
               <Link to={'/notify'}>
                 <MdNotificationsActive className='cursor-pointer' />
               </Link>
        </div>

           {/* record  */}
           <div className='container mt-[70px]'>
              <h1 className='font-medium m-2'>WITHDRAWAL RECORD</h1>

              <h4 className='m-2 mt-4 text-md mb-3'>Cumulative withdrawal: $0</h4>

              <div className='flex justify-between items-center p-2 h-auto border-t border-t-gray-200 border-b border-b-gray-200'>
                   
                 <h1 className='font-medium'>NO DATA</h1>
                   
                </div>


                 



     
              
           </div>
    </div>
  )
}
