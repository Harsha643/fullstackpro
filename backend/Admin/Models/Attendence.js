const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema({
    rollNumber: {
        type:String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    },
    classNumber: {
        type: Number,
        required: true
    }
    }, { timestamps: true });

const Attendances = mongoose.model("StudentAttendances", attendanceSchema);
module.exports = Attendances;