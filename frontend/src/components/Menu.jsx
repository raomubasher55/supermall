import React, { useState } from 'react';
import { IoMdHome } from "react-icons/io";
import { GoTasklist } from "react-icons/go";
import { FaHandPointUp } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const [activeItem, setActiveItem] = useState("Home");

  const navItems = [
    { name: "Home", icon: <IoMdHome className="w-6 h-6 md:w-8 md:h-8" />, path: "/home" },
    { name: "Order", icon: <GoTasklist className="w-6 h-6 md:w-8 md:h-8" />, path: "/all-orders" },
    { name: "Grab", icon: <FaHandPointUp className="w-6 h-6 md:w-8 md:h-8" />, path: "/grab" },
    { name: "Notify", icon: <MdOutlineMessage className="w-6 h-6 md:w-8 md:h-8" />, path: "/notify" },
    { name: "MY", icon: <FaUser className="w-6 h-6 md:w-8 md:h-8" />, path: "/user" },
  ];

  const handleNavClick = (item, index) => {
    setActiveItem(item);
    console.log('change')
  };

  return (
    <div className="min-w-full max-w-md mx-auto fixed bottom-0 bg-[#ff4d6d]">
    <div className='flex justify-center'>
      <div className="bg-[#ff4d6d] rounded-full p-2 text-white">
        <nav className="flex justify-between items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-16 h-16 ${
                  isActive ? "bg-white text-[#ff4d6d] rounded-full" : "text-white"
                }`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  </div>
  );
}
