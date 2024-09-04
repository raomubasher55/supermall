import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
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

    try {
      const response = await fetch('http://localhost:3000/api/login', {
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
        console.log(data);
        
        // Assuming the API returns the user ID and token, you can store them in localStorage
        localStorage.setItem('currentUserId', JSON.stringify(data.user));
        localStorage.setItem('token', data.accessToken);
        toast.success("Welcome Back");
        navigate('/');
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg pl-2 pr-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#DB2252' }}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email or Number</label>
            <input
              type="text"
              name="emailOrNumber"
              value={formData.emailOrNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <button
              type="submit"
              className="w-full bg-[#DB2252] text-white px-4 py-2 rounded-md hover:bg-[#b91c46] transition duration-300"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="text-[#DB2252] hover:underline"
              onClick={() => navigate('/signup')}
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;
