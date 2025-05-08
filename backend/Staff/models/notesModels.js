const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  classNumber: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const notes = mongoose.model("Note", notesSchema);
module.exports = notes;