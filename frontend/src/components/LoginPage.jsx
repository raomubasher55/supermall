import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './ProductCard/Loader'; // Assuming this is your loading component

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    emailOrNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.emailOrNumber,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('currentUserId', JSON.stringify(data.user));
          localStorage.setItem('token', data.accessToken);
          navigate('/');
          toast.success("Welcome Back");
        } else {
          toast.error("Invalid email or password");
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error('Login error:', error);
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
            <h2 className="text-3xl font-bold text-[#ff4d6d] mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="emailOrNumber"
              placeholder="Enter Your Email or Number"
              value={formData.emailOrNumber}
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
            <button
              type="submit"
              className="w-full bg-[#ff4d6d] text-white py-2 rounded-md hover:bg-[#ff3c5c] transition-colors"
            >
              Login
            </button>
          </form>
          {/* <div className="text-center text-sm text-gray-500">
            or continue with
          </div>
          <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
            <img src="/placeholder.svg?height=24&width=24" alt="Google logo" className="w-6 h-6" />
            <span>Google Account</span>
          </button> */}
          <p className="text-center text-sm">
            Have not account yet?{' '}
            <button
              className="text-green-500 hover:underline"
              onClick={() => navigate('/signup')}
            >
              Register
            </button>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
