
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../mysql/mysql');
const router = express.Router();

const JWT_SECRET = 'your_secret_key';

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const sql = 'SELECT * FROM Users WHERE email = ?';
        connection.query(sql, [email], async (err, results) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ error: 'User not found' });
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: 'Incorrect password' });
            }

            // Generate a new JWT token for the login session
            const token = jwt.sign(
                { userId: user.user_id, email: user.email }, // Payload
                JWT_SECRET, // Secret key
                { expiresIn: '30d' } // Token expiry set to 30 days
            );

            res.status(200).json({
                success: true,
                message: 'Login successful',
                userId: user.user_id,
                email: user.email,
                token // Send the new token to the frontend
            });
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = login;

