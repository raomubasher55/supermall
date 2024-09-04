import React from 'react'
import { SlArrowLeft } from "react-icons/sl";
import { MdNotificationsActive } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

export default function Notify() {
  const navigate = useNavigate();

  return (
    <div>
        <div className='bg-white w-full h-[65px] relative flex justify-center items-center'>
                <h1 className='text-xl md:text-2xl font-medium text-gray-600'>system message</h1>
                <div onClick={() => navigate(-1)}>
                   <SlArrowLeft className='absolute left-[2%] top-[40%] md:top-[25%] text-xl md:text-3xl text-gray-700 cursor-pointer'/>
                </div>
        </div>

         <div className='bg-[#D8E3EE] w-full h-[78vh] flex justify-center items-center'>
                <MdNotificationsActive className='text-[250px] text-[#698DBB]' />
         </div>

         <div className='bg-white w-full h-[65px] flex items-center'>
                <HiOutlineSpeakerWave className='text-xl text-gray-700 cursor-pointer ml-10'/>
                <h1 className='text-xl font-medium text-gray-600 ml-3'>system announcement </h1>
        </div>
    </div>
  )
}
