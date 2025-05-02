const express = require("express");
const router = express.Router();
const attendanceController = require("../../Controllers/Attendence/attendence.controller");

// GET all attendance records
router.get("/", attendanceController.getAttendence);

// GET a specific attendance record by ID
router.get("/:id", attendanceController.getAttendenceById);

// GET attendance by student name
router.get("/student/:studentName", attendanceController.getAttendenceByName);

// CREATE new attendance record
router.post("/", attendanceController.createAttendence);

// UPDATE attendance by ID
router.put("/:id", attendanceController.updateAttendence);

// DELETE attendance by ID
router.delete("/:id", attendanceController.deleteAttendence);

module.exports = router;
