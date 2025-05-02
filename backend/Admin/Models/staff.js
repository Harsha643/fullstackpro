const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    staffId: {
        type: String,
        required: [true, "Staff ID is required"],
        unique: true,
        match: [/^STF\d{4}$/, "Staff ID must follow format STF0001, STF0002, etc."]
    },
    staffName: {
        type: String,
        required: [true, "Staff name is required"],
        trim: true,
        minlength: [3, "Staff name must be at least 3 characters"],
        maxlength: [50, "Staff name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },
    image: {
        type: String,
        default: null // Path or filename
    },
    designation: {
        type: String,
        required: [true, "Designation is required"],
        trim: true,
        minlength: [3, "Designation must be at least 3 characters"],
        maxlength: [50, "Designation cannot exceed 50 characters"]
    },
    dateOfJoining: {
        type: Date,
        required: [true, "Date of joining is required"],
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
