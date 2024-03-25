const express = require('express');

const router = express.Router();

// Import required route modules
const userRoutes = require('../routes/userRoutes');
const studentRoutes = require('../routes/studentRoutes');
const homeController = require('../controller/homeController');
const companyRoutes = require('./companyRoutes');

// Import Passport for authentication
const passport = require('passport');

// Define routes using the imported modules
// Ensure authentication with Passport using 'passport.checkAuthentication' middleware
router.get('/', passport.checkAuthentication, homeController.homePage);
router.use('/users', userRoutes);
router.use('/student', studentRoutes);
router.use('/company', companyRoutes);

module.exports = router;