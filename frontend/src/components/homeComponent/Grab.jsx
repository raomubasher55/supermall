import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { Bell, HelpCircle, Plus } from "lucide-react"
import InfoCard from '../InfoCard/InfoCard';
import OrderDetailsModal from '../OrderDetailsModal';
import { v4 as uuidv4 } from 'uuid';


const GrabLevel = () => {
  const navigate = useNavigate();
  const [completedOrders, setCompletedOrders] = useState(0);
  const [level, setLevel] = useState('Beginner');
  const [earningBonus, setEarningBonus] = useState(0);
  const [balance, setBalance] = useState(0);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState();
  const [incomplete, setIncomplete] = useState(0);
  const [allOrder, setAllOrder] = useState(0);
  const [orderDetail, setOrderDetail] = useState({
      success: true,
      order_id: uuidv4(),
      order_date: new Date(),
      order_status: "pending",
      // order_total: 100,
      name: "brown shoes sneakers",
      commission: 0.02 * 500,
      amount: 500,
      task:1
  });
  const [showModal, setShowModal] = useState(false); 


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

    const OrderData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/all-order?status=paid`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        const orderData = await response.json();
        setCompletedOrders(orderData?.orders)




        const response1 = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/all-order?status=unpaid`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response1.ok) {
          throw new Error('Failed to fetch orders');
        }

        const result1 = await response1.json();        
        setIncomplete(result1.orders)







        const response2 = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/order/all-orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response2.ok) {
          throw new Error('Failed to fetch orders');
        }
        const result2 = await response2.json();
        setAllOrder(result2?.count)



    
        

        // Calculate 2% of each order's amount and sum it
        const totalCommission = orderData?.orders?.reduce((sum, order) => {
          return sum + (order.amount * 0.02);  // Calculate 2% of the order amount
        }, 0);

        setEarningBonus(totalCommission || 0)


        if (orderData?.orders.length >= 3) {
          setLevel("Expert");
        } else if (orderData?.orders.length >= 2) {
          setLevel("Intermadiate");
        } else if (orderData?.orders.length >= 1) {
          setLevel("Beginner");
        }
        else {
          setLevel("Newbie");
        }



      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    OrderData();

  }, []);

  return (
    <div className="flex flex-col items-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="fixed left-0 top-0 w-full h-[55px] bg-color text-white flex justify-between items-center px-4 text-xl z-10">
            <div onClick={() => navigate(-1)}>
              <SlArrowLeft className="cursor-pointer" />
            </div>
            <h1 className="text-lg">GRAB LEVEL</h1>
            <Link to="/notify">
              <MdNotificationsActive className="cursor-pointer" />
            </Link>
          </div>

          {/* Account Info */}
          <div className="flex justify-between items-center ">
            <div className='mt-[90px]'>
              <h2 className="text-2xl font-bold">{user?.balance ? user?.balance : "00"}₹</h2>
              <p className="text-sm text-gray-500">account funds</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* <Bell className="w-6 h-6 text-gray-500" /> */}
              <div className="w-8 h-8 bg-color rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center">
            {/* {userImage ? (
              <img src={userImage} alt="Profile" className="w-24 h-24 rounded-full" />
            ) : (
              <FaUser className="w-24 h-24 rounded-full object-cover" />
            )} */}
            {/* <h2 className="text-3xl font-bold mt-4">{user?.name ? user?.name : "username"}</h2>/ */}
            <div className="text-xl mt-2">{level}</div>
          </div>

          {/* VIPO Card */}
          <div className="bg-color rounded-lg p-4 text-white relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">VIP</h3>
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold">{completedOrders?.length}  </p>
                <p className="text-xs">Completed</p>
              </div>
              <div onClick={()=>navigate('/all-orders')} className="text-center">
                <p className="text-2xl font-bold">{allOrder}</p>
                <p className="text-xs">All Orders</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{incomplete?.length}</p>
                <p className="text-xs">Incomplete</p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <InfoCard title="Commission Earned" value={`₹${earningBonus}`} />
            <InfoCard title="Frozen Amount" value="₹0.00" />
            <InfoCard title="Incomplete Orders" value="₹0" />
            <InfoCard title="Available Balance" value={`₹${user?.balance}`} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center mt-4">
            {/* <Link to="/withdraw" className="mx-2 my-2 sm:my-0 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md">
              Withdraw
            </Link>
            <Link to="/recharge" className="mx-2 my-2 sm:my-0 px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
              Deposit
            </Link> */}
            {/* <Link to="/task" className="mx-2 my-2 sm:my-0 px-4 py-2 bg-color text-white rounded-full text-center shadow-md">
              START GRABBING ORDERS
            </Link> */}
            <div onClick={()=>setShowModal(true)} className="mx-2 my-2 sm:my-0 px-4 py-2 bg-color text-white rounded-full text-center shadow-md">
              START GRABBING ORDERS
            </div>
                      {showModal && <OrderDetailsModal  orderDetail={orderDetail} setShowModal={setShowModal} />}

          </div>
        </div>
      </div>
      <footer className="w-full bg-color text-white py-4 mt-12 flex flex-col md:flex-row justify-between items-center flex-wrap">
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
