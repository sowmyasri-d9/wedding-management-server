const Decoration = require("../models/Decoration");

// Get all Decoration services
exports.getAllDecorations = async (req, res) => {
  try {
    const decorations = await Decoration.find();

    if (!decorations || decorations.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No decoration services found",
      });
    }

    return res.status(200).json({
      status: "success",
      "decoration-count": decorations.length,
      data: decorations,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Decoration service by ID
exports.getDecorationById = async (req, res) => {
  try {
    const decoration = await Decoration.findById(req.params.id);
    if (!decoration) {
      return res.status(404).json({ message: "Decoration service not found" });
    }

    return res.status(200).json({
      status: "success",
      data: decoration,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new Decoration service
exports.createDecoration = async (req, res) => {
  try {
    const newDecoration = await Decoration.create(req.body);
    res.status(201).json(newDecoration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a Decoration service
exports.updateDecoration = async (req, res) => {
  try {
    const decoration = await Decoration.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Ensure only provided fields are updated
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!decoration) {
      return res.status(404).json({
        status: "fail",
        message: "Decoration service not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: decoration,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Delete a Decoration service
exports.deleteDecoration = async (req, res) => {
  try {
    const decoration = await Decoration.findByIdAndDelete(req.params.id);
    if (!decoration) {
      return res.status(404).json({ message: "Decoration service not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Decoration service deleted",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
