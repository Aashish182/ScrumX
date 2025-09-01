

import React, { useState } from 'react';
import loginimg from "../asset/login.png";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useDispatch } from 'react-redux';
import { fetchUserDetails } from '../store/userSlice';   // ✅ import from Redux
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();  // ✅ only Redux

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address.");
      errors.email = "Please enter a valid email address.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name , value } = e.target;
    setData((prev)=>({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateInputs()) return;

  try {
    const response = await axios({
      url: SummaryApi.login.url,
      method: SummaryApi.login.method,
      data,                           
      withCredentials: true,          
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataApi = response.data;   

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/Home');

      dispatch(fetchUserDetails());
    } else if (dataApi.error) {
      toast.error(dataApi.message);
    }
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Something went wrong. Try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f3e8ff] to-[#e9d5ff] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-lg shadow-lg opacity-70 transform rotate-12"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#e9d5ff] rounded-lg shadow-lg opacity-70 transform -rotate-12"></div>
      <div className="absolute bottom-20 right-16 w-60 h-60 bg-[#f3e8ff] rounded-lg shadow-lg opacity-80 transform -rotate-6"></div>
      <div className="absolute top-32 right-32 w-52 h-52 bg-[#e9d5ff] rounded-lg shadow-lg opacity-80 transform rotate-3"></div>

      <div className="w-[90%] top-12 md:w-[70%] lg:w-[60%] bg-[#C7D2FE] p-10 rounded-lg shadow-2xl relative z-10">
        
        <h1 className="text-left text-gray-700 text-3xl font-bold mb-8">Welcome Back</h1>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/2">
            <img className="w-full rounded-lg" src={loginimg} alt="login-img" />
          </div>
          
          <div className="md:w-1/2 bg-[#C4B5FD] p-10 rounded-lg">
            <h2 className="text-start text-gray-500 text-xl mb-6">Please Login to Continue..</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="flex items-center border rounded-md p-3 bg-[#faf5ff]">
                <FaUser className="text-gray-500 text-xl mr-3" />
                <input
                  type="text"
                  name='email' value={data.email} onChange={handleChange}
                  className="w-full focus:outline-none bg-[#faf5ff]"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex items-center border rounded-md p-3 bg-[#faf5ff]">
                <FaLock className="text-gray-500 text-xl mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name='password' value={data.password} onChange={handleChange}
                  className="w-full focus:outline-none bg-[#faf5ff]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 text-xl ml-3 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition-all"
              >
                Login
              </button>
            </form>
            <div className="text-right">
              <NavLink to="/forgotpassword" className="text-sm text-purple-600 hover:underline font-medium">
                Forgot Password ?
              </NavLink>
            </div>
            <p className="text-center text-gray-500 mt-6">
              Don't have an account? <NavLink to="/register" className="text-purple-600 font-medium hover:underline">Register here</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
