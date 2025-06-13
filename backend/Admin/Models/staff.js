const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    staffId: {
        type: String,
        required: [true, "Staff ID is required"],
        unique: true,
        match: [/^STF\d{4}$/, "Staff ID must follow format STF0001, STF0002, etc."]
    },
    teacherName: {
        type: String,
        required: [true, "Staff name is required"],
        trim: true,
        minlength: [3, "Staff name must be at least 3 characters"],
        maxlength: [50, "Staff name cannot exceed 50 characters"]
    },
    gender:{
        type: String,
        required: [true, " Gender is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
    },
    phoneNumber: {
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
    aadharNumber: {
        type: String,
        required: [true, "Aadhar number is required"],
        match: [/^\d{12}$/, "Aadhar number must be exactly 12 digits"]
    },
    designation: {
        type: String,
        required: [true, "Designation is required"],
        trim: true,
        minlength: [3, "Designation must be at least 3 characters"],
        maxlength: [50, "Designation cannot exceed 50 characters"]
    },
    exprerence: {
        type: String,
        required: [true, "Experience is required"],
        trim: true,
        minlength: [1, "Experience must be at least 1 year"],
        maxlength: [50, "Experience cannot exceed 50 years"]
    },
    dateOfJoining: {
        type: Date,
        required: [true, "Date of joining is required"],
        default: Date.now
    },
    password: {
        type: String
       
    }
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
