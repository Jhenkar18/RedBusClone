import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using Axios

const PaymentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        from, to, date, totalAmount, busNo, totalSeats,
        selectedSeats, userId, busid, fare,
        tripid, departuretime, arrivaltime,passengers
    } = location.state || {};

    const [timeLeft, setTimeLeft] = useState(600); // 600 seconds for 10 minutes

    // Extract seat numbers from selectedSeats array
    const seatNumbers = selectedSeats.map(seat => seat.seatNumber);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    alert('Time is up! Please start the payment process again.');
                    navigate('/'); 
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handlePayment = async () => {
        const token = localStorage.getItem('token'); 
        try {
            // Create an order on the server
            const orderResponse = await axios.post('http://localhost:8000/create-order', {
                amount: fare * selectedSeats.length, // total amount to be paid
                currency: 'INR',
                receipt: `receipt_${Date.now()}` // unique receipt ID
            }, {headers: {
                'Authorization': `Bearer ${token}` // Send the token in the Authorization header
         }});
    
            const order = orderResponse.data;
    
            // Razorpay payment options
            const options = {
                key: 'rzp_test_wEaWsPiNpnPdEX',  
                currency: order.currency,
                name: 'Red Bus',
                description: 'Seat Booking',
                order_id: order.id, // This is the order ID returned by Razorpay
                handler: async (response) => {
                    // Handle payment success
                    const verifyResponse = await axios.post('http://localhost:8000/verify-payment', {
                        order_id: order.id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        payment_method: "Debit Card",
                        selectedSeats,
                        userId,
                        busid,
                        date,
                        fare,
                        tripid,
                        departuretime,
                        arrivaltime
                    }, {headers: {
                        'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                 }});
    
                    if (verifyResponse.data.success) {
                        // Redirect to confirmation page on success
                        await axios.post('http://localhost:8000/passengerdetails', {
                            passengers: passengers.map(passenger => ({
                                name: passenger.name,
                                age: passenger.age,
                                gender: passenger.gender,
                                seatNumber: passenger.seatNumber,
                                state: passenger.state
                            })),
                            
                            booking_id: verifyResponse.data.bookingDetails.bookingId
                        }, {headers: {
                            'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                     }});
    
                        navigate('/Confirmation', {
                            state: {
                                bookingDetails: verifyResponse.data.bookingDetails,
                                departuretime: departuretime,
                                arrivaltime: arrivaltime,
                                from: from,
                                to: to,
                                BusNo: busNo,
                                date: date,
                                fare: fare * selectedSeats.length, // Pass the total fare
                                seatNumbers: seatNumbers.join(', ') // Pass the seat numbers as a string
                            }
                        });
    
                    } else {
                        console.error('Payment verification failed');
                        alert('Payment verification failed. Redirecting to seat selection...');
                        navigate('/Busdetails', { state: { from: from, to: to, date: date } }, { replace: true });
                    }
                },
                prefill: {
                    name: 'Jhenkar', // Replace with the user's name
                    email: 'jhenkar.s.k18@gmail.com', // Replace with the user's email
                    contact: '9916739171', // Replace with the user's contact number
                },
                theme: {
                    color: '#3399cc',
                },
            };
    
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            if (error.response && error.response.status === 401) {
              alert('Session expired, please log in again.');
              localStorage.removeItem('token');
               // Redirect to the login page
               navigate("/signup")
      }else {
           console.error('Error fetching booking details. Please check your booking ID and email.');
          }
        }
    };
    
    

    return (
        <div className="max-w-xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md mt-32">
            <div className="bg-red-500 text-white p-4 rounded-t-lg">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Payment Details</span>
                    <span className="font-semibold">Time left to complete payment: <span>{formatTime(timeLeft)}</span></span>
                </div>
            </div>
            <div className="bg-white p-4 rounded-b-lg">
                <div className="mb-4">
                    <div className="flex justify-between">
                        <span>From: {from}</span>
                        <span>To: {to}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Date: {date}</span>
                        <span>Bus No: {busNo}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between">
                        <span>Total Seats: {totalSeats}</span>
                        <span>Seats No: {seatNumbers.join(', ')}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Total Amount: ₹{totalAmount}</span>
                </div>
                <button onClick={handlePayment} className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 text-center">
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default PaymentDetails;
