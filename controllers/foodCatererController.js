const FoodCaterer = require("../models/FoodCaterer");

// Get all Food Caterers
exports.getAllFoodCaterers = async (req, res) => {
  try {
    const foodCaterers = await FoodCaterer.find();

    if (!foodCaterers || foodCaterers.length === 0) {
      return res.status(404).json({ message: "Food Caterers not found" });
    }

    return res.status(200).json({
      status: "success",
      results: foodCaterers.length,
      data: foodCaterers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Food Caterer by ID
exports.getFoodCatererById = async (req, res) => {
  try {
    const foodCaterer = await FoodCaterer.findById(req.params.id);
    if (!foodCaterer) {
      return res.status(404).json({ message: "Food Caterer not found" });
    }

    return res.status(200).json({
      status: "success",
      data: foodCaterer
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new Food Caterer
exports.createFoodCaterer = async (req, res) => {
  try {
    const newFoodCaterer = await FoodCaterer.create(req.body);
    res.status(201).json(newFoodCaterer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a Food Caterer
exports.updateFoodCaterer = async (req, res) => {
  try {
    const foodCaterer = await FoodCaterer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Ensure only provided fields are updated
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!foodCaterer) {
      return res.status(404).json({ 
        status: "fail", 
        message: "Food Caterer not found" 
      });
    }

    res.status(200).json({
      status: "success",
      data: foodCaterer,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
  }
};


// Delete a Food Caterer
exports.deleteFoodCaterer = async (req, res) => {
  try {
    const foodCaterer = await FoodCaterer.findByIdAndDelete(req.params.id);

    if (!foodCaterer) {
      return res.status(404).json({ message: "Food Caterer not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Food Caterer deleted",
      data: null,
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
