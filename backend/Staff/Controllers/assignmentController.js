const Assignment = require('../models/assignmentModal.js'); // Ensure correct casing

exports.getAssignments = async (req, res) => {

    console.log("Fetching assignments...");
     // Debugging log
    try {
        const assignments = await Assignment.find(); // Use Assignment (uppercase)
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAssigmentByClass=async(req,res)=>{
    
     console.log(req.params);
    const { classNumber } = req.params;  // Extract presentClass from the URL

    try {
        // Find all students with the specified presentClass
        const Assignments= await Assignment.find({ classNumber });

        if (Assignments.length === 0) {
            return res.status(404).json({ message: `No students found in class ${presentClass}` });
        }

        res.status(200).json(Assignments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
}








exports.createAssignment = async (req, res) => {
    const { classNumber, subject, title, link, teacherName, dueDate, description } = req.body;

    // Validate incoming data
    if (!classNumber || !subject || !title || !link || !teacherName || !dueDate || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const assignmentData = new Assignment({
        classNumber,
        subject,
        title,
        link,
        teacherName,
        dueDate,
        description
    });

    try {
        const newAssignment = await assignmentData.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateAssignment = async (req, res) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Use Assignment (uppercase)
        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json(updatedAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAssignment = async (req, res) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id); // Use Assignment (uppercase)
        if (!deletedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};