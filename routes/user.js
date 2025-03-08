// const express = require('express')
// const register = require('../controllers/register')
// const login = require("../controllers/login")
// const forgetPassword = require("../controllers/forgetPassword")
// const VerifyOtp = require('../controllers/verifyOtp')
// const UpdatePassword = require('../controllers/UpdatePassword')
// const router = express.Router();

// router.post('/register' ,register)
// router.post('/login' ,login);
// router.post('/forget/password',forgetPassword)
// router.post("/otp/verify" , VerifyOtp);
// router.post("/password/update" , UpdatePassword)

// module.exports = router;


const express = require('express');
const register = require('../controllers/register');
const login = require("../controllers/login");
const forgetPassword = require("../controllers/forgetPassword");
const VerifyOtp = require('../controllers/verifyOtp');
const UpdatePassword = require('../controllers/UpdatePassword');
const User = require('../models/User'); // Sequelize model for User
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Forget password route
router.post('/forget/password', forgetPassword);

// OTP verification route
router.post("/otp/verify", VerifyOtp);

// Update password route
router.post("/password/update", UpdatePassword);

// New route to get all users' data
router.get('/users', async (req, res, next) => {
    try {
        // Get all users from the database
        const users = await User.findAll();

        // If no users found, return an appropriate message
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found', status: false });
        }

        // Send the list of users back in the response
        res.status(200).json({ users, status: true });
    } catch (error) {
        // Handle any errors that may occur
        next(error);
    }
});

module.exports = router;


