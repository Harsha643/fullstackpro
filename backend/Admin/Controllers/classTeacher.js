const ClassTeacher=require("../Models/classTeacher")


exports.getAllClassTeacher=async (req,res)=>{
    try{
        const classTeacher=await ClassTeacher.find()
        res.status(200).json(classTeacher)
        }catch(err){
            res.status(500).json({message:err.message})
            }

    
}

exports.getClassTeacherByTeacherName=async(req,res)=>{
    const teacherName=req.params.teacherName
    try{
        const classTeacher=await ClassTeacher.find({teacherName:teacherName})
        res.status(200).json(classTeacher)
         console.log(classTeacher)
        }catch(err){
            res.status(500).json({message:err.message})
            }
           

}
exports.createClassTeacher=async(req,res)=>{
    const {classNumber,teacherName}=req.body
    const newClassTeacher=new ClassTeacher({classNumber,teacherName})
    try{
        const savedClassTeacher=await newClassTeacher.save()
        res.status(201).json(savedClassTeacher)
        }catch(err){
            res.status(500).json({message:err.message})
            }

}
exports.updateClassTeacher=async(req,res)=>
    {
        const classNo=req.params.classNumber
        const {classNumber,teacherName}=req.body
        try{
            const updatedClassTeacher=await ClassTeacher.findOneAndUpdate({classNumber:classNo},{classNumber:classNumber,teacherName},{new:true})
            res.status(200).json(updatedClassTeacher)
            }catch(err){
                res.status(500).json({message:err.message})
                }
                }

exports.deleteClassTeacher=async (req,res) => {
    const classNo = req.params.classNumber
    try {
        const deletedClassTeacher = await ClassTeacher.findOneAndDelete({ classNumber: classNo })
        res.status(200).json(deletedClassTeacher)
        } catch (err) {
            res.status(500).json({ message: err.message })
            }

    
}

