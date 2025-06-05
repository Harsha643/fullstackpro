const studentFeedback=require("../models/feedback")

exports.getAllFeedbacks=async(req,res)=>{
    try{
        const feedback=await studentFeedback.find()
        if(feedback){
            res.status(200).json(feedback)
        }else{
            res.status(404).json({message:"No feedback found"})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.getFeedbackBysubject=async(req,res)=>{
    try{
        const subject=req.params.subject
        const feedback=await studentFeedback.find({subject:subject})
        if(feedback){
            res.status(200).json(feedback)
            }else{
                res.status(404).json({message:"No feedback found for this subject"})
                }
        
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
exports.createFeedback=async(req,res)=>{
    console.log(req.body)
    try{
        const feedback=await studentFeedback.create(req.body)
        res.status(201).json(feedback)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

}
exports.updateFeedback=async(req,res)=>{
    try{
        const feedback=await studentFeedback.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(feedback){
            res.status(201).json(feedback)
            }else{
                res.status(404).json({message:"No feedback found for this id"})
                }
    }catch(err){
        res.status(500).json({message:err.message})
    }

}


exports.deleteFeedback=async(req,res)=>{

    try{
        const feedback=await studentFeedback.findByIdAndDelete(req.params.id)
        if(feedback){
            res.status(200).json(feedback)
            }else{
                res.status(404).json({message:"No feedback found for this id"})
            }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}