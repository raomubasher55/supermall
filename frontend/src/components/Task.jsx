import React, { useState, useEffect } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { MdNotificationsActive } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard/ProductCard';
import ProductCard_2 from './ProductCard/ProductCard_2';
import ProductCard_3 from './ProductCard/ProductCard_3';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './ProductCard/Loader';
import { v4 as uuidv4 } from 'uuid';
import OrderDetailsModal from './OrderDetailsModal';


const Task = () => {
  const navigate = useNavigate();
  const [investAmount, setInvestAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [customBonus, setCustomBonus] = useState(0);
  const [investmentStarted, setInvestmentStarted] = useState(false);
  const [swiperSlider, setSwiperSlider] = useState(false);
  const [swiperSlider_2, setSwiperSlider_2] = useState(false);
  const [swiperSlider_3, setSwiperSlider_3] = useState(false);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState();
  const [task, setTask] = useState(2);
  const [orderDetail, setOrderDetail] = useState();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (investAmount > 0) {
      const elements = document.getElementsByClassName('card');
      if (elements.length > 0) {
        elements[0].scrollIntoView({ behavior: 'smooth' });
      }

    }
  }, [investAmount]);

  

  const handleInvestment = (amount, bonus) => {
    setInvestAmount(amount);
    setCustomAmount('');
    setCustomBonus(bonus);
    setInvestmentStarted(true);
    saveInvestmentPlan(amount, bonus);
    if (amount == 100) {
      setShowModal(true)
      setOrderDetail({
        success: true,
        order_id: uuidv4(),
        order_date: new Date(),
        order_status: "pending",
        order_total: investAmount,
        name: "Black Air Pods",
        commission: 0.02 * 100,
        investAmount: 100
      })
      setSwiperSlider_3(true);
      setSwiperSlider(false);
      setSwiperSlider_2(false)
    } else if (amount == 300) {
      setShowModal(true)
      setOrderDetail({
        success: true,
        order_id: uuidv4(),
        order_date: new Date(),
        order_status: "pending",
        order_total: investAmount,
        name: "PoGo Camera",
        commission: 0.02 * 300,
        investAmount: 300
      })
      setSwiperSlider_2(true);
      setSwiperSlider(false);
      setSwiperSlider_3(false);
    } else if (amount == 500) {
      setShowModal(true)
      setOrderDetail({
        success: true,
        order_id: uuidv4(),
        order_date: new Date(),
        order_status: "pending",
        order_total: investAmount,
        name: "brown shoes sneakers",
        commission: 0.02 * 500,
        price: 500
      })
      setSwiperSlider(true);
      setSwiperSlider_2(false);
      setSwiperSlider_3(false);

    }
  };

  const handleCustomInvestment = () => {
    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid investment amount.');
      return;
    }
    const bonus = amount * 0.02; // 2% daily bonus calculation
    setInvestAmount(amount);
    setCustomBonus(bonus.toFixed(2)); // Round bonus to 2 decimal places
    setInvestmentStarted(true);
    saveInvestmentPlan(amount, bonus);
  };

  const handleChangeCustomAmount = (event) => {
    setCustomAmount(event.target.value);
  };

  
  
  
  const handleSubmitInvestment = () => {
    
    // Calculate commission
    const commissionRate = 0.02; // Assuming a 2% commission rate
    const commission = investAmount * commissionRate;

    if (investAmount > 0) {
      saveInvestmentPlan(investAmount,customBonus > 0 ? customBonus : (investAmount * 0.02).toFixed(2));

      // Check for investment plan thresholds and initiate checkout
      if (investAmount >= 500) {
        handleOnCheckout(investAmount ,"brown shoes sneakers", "https://zaydns.com/cdn/shop/files/8_8fabb852-64a0-4cb8-ac1e-70a40510884e.png?v=1697719081&width=1080", 3 , commission,);
       
      } else if (investAmount >= 300) {
        handleOnCheckout(investAmount, "PoGo Camera", "https://khawajaphotos.pk/wp-content/uploads/2022/08/Capture.jpg", 2 , commission,);
      
      } else if (investAmount >= 100) {
        handleOnCheckout(investAmount,"Black Air Pods", 'https://dakaan.pk/product_images/airpod-pro-2-black-25a5b2a3553c217f.webp', 1 , commission,);
        
      }
      
    } else {
      alert('Please select an investment plan first.');
    }
  };
  

  const saveInvestmentPlan = (amount, bonus) => {
    const plan = { amount, bonus };
    localStorage.setItem('investplan', JSON.stringify(plan));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    setToken(token)
  }, [])
 
  const handleOnCheckout = async (number, name, image, task , commission) => {
    if (number <= 0) {
      toast.error('Please enter a valid amount');
    }
    try {
      setLoader(true); // Start the loader before starting the async operation

      // const stripe = await loadStripe('pk_test_51PrdT1P3NC7isVfIIwTTHH32Z5PnhyGQLbKy1k9XJYCDHqyxiA4uQxBuXRTmLAcEuYhp5KEcRT0dAu3GfznZpBwg00wCF0ALII');
      const stripe = await loadStripe('pk_test_51PsqrxFXuPSbCmw16A3R5QwCbbPRB0hF3aOP836NDXiPjDpCS2t0wBHpq8W16jeezBsZgBPpm2jAQBX6kkI9a1fp0099A2A7x7');

      const body = {
        package: number,
        name: name,
        image: image,
        task: task,
        commission: commission
      };
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch('http://localhost:3000/api/v1/product/checkout', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      const session = await response.json();
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
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/product/orders?status=paid');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const result = await response.json();
        // console.log(result.orders);

        const maxTaskNumber = result.orders.reduce((max, order) => order.task > max ? order.task : max, 0);
        setTask(maxTaskNumber)
              
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);




  return (
    <>
      {loader && <Loader />}
      <div className="flex flex-col items-center ">
        {error && <div className="error-message text-red-600 mt-24 text-2xl">{error}</div>}

        <div className="fixed left-0 top-0 w-full h-[55px] z-10 bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl">
          <div onClick={() => navigate(-1)}>
            <SlArrowLeft className="cursor-pointer" />
          </div>
          <h1 className="text-lg">TASK</h1>
          <Link to="/notify">
            <MdNotificationsActive className="cursor-pointer" />
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center my-6 mt-[90px]">Investment Plans</h2>
        <p className="text-lg text-center text-gray-700 mb-8 p-5 pt-0">
          Ready to grow your wealth? Our investment plans offer a range of options tailored to your financial goals. Whether you're starting small or aiming high, each plan is designed to maximize your returns with daily bonuses that compound over time. Take advantage of our Starter Plan for a gentle introduction, or dive into our Premium Plan for the highest daily returns. With transparent benefits and a commitment to your financial success, investing with us is a smart choice. Begin your journey today and watch your investments flourish.
        </p>

        <div className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-2">Starter Plan</h3>
            <p className="text-gray-600 mb-4 text-center">
              Begin your investment journey with a modest amount. This plan is perfect for those new to investing or for those looking to test the waters. With a low entry threshold, you can start investing with just ₹100, making it accessible to everyone. The Starter Plan offers a daily bonus of ₹2, allowing you to see gradual growth.
            </p>
            <p className="text-xl font-semibold mb-4">Invest: ₹100</p>
            <p className="text-xl font-semibold mb-4">Daily Bonus: ₹2</p>
            <button
              className="bg-[#DB2252] hover:bg-[#FF3366] text-white py-2 px-4 rounded-md transition duration-300"
              onClick={() => {
                handleInvestment(100, 2)  
              }}
            >
              Choose Plan
            </button> 
          </div>

          <div className={`p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center ${task >= 1 ? "" : "opacity-0 pointer-events-none pointer-events-none"} `}>
            <h3 className="text-xl font-semibold mb-2">Growth Plan</h3>
            <p className="text-gray-600 mb-4 text-center">
              Accelerate your returns with a higher initial investment. This plan is designed for those who are looking to significantly grow their wealth over a shorter period. With an investment of ₹300, you will receive a daily bonus of ₹6, compounding your returns faster.
            </p>
            <p className="text-xl font-semibold mb-4">Invest: ₹300</p>
            <p className="text-xl font-semibold mb-4">Daily Bonus: ₹6</p>
            <button
              className="bg-[#DB2252] hover:bg-[#FF3366] text-white py-2 px-4 rounded-md transition duration-300"
              onClick={() => handleInvestment(300, 6)}
            >
              Choose Plan
            </button>
          </div>

          <div className={`p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center ${task >= 2 ? "" : "opacity-0 pointer-events-none pointer-events-none"} `}>
            <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
            <p className="text-gray-600 mb-4 text-center">
              Maximize your earnings potential with our highest returns. Ideal for serious investors, the Premium Plan offers the best daily returns on your investment. By investing ₹500, you will receive a daily bonus of ₹10, ensuring substantial growth of your portfolio.
            </p>
            <p className="text-xl font-semibold mb-4">Invest: ₹500</p>
            <p className="text-xl font-semibold mb-4">Daily Bonus: ₹10</p>
            <button
              className="bg-[#DB2252] hover:bg-[#FF3366] text-white py-2 px-4 rounded-md transition duration-300"
              onClick={() => handleInvestment(500, 10)}
            >
              Choose Plan
            </button>
          </div>

          <div className={`p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center ${task >= 3 ? "" : "opacity-0 pointer-events-none pointer-events-none"} `}>
            <h3 className="text-xl font-semibold mb-2">Custom Plan</h3>
            <p className="text-gray-600 mb-4 text-center">
              Define your investment amount for a personalized plan. Our Custom Plan allows you to choose your investment amount, tailored to your financial capabilities and goals. Enjoy a 2% daily bonus on your custom amount, compounding daily to enhance your returns.
            </p>
            <input
              type="number"
              placeholder="Enter Amount"
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 text-xl text-center w-full"
              value={customAmount}
              onChange={handleChangeCustomAmount}
            />
            <button
              className="bg-[#DB2252] hover:bg-[#FF3366] text-white py-2 px-4 rounded-md transition duration-300"
              onClick={handleCustomInvestment}
            >
              Customize Plan
            </button>
          </div>
        </div>

        {swiperSlider &&
          <div className='my-2 card'>
            <ProductCard />
          </div>
        }
        {swiperSlider_2 &&
          <div className="my-2 card">
            <ProductCard_2 />
          </div>
        }

        {swiperSlider_3 &&
          <div className="my-2 card">
            <ProductCard_3 />
          </div>
        }


        <div id="investment-details" className="container mx-auto mt-6 p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center">
          {investmentStarted && (
            <>
              <h3 className="text-xl font-semibold mb-2">Investment Details</h3>
              <p>Investment Amount: ₹{investAmount}</p>
              <p>
                Daily Bonus: ₹
                {customBonus > 0 ? customBonus : (investAmount * 0.02).toFixed(2)}
              </p>
              <button
                className="bg-[#4CAF50] hover:bg-[#45A049] text-white py-2 px-4 rounded-md mt-4 transition duration-300"
                onClick={handleSubmitInvestment}
              >
                Submit Investment
              </button>
            </>
          )}
        </div>




        <footer className="w-full bg-[#DB2252] text-white py-4 mt-12">
          <div className="container mx-auto">
            <p className="text-xl font-semibold text-center">Investment Guidance</p>
            <p className="text-sm mb-2 mt-10">
              Our goal is to help you make informed investment decisions. Here are a few tips to get you started:
            </p>
            <ul className="text-sm mb-4 list-disc list-inside">
              <li>Start with an amount you are comfortable investing.</li>
              <li>Diversify your investments to spread risk.</li>
              <li>Reinvest your earnings to maximize growth.</li>
              <li>Keep an eye on market trends and adjust your strategy accordingly.</li>
              <li>Consult with a financial advisor for personalized advice.</li>
            </ul>
            <p className="text-sm">
              At our company, we strive to provide you with the tools and knowledge to make smart investment choices.
            </p>
            <p className="text-sm">
              For more information and resources, visit our Help Center or contact our support team.
            </p>
            <p className="text-sm">
              Stay informed, stay proactive, and watch your investments grow.
            </p>

            <div className='flex flex-col sm:flex-row justify-between items-center text-center'>
              <p className="text-sm mt-4">&copy; 2024 Investment Company. All rights reserved.</p>
              <p className="text-sm mt-4">
                Developed by
                <a href="https://api.whatsapp.com/send/?phone=923082769473"> Ghotia Developers</a>
              </p>
            </div>
          </div>
          {/* <OrderDetailsModal/> */}
          {showModal && <OrderDetailsModal  orderDetail={orderDetail} setShowModal={setShowModal} />}
          
        </footer>
        <ToastContainer />
      </div>
    </>
  );
};

export default Task;
