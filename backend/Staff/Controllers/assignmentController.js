const Assignment = require('../models/assignmentModal.js');

// Get all assignments
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get assignments by class number
exports.getAssigmentByClass = async (req, res) => {
    const { classNumber } = req.params;
    try {
        const assignments = await Assignment.find({ classNumber });
        if (assignments.length === 0) {
            return res.status(404).json({ message: `No assignments found for class ${classNumber}` });
        }
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assignments", error });
    }
};

// Create new assignment
exports.createAssignment = async (req, res) => {
    const { classNumber, subject, topic, link, teacher, dueDate, description } = req.body;

    if (!classNumber || !subject || !topic || !link || !teacher || !dueDate || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const assignment = new Assignment({
        classNumber,
        subject,
        topic,
        link,
        teacher,
        dueDate,
        description
    });

    try {
        const newAssignment = await assignment.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
    try {
        const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Assignment not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
