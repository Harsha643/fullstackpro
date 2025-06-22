const Admin = require('../Models/admin');
const ErrorResponse = require('../../utills/errorResponse');
const asyncHandler = require('../../utills/asyncHandler');

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
  const admin = await Admin.create({
    email,
    password,
    name,
    role: 'admin'
  });

  res.status(201).json({
    success: true,
    data: admin
  });
});