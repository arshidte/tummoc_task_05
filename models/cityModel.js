const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  establish: {
    type: Number,
  },
  cityCouncil: {
    type: String,
  },
  nation: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
});

const City = mongoose.model('City', citySchema);

module.exports = City