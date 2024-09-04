import React from 'react'
import { SlArrowLeft } from "react-icons/sl";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from 'react-router-dom'

export default function AccountDetal() {

    let rechargeData = [
        {
            id: 0,
            Date: '2024-06-10',
            time:'14:48:17',
            notic: 'user takes orders',
            amount: '$170',
        },
        {
            id: 1,
            Date: '2024-06-7',
            time:'10:08:07',
            notic: 'recieving order rebate',
            amount: '$130',
        },
        {
            id: 2,
            Date: '2024-06-3',
            time:'07:13:39',
            notic: 'user takes order',
            amount: '$80',
        },
      
    ];
    

  return (
    <div className='flex flex-col items-center bg-white'>
        <div className='fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl'>
                <Link to={'/user'}>
                <SlArrowLeft className='cursor-pointer' />
                </Link>
                <h1 className='text-[17px] font-medium'>ACCOUNT DETAILS</h1>
               <Link to={'/notify'}>
                 <MdNotificationsActive className='cursor-pointer' />
               </Link>
        </div>

           {/* record  */}
           <div className='container mt-[70px]'>
              <h1 className='font-medium m-2'>ACCOUNT DETAILS</h1>

                    {/* reacharge record  */}

                    {
                        rechargeData.map((ele)=> {
                            return(
                                <>

                                <div className='flex justify-between items-center p-3 h-auto border-t border-t-gray-200 border-b border-b-gray-200'>
                                   <div>
                                   <h1>{ele.Date} {ele.time}</h1>
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
