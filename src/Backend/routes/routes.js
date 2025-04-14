const express = require('express');
const signup = require('../controller/signup');
const login = require('../controller/login');
const searchbuses =require('../controller/SearchBuses')
const reserveseats=require('../controller/reserveseats')
const CleanReservedSeats=require('../controller/CleanReservedSeats')
const GetReservedSeats = require('../controller/GetReservedSeats')
const CityController = require('../controller/CityController')
const authenticateToken = require('../controller/authenticateToken.js')
const CreateOrder = require('../controller/CreateOrder.js')
const VerifyPayment = require('../controller/VerifyPayment.js')
const BookedSeats = require('../controller/BookedSeats.js')
const PassengerDetails = require('../controller/PassengerDetails.js')
const PrintTicket = require('../controller/PrintTicket.js')
const SendPdfEmail = require('../controller/SendPdfEmail.js')
const BookingDetails = require('../controller/BookingDetails.js')
const CancelTicket = require('../controller/CancelTicket.js')
const router = express.Router();
const multer = require('multer'); // Import multer

// Initialize multer
const upload = multer(); // Initialize multer for memory storage
// Signup route
router.post("/signup", signup);
router.post("/login", login);
router.post("/search-buses",searchbuses);
router.post("/reserveseats",authenticateToken,reserveseats,CleanReservedSeats);
router.get("/getreservedseats",GetReservedSeats);
router.get("/getcities",CityController);
router.post("/create-order",authenticateToken,CreateOrder);
router.post("/verify-payment",authenticateToken,VerifyPayment);
router.get("/bookedseats",BookedSeats);
router.post("/passengerdetails",authenticateToken,PassengerDetails);
router.post("/PrintTicket",authenticateToken,PrintTicket)
router.post("/SendPdfEmail",authenticateToken,upload.single('pdf'),SendPdfEmail)
router.get("/booking-details",authenticateToken,BookingDetails)
router.post("/CancelTicket",authenticateToken,CancelTicket)
module.exports = router;
