const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  email: { type: String, required: true }, 
  wedding: { type: String, required: true },
  eventDate: { type: Date, required: true },
  food: {
    name: { type: String, required: true }, 
    hours: { type: Number, required: true, default: 0 },
    cost: { type: Number, required: true, default: 0.00 }, 
  },
  venue: {
    name: { type: String, required: true }, 
    hours: { type: Number, required: true, default: 0 },
    cost: { type: Number, required: true, default: 0.00 }, 
  },
  dj: {
    name: { type: String, required: true },
    hours: { type: Number, required: true, default: 0 }, 
    cost: { type: Number, required: true, default: 0.00 }, 
  },
  photography: {
    name: { type: String, required: true },
    hours: { type: Number, required: true, default: 0 }, 
    cost: { type: Number, required: true, default: 0.00 }, 
  },
  decorators: {
    name: { type: String, required: true },
    cost: { type: Number, required: true, default: 0.0 },
  },
  createdAt: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model("Booking", BookSchema);