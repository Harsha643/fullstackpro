const mongoose=require("mongoose")

const feedback=new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    rollNumber:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    subject:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
        }
},{timestamps:true})

const feedbacks=mongoose.model("feedbacks",feedback)
module.exports=feedbacks;
