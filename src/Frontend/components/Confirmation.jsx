
import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
    const location = useLocation();
    const {
        bookingDetails,
        departuretime,
        arrivaltime,
        from,
        to,
        BusNo,
        date,
        fare,
        seatNumbers // This should now be a string of seat numbers
    } = location.state || {};
    console.log(seatNumbers)
    // Function to format time to 12-hour format with AM/PM
    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg mt-32">
          {/* Header Section */}
          <div className="bg-green-500 text-white p-6 rounded-t-lg">
            <h1 className="text-2xl font-bold text-center">Booking Confirmed!</h1>
          </div>
      
          {/* Booking Details Section */}
          <div className="bg-white p-6 rounded-b-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Booking Details</h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="flex justify-between">
                <strong className="font-semibold">Booking ID:</strong> <span>{bookingDetails.bookingId}</span>
              </p>
              
              <p className="flex justify-between">
                <strong className="font-semibold">Bus Number:</strong> <span>{BusNo}</span>
              </p>
      
              <p className="flex justify-between">
                <strong className="font-semibold">Date:</strong> <span>{date}</span>
              </p>
      
              <p className="flex justify-between">
                <strong className="font-semibold">Departure Time:</strong> <span>{formatTime(departuretime)}</span>
              </p>
      
              <p className="flex justify-between">
                <strong className="font-semibold">Arrival Time:</strong> <span>{formatTime(arrivaltime)}</span>
              </p>
      
              <p className="flex justify-between">
                <strong className="font-semibold">Seat Numbers:</strong> <span>{seatNumbers}</span>
              </p>
      
              <p className="flex justify-between">
                <strong className="font-semibold">Total Fare:</strong> <span>₹{fare}</span>
              </p>
      
              <p className="flex justify-between">
                <strong className="font-semibold">From:</strong> <span>{from}</span>
              </p>
      
              <p className="flex justify-between">
                <strong className="font-semibold">To:</strong> <span>{to}</span>
              </p>
            </div>
          </div>
        </div>
      );
      
};

export default Confirmation;
