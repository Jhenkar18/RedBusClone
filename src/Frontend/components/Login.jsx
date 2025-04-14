
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../components/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const showSignup = () => {
    navigate("/signup"); // Navigate to the login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', formData);
      const { userId,email, token } = response.data;

      if (response.data.success) {
        login(userId,email); // Set user ID in context
        localStorage.setItem('token', token); // Save the new token in localStorage
        toast.success('Login successful!', {
          position: "top-center"
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error('User ID or token not found in response.');
      }
    } catch (error) {
      toast.error('Email/password doesnot match', {
        position: "top-center"
      });
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      {/* Navbar could go here */}
      <header>
        {/* Navbar content */}
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center w-auto px-4" style={{ minHeight: '10vh' }}>
        <div className="w-full max-w-lg p-10 space-y-6 bg-white rounded-lg shadow-lg" style={{ width: '500px', height: '400px' }}>
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            If u donot have an account?{" "}
            <button className="text-blue-600 hover:underline" onClick={showSignup}>
              SignUp
            </button>
          </p>
        </div>
      </main>

      <footer>
        {/* Footer content */}
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Login;


