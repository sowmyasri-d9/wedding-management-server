const Booking = require("../models/Booking");

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No bookings found",
      });
    }

    return res.status(200).json({
      status: "success",
      "booking-count": bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
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

// Get bookings by email
exports.getBookingByEmail = async (req, res) => {
  try {
    const email = req.query.email; // Use query parameter instead of body

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const bookings = await Booking.find({ email: email });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this email" });
    }

    return res.status(200).json({
      status: "success",
      data: bookings,
    });
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({
      status: "success",
      data: newBooking,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Ensure only provided fields are updated
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Booking deleted",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
