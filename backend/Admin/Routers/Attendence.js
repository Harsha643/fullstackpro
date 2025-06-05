const express = require("express");
const router = express.Router();
const attendanceController = require("../Controllers/Attendence");



router.get("/student", attendanceController.getAttendence);
router.get("/id/:id", attendanceController.getAttendenceById);
router.get("/rollnumber/:rollNumber",attendanceController.getAttendenceByRollNumber)
router.get("/studentname/:studentName", attendanceController.getAttendenceByName);
router.post("/", attendanceController.createAttendence);
router.put("/:id", attendanceController.updateAttendence);
router.delete("/:id", attendanceController.deleteAttendence);

module.exports = router;
