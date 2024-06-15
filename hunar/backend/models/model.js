const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    firNumber: {
      type: Number,
      default: 0,
    },
    date: Date,
    isHighlighted: Boolean,
    crimeCategory: String,
    district: String,
    policeStation: String,
    secondDistrict: String,
    secondPoliceStation: String,
    crimeLocation: String,
    attachments: String,
    stationName: String,
    subject: String,
    assistance: String,
    category: String,
    natureOfItem: String,
    quantity: Number,
    numberOfPrisoners: Number,
    prisonId: Number,
    name: String,
    address: String,
    wanted: Boolean,
    complete: Boolean,
    description: String,
    extra: String,
    marquee:[],
    file: {
      type: String,
      default: "#",
      required: false, // Make the 'file' field optional
    },
    imgFile: {
      type: String,
      default: "#",
      required: false, // Make the 'imgFile' field optional
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

const model = mongoose.model("model", schema);
module.exports = model;
