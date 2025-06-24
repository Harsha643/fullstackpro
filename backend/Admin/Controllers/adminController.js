const Admin = require('../Models/admin');
const ErrorResponse = require('../../utills/errorResponse');
const asyncHandler = require('../../utills/asyncHandler');
const cloudinary = require("cloudinary").v2;

// @desc    Get current logged in admin
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);
  
  res.status(200).json({
    success: true,
    data: admin
  });
});


exports.createAdmin = asyncHandler(async (req, res, next) => {
  console.log("Creating admin with body:", req.body);
  const { email, password, name } = req.body;
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

  const admin = await Admin.create({
    email,
    password,
    name,
    role: 'admin',
    image: imageurl
  });

  res.status(201).json({
    success: true,
    data: admin
  });
});