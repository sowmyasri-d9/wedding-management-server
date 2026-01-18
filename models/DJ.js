const mongoose = require("mongoose");

const DjSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  category: { type: String, required: true }, // Indian, American, etc.
  description: { type: String, default: "Till Down entertaining Music" },
  pricePerHour: { type: Number, default: 0.00 },
  image_url: { type: String, required: true }
});

module.exports = mongoose.model("DJ", DjSchema);
