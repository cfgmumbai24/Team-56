const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firNumber: {
    type: Number,
    default: 0,
  },
  crimeType: String,
  nameOfDistrict: String,
  crimeLocation: String,
  attachments: String,
  stationName: String,
});

const model = mongoose.model("lawOrder", schema);

module.exports = model;
