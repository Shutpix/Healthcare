const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  specialization: {
    required: true,
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
