const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    classNumber: { type: Number, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    link: { type: String, required: true },
    teacher: { type: String, required: true },
    dueDate: { type: Date },
    description: { type: String }
});

module.exports = mongoose.model('Assignment', assignmentSchema);