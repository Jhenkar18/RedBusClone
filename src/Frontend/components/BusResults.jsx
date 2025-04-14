import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BusSeatlayout from '../components/BusSeatlayout';

const BusResults = () => {
    const [buses, setBuses] = useState([]);
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [error, setError] = useState('');
    const [selectedBusIndex, setSelectedBusIndex] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const location = useLocation();

    // Extracting fromCity, toCity, and date from location.state
    const { fromCity, toCity, date } = location.state;
    // console.log(fromCity,toCity,date)
    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.post('http://localhost:8000/search-buses', {
                    fromCity,
                    toCity,
                    date
                });
                
                setBuses(response.data.buses);
                setFilteredBuses(response.data.buses); // Initially show all buses
                setError('');
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('No buses available');
                    setBuses([]);
                    setFilteredBuses([]);
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            }
        };

        fetchBuses();
    }, [fromCity, toCity]); // Added dependencies

    // Handle filter selection
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        if (filter === 'All') {
            setFilteredBuses(buses);
        } else {
            const filtered = buses.filter(bus => bus.bus_type === filter);
            setFilteredBuses(filtered);
        }
    };

    const toggleSeatView = (index) => {
        setSelectedBusIndex(selectedBusIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Bus Results</h1>

            {error && <p className="text-red-500">{error}</p>}

            {/* Filter Buttons */}
            <div className="mb-6 flex space-x-4 mt-28 ml-4">
                <button
                    className={`px-4 py-2 rounded-lg ${selectedFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleFilterChange('All')}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${selectedFilter === 'AC Sleeper' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleFilterChange('AC Sleeper')}
                >
                    AC Sleeper
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${selectedFilter === 'AC Recliner' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleFilterChange('AC Recliner')}
                >
                    AC Recliner
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${selectedFilter === 'Non-AC Sleeper' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleFilterChange('Non-AC Sleeper')}
                >
                    Non-AC Sleeper
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${selectedFilter === 'Non-AC Recliner' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleFilterChange('Non-AC Recliner')}
                >
                    Non-AC Recliner
                </button>
            </div>

            {filteredBuses.length > 0 && (
                <div className="grid grid-cols-1 gap-4">
                    {filteredBuses.map((bus, index) => (
                        <div key={bus.bus_id} className="p-4 border rounded-lg shadow-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex-grow">
                                    <div className="flex items-center mb-2">
                                        <span className="text-xl font-bold">{bus.operator_name}</span>
                                        <h4 className="text-lg font-bold ml-4">{bus.bus_number}</h4>
                                    </div>
                                    <p className="text-gray-500">{bus.bus_type}</p>
                                    <div className="flex items-center space-x-8 mt-4">
                                        <div>
                                            <p className="text-xl font-bold">{new Date(bus.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p className="text-sm text-gray-500">{bus.origin}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{(new Date(bus.arrival_time) - new Date(bus.departure_time)) / 3600000}h {(new Date(bus.arrival_time) - new Date(bus.departure_time)) % 3600000 / 60000}m</p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold">{new Date(bus.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p className="text-sm text-gray-500">{bus.destination}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <p className="flex items-center">
                                            <span className="text-green-500">{bus.rating}</span>
                                            <span className="text-gray-500 ml-2">({bus.reviews_count})</span>
                                        </p>
                                        <p className="text-xl font-bold">INR {bus.fare}</p>
                                        <p className="text-gray-500">{bus.available_seats} Seats available</p>
                                    </div>
                                    <div className="mt-4">
                                        <span className="text-blue-500">Amenities | Bus Photos | Boarding & Dropping Points | Reviews | Booking policies</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => toggleSeatView(index)}>
                                        {selectedBusIndex === index ? 'Hide Seats' : 'View Seats'}
                                    </button>
                                </div>
                            </div>
                            {selectedBusIndex === index && (
                                <BusSeatlayout 
                                    totalSeats={bus.available_seats} 
                                    onClose={() => setSelectedBusIndex(null)} 
                                    from={bus.origin}
                                    to={bus.destination}
                                    date={date} // Pass date here
                                    fare={bus.fare}
                                    busid={bus.bus_id}
                                    tripid={bus.trip_id}
                                    arrivaltime={bus.arrival_time}
                                    departuretime={bus.departure_time}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BusResults;
