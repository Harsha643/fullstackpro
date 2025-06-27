const mongoose = require("mongoose")

const ClassTeacher = new mongoose.Schema({

    classNumber: {
        type:Number,
    },
    teacherName: {
        type:String,
        }
    
},{timestamps:true})

const ClassTeachers = mongoose.model("ClassTeacher", ClassTeacher)
module.exports = ClassTeachers