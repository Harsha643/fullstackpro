const Timetable = require('../Models/Cs');

exports.addTimetable = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        // Parse schedule if sent as a string (e.g., from FormData)
        if (typeof req.body.schedule === "string") {
            req.body.schedule = JSON.parse(req.body.schedule);
        }

        const timetable = new Timetable({
            className: req.body.className,
            day: req.body.day,
            schedule: req.body.schedule,
        });

        await timetable.save();
        console.log("Timetable saved:", timetable);

        res.status(201).json({ message: "Timetable added successfully", timetable });
    } catch (error) {
        console.error("Error adding timetable:", error.stack);
        res.status(400).json({ message: "Error adding timetable", error });
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
