const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectCloudinary = require("./Config/cloudinary");
const notesRouter = require("./Staff/Routers/notesRouter");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/admin/students", require("./Admin/Routers/Students"));
app.use("/admin/staff", require("./Admin/Routers/Staff"));
app.use("/admin/events", require("./Admin/Routers/Events"));
app.use("/admin/timetable", require("./Admin/Routers/Cs")); 
app.use("/admin/attendance", require("./Admin/Routers/Attendence")); 

// staff routes


// app.use("/staff/attendance", require("./Staff/Routers/Attendance"));

app.use("/staff/notes",notesRouter); // fixed casing
app.use("/staff/assignments", require("./Staff/Routers/asssignmentRouter.js"));




// student routes
app.use("/student/assignment", require("./Students/Routers/studentAssignmentRouter")); // fixed casing


// MongoDB Connection
mongoose.connect(process.env.MONGOURI)
.then(() => 
   {
    console.log("MongoDB connected")
    app.listen(port, () => {
    
        console.log(`Server running at http://localhost:${port}`);
    });
   
   })
.catch(err => console.error("MongoDB connection error:", err));

// Start server

connectCloudinary()