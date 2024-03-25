const express = require('express');
const passport = require('passport');
const companyController = require('../controller/companyController');
const router = express.Router();

// get req
router.get('/home', passport.checkAuthentication, companyController.companyPage);

router.get('/allocate', passport.checkAuthentication,companyController.allocateInterview);

// post req
router.post('/schedule-interview',passport.checkAuthentication,companyController.scheduleInterview);
router.post('/update-status/:id',passport.checkAuthentication,companyController.updateStatus);

module.exports = router;