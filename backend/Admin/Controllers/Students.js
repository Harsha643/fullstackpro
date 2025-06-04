const Student = require("../Models/students"); // Adjust path if necessary
const cloudinary = require("cloudinary").v2; // Import Cloudinary for image upload

// Get all students
exports.getAllStudents = async (req, res) => {
    // console.log(req.url);
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
}

// Get a student by ID
exports.getStudentById = async (req, res) => {
    console.log(req.params);
    const { presentClass } = req.params;  // Extract presentClass from the URL

    try {
        // Find all students with the specified presentClass
        const students = await Student.find({ presentClass });

        if (students.length === 0) {
            return res.status(404).json({ message: `No students found in class ${presentClass}` });
        }

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
};

exports.updateStudentFees = async (req, res) => {
    const { id } = req.params;
    const { tuition, transport, lab, total } = req.body;
    try {
        const student = await Student.findByIdAndUpdate(
            id,
            { fees: { tuition, transport, lab, total } }, // update the nested fees object
            { new: true }
        );
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Error updating student fees", error });
    }
}

// Function to generate next admission number
function getNextAdmissionNumber(students) {
    
    if (students.length === 0) return 'EDU0001';

    const numbers = students
        .map(s => s.admissionNumber)
        .filter(n => n && /^EDU\d+$/.test(n))
        .map(n => parseInt(n.replace('EDU', ''), 10));

    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
    const nextNumber = maxNumber + 1;

    return `EDU${String(nextNumber).padStart(4, '0')}`;
}

// Function to auto-assign fees based on class
function calculateFeesForClass(presentClass) {
    let tuition = 8000;
    if (presentClass === 2) tuition = 10000;
    else if (presentClass === 3) tuition = 12000;
    else if (presentClass === 4) tuition = 13000;
    else if (presentClass === 5 || presentClass === 6) tuition = 17000;
    else if (presentClass === 7 || presentClass === 8) tuition = 19000;
    else if (presentClass === 9 || presentClass === 10) tuition = 27000;
    else if (presentClass === 1) tuition = 9000;

    let lab = [8, 9, 10].includes(presentClass) ? 3000 : 0;
    let transport = 2000;
    let total = tuition + lab + transport;

    return { tuition, transport, lab, total };
}

function password(studentName, dateOfBirth, maxNameLength = 5) {
   
    const namePart = studentName
        .replace(/\s+/g, '')
        .slice(0, maxNameLength)
        .toLowerCase();
    
    const datePart = dateOfBirth.replace(/-/g, '');
    
    return `${namePart}@${datePart}`;
}



const ROLL_NUMBER_PREFIX = "25B4"; 
async function generateRollNumber(presentClass) {
    const classStr = String(presentClass).padStart(2, '0');
    const studentsInClass = await Student.find({ presentClass });

    const serial = String(studentsInClass.length + 1).padStart(3, '0');
    return `${ROLL_NUMBER_PREFIX}${classStr}${serial}`;
}

exports.createStudent = async (req, res) => {
    console.log(req.body);
    try {
            const {
      studentName,
      fatherName,
      previousClass,
      presentClass,
      age,
      address,
      parentEmailAddress,
      parentPhoneNumber,
      dateOfBirth,
      aadharCardNumber,
      nationality,
      religion,
      gender,
      MotherTongue,
    } = req.body;


        const students = await Student.find();
        const admissionNumber = getNextAdmissionNumber(students);
        // console.log(req.file); 
        const imagefile = req.file 
        console.log("Image File:", imagefile.path);

        if (!imagefile) {
            return res.status(400).json({ message: "No file uploaded" });
        }
    
        
        //uploadImage to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(req.file.path,{resource_type:"image"})
        // console.log(imageUpload)

        const imageurl = imageUpload.secure_url

           const rollNumber = await generateRollNumber(presentClass);
           const Studentpassword= password(studentName,dateOfBirth,4)
       
        const newStudent = {
        studentName,
      fatherName,
      previousClass,
      presentClass,
      age,
      address,
      rollNumber, 
      parentEmailAddress,
      parentPhoneNumber,
      dateOfBirth,
      aadharCardNumber,
      nationality,
      religion,
      gender,
      MotherTongue,
        admissionNumber,
            image:imageurl,
            Studentpassword
        };

        // console.log(typeof(Number(newStudent.presentClass)));
        // Add auto-assigned fees
        const fees = calculateFeesForClass(Number(newStudent.presentClass));
        newStudent.fees = fees;
        console.log(newStudent);

        const savedStudent = await Student.create(newStudent);
        console.log(savedStudent);

        res.status(201).json({ message: "Student added successfully", student: savedStudent });
    } catch (error) {
        res.status(500).json({ message: "Error creating student", error });
    }
}

exports.updateStudent = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    try {
        const updatedStudent = await Student.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(502).json({ message: "Error updating student" + error.message });
    }
}

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(502).json({ message: "Error deleting student" + error.message });
    }
}

exports.getStudentByAdmissionNumber = async (req, res) => {
    const { admissionNumber } = req.params;
    try {
        const student = await Student.findOne({ admissionNumber });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    }
    catch (error) {
        res.status(502).json({ message: "Error fetching student" + error.message });
    }
}

exports.StudentUpdateData = async (req, res) => {
    console.log(req.params);
    const { admissionNumber } = req.params;
    try {
        console.log(req.body);
        const student = await Student.findOneAndUpdate({ admissionNumber }, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);      
    }
    catch (error) {
        res.status(502).json({ message: "Error updating student" + error.message });
    }

}






