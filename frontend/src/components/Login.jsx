import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    emailOrNumber: '',
    number: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  // Retrieve the users from localStorage and ensure it's an array
  const users = Array.isArray(JSON.parse(localStorage.getItem('users'))) ? JSON.parse(localStorage.getItem('users')) : [];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateInvitationCode = (name) => {
    const initials = name.split(' ').map(word => word[0].toUpperCase()).join('');
    const randomDigits = Math.random().toString().slice(2, 5);
    return `${randomDigits}${initials.slice(0, 2).toUpperCase()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const newUser = {
        id: Date.now(), // Generate a unique ID for the user
        Name: formData.Name,
        emailOrNumber: formData.emailOrNumber,
        number: formData.number,
        country: formData.country,
        password: formData.password,
        invitationCode: generateInvitationCode(formData.Name),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUserId', newUser.id);
      alert("User registered successfully! Welcome to our platform!");
      navigate('/home');
    } else {
      const user = users.find(
        (user) =>
          (user.emailOrNumber === formData.emailOrNumber || user.number === formData.emailOrNumber) &&
          user.password === formData.password
      );

      if (user) {
        localStorage.setItem('currentUserId', user.id);
        // alert("Login successful! Welcome back!");
        toast.success("Welcome Back")
        navigate('/home');
      } else {
        // alert("Invalid credentials! Please register if you don't have an account.");
        toast.error("Invalid email or password")
      }
    }
  };

  // Fetch the current user's data to display
  const currentUserId = localStorage.getItem('currentUserId');
  const currentUser = users.find(user => user.id === parseInt(currentUserId));

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg pl-2 pr-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#DB2252' }}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">{isSignUp ? 'Email' : 'Email or Number'}</label>
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
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <button
              type="submit"
              className="w-full bg-[#DB2252] text-white px-4 py-2 rounded-md hover:bg-[#b91c46] transition duration-300"
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="text-[#DB2252] hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
        <ToastContainer />

      </div>
    </div>
  );
};

export default Login;
