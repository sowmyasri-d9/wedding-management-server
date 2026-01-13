const DJ = require("../models/DJ");

// Get all DJs
exports.getAllDJs = async (req, res) => {
  try {
    const djs = await DJ.find();

    if(!djs || djs.length === 0){
        return res.status(404).json({
            status: 'fail',
            message: 'No DJs found'
        });
    }

    return res.status(200).json({
        status: 'success',
        "dj-count": djs.length,
        data: djs
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single DJ by ID
exports.getDJById = async (req, res) => {
  try {
    const dj = await DJ.findById(req.params.id);
    if (!dj || dj.length === 0) {
      return res.status(404).json({ message: "DJ not found" });
    }

    return res.status(200).json({
        status: 'success',
        data: dj
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new DJ
exports.createDJ = async (req, res) => {
  try {
    const newDJ = await DJ.create(req.body);
    res.status(201).json(newDJ);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a DJ
exports.updateDJ = async (req, res) => {
  try {
    const dj = await DJ.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Ensure only provided fields are updated
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!dj) {
      return res.status(404).json({
        status: "fail",
        message: "DJ not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: dj,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};


// Delete a DJ
exports.deleteDJ = async (req, res) => {
  try {
    const dj = await DJ.findByIdAndDelete(req.params.id);
    if (!dj) {
      return res.status(404).json({ message: "DJ not found" });
    }

    return res.status(200).json({
        status: 'success',
        message: "DJ deleted",
        data: null
    });

    await dj.remove();
    res.json({ message: "DJ deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
