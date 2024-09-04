import React from 'react'
import { SlArrowLeft } from "react-icons/sl";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from 'react-router-dom'

export default function RechargeRecord() {

    let rechargeData = [
        {
            id: 0,
            number: 'SY2406260456015775',
            amount: '$100',
            notic: 'pending approved'
        },
        {
            id: 1,
            number: 'SY2426220454015179',
            amount: '$170',
            notic: 'pending approved'
        },
        {
            id: 2,
            number: 'SY23456788215775',
            amount: '$230',
            notic: 'audit failed'
        },
        {
            id: 3,
            number: 'SY99887766554433',
            amount: '$80',
            notic: 'pending'
        },
        {
            id: 4,
            number: 'SY11223344556677',
            amount: '$150',
            notic: 'approved'
        },
        {
            id: 5,
            number: 'SY98765432109876',
            amount: '$200',
            notic: 'pending approved'
        },
        {
            id: 6,
            number: 'SY5555666677778888',
            amount: '$120',
            notic: 'pending'
        },
        {
            id: 7,
            number: 'SY4444333322221111',
            amount: '$190',
            notic: 'approved'
        },
        {
            id: 8,
            number: 'SY8888999911112222',
            amount: '$210',
            notic: 'audit failed'
        },
        {
            id: 9,
            number: 'SY7777666655554444',
            amount: '$95',
            notic: 'pending approved'
        }
    ];
    

  return (
    <div className='flex flex-col items-center bg-white'>
        <div className='fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl'>
                <Link to={'/user'}>
                <SlArrowLeft className='cursor-pointer' />
                </Link>
                <h1 className='text-[17px] font-medium'>RECHARGE RECORD</h1>
               <Link to={'/notify'}>
                 <MdNotificationsActive className='cursor-pointer' />
               </Link>
        </div>

           {/* record  */}
           <div className='container mt-[70px]'>
              <h1 className='font-medium m-2'>RECHARGE RECORD</h1>

              <h4 className='m-2 mt-4 text-md mb-4'>Cumulative recharge: $0</h4>

                    {/* reacharge record  */}

                    {
                        rechargeData.map((ele)=> {
                            return(
                                <>

                                <div className='flex justify-between items-center p-3 h-auto border-t border-t-gray-200 border-b border-b-gray-200'>
                                   <div>
                                   <h1>{ele.number}</h1>
                                       <p className='text-white bg-[#61ABFF] recharge-data rounded-3xl text-center mt-2 text-[9px] w-max'>{ele.notic}</p>
                                   </div>
                   
                                   <h1 className='text-green-600 font-medium'>{ele.amount}</h1>
                   
                                 </div>
                                
                                </>
                            )
                        })
                    }



     
              
           </div>
    </div>
  )
}
