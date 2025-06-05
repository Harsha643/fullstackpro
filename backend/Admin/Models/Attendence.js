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
    className: {
        type: String,
        required: true
    }
    }, { timestamps: true });

const Attendances = mongoose.model("Attendances", attendanceSchema);
module.exports = Attendances;