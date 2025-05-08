const Note= require("../models/notesModels"); // fixed casing

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNote = async (req, res) => {
 
  try {
    const { classNumber, subject, title, link, teacherName } = req.body;

    const newNote = new Note({
      classNumber,
      subject,
      title,
      link,
      teacherName
    });

    await newNote.save();

    res.status(201).json({ message: "Note assigned successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Error assigning note", error: error.message });
  }
  
};

exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
