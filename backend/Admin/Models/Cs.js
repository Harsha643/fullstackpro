const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    className: { type: String, required: true },
    day: { type: String, required: true }, // This was missing
    schedule: [
        {
            subject: { type: String, required: true },
            time: { type: String, required: true },
            
        },
    ],
    teacher:{
        type:String
    }
});

module.exports = mongoose.model('Timetable', timetableSchema);
