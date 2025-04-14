
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Fuse from 'fuse.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import banner from "../../assets/Banner.jpeg";

const Main = () => {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [date, setDate] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isFromInputFocused, setIsFromInputFocused] = useState(false);
    const [isToInputFocused, setIsToInputFocused] = useState(false);
    const [cities, setCities] = useState([]);
    const [debouncedFromCity, setDebouncedFromCity] = useState('');
    const [debouncedToCity, setDebouncedToCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getcities');
                setCities(response.data.cities);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    // Debouncing for 'fromCity' input
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedFromCity(fromCity);
        }, 300); // 300ms debounce time

        return () => {
            clearTimeout(timerId);
        };
    }, [fromCity]);

    // Debouncing for 'toCity' input
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedToCity(toCity);
        }, 300); // 300ms debounce time

        return () => {
            clearTimeout(timerId);
        };
    }, [toCity]);

    // Search logic using debouncedFromCity
    useEffect(() => {
        if (cities.length > 0 && debouncedFromCity.trim() !== '') {
            const fuse = new Fuse(cities, {
                threshold: 0.5,
                includeScore: false,
                keys: ['city_name'] // assuming cities data has a field named 'city_name'
            });

            const results = fuse.search(debouncedFromCity);
            setFilteredCities(results.map(result => result.item));
        } else {
            setFilteredCities([]);
        }
    }, [debouncedFromCity, cities]);

    // Search logic using debouncedToCity with exclusion of 'fromCity'
    useEffect(() => {
        if (cities.length > 0 && debouncedToCity.trim() !== '') {
            const fuse = new Fuse(cities, {
                threshold: 0.3,
                includeScore: false,
                keys: ['city_name'] // assuming cities data has a field named 'city_name'
            });

            const results = fuse.search(debouncedToCity);
            // Filter out the city that is already selected in "fromCity"
            const filteredToCities = results
                .map(result => result.item)
                .filter(city => city !== fromCity);
            setFilteredCities(filteredToCities);
        } else {
            setFilteredCities([]);
        }
    }, [debouncedToCity, fromCity, cities]);

    const handleCityInputChange = (e, setCity, setIsInputFocused) => {
        const value = e.target.value;
        setCity(value);
        setIsInputFocused(true);
    };

    const handleCitySelect = (city, setCity, setIsInputFocused) => {
        setCity(city);
        setIsInputFocused(false);
        setFilteredCities([]); // Clear the filtered cities after selection
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if 'fromCity' and 'toCity' are the same
        if (fromCity === toCity) {
            toast.error("The 'From' and 'To' cities cannot be the same.", {
                position: "top-center",
                autoClose: 3000,
            });
            return; // Prevent submission
        }
        // Proceed with navigation if validation passes
        navigate("/bus-results", {
            state: {
                fromCity,
                toCity,
                date
            }
        });
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="pt-28 h-full w-full">
            <div className="w-full h-[32rem] relative">
                <img src={banner} alt="bannerlogo" className="h-full w-full object-cover" />
                <h1 className="absolute top-[45px] left-[50%] transform -translate-x-1/2 font-bold text-3xl text-white text-center">
                    India's No.1 Online Bus Ticket Booking Website
                </h1>
                <div className='absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-full max-w-[70%] bg-white rounded-lg shadow-lg'>
                    <form className='h-full w-full flex items-center justify-around px-2 py-4' onSubmit={handleSubmit}>
                        <div className='flex items-center relative'>
                            <input
                                type="text"
                                placeholder="From"
                                value={fromCity}
                                onChange={(e) => handleCityInputChange(e, setFromCity, setIsFromInputFocused)}
                                onFocus={() => setIsFromInputFocused(true)}
                                onBlur={() => setTimeout(() => setIsFromInputFocused(false), 200)}
                                className="h-12 px-4 rounded-l-lg"
                            />
                            {isFromInputFocused && filteredCities.length > 0 && (
                                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md">
                                    {filteredCities.map((city, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleCitySelect(city, setFromCity, setIsFromInputFocused)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className='flex items-center relative'>
                            <input
                                type="text"
                                placeholder="To"
                                value={toCity}
                                onChange={(e) => handleCityInputChange(e, setToCity, setIsToInputFocused)}
                                onFocus={() => setIsToInputFocused(true)}
                                onBlur={() => setTimeout(() => setIsToInputFocused(false), 200)}
                                className="h-12 px-4 rounded-lg"
                            />
                            {isToInputFocused && filteredCities.length > 0 && (
                                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md">
                                    {filteredCities.map((city, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleCitySelect(city, setToCity, setIsToInputFocused)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className='flex items-center'>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={today} // restrict to today and future dates
                                className="h-12 px-4 rounded-lg"
                            />
                        </div>
                        <button
                            type="submit"
                            className="h-12 bg-red-500 text-white px-4 rounded-r-lg"
                        >
                            Search Buses
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Main;
