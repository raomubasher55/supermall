import React, { useState } from 'react';
import { IoMdHome } from "react-icons/io";
import { GoTasklist } from "react-icons/go";
import { FaHandPointUp } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const [activeLink, setActiveLink] = useState(null);

  const handleSetActiveLink = (index) => {
    setActiveLink(index);
  };

  return (
    <section className='w-full h-[70px] bg-white menu flex justify-center items-center'>
      <div className='menu-child w-[350px] h-full flex justify-between'>

        <NavLink
          to={'/home'}
          onClick={() => handleSetActiveLink(0)}
          className={`text-gray-500 cursor-pointer menu-list flex flex-col justify-center items-center ${activeLink === 0 ? 'active' : ''}`}
          activeClassName="active"
        >
          <IoMdHome className='text-[25px]' />
          <p className='text-sm mt-2 font-medium'>HOME</p>
        </NavLink>

        <NavLink
        to={'/task'}
          onClick={() => handleSetActiveLink(1)}
          className={`text-gray-500 cursor-pointer menu-list flex flex-col justify-center items-center ${activeLink === 1 ? 'active' : ''}`}
        >
          <GoTasklist className='text-[25px]' />
          <p className='text-sm mt-2 font-medium'>TASK</p>
        </NavLink>

        <NavLink
         to={'/grab'}
          onClick={() => handleSetActiveLink(2)}
          className={`text-gray-500 cursor-pointer menu-list flex flex-col justify-center items-center ${activeLink === 2 ? 'active' : ''}`}
        >
          <FaHandPointUp className='text-[25px]' />
          <p className='text-sm mt-2 font-medium'>GRAB</p>
        </NavLink>

        <NavLink
          to={'/notify'}
          onClick={() => handleSetActiveLink(3)}
          className={`text-gray-500 cursor-pointer menu-list flex flex-col justify-center items-center ${activeLink === 3 ? 'active' : ''}`}
          activeClassName="active"
        >
          <MdOutlineMessage className='text-[25px]' />
          <p className='text-sm mt-2 font-medium'>NOTIFY</p>
        </NavLink>

        <NavLink
          to={'/user'}
          onClick={() => handleSetActiveLink(4)}
          className={`text-gray-500 cursor-pointer menu-list flex flex-col justify-center items-center ${activeLink === 4 ? 'active' : ''}`}
          activeClassName="active"
        >
          <FaUser className='text-[25px]' />
          <p className='text-sm mt-2 font-medium'>MY</p>
        </NavLink>

      </div>
    </section>
  );
}
