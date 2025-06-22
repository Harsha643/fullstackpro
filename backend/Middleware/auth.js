const jwt = require('jsonwebtoken');
const Admin = require('../Admin/Models/admin'); // Adjust the path as necessary
const ErrorResponse = require('../utills/errorResponse');

// Protect routes
exports.protect = async (req, res, next) => {

  let token;
  console.log("Headers:", req.headers.authorization);
  console.log("Cookies:", req.cookies);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  console.log(token)

  if (!token) {
    console.log("No token found");
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    console.log("Token found:", token);
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await Admin.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return next(
        new ErrorResponse(
          `Role ${req.admin.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };


};