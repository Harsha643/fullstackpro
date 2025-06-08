const mongoose=require("mongoose")

const classData=new mongoose.Schema({
    class:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        required:true
        },
    teacher:{
        type:String,
        required:true
    },
    topic:{
        type:String,

    },
    date:{
        type:Date,
        default:Date.now
    }},{timestamps:true})

const Class=mongoose.model("Classes",classData)
module.exports=Class;