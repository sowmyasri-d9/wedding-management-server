const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

exports.createAdminUser = async () => {
  try {
    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@admin.com" });

    if (!existingAdmin) {
      // Hash the password before saving the admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("1234", salt);

      // Create the admin user if not found
      const adminUser = new User({
        email: "admin@admin.com",
        password: hashedPassword, // Use the hashed password
        admin: true,
      });

      await adminUser.save();
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

// User Registration
exports.register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "fail", msg: "User already exists" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ status: "fail", msg: "Passwords do not match" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Create JWT token
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      status: "success",
      data: { user: { id: user._id, email: user.email }, token },
    });
  } catch (err) {
    console.log(err);
    
    console.error("Registration Error:", err.message);
    res.status(500).json({ status: "error", msg: "Server error" });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create a JWT payload
    const payload = { 
      user: {
        id: user.id,
        email: email,
        admin: user.admin, // Include admin status in the payload
      },
    };

    // Sign the JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the response with the token and admin status
    res.json({ 
      token,
      id: user.id,
      admin: user.admin, // Include admin status in the response
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

