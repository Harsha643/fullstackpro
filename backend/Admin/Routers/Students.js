const express = require("express");
const StudentsRouter = express.Router();
const StudentController = require("../Controllers/Students");
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


// Get all students
StudentsRouter.get("/", StudentController.getAllStudents);

// Get a student by ID
StudentsRouter.get(`/:presentClass`, StudentController.getStudentById);

// Create a new student 
StudentsRouter.post("/", upload.single("image"), StudentController.createStudent);

// Update a student by ID
StudentsRouter.put("/:id", upload.single("image"),StudentController.updateStudent);

StudentsRouter.put("/:id/fees", StudentController.updateStudentFees);

// Delete a student by ID
StudentsRouter.delete("/:id", StudentController.deleteStudent);



StudentsRouter.get("/admissionNumber/:admissionNumber", StudentController.getStudentByAdmissionNumber);


StudentsRouter.put("/admissionNumber/:admissionNumber", StudentController.StudentUpdateData);

module.exports = StudentsRouter;


