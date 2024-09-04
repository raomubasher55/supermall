import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';


const GrabLevel = () => {
  const navigate = useNavigate();
  const [completedOrders, setCompletedOrders] = useState(0);
  const [level, setLevel] = useState('Beginner');
  const [earningBonus, setEarningBonus] = useState(0);
  const [balance, setBalance] = useState(0);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState();


  useEffect(() => {
    const fetchData = () => {

      // Fetch user image from local storage
      const savedImage = localStorage.getItem('userImage');
      setUserImage(savedImage);

      // Fetch current user data from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUserId = localStorage.getItem('currentUserId');
      const currentUser = users.find(user => user.id === parseInt(currentUserId));

      if (currentUser) {
        setUserName(currentUser.Name);
      }
    };

    fetchData();
  }, []);


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

    const OrderData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/product/orders?status=paid', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const orderData = await response.json();
        setCompletedOrders(orderData?.orders.length);
        if (orderData?.orders.length >= 3) {
          console.log('Expert');
          setLevel("Expert");
        } else if (orderData?.orders.length >= 2) {
          console.log('InterMadiate');
          setLevel("Intermadiate");
        } else if (orderData?.orders.length >= 1) {
          console.log('Beginner');
          setLevel("Beginner");
        }
        else{
          setLevel("Newbie");
        }
        console.log(orderData);



      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    OrderData();

  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
        <div onClick={() => navigate(-1)}>
          <SlArrowLeft className="cursor-pointer" />
        </div>
        <h1 className="text-lg">GRAB LEVEL</h1>
        <Link to="/notify">
          <MdNotificationsActive className="cursor-pointer" />
        </Link>
      </div>

      <div className="container mt-[50px] p-6 w-full bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center my-6">{user?.name}</h2>

        <div className="flex flex-col items-center">
          {userImage ? (
            <img src={userImage} alt="Profile" className="w-24 h-24 rounded-full" />
          ) : (
            <FaUser className='w-24 h-24 rounded-full object-cover' />
          )}
          <div className="text-xl mt-4">{level}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">Completed Orders</h3>
            <p className="text-2xl">{completedOrders}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">Earning Bonus</h3>
            <p className="text-2xl">₹{earningBonus}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">Level</h3>
            <p className="text-2xl">{level}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">Total Balance</h3>
            <p className="text-2xl">₹ {user?.balance}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center mt-6">
          <Link to="/withdraw" className="mx-2 my-2 sm:my-0 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md">
            Withdraw
          </Link>
          <Link to="/recharge" className="mx-2 my-2 sm:my-0 px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
            Deposit
          </Link>
          <Link to="/task" className="mx-2 my-2 sm:my-0 px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
            Garb an Order
          </Link>
        </div>
      </div>

      <footer className="w-full bg-[#DB2252] text-white py-4 mt-12 flex flex-col md:flex-row justify-between items-center flex-wrap">
        <div className='mx-auto w-[90%] md:w-[46%]'>
          <p className="text-xl font-semibold mb-4 ml-6">
            Why choose us?
          </p>
          <ul className="list-disc list-inside text-left mx-auto text-sm">
            <li>Trusted by thousands of users</li>
            <li>24/7 customer support</li>
            <li>Secure and transparent transactions</li>
            <li>Regular updates and bonuses</li>
          </ul>
        </div>

        <div className="mx-auto md:text-center w-[90%] md:w-[46%]">
          <p className="text-lg font-semibold mb-4 mt-10 md:mt-0">Thank You for Being with Us!</p>
          <p className="text-sm mb-2">
            Your trust is our biggest asset. We are dedicated to helping you grow your investments.
          </p>
          <p className="text-sm mb-4">
            To achieve even greater success, consider investing more and inviting your friends to join our community. Together, we can achieve financial freedom!
          </p>
        </div>

        <div className='w-full flex flex-col md:flex-row justify-between items-center pl-6 pr-6'>
          <p className="text-sm mt-4">
            &copy; 2024 Investment Company. All rights reserved.
          </p>
          <p className="text-sm mt-4">
            Developed by
            <a className='hover:text-green-300 font-medium' href="https://api.whatsapp.com/send/?phone=923082769473"> Ghotia Developers</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GrabLevel;
