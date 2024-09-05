import React, { useEffect, useState } from 'react'
import Slider from './Slider'
import 'bootstrap/dist/css/bootstrap.min.css';
import BalanceData from './BalanceData';
import ALiExpress from '/src/assets/h-i-1.png';
import help from '/src/assets/h-i-2.png';
import center from '/src/assets/h-i-3.png';
import reward from '/src/assets/h-i-4.png';
import EarningData from './EarningData';
import Company from './Company';
import Menu from './Menu';
import { Link } from 'react-router-dom'




export default function Home() {
   const [user, setUser] = useState()

 
 
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
          setUser(userData?.data?.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchUserData(); // Call the async function
    
      // No need to return anything unless you need a cleanup function
    }, []); // Empty dependency array means this effect runs once when the component mounts
    
  return (
    <div className='bg-white'>

           {/* header slider  */}
      <header className='h-auto lg:h-[100vh]'>
         <Slider />
      </header>

      {/* balance data  */} 
      <section className='w-full '>
        <BalanceData />
      </section>


         
         {/* pages links  */}

         <section className='container flex flex-wrap justify-between items-center h-auto mt-10 overflow-hidden'>

              <Link to={'/about'} className='w-[40%] sm:w-[24%]'>
                <div className='pageBox flex justify- flex-col items-center mt-2 cursor-pointer'>
                      <img src={ALiExpress} className='w-[85%] h-[75%] rounded-full' alt="logo" />
                      <p className='p-0 m-0 text-center text-red-600 font-medium'>about us</p>
                </div>
             </Link>
             <Link to={'/help'} className='w-[40%] sm:w-[24%]'>
                <div className='pageBox flex justify- flex-col items-center cursor-pointer'>
                      <img src={help} className='w-[85%] h-[75%] rounded-full' alt="logo" />
                      <p className='p-0 m-0 text-center text-red-600 font-medium'>help center</p>
                </div>
             </Link>
             <Link to={'/merchant'} className='w-[40%] sm:w-[24%]'>
                <div className='pageBox flex justify- flex-col items-center cursor-pointer'>
                      <img src={center} className='w-[85%] h-[75%] rounded-full' alt="logo" />
                      <p className='p-0 m-0 text-center text-red-600 font-medium'>merchant center</p>
                </div>
             </Link>
             <Link to={'/invitereward'} className='w-[40%] sm:w-[24%]'>
                <div className='pageBox flex justify- flex-col items-center cursor-pointer'>
                      <img src={reward} className='w-[85%] h-[75%] rounded-full' alt="logo" />
                      <p className='p-0 m-0 text-center text-red-600 font-medium'>invitation reward</p>
                </div>
            </Link>  
         </section>



         {/* review sect  */}


         <section className='mt-[100px] mb-[30px] md:mb-[70px]'>
          <h1 className='container mt-10 mb-10 text-xl font-medium text-gray-700'>REVENUE DISPLAY</h1>

          <EarningData />

         </section>



         {/* company logos sect  */}


         <section className='w-auto -h-auto flex justify-center items-center mb-28'>

          <Company />

         </section>


         {/* menu sect  */}

              <Menu />



    </div>
  )
}
