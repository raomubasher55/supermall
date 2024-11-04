import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './ProductCard/Loader'; // Assuming this is your loading component

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    accountNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const { name, email, password, mobile, accountNumber } = formData;
    setLoader(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, mobile, accountNumber }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("User registered successfully!");
        navigate('/'); // Redirect to login page after successful registration
      } else {
        if (data.msg === "Validation errors") {
          toast.error(data.errors[0].msg || "Registration failed!");
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error) {
      toast.error("An error occurred during registration!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="text-[#ff4d6d] text-2xl font-bold mb-4">LOGO Here</div>
          </div>
            <h2 className="text-2xl font-bold text-[#ff4d6d] mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#e8e8e8] rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#e8e8e8] rounded-md"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Enter Your Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#e8e8e8] rounded-md"
            />
            <input
              type="text"
              name="accountNumber"
              placeholder="Enter Your Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#e8e8e8] rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#e8e8e8] rounded-md"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#e8e8e8] rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-[#ff4d6d] text-white py-2 rounded-md hover:bg-[#ff3c5c] transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm">
            Already have an account?{' '}
            <button
              className="text-green-500 hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUpPage;
