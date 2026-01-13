const User = require("../models/User");
const FoodCaterer = require("../models/FoodCaterer");
const Venue = require("../models/Venue");
const DJ = require("../models/DJ");
const sendEmail = require("../utils/email");

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single User by ID
exports.getUserById = async (req, res) => {
  try {
    const booking = await User.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user byEmail
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update the admin role for a user (always sets admin to true)
exports.updateUserRole = async (req, res) => {
  const { userId } = req.params; // Get userId from URL parameters
  console.log(userId);
  

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's admin role to true
    user.admin = true;
    await user.save();

    // Send the updated user as a response
    res.status(200).json({
      message: "User role updated to admin successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ message: "Server error while updating role" });
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body }, // Update only provided fields
      { new: true, runValidators: true } // Return updated user and validate fields
    );

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Calculate Total Cost
exports.calculateTotalCost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch selected services
    const foodCaterer = await FoodCaterer.findById(user.selectedFood);
    const venue = await Venue.findById(user.selectedVenue);
    const dj = await DJ.findById(user.selectedDj);

    if (!foodCaterer || !venue || !dj) {
      return res.status(400).json({ message: "Selected services not found" });
    }

    // Calculate costs
    user.foodCost = foodCaterer.pricePerPerson * user.numPeople;
    user.venueCost = venue.pricePerHour * user.numHoursVenue;
    user.djCost = dj.pricePerHour * user.numHoursDj;
    user.totalCost = user.foodCost + user.venueCost + user.djCost;

    await user.save();
    res.json({ totalCost: user.totalCost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
