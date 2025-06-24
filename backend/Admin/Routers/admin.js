const express = require('express');
const router = express.Router();
const { createAdmin } = require('../Controllers/adminController'); // Adjust the path as necessary
const { protect, authorize } = require('../../Middleware/auth');
 // Adjust the path as necessary
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});
const upload = multer({ storage });



router.post('/',upload.single("image"), createAdmin);

module.exports = router;