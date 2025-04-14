
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim() // Trim input values
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address.', {
        position: "top-center"
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error('Password must be at least 8 characters long and include both letters and numbers.', {
        position: "top-center"
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.error('Phone number must be 10 digits long and start with digits 6 to 9.', {
        position: "top-center"
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signup', formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Store the JWT token
        toast.success('Signup successful! Redirecting to home...', {
          position: "top-center"
        });
        setTimeout(() => {
          navigate("/"); // Navigate to home page after signup
        }, 2000);
      } else if (response.data.error === 'User already registered') {
        toast.error('User already registered. Please log in.', {
          position: "top-center"
        });
      } else {
        toast.error('Signup failed. Please try again.', {
          position: "top-center"
        });
      }
    } catch (error) {
      toast.error('Signup failed. Please try again.', {
        position: "top-center"
      });
      console.error('Error:', error);
    }
  };

  const showLogin = () => {
    navigate("/Login"); // Navigate to the login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-slate-50 py-12">
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-md p-4 space-y-6 bg-white shadow-lg rounded-lg mt-14">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Create an Account</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button className="text-blue-600 hover:underline" onClick={showLogin}>
              Log in
            </button>
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Signup;
