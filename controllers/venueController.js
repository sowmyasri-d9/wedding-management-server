const Venue = require("../models/Venue");

// Get all Venues
exports.getAllVenues = async (req, res) => {
  try {

    const venues = await Venue.find();

    if (venues.length === 0) {
      return res.status(404).json({ message: "Venues not found"
      });
    }

    return res.status(200).json({
      status: 'success',
      "venue_size": venues.length,
      data: venues
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Venue by ID
exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    return res.status(200).json({
      status: 'success',
      data: venue
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new Venue
exports.createVenue = async (req, res) => {
  try {
    const newVenue = await Venue.create(req.body);
    res.status(201).json(newVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a Venue (PATCH)
exports.updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!venue) {
      return res.status(404).json({
        status: 'fail',
        message: "Venue does not exist"
      });
    }

    res.status(200).json({
      status: 'success',
      data: venue
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete a Venue
exports.deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({
      status: 'success',
      data: null
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
