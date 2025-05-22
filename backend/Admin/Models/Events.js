const mongoose= require("mongoose");

const eventSchema= new mongoose.Schema({
    eventName:{
        type:String,
        required:[true,"Event name is required"],
        trim:true,
        minlength:[3,"Event name must be at least 3 characters"],
        maxlength:[50,"Event name cannot exceed 50 characters"]
    },
    eventDate:{
        type:Date,
        required:[true,"Event date is required"],
        default:Date.now
    },
    eventTime:{
        type:String,
        required:[true,"Event time is required"],
        trim:true
    },
    location:{
        type:String,
        required:[true,"Location is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Description is required"],
        trim:true
    }
},{timestamps:true});
module.exports= mongoose.model("Event",eventSchema);