const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,

    type: String,
    trim: true,
  },

  email: {
    required: true,

    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    required: true,

    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
