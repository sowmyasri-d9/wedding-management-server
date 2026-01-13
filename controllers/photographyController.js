const Photography = require("../models/Photography");

// Get all Photography services
exports.getAllPhotography = async (req, res) => {
  try {
    const photographyServices = await Photography.find();

    if (!photographyServices || photographyServices.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No photography services found",
      });
    }

    return res.status(200).json({
      status: "success",
      "photography-count": photographyServices.length,
      data: photographyServices,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Photography service by ID
exports.getPhotographyById = async (req, res) => {
  try {
    const photography = await Photography.findById(req.params.id);
    if (!photography) {
      return res.status(404).json({ message: "Photography service not found" });
    }

    return res.status(200).json({
      status: "success",
      data: photography,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new Photography service
exports.createPhotography = async (req, res) => {
  try {
    const newPhotography = await Photography.create(req.body);
    res.status(201).json(newPhotography);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a Photography service
exports.updatePhotography = async (req, res) => {
  try {
    const photography = await Photography.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Ensure only provided fields are updated
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!photography) {
      return res.status(404).json({
        status: "fail",
        message: "Photography service not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: photography,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Delete a Photography service
exports.deletePhotography = async (req, res) => {
  try {
    const photography = await Photography.findByIdAndDelete(req.params.id);
    if (!photography) {
      return res.status(404).json({ message: "Photography service not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Photography service deleted",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
