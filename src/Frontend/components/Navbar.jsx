
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/redbus-logo.png';
import BusLogo from '../../assets/busticket.svg';
import TrainTicket from '../../assets/train_ticket.svg';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { VscAccount } from "react-icons/vsc";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { useUser } from '../components/UserContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { userId, logout } = useUser();
  const navigate = useNavigate();

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to the homepage
  };

  const handleShowMyTicket = () => {
    navigate('/PrintTicket'); // Navigate to the PrintTicket component
  };

  const handleEmailTicket = () => {
    navigate('/EmailTicket'); // Navigate to the PrintTicket component
  };

  const handleCancelTicket = () => {
    navigate('/CancelTicket'); // Navigate to the PrintTicket component
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleTrainLogoClick=()=>{
     navigate('/Trainticket')
  }

  return (
    <div className="h-28 w-full bg-white fixed top-0 z-50">
      <div className="h-full max-w-[1250px] m-auto bg-white flex justify-between items-center px-4 md:px-0">
        {/* Mobile section */}
        <div className="flex items-center w-full md:hidden">
          <FaBars className="h-6 w-6" />
          <img
            src={Logo}
            alt="RedBusLogo"
            className='h-10 mx-4 cursor-pointer'
            onClick={handleLogoClick}
          />
          <VscAccount className="h-6 w-6 ml-auto" />
        </div>

        {/* Desktop/browser view */}
        <div className="hidden md:flex items-center space-x-16">
          <div className='pt-6'>
            <img
              src={Logo}
              alt="RedBusLogo"
              className='h-12 cursor-pointer'
              onClick={handleLogoClick}
            />
          </div>
          <ul className='flex flex-row space-x-8'>
            <li className='flex flex-col items-center bg-gradient-to-r from-red-400 to-red-500 text-white p-2 rounded cursor-pointer'>
              <img src={BusLogo} alt="buslogo" className='h-5 mb-2' />
              <span>Bus Tickets</span>
            </li>
            <li className='flex flex-col items-center hover:bg-zinc-300 text-black p-2 rounded group cursor-pointer'>
              <img src={TrainTicket} alt="Train Logo" onClick={handleTrainLogoClick}
                className='h-5 mb-2 filter grayscale brightness-0 group-hover:filter-none group-hover:grayscale-0 group-hover:brightness-100' />
              <span>Train Tickets</span>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center mr-5 relative">
          <ul className='flex flex-row space-x-8'>
            <li className='flex items-center space-x-3 group p-2 rounded hover:bg-zinc-300 transition-all duration-300 cursor-pointer'>
              <TfiHeadphoneAlt className='transition-transform duration-300' />
              <span className='transition-transform duration-300'>Help</span>
            </li>
            <li
              className='flex items-center space-x-3 group p-2 rounded hover:bg-zinc-300 transition-all duration-300 cursor-pointer relative'
              onClick={toggleAccountDropdown}
            >
              <VscAccount className='transition-transform duration-300' />
              <span className='transition-transform duration-300'>
                {userId ? "My Account" : "Account"}
              </span>
              <FaAngleDown className='transition-transform duration-300' />
            </li>
          </ul>
          {accountDropdownOpen && (
            <div className='absolute top-12 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50'>
              <ul className='py-1'>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-300'
                onClick={handleCancelTicket}>Cancel Ticket</li>
                <li 
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-300' 
                  onClick={handleShowMyTicket}>Show My Ticket</li>
                <li
                 className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-300'
                 onClick={handleEmailTicket}>Email/SMS</li>
                
                {userId ? (
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={handleLogout}>
                    Logout
                  </li>
                ) : (
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    <Link to="/signup">Login/Sign Up</Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
