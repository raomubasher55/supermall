import React from 'react'
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link , useNavigate } from 'react-router-dom';
import inviteImg from '/src/assets/inv-1.png'


export default function InviteLink() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-white overflow-hidden">
    <div className="fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
      <div onClick={() => navigate(-1)}>
        <SlArrowLeft className="cursor-pointer" />
      </div>

      <Link to="/notify">
        <MdNotificationsActive className="cursor-pointer" />
      </Link>
    </div>

     <div className='w-full'>
        <img className='container' src={inviteImg} alt="" />
     </div>

     <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg container mx-auto">
  <div className="bg-pink-200 rounded-full w-[100px] h-[100px] p-4 mb-4">
    <div className="text-pink-500 text-4xl">$$$</div>
  </div>
  <p className="text-center text-gray-700 mb-2">
    Join our team, monthly income of 10 million Rs is just the beginning! Every invitation is a seed of opportunity, a stepping stone to wealth and freedom!
  </p>
  <div className="text-center text-gray-500 mb-4">
    extension code <span className="text-pink-500">943YL8</span>
  </div>
  <button className="bg-pink-500 text-white py-2 px-4 rounded-lg w-full hover:bg-pink-600">
    <span className="flex justify-center items-center">
      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5a2 2 0 002 2h5M14 14v5a2 2 0 002 2h5m-7-7l7-7m0 0L9 5m7-7h5a2 2 0 012 2v5m-7 7h5a2 2 0 012 2v5m-7-7l7 7" />
      </svg>
      COPY INVITATION LINK
    </span>
  </button>
</div>

      
    </div>
  )
}
