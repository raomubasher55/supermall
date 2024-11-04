import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaShareSquare } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import dashboard from '../assets/dashboard.png'
import { CiMoneyBill } from "react-icons/ci";

const UserDetail = ({user}) => {
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState(() => {
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserId = localStorage.getItem('currentUserId');
    return usersData.find(user => user.id === parseInt(currentUserId)) || {};
    
  });
  const [image, setImage] = useState(() => localStorage.getItem('userImage') || null);
  const [userName, setUserName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');

  useEffect(() => {
    const fetchData = () => {
      const usersData = JSON.parse(localStorage.getItem('users')) || [];
      const currentUserId = localStorage.getItem('currentUserId');
      const currentUser = usersData.find(user => user.id === parseInt(currentUserId));

      if (currentUser) {
        setUserData(currentUser);
        setUserName(currentUser.Name);
        setInvitationCode(currentUser.invitationCode);
        setImage(currentUser.image);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataURL = reader.result;
        setImage(imageDataURL);

        // Update user data in localStorage
        const usersData = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsersData = usersData.map(user => {
          if (user.id === userData.id) {
            return { ...user, image: imageDataURL };
          }
          return user;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsersData));
        localStorage.setItem('userImage', imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareClick = () => {
    // Remove spaces and convert username to lowercase
    const formattedUserName = userName.replace(/\s+/g, '').toLowerCase();

    // Create the referral link
    const link = `https://example.com/?user=${formattedUserName}&code=${invitationCode}`;

    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
      alert('Referral link copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy: ', error);
    });
  };

  

  return (
    <>
      <div className='w-full h-auto bg-color rounded-2xl'>
        <div className='h-auto w-full flex items-center pl-3 '>
          <div
            className='w-[70px] h-[70px] bg-white rounded-full relative cursor-pointer'
            onClick={handleImageClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
            {image ? (
              <img src={image} alt="user img" className='h-full w-full rounded-full object-cover' />
            ) : (
              // <FaUser className='h-full w-full rounded-full object-cover' />
              <img src={dashboard} className='h-full w-full rounded-full object-cover' />

            )}
          </div>

          <div className='w-max h-[100px] ml-[5%] sm:ml-[70px] md:lg-[150px] lg:ml-[250px] mt-6 relative '>
            <h1 className='text-white text-[23px] font-medium'>{userName ? userName : "User Name"}<span className='text-white font-normal ml-2 text-[16px]'>Free</span></h1>
            <div className='flex justify-between items-center mt-2 text-white'>
              <p className='text-[12.8px] font-medium'>Invitation Code : </p>
              <h5 className='text-[12.8px] font-bold text-white'>{invitationCode ? invitationCode : " 892782347"}</h5>
              <FaShareSquare className='cursor-pointer ml-2' onClick={handleShareClick} />
            </div>
          </div>
        </div>

        <section className='bg-white w-full h-auto rounded-border shadow-md flex flex-col items-center'>
          <div className='flex justify-between items-center w-full h-[85px] border-b-2'>
            <div className='text-center ml-5'>
              <h1 className='text-3xl font-medium'> ₹ {user?.balance}</h1>
              <p className='text-[12.8px] font-medium mt-1 text-gray-500'>Available Balance</p>
            </div>
            <Link to={'/recharge'}>
              <div className='w-[50px] h-[50px] rounded-full bg-color mr-5 flex justify-center items-center text-white cursor-pointer'>
                <FaPlus />
              </div>
            </Link>
          </div>
          <div className='w-full md:w-[80%] h-[60px] flex justify-between mt-3'>
            <div className='w-[50%] h-full flex flex-col items-center'>
              <p className='text-[12.8px] font-medium '>Available Balance</p>
              <h1 className='text-lg font-medium text-green-700 mt-1'>₹ {user?.balance}</h1>
            </div>
            <div className='w-[50%] h-full flex flex-col items-center'>
              <p className='text-[12.8px] font-medium'>Frozen Balance</p>
              <h1 className='text-lg font-medium text-blue-500 mt-1'>₹ 0.00</h1>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserDetail;
