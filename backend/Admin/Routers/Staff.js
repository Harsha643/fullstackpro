const express = require("express");
const StaffRouter = express.Router();
const StaffController = require("../Controllers/Staff");
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

// Define the routes for staff operations

// Get all Staff
StaffRouter.get("/", StaffController.getAllStaff);

// Get a Staff by ID
StaffRouter.get("/:id", StaffController.getStaffById);

// Create a new Staff (with upload.single)
StaffRouter.post("/", upload.single("image"), StaffController.createStaff);

// Update a Staff by ID
StaffRouter.put("/:id", StaffController.updateStaff);

// Delete a Staff by ID
StaffRouter.delete("/:id", StaffController.deleteStaff);

module.exports = StaffRouter;