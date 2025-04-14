
import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';

const PassengerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedSeats = location.state?.seatNumbers || [];
    const busid = location.state.busid;
    const from = location.state.from;
    const to = location.state.to;
    const date = location.state.date;
    const fare = location.state.fare;
    const tripid=location.state.tripid;
    const arrivaltime=location.state.arrivaltime;
    const departuretime=location.state.departuretime;
    const { userId } = useUser()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token'); 
        // console.log(busid,tripid,date);
        try {
            const formData = new FormData(event.target);
            const passengers = selectedSeats.map((seat, index) => ({
                seatNumber: seat,
                name: formData.get(`name-${index}`),
                gender: formData.get(`gender-${index}`),
                age: formData.get(`age-${index}`),
                state: formData.get(`state-${index}`)
            }));
           
            const seatsToFreeze = passengers.map(p => ({ number: p.seatNumber }));

           const response= await axios.post('http://localhost:8000/reserveseats', {
                seats: seatsToFreeze,
                busid: busid,
                tripid:tripid,
                date:date
            },
            {headers: {
                         'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                  }});
           
            console.log('Seats successfully frozen');
                
            // Navigate to the PaymentDetails component with necessary data
            navigate('/payment', {
                state: {
                    from: from,                          
                    to: to, 
                    date: date, 
                    totalAmount:selectedSeats.length*fare, 
                    busNo: busid, 
                    totalSeats: selectedSeats.length,
                    selectedSeats: selectedSeats,
                    userId: userId,
                    busid: busid,
                    fare:fare,
                    tripid:tripid,
                    arrivaltime:arrivaltime,
                    departuretime:departuretime,
                    passengers:passengers
                  
                }
            });
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
              alert('Please Login First To Continue The Booking');
              localStorage.removeItem('token');
               // Redirect to the login page
               navigate("/Login")
      }else {
           console.error('Error fetching booking details. Please check your booking ID and email.');
          }
        }
        };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto p-4 border border-gray-200 rounded-lg mt-28"
        >
            <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
            {selectedSeats.map((seat, index) => (
                <div key={index} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Passenger {index + 1}</span>
                        <span className="font-semibold">Seat {seat}</span>
                    </div>
                    <input
                        type="text"
                        name={`name-${index}`}
                        placeholder="Name"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                        required
                    />
                    <div className="flex space-x-4 mb-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name={`gender-${index}`}
                                value="Male"
                                className="mr-2"
                                required
                            />
                            Male
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name={`gender-${index}`}
                                value="Female"
                                className="mr-2"
                                required
                            />
                            Female
                        </label>
                    </div>
                    <input
                        type="number"
                        name={`age-${index}`}
                        placeholder="Age"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        name={`state-${index}`}
                        placeholder="State of Residence"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
            ))}

            <button
                type="submit"
                className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 text-center"
            >
                Proceed to Payment
            </button>
        </form>
    );
};

export default PassengerDetails;
