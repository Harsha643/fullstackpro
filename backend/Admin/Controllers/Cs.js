const Timetable = require('../Models/Cs');

exports.getAllTimetables = async (req, res) => {

    try{
        const timetables = await Timetable.find();
        console.log("All timetables:", timetables);
        res.status(200).json(timetables);

    }
    catch (error) {
        console.error("Error fetching timetables:", error);
        res.status(500).json({ message: "Error fetching timetables", error });
    }

};


exports.addTimetable = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    
    if (typeof req.body.schedule === "string") {
      req.body.schedule = JSON.parse(req.body.schedule);
    }

    const { className, day, schedule } = req.body;
console.log("className:", className, "day:", day, "schedule:", schedule);
  
    const existingTimetable = await Timetable.findOne({ className, day });

    if (existingTimetable) {
      // Update existing schedule 
      existingTimetable.schedule = [...existingTimetable.schedule, ...schedule];
      await existingTimetable.save();
      console.log("Timetable updated:", existingTimetable);
      res.status(200).json({ message: "Timetable updated successfully", timetable: existingTimetable });
    } else {
      // Create new timetable entry
      const newTimetable = new Timetable({ className, day, schedule });
      await newTimetable.save();
      console.log("Timetable saved:", newTimetable);
      res.status(201).json({ message: "Timetable added successfully", timetable: newTimetable });
    }
  } catch (error) {
    console.error("Error adding/updating timetable:", error.stack);
    res.status(400).json({ message: "Error adding/updating timetable", error });
  }
};



exports.getTimetableByDay = async (req, res) => {
    try {
        const { className, day } = req.params;
        const timetable = await Timetable.findOne({ className, day });

        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found for this class and day' });
        }

        res.status(200).json(timetable);
    } catch (error) {
        console.error("Error retrieving timetable:", error.stack);
        res.status(500).json({ message: 'Error retrieving timetable', error });
    }
};

exports.getTimetableByClass = async (req, res) => {
    try {
        const { className } = req.params;
        const timetable = await Timetable.find({ className });

        if (!timetable.length) {
            return res.status(404).json({ message: 'Timetable not found for this class' });
        }

        res.status(200).json(timetable);
    } catch (error) {
        console.error("Error retrieving timetable:", error.stack);
        res.status(500).json({ message: 'Error retrieving timetable', error });
    }
};
