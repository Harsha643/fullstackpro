const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  admissionNumber: {
    type: String,
    required: [true, "Admission number is required"],
    unique: true,
    match: [/^EDU\d{4}$/, "Admission number must follow format EDU0001, EDU0002, etc."]
  },
  studentName: {
    type: String,
    required: [true, "Student name is required"],
    trim: true,
    minlength: [3, "Student name must be at least 3 characters"],
    maxlength: [50, "Student name cannot exceed 50 characters"]
  },
  rollNumber: {
    type: String,
    required: [true, "Roll number is required"],
    unique: true,
    match: [/^25B4\d{2}\d{3}$/, "Roll number must follow format 25B400001, 25B400002, etc."]
  },
  image: {
    type: String,
    default: null
  },
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true
  },
  previousClass: {
    type: Number,
    required: [true, "Previous class is required"],
    min: [1, "Class must be a positive integer"]
  },
  presentClass: {
    type: Number,
    required: [true, "Present class is required"],
    min: [1, "Class must be a positive integer"]
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: {
      values: ["Male", "Female", "Other"],
      message: "Gender must be Male, Female, or Other"
    }
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [3, "Age must be at least 3 years"]
  },
  aadharCardNumber: {
    type: String,
    required: [true, "Aadhar card number is required"],
    match: [/^\d{12}$/, "Aadhar card number must be exactly 12 digits"]
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true
  },
  parentPhoneNumber: {
    type: String,
    required: [true, "Parent phone number is required"],
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
  },
  parentEmailAddress: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"]
  },
  nationality: {
    type: String,
    required: [true, "Nationality is required"],
    trim: true
  },
  religion: {
    type: String,
    trim: true
  },
  MotherTongue: {
    type: String,
    default:null
  },
  Studentpassword:{
    type:String
  },

  // Fee Management Section
  fees: {
    tuition: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    lab: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },

}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

