const express = require('express');
const router = express.Router();
const { createAdmin } = require('../Controllers/adminController'); // Adjust the path as necessary
const { protect, authorize } = require('../../Middleware/auth'); // Adjust the path as necessary

router.post('/', createAdmin);

module.exports = router;