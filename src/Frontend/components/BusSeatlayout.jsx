import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdClose } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const BusSeatlayout = ({ totalSeats, onClose, from, to, date, fare, busid,tripid,arrivaltime,departuretime }) => {
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [reservedSeats, setReservedSeats] = useState(new Set());
    const [bookedSeats, setBookedSeats] = useState(new Set());
    const maxSeats = 10;

    const handleSeatClick = (seatNumber) => {
        setSelectedSeats(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(seatNumber)) {
                newSelected.delete(seatNumber); // Deselect if already selected
            } else {
                if (newSelected.size < maxSeats) {
                    newSelected.add(seatNumber); // Select the seat if less than maxSeats
                } else {
                    toast.error(`You can select a maximum of ${maxSeats} seats.`);
                }
            }
            return newSelected;
        });
    };
    console.log(busid,tripid,date);
    useEffect(() => {
        // Fetch reserved seats from backend
        const fetchReservedSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getreservedseats`, 
                   { params: {
                    busid: busid,
                    date: date,  
                    tripid:tripid,// Include the date in the API request
                }},);
                setReservedSeats(new Set(response.data.reservedSeats.map(num => Number(num))));
            } catch (error) {
                console.error('Error fetching reserved seats:', error);
            }
        };
        const fetchBookedSeats = async () => {
           
            try {
                const response = await axios.get(`http://localhost:8000/bookedseats`,
                 {
                    params: {
                        busid: busid,
                        tripid: tripid,
                        date:date
                    }
                });
                setBookedSeats(new Set(response.data.bookedSeats.map(num => Number(num))));
            } catch (error) {
                console.error('Error fetching booked seats:', error);

            }
        };
        fetchBookedSeats();
        fetchReservedSeats();
    }, [busid]);
    console.log(selectedSeats);


    return (
        <div className='mt-2 w-full max-w-lg mx-auto relative border border-gray-200 pb-2'>
            <ToastContainer />
            {/* Close Button */}
            <MdClose
                className='absolute top-1 right-1 text-red-600 cursor-pointer'
                onClick={onClose}
                size={16}
            />

            <div className='flex justify-between'>
                {/* Booking Details */}
                {selectedSeats.size > 0 && (
                    <div className='w-full max-w-xs p-4 border border-gray-200 rounded-lg mr-4'>
                        <h2 className='text-lg font-semibold mb-2 text-red-400'>Booking Details</h2>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex justify-between'>
                                <div className='text-xs font-bold'>
                                    <label>{from}</label>
                                </div>
                                <FaLongArrowAltRight />
                                <div className='text-xs font-bold'>
                                    <label>{to}</label>
                                </div>
                            </div>
                            <div className='text-xs font-bold'>
                                <label>Date: {date}</label>
                            </div>
                            <div className='text-xs font-bold'>
                                <label>Seat No: {Array.from(selectedSeats).join(", ")}</label>
                            </div>
                            <div className='text-xs font-bold'>
                                <label>Amount: INR {selectedSeats.size * fare}</label>
                            </div>

                            <Link 
                                to="/Passenger-Details"
                                state={{
                                    seatNumbers: Array.from(selectedSeats),
                                    from:from,
                                    to:to,
                                    date:date,
                                    fare:fare,
                                    busid:busid,
                                    tripid:tripid,
                                    arrivaltime:arrivaltime,
                                    departuretime:departuretime
                                }}
                                className='w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 text-xs text-center'
                            >
                                Proceed to Book
                            </Link>
                            
                        </div>
                    </div>
                )}

                {/* Seat Layout */}
                <div className='w-full'>
                    {/* Steering Wheel */}
                    <div className='flex justify-center mb-2'>
                        <GiSteeringWheel size={20} className='text-gray-700' />
                    </div>

                    <div className='grid grid-cols-4 gap-2'>
                        {Array.from({ length: totalSeats }).map((_, seatIndex) => {
                            const seatNumber = seatIndex + 1;
                            const isSelected = selectedSeats.has(seatNumber);
                            const isReserved = reservedSeats.has(seatNumber);
                            const isBooked = bookedSeats.has(seatNumber)
                            return (
                                <div
                                    key={seatIndex}
                                    className={`flex items-center justify-center cursor-pointer ${ isBooked ? 'bg-red-500' :isReserved ? 'bg-yellow-700' : isSelected ? 'bg-green-500' : 'bg-gray-300'} w-8 h-8 rounded-lg transition-colors duration-300 
                                      
                                    `}
                                    onClick={() => !isReserved && handleSeatClick(seatNumber)}
                                    style={{ cursor:isBooked  || isReserved ?  'not-allowed' : 'pointer' }}
                                >
                                    <span className="block text-sm">{seatNumber}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusSeatlayout;
