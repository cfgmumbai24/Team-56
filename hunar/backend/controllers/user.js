const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Station = require("../models/stationsModel");
const bcrypt = require("bcryptjs");

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = expressAsyncHandler(async (req, res) => {
  try {
    const { username, password, district } = req.body;
    //console.log(username + password);

    const station = await Station.findOne({ username });

    if (
      station &&
      (await station.matchPassword(password))
      // true
    ) {
      res.status(200).json({
        _id: station._id,
        username: station.username,
        district: station.district,
        token: generateToken(station._id),
        message: "success",
      });
    } else {
      res.status(400).json({
        error: "error",
      });
    }
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
});

const addUser = expressAsyncHandler(async (req, res) => {
  try {
    const { username, password, district } = req.body;

    const station = await Station.create({
      username,
      password,
      district,
    });
    res.status(200).json({
      _id: station._id,
      username: station.username,
      token: generateToken(station._id),
      district: station.district,
      message: "success",
    });
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
});
const filter = expressAsyncHandler(async (req, res) => {
  try {
    const { id, data } = req.body;

    let user = await Station.findOne({ username: id });
    if (!user) {
      return res.status(404).json({ message: "Station not found" });
    }

    user.SelectedCrimes = data; // No need to stringify here
    await user.save();

    res.status(200).json({ message: "Selected crimes updated successfully" });
    console.log(data);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});
module.exports = { authUser, addUser, filter };
