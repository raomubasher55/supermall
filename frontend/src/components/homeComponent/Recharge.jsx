import React, { useEffect, useState } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Recharge() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState()


  const Amount = [
    { id: 1, rupee: '200' },
    { id: 2, rupee: '500' },
    { id: 3, rupee: '1000' },
    { id: 4, rupee: '2000' },
    { id: 5, rupee: '3000' },
    { id: 6, rupee: '5000' },
    { id: 7, rupee: '8000' },
    { id: 8, rupee: '20000' },
    { id: 9, rupee: '50000' },
  ];

  const handleAmountClick = (rupee) => {
    setInputValue(rupee);

  };



  const handleOnCheckout = async (number) => {
    if (number <= 0) {
      toast.error('Please enter a valid amount');
    }
    try {
      setLoader(true); // Start the loader before starting the async operation

      const stripe = await loadStripe('pk_test_51PrdT1P3NC7isVfIIwTTHH32Z5PnhyGQLbKy1k9XJYCDHqyxiA4uQxBuXRTmLAcEuYhp5KEcRT0dAu3GfznZpBwg00wCF0ALII');

      const body = {
        package: number
      };
      
      

      const response = await fetch('http://localhost:3000/api/v1/product/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      
      const session = await response.json();
      console.log(session);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      
      setLoader(false);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });



      if (result.error) {
        setError(result.error.message); // Update state with error message
        toast.error(`Payment Failed due to ${result.error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during the payment process.');
    } finally {
      setLoader(false); // Stop the loader in the finally block to ensure it runs regardless of success or failure
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');    
    setToken(token);
  }, [])

  return (
    <div className="flex flex-col items-center bg-white overflow-hidden">
      <div className="fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
        <div onClick={() => navigate(-1)}>
          <SlArrowLeft className="cursor-pointer" />
        </div>
        <h1 className="text-[17px] font-medium">RECHARGE</h1>
        <Link to="/notify">
          <MdNotificationsActive className="cursor-pointer" />
        </Link>
      </div>

      <div className="mt-16">
        <h1 className="mt-2">Recharge Amount</h1>
      </div>

      <div className="container h-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="00.00"
          className="text-center placeholder-gray-300 placeholder:font-medium placeholder:text-lg focus:outline-none border p-2 rounded-3xl border-gray-300 w-full mt-3"
        />
        <div className="mt-3 flex justify-between items-center flex-wrap">
          {Amount.map((item) => (
            <div
              key={item.id}
              onClick={() => handleAmountClick(item.rupee)}
              className="flex justify-center cursor-pointer items-center w-[30%] h-[40px] border mt-2 hover:bg-pink-200"
            >
              {item.rupee}
            </div>
          ))}
        </div>

        {/* radio input  */}
        <div className="flex items-center justify-between w-max mt-3">
          <input
            type="radio"
            id="radio1"
            name="recharge"
            value="903"
            checked={selectedRadio === '903'}
            onChange={() => setSelectedRadio('903')}
            className="form-radio"
          />
          <label htmlFor="radio1" className="ml-2">903</label>
        </div>

        <div className="flex items-center justify-between w-max mt-3">
          <input
            type="radio"
            id="radio2"
            name="recharge"
            value="155"
            checked={selectedRadio === '155'}
            onChange={() => setSelectedRadio('155')}
            className="form-radio"
          />
          <label htmlFor="radio2" className="ml-2">155</label>
        </div>

        <div className="w-full shadow h-auto mt-4 p-4 mb-3 rounded-lg">
          <p>1 : If the recharge fails due to busy conditions, please choose another recharge channel to recharge your account.</p>
          <p>2 : everytime you recharge, you need to start from this page. Do not save UPI direct debit.</p>
          <p>3 : it is recommended to use Paytm or Google Pay first to avoid being unable to pay due to congestion.</p>
        </div>
      </div>

      <button onClick={() => handleOnCheckout(inputValue)} className='w-[90%] h-[45px] bg-[#E91E63] mt-3 rounded-3xl text-white font-medium'>RECHARGE</button>
      <ToastContainer />
    </div>
  );
}
