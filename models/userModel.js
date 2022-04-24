const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
  },
  occupation: {
    type: String,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "City"
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
