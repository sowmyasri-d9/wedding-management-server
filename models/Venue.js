const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true }, // Indian, American, etc.
  image_url: { type: String, required: true },
  description: { type: String, default: "Cool ambiance."},
  pricePerHour: { type: Number, default: 0.00 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Venue", VenueSchema);
