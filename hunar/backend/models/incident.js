const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firNumber: {
    type: String,
    default: 0,
  },
  complete: Boolean,
  heading: String,
  type: String,
  date: Date,
  subtype: String,
  crimeCategory: String,
  description: String,
  state: String,
  district: String,
  ps: String,
  place: String,
  latitude: String,
  longitude: String,
  remark: String,
  marqueeData: String,
  file: {
    type: String,
    default: "#",
    required: false, // Make the 'file' field optional
  },
  isHighlighted: Boolean,
});

const model = mongoose.model("incident", schema);

module.exports = model;
