const mongoose = require('mongoose');

mongoose.connect("mongodb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,  // good practice
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,    // makes sure no duplicate emails
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 0
  }
});

module.exports = mongoose.model("User", userSchema);
