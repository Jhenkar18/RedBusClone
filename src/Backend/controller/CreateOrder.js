const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_wEaWsPiNpnPdEX',
  key_secret:'snsHwu9JTXXDZXDZ7RUOdg84' 
});

// Endpoint to create a new order
const CreateOrder= async (req, res) => {
  const { amount, currency = 'INR', receipt, notes } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports=CreateOrder;