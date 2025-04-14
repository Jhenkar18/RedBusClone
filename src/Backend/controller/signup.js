const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("../mysql/mysql");

const JWT_SECRET = 'your_secret_key'; // Secret key for signing JWTs

const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and include both letters and numbers' });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'Phone number must be 10 digits long and start with digits 6 to 9' });
    }

    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        const sql = 'INSERT INTO Users (name, email, phone_number, password) VALUES (?, ?, ?, ?)';
        connection.query(sql, [name, email, phone, hashedPassword], (err, result) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Generate JWT token upon successful signup
            const token = jwt.sign(
                { userId: result.insertId, email }, // Payload
                JWT_SECRET, // Secret key
                { expiresIn: '30d' } // Token expiry set to 30 days
            );

            res.status(200).json({ 
                success: true, 
                message: 'User registered successfully!', 
                token 
            });
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = signup;
