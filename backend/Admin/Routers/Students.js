const express = require("express");
const StudentsRouter = express.Router();
const StudentController = require("../Controllers/Students");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    },
});
const upload = multer({ storage });

// Define the routes for student operations

// Get all students
StudentsRouter.get("/", StudentController.getAllStudents);

// Get a student by ID
StudentsRouter.get(`/:presentClass`, StudentController.getStudentById);

// Create a new student (with upload.single)
StudentsRouter.post("/", upload.single("image"), StudentController.createStudent);

// Update a student by ID
StudentsRouter.put("/:id", StudentController.updateStudent);

// Delete a student by ID
StudentsRouter.delete("/:id", StudentController.deleteStudent);

module.exports = StudentsRouter;