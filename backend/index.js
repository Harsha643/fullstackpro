const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectCloudinary = require("./Config/cloudinary");
const notesRouter = require("./Staff/Routers/notesRouter");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/admin/students", require("./Admin/Routers/Students"));
app.use("/admin/staff", require("./Admin/Routers/Staff"));
app.use("/admin/events", require("./Admin/Routers/Events"));
app.use("/admin/timetable", require("./Admin/Routers/Cs")); 
app.use("/admin/attendance",require("./Admin/Routers/Attendence")); 
app.use("/admin/gallery",require("./Admin/Routers/Gallery.js"))



// app.use("/staff/attendance", require("./Staff/Routers/Attendance"));

app.use("/staff/notes",notesRouter);
app.use("/staff/assignments", require("./Staff/Routers/asssignmentRouter.js"));
app.use("/staff/feedback",require("./Staff/Routers/feedback.js"))
app.use("/staff/class",require("./Staff/Routers/classes.js"))

// student routes
app.use("/student/assignment", require("./Students/Routers/studentAssignmentRouter")); 



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