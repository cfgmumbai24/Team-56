const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const StationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  stationName: {
    type: String,
  },
  district: {
    type: String,
    required: true,
  },
  SelectedCrimes: String
});

StationSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
  // return enteredPassword === this.password;
};
StationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Station", StationSchema);
