const  mongoose = require('mongoose');

const studdentSubmissionSchema = new mongoose.Schema({
    rollNumber:{
        type:String
    },
    classNumber:{
        type:Number
    },
    subject:{
        type:String
        },
    topic:{
        type:String
    },
    link: { type: String, required: true },
    submittedAt:{
        type:Date
    }

});
const StudentSubmission = mongoose.model('StudentSubmission', studdentSubmissionSchema);
module.exports = StudentSubmission;