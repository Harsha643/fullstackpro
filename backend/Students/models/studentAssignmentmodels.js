const  mongoose = require('mongoose');

const studdentSubmissionSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    assignmentId: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true }

});
const StudentSubmission = mongoose.model('StudentSubmission', studdentSubmissionSchema);   