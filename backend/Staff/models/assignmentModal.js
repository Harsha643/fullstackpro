const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    classNumber: { type: Number, required: true },
    subject: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    teacherName: { type: String, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Assignment', assignmentSchema);