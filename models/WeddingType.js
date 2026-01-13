const mongoose = require("mongoose");

const WeddingTypeSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  img_url: { type: String }
});

module.exports = mongoose.model("WeddingType", WeddingTypeSchema);
