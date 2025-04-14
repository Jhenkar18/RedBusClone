
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailTicket = () => {
  const [bookingId, setBookingId] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBookingId(e.target.value);
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const sendPDFEmail = async (details) => {
    const pdfBlob = generatePDF(details);
    if (!pdfBlob) {
      setError('Failed to generate PDF.');
      return;
    }
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'booking-details.pdf');
    
    const token = localStorage.getItem('token');
    try { 
      await axios.post('http://localhost:8000/SendPdfEmail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      toast.success('PDF sent to your email successfully!');
    } catch (error) {
      console.error('Error sending PDF via email:', error);
      setError('Failed to send PDF via email.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to continue.');
      navigate('/Login');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId || decodedToken.id || decodedToken.sub;

    try {
      const response = await axios.post('http://localhost:8000/PrintTicket', { bookingId, userId }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      setBookingDetails(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired, please log in again.');
        localStorage.removeItem('token');
        navigate('/signup');
      } else {
        setError('Error fetching booking details. Please check your booking ID and try again.');
      }
    }
  };





  const generatePDF = () => {
    const doc = new jsPDF();
  // Title Section
  doc.setFontSize(22);
  doc.setTextColor(30, 144, 255);  // Set title color to blue
  doc.text('Booking Confirmed!', 20, 20);

  // Adding a horizontal line below the title for visual separation
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25); // Draw line below the title

  // Booking Details Header
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text('Ticket Details', 20, 35);

  // Booking Information
  doc.setFontSize(12);
  doc.setTextColor(60);

  // Adjusting line spacing and adding bold labels for details
  doc.text(`Booking ID:`, 20, 45);
  doc.text(`${bookingDetails.booking_id}`, 60, 45); // Aligned with label

  doc.text(`Bus Number:`, 20, 55);
  doc.text(`${bookingDetails.bus_id} (${bookingDetails.bus_number})`, 60, 55);

  doc.text(`Date:`, 20, 65);
  doc.text(`${formatDate(bookingDetails.departure_time)}`, 60, 65);

  doc.text(`Departure Time:`, 20, 75);
  doc.text(`${formatTime(bookingDetails.departure_time)}`, 60, 75);

  doc.text(`Arrival Time:`, 20, 85);
  doc.text(`${formatTime(bookingDetails.arrival_time)}`, 60, 85);

  doc.text(`Seat Number:`, 20, 95);
  doc.text(`${bookingDetails.seat_number}`, 60, 95);

  doc.text(`Total Fare:`, 20, 105);
  doc.text(`₹${bookingDetails.total_amount}`, 60, 105);

  doc.text(`From:`, 20, 115);
  doc.text(`${bookingDetails.from}`, 60, 115);

  doc.text(`To:`, 20, 125);
  doc.text(`${bookingDetails.to}`, 60, 125);
    
    return doc.output('blob');
  };

  return (
    <div className="mt-28 p-6 w-full mx-auto bg-gradient-to-b from-blue-100 to-slate-50 space-y-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Email Ticket</h2>
      <p className="text-lg font-medium text-center text-gray-600">Enter your Booking ID to print your ticket.</p>

      <form onSubmit={handleSubmit} className="space-x-10 flex justify-center items-center pt-8 pb-10">
        <div>
          <label htmlFor="bookingId" className="block text-md font-medium text-gray-700 mb-2">Booking ID:</label>
          <input
            type="text"
            id="bookingId"
            value={bookingId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Booking ID"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 ml-5"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {bookingDetails && (
  <div className="flex flex-col items-center mt-10">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
      {/* Ticket Details Header */}
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 tracking-wide">Ticket Details</h2>
      </div>

      {/* Ticket Information */}
      <div className="grid grid-cols-2 gap-8 text-gray-800">
        <div className="flex justify-between">
          <span className="font-semibold text-lg">Booking ID:</span>
          <span>{bookingDetails.booking_id}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Bus Number:</span>
          <span>{bookingDetails.bus_id} ({bookingDetails.bus_number})</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Date:</span>
          <span>{formatDate(bookingDetails.departure_time)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Departure Time:</span>
          <span>{formatTime(bookingDetails.departure_time)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Arrival Time:</span>
          <span>{formatTime(bookingDetails.arrival_time)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Seat Number:</span>
          <span>{bookingDetails.seat_number}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">Total Fare:</span>
          <span>₹{bookingDetails.total_amount}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">From:</span>
          <span>{bookingDetails.from}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg">To:</span>
          <span>{bookingDetails.to}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-10 text-center">
        <button
          className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-10 rounded-full shadow-lg hover:bg-green-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
          onClick={() => sendPDFEmail(bookingDetails)}
        >
          Send Ticket to Email
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default EmailTicket;
