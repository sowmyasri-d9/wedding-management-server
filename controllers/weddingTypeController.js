const WeddingType = require("../models/WeddingType");

// Get all Wedding Types
exports.getAllWeddingTypes = async (req, res) => {
  try {
    const weddingTypes = await WeddingType.find();
    if (!weddingTypes || weddingTypes.length===0){
      return res.status(404).json({message: "No Wedding Types"});
    }

    return res.status(200).json({
      status: "success",
      "wedding_count": weddingTypes.length,
      data: weddingTypes
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Wedding Type by ID
exports.getWeddingTypeById = async (req, res) => {
  try {
    const weddingType = await WeddingType.findById(req.params.id);
    if (!weddingType) {
      return res.status(404).json({ message: "Wedding Type not found" });
    }
    res.json(weddingType);
  } catch (err) {    
    res.status(500).json({ message: err.message });
  }
};

// Create a new Wedding Type
exports.createWeddingType = async (req, res) => {
  try {
    const newWeddingType = await WeddingType.create(req.body);
    res.status(201).json(newWeddingType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a Wedding Type
exports.updateWeddingType = async (req, res) => {
  try {
    const weddingType = await WeddingType.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if(!weddingType){
        return res.status(404).json({
            status: 'fail',
            message: 'No Wedding Type with that id'
        });
    }

    res.status(200).json({
        status: 'success',
        weddingType
    });
  } catch (err) {
    console.log(err);    
    res.status(400).json({ message: err.message });
  }
};

// Delete a Wedding Type
exports.deleteWeddingType = async (req, res) => {
  try {
    const weddingType = await WeddingType.findByIdAndDelete(req.params.id);
    if (!weddingType) {
      return res.status(404).json({ message: "Wedding Type not found" });
    }
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
