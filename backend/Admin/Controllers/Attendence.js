const Attendance=require("../Models/Attendence")

exports.getAttendence=async (req,res) => {
    try{
      const attendence=await Attendance.find()
      res.status(200).json(attendence)
    }catch(error){
        res.status(500).json({message: "Error fatching attendence",error})

    }
}
exports.getAttendenceById=async (req,res) => {
       const { id } = req.params;
        try {
            const Attendances = await Attendance.findById(id);
            if (!Attendances) {
                return res.status(404).json({ message: "Attendance not found" });
            }
            res.status(200).json(Attendances);
        } catch (error) {
            res.status(500).json({ message: "Error fetching Attendance", error });
        }
    
}


exports.getAttendenceByName=async (req,res)=>{
    const {studentName}=req.params
    try{
        const attendance=await Attendance.findByName(studentName)
        if (!attendance){
            
            return res.status(404).json({ message: "attendance not found" });
        }
        res.ststus(200).json(attendance)
    }catch(error){
        res.status(500).json({message:"Error fetching attendance",error})
    }
}

exports.createAttendence=async (req,res) => {
    console.log(req.body)
    const studentAttendence=req.body
    console.log(studentAttendence)
    
    try{
        const newAttendence=await Attendance.create(studentAttendence)
        console.log("fgfh",newAttendence)
        res.status(201).json({message:"Attendance created successfully",newAttendence})
    }catch(error){
        res.status(500).json({message:"Error creating attendance",error})
    }
}

exports.updateAttendence=async (req,res) => {
    const { id } = req.params;
    try {
        const updated = await Attendance.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) return res.status(404).json({ message: "Attendance not found" });
        res.status(200).json(updated);
    }catch (error) {
        res.status(500).json({ message: "Error updating attendance", error });
    }
}


exports.deleteAttendence=async (req,res) => {
    const { id } = req.params;
    try {
        const deleted = await Attendance.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Attendance not found" });
        res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting attendance", error });
    }
}
exports.getAttendenceByRollNumber = async (req, res) => {
    console.log("this rollnumber");
    const { rollNumber } = req.params;
    console.log(rollNumber);
    try {
        const attendance = await Attendance.find({ rollNumber });
        if (!attendance || attendance.length === 0) {
            return res.status(404).json({ message: "attendance not found" });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance", error });
    }
};