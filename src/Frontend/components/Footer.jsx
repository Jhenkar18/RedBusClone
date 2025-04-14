import React from 'react';
import redbuslogo from "../../assets/rdc-redbus-logo.webp";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="md:col-span-2">
            <img src={redbuslogo} alt="redBus Logo" className="w-32 mb-4" />
            <p className="text-gray-600 text-sm">
              redBus is the world's largest online bus ticket booking service trusted by over 25 million happy customers globally. 
              redBus offers bus ticket booking through its website, iOS, and Android mobile apps for all major routes.
            </p>
          </div>

          <div>
            <h3 className="text-gray-800 font-semibold mb-4">About redBus</h3>
            <ul className="text-gray-600 text-sm space-y-2 cursor-pointer">
              <li>About us</li>
              <li>Investor Relations</li>
              <li>Contact us</li>
              <li>Mobile version</li>
              <li>redBus on mobile</li>
              <li>Sitemap</li>
              <li>Offers</li>
              <li>Careers</li>
              <li>Values</li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Info</h3>
            <ul className="text-gray-600 text-sm space-y-2 cursor-pointer">
              <li>T&C</li>
              <li>Privacy policy</li>
              <li>FAQ</li>
              <li>Blog</li>
              <li>Bus operator registration</li>
              <li>Agent registration</li>
              <li>Insurance partner</li>
              <li>User agreement</li>
              <li>Primo Bus</li>
              <li>Bus Timetable</li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Global Sites</h3>
            <ul className="text-gray-600 text-sm space-y-2 cursor-pointer">
              <li>India</li>
              <li>Singapore</li>
              <li>Malaysia</li>
              <li>Indonesia</li>
              <li>Peru</li>
              <li>Colombia</li>
              <li>Cambodia</li>
              <li>Vietnam</li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Our Partners</h3>
            <ul className="text-gray-600 text-sm space-y-2 cursor-pointer">
              <li>Goibibo Bus</li>
              <li>Goibibo Hotels</li>
              <li>Makemytrip Hotels</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-4">
          <p className="text-gray-600 text-sm text-center">
            © 2024 Redbus India Pvt Ltd. All rights reserved
          </p>

          <div className="flex justify-center space-x-4 mt-4 cursor-pointer">
            <a href="#" className="text-gray-600"><FaFacebookF /></a>
            <a href="#" className="text-gray-600"><FaLinkedinIn /></a>
            <a href="#" className="text-gray-600"><FaTwitter /></a>
            <a href="#" className="text-gray-600"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
