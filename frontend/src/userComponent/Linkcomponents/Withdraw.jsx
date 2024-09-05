import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { MdNotificationsActive } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import WithdrawModel from './WithdrawModel';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../components/ProductCard/Loader';

export default function Withdraw() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [user, setUser] = useState();
  const [amount, setAmount] = useState({ withdraw: 0, password: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);



  const handleWithdraw = () => {
    // Handle withdraw logic here
    // After successful withdrawal, show the modal
    setIsModalVisible(true);
  };



  useEffect(() => {
    const fetchData = () => {
      // Fetch current user data from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUserId = localStorage.getItem('currentUserId');
      const currentUser = users.find(user => user.id === parseInt(currentUserId));

      if (currentUser) {
        setUserName(currentUser.Name);
        setUserNumber(maskNumber(currentUser.number)); // Format the number
      }
    };

    fetchData();
  }, []);




  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
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

    fetchUserData();

  }, []);


  const maskNumber = (number) => {
    if (number.length >= 7) {
      const firstPart = number.slice(0, 4);
      const lastPart = number.slice(-3);
      return `${firstPart}******${lastPart}`;
    }
    return number;
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setAmount((prevAmount) => ({
      ...prevAmount,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();



    if (amount.withdraw == 0) {
      toast.error('Enter a valid amount');
    } else if (amount.withdraw > user.balance || amount.withdraw < 700) {
      toast.error(`Your balance is ${user.balance}, and the minimum withdrawal amount is 700`);
    } else {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        setIsModalVisible(true);
      }, 1000);
    }
    

  }

  return (
    <div className='flex flex-col items-center'>
      {loader && <Loader />}
      <div className='w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl'>
        <div onClick={() => navigate(-1)}>
          <SlArrowLeft className="cursor-pointer" />
        </div>
        <h1 className='text-lg'>WITHDRAWAL</h1>
        <Link to={'/notify'}>
          <MdNotificationsActive className='cursor-pointer' />
        </Link>
      </div>
      <main className='w-full lg:w-[1100px] p-3'>
        <div className='container p-0 bg-[#DF2057] h-auto mt-3 rounded-xl flex flex-col items-center'>
          <h2 className='mt-3 text-white text-3xl font-medium'>₹ {user?.balance}</h2>
          <p className='text-[#F1B9C4] font-medium'>amount that can be withdrawn</p>

          <div className='bg-white w-full h-auto mt-3 rounded-lg p-4 shadow-lg'>
            <div className='flex text-sm text-gray-600'>
              <div className='w-[43%]'>
                <p>Account Name</p>
              </div>
              <div className='w-[50%]'>
                <p>{userName}</p>
              </div>
            </div>

            <div className='flex mt-3 text-sm text-gray-600'>
              <div className='w-[43%]'>
                <p>Mobile Number</p>
              </div>
              <div className='w-[50%]'>
                <p>{userNumber}</p>
              </div>
            </div>

            <div className='flex justify-between items-center w-max mt-3'>
              <div className='w-[17px] h-[17px] bg-[#E12159] rounded-full flex justify-center items-center'>
                <div className='w-[7px] h-[7px] bg-white rounded-full'></div>
              </div>
              <p className='text-sm text-gray-600 ml-3'>Withdraw cash to bank card</p>
            </div>
          </div>
        </div>

        {/* withdraw amount */}
        <div className='container'>
          <h1 className='w-full mt-8 font-medium mb-2'>WITHDRAWAL AMOUNT</h1>
          <form onSubmit={handleOnSubmit}>
            <input onChange={handleOnChange} name='withdraw' value={amount.withdraw} className='w-full h-[50px] border border-gray-700 p-2 outline-none mt-2 rounded-3xl focus:border-red-500' type="number" placeholder='Please enter the withdrawal amount' />
            {/* <input onChange={handleOnChange} name='password' value={amount.password} className='w-full h-[50px] border border-gray-700 p-2 outline-none mt-2 rounded-3xl focus:border-red-500' type="password" placeholder='Please enter fund password' /> */}

            <p className='mt-3 text-[12.5px] text-gray-500'>*The withdrawal will arrive within 3-5 minutes after submitting the withdrawal request. It will be delayed during peak periods, so please wait patiently.</p>
            <p className='mt-3 text-[12.5px] text-gray-500'>*If you have any withdrawal issues, please contact your supervisor.</p>
            <button type='submit' className='bg-[#E12159] text-white w-[95%] mt-3 p-2 rounded-3xl'>WITHDRAWAL</button>
          </form>
        </div>
      </main>
      {isModalVisible && <WithdrawModel isModalVisible={isModalVisible} />}
      <ToastContainer />
    </div>
  );
}
