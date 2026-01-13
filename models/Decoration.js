const mongoose = require("mongoose");

const DecorationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image_url: { type: String, required: true },
  description: { type: String, default: "Our Meals are always delicious."},
  price: { type: Number, default: 0.00 }
});

module.exports = mongoose.model("Decoration", DecorationSchema);
