const  mongoose = require('mongoose');

const studdentSubmissionSchema = new mongoose.Schema({
    
    submissionDate: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true }

});
const StudentSubmission = mongoose.model('StudentSubmission', studdentSubmissionSchema);   