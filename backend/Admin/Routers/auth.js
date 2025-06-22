const express = require('express');
const router = express.Router();
const auth = require('../Controllers/authController');
const admin= require('../Controllers/adminController'); // Adjust the path as necessary
const middle = require('../../Middleware/auth');

router.post('/login', auth.login);
router.get('/me', middle.protect, admin.getMe);

module.exports = router;