const Staff = require('../Models/staff');

const cloudinary = require('cloudinary').v2;

function getNextStaffId(staffs) {
    if (staffs.length === 0) return 'STF0001';

    const numbers = staffs
        .map(s => s.staffId)
        .filter(id => /^STF\d+$/.test(id))
        .map(id => parseInt(id.replace('STF', ''), 10));

    const next = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
    return `STF${String(next).padStart(4, '0')}`;
}



exports.createStaff = async (req, res) => {
    console.log(req.body);
    try {
        const {
            teacherName,
            gender,
            aadharNumber,
            designation,
            exprerence,
            email,
            phoneNumber,
            address,
            dateOfJoining,
        } = req.body;

        const staffs = await Staff.find();
        const staffId = getNextStaffId(staffs);

        const imagefile = req.file;
        if (!imagefile) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
        const imageurl = imageUpload.secure_url;


         const rawPassword = `${teacherName.split(' ')[0]}@${phoneNumber.slice(-4)}`///genarate a raw password

        const newStaff = {
            staffId,
            teacherName,
            gender,
            email,
            phoneNumber,
            address,
            dateOfJoining,
            aadharNumber,
            designation,
            exprerence,
            image: imageurl,
            password: rawPassword,
        };
        console.log(newStaff);

        const staff = await Staff.create(newStaff);

        res.status(201).json({ message: "Staff added successfully", staff: staff });
    } catch (error) {
        res.status(500).json({ message: "Error creating staff", error });
    }
};








// ✅ Add these missing controller functions:

exports.getAllStaff = async (req, res) => {
    try {
        const staffs = await Staff.find();
        res.status(200).json(staffs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching staff list", error });
    }
};

exports.getStaffById = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: "Error fetching staff", error });
    }
};

exports.updateStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await Staff.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Staff not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating staff", error });
    }
};

exports.deleteStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Staff.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Staff not found" });
        res.status(200).json({ message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting staff", error });
    }
};


