
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const connection = require("../mysql/mysql.js"); 

const app = express();
app.use(cors());
app.use(express.json());

// Set up multer for handling file uploads
const upload = multer();

// Function to send the PDF email
const SendPdfEmail = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header

  let userId, email;
  try {
    // Decode the token to extract the user ID and email
    const decodedToken = jwt.verify(token, 'your_secret_key'); // Use your secret key here
    userId = decodedToken.userId; // Extract userId from decoded token
    email = decodedToken.email; // Extract email from decoded token

    if (!userId || !email) {
      return res.status(400).json({ message: 'User ID or email not found in token.' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const pdfBuffer = req.file.buffer;

  // Create a transporter for sending emails  
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Example: using Gmail service
    auth: {
        user: 'jhenkar.1si16cs044@gmail.com', // Replace with your email
        pass: 'qown qwdx oczr danz'  // Replace with your email password
    }
  });

  //Set up email options
  const mailOptions = {
        from: 'jhenkar.s.k18@gmail.com',
        to: email,
        subject: 'Your Booking Details',
        text: 'Please find attached your booking details.',
        attachments: [
          {
            filename: 'booking-details.pdf',
            content: pdfBuffer
          }
        ]
      };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};







module.exports = SendPdfEmail;



