const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user data to the request object
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const user = req.user; // Assuming user data is attached to the request
  if (user && user.admin) {
    next(); // Allow access
  } else {
    res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
};

module.exports = { authenticate, isAdmin };
