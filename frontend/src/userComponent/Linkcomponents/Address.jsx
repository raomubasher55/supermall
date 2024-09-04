import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { Link } from 'react-router-dom';

export default function Address() {
  // State to manage input values, initialize with localStorage data if available
  const [name, setName] = useState(() => {
    const storedName = localStorage.getItem('user-name');
    return storedName ? JSON.parse(storedName) : '';
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const storedPhoneNumber = localStorage.getItem('user-phoneNumber');
    return storedPhoneNumber ? JSON.parse(storedPhoneNumber) : '';
  });

  // Effect to save to localStorage whenever name or phoneNumber changes
  useEffect(() => {
    localStorage.setItem('user-name', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    localStorage.setItem('user-phoneNumber', JSON.stringify(phoneNumber));
  }, [phoneNumber]);

  // Function to handle name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Function to handle phone number input change
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

    //    shipping address 
  const [region, setRegion] = useState(() => {
    const storedRegion = localStorage.getItem('region-loc');
    return storedRegion ? JSON.parse(storedRegion) : '';
  });
  const [address, setAddress] = useState(() => {
    const storedAddress = localStorage.getItem('Address-region');
    return storedAddress ? JSON.parse(storedAddress) : '';
  });

  // Effect to save to localStorage whenever name or phoneNumber changes
  useEffect(() => {
    localStorage.setItem('region-loc', JSON.stringify(region));
  }, [region]);

  useEffect(() => {
    localStorage.setItem('Address-region', JSON.stringify(address));
  }, [address]);

  // Function to handle name input change
  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  // Function to handle phone number input change
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };





  return (
    <div className='flex flex-col items-center bg-white'>
      <div className='w-full h-[55px] bg-[#FFFFFF] text-gray-600 flex justify-between items-center p-4 text-xl'>
        <Link to={'/user'}>
          <SlArrowLeft className='cursor-pointer' />
        </Link>
        <h1 className='text-[17px] font-normal'>shipping address modification</h1>
        <div className='empty'></div>
      </div>


                {/* identity  */}

   <div className='bg-[#EEEEEE] w-full h-[20px] p-4 flex items-center'>reciveing identify information</div>
   
      {/* Name input */}
      <div className='flex items-center w-full p-4 pb-3'>
        <h3 className='text-gray-400 mr-4'>Real Name:</h3>
        <input
          className='outline-none placeholder:text-gray-700'
          type="text"
          placeholder='Enter real name'
          value={name}
          onChange={handleNameChange}
        />
      </div>

      {/* Telephone input */}
      <div className='flex items-center w-full p-4 pt-0'>
        <h3 className='text-gray-400 mr-4'>Telephone:</h3>
        <input
          className='outline-none placeholder:text-gray-700'
          type="tel"
          placeholder='Enter your number'
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>


                {/* shiiping address  */}
<div className='bg-[#EEEEEE] w-full h-[20px] p-4 flex items-center'>shipping address information</div>
   
   {/* Name input */}
   <div className='flex items-center w-full p-4 pb-3'>
     <h3 className='text-gray-400 mr-4'>Region:</h3>
     <input
       className='outline-none placeholder:text-gray-700'
       type="text"
       placeholder='Enter region'
       value={region}
       onChange={handleRegionChange}
     />
   </div>

   {/* Telephone input */}
   <div className='flex items-center w-full p-4 pt-0'>
     <h3 className='text-gray-400 mr-4'>Address:</h3>
     <input
       className='outline-none placeholder:text-gray-700'
       type="tel"
       placeholder='Enter address'
       value={address}
       onChange={handleAddressChange}
     />
   </div>

   <div className='bg-[#EEEEEE] w-full h-[17px] p-4 flex items-center'></div>
   <div className='flex justify-between items-center w-full p-3 pt-1 mt-1'>
     <p className='text-gray-500'>set as commonly used address </p>
      <div className='w-[35px] md:w-[50px] h-[20px] md:h-[30px] rounded-2xl bg-blue-500 flex justify-end items-center'>
                <div className='w-[18px] md:w-[27px] h-[18px] md:h-[27px] bg-white rounded-full mr-[2px]'></div>
      </div>
   </div>
      
       {/* submit butn  */}

   <button className='w-[90%] bg-[#2F3848] text-white mt-7 h-[40px] rounded-md'>OK</button>


    </div>
  );
}
