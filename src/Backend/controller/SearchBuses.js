const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require("../mysql/mysql");

const Searchbuses = async (req, res) => {
    const { fromCity, toCity, date } = req.body;

    // SQL query to fetch buses that match the origin, destination, date, and haven't departed yet
    const query = `
        SELECT 
            Buses.bus_id, 
            Buses.bus_number, 
            Buses.bus_type, 
            Operators.name AS operator_name,
            Trips.departure_time, 
            Trips.arrival_time, 
            Trips.fare, 
            Trips.available_seats,
            Trips.trip_id, 
            Routes.origin, 
            Routes.destination
        FROM 
            Trips
        JOIN 
            Buses ON Trips.bus_id = Buses.bus_id
        JOIN 
            Routes ON Trips.route_id = Routes.route_id
        JOIN 
            Bus_Operators AS Operators ON Buses.operator_id = Operators.operator_id
        WHERE 
            Routes.origin = ? 
            AND Routes.destination = ?
            AND DATE(Trips.departure_time) = ?
            AND Trips.departure_time > NOW();  -- This condition filters out buses that have already departed
    `;

    try {
        connection.query(query, [fromCity, toCity, date], (err, results) => {
            if (err) {
                console.error('Error fetching buses:', err);
                res.status(500).send('Server error');
            } else if (results.length === 0) {
                res.status(404).send('No buses available');
            } else {
                res.json({ buses: results });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('Server error');
    }
};

module.exports = Searchbuses;
