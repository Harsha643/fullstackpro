
const classes=require("../models/classes")


exports.getAllClasses= async(req,res)=>{
    try{
        const Allclasses=await classes.find()
        res.status(200).json(Allclasses)
        
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

exports.createClass=async (req,res)=>{
    console.log(req.body)
    try{
        const newClass=new classes(req.body)
        const savedData=await newClass.save()
        res.status(201).json({message:"Class created successfully",savedData:savedData})

}catch(error){
        res.status(400).json({message:error.message})
}
}

exports.updateClass=async (req,res)=>
{
    try{
        const updatedClass=await classes.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({updatedClass})
        }catch(error){
            res.status(400).json({message:error.message})
            }

}

exports.deleteClass=async (req,res)=>
    {
        try{
            const deletedClass=await classes.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"Class deleted successfully",deletedClass})
            }catch(error){
                res.status(400).json({message:error.message})
                }
}



