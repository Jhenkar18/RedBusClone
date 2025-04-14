
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CancelTicket = () => {
  const [bookingId, setBookingId] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in to continue.');
      navigate("/signup");
      return;
    }
    
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId || decodedToken.id || decodedToken.sub;

      const response = await axios.get('http://localhost:8000/booking-details', {
        params: { bookingId, userId },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.seatsAndPassengers.length === 0) {
        toast.info('No tickets available for the provided booking ID.');
      } else {
        setPassengers(response.data.seatsAndPassengers);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired, please log in again.');
        localStorage.removeItem('accessToken');
        navigate("/signup");
      } else {
        console.error('Error fetching booking details:', error);
        toast.error('Failed to retrieve booking details');
      }
    }
  };

  const handleCancelSeat = async () => {
    const token = localStorage.getItem('token');
    if (selectedSeats.length > 0) {
      try {
        await axios.post('http://localhost:8000/CancelTicket', { bookingId, seatNumber: selectedSeats  },
          {
          headers: {
            'Authorization':`Bearer ${token}`
          }
        });
        toast.success('Selected Seat canceled successfully');
        setPassengers((prevPassengers) =>
          prevPassengers.filter((seat) => !selectedSeats.includes(seat.seat_number))
        );
        setSelectedSeats([]);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Session expired, please log in again.');
          localStorage.removeItem('accessToken');
          navigate("/signup");
        } else {
          console.error('Error canceling seat:', error);
          toast.error('You can cancel the ticket before the departure date only!');
        }
      }
    } else {
      toast.warning('Please select a seat to cancel.');
    }
  };

  const toggleSelectSeat = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  return (
    <div className='mt-28 p-6 w-full mx-auto bg-gradient-to-b from-blue-100 to-slate-50 space-y-4'>
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className='text-4xl font-semibold mb-8 text-center text-gray-800'>Cancel Ticket</h2>
      <p className='text-lg font-medium text-center text-gray-600'>Verify your details and <span className='text-red-500'>cancel</span> your tickets</p>

      <form onSubmit={handleSubmit} className='space-x-10 flex justify-center items-center pt-8 pb-10'>
        <div>
          <label className='block text-md font-medium text-gray-700 mb-2'>Booking ID:</label>
          <input
            type='text'
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter Booking ID'
            required
          />
        </div>

        <button
          type='submit'
          className="bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 ml-5"
        >
          Submit
        </button>
      </form>

      {passengers.length > 0 && (
        <>
          <h3 className='text-2xl font-semibold text-center text-gray-800'>Select Seat to Cancel</h3>
          <div className='overflow-x-auto flex justify-center mt-6'>
            <div className='w-full max-w-4xl'>
              <table className='w-full bg-white border border-gray-200 rounded-lg shadow-sm text-sm table-fixed'>
                <thead>
                  <tr className='bg-gray-100 text-gray-700'>
                    <th className='py-3 px-4 border-b text-left'>Seat Number</th>
                    <th className='py-3 px-4 border-b text-left'>Passenger Name</th>
                    <th className='py-3 px-4 border-b text-left'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {passengers.map(passenger => (
                    <tr key={passenger.seat_number} className='hover:bg-gray-50'>
                      <td className='py-3 px-4 border-b text-left'>{passenger.seat_number}</td>
                      <td className='py-3 px-4 border-b text-left'>{passenger.passenger_name}</td>
                      <td className='py-3 px-4 border-b text-left'>
                        <button
                          className={`py-2 px-4 rounded-md transition-all duration-200 ${
                            selectedSeats.includes(passenger.seat_number)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                          onClick={() => toggleSelectSeat(passenger.seat_number)}
                        >
                          {selectedSeats.includes(passenger.seat_number) ? 'Selected' : 'Select for Cancellation'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {selectedSeats.length > 0 && (
            <div className='mt-6 text-center'>
              <button
                className='bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                onClick={handleCancelSeat}
              >
                Cancel the ticket for Selected Seat(s)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CancelTicket;

