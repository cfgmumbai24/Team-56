const Model = require("../models/model");

const uploadCrime = async (req, res) => {
  try {
    const {
      firNumber,
      crimeCategory,
      description,
      date,
      file,
      imgFile,
      complete,
      district,
      policeStation,
      secondPoliceStation,
      secondDistrict,
      isHighlighted,
      marquee,
    } = req.body;

    // console.log(file);
    // console.log(imgFile);
    let filePath1, filePath2;
    // if (req.files[1] != "undefined" && req.files[1] != "undefined") {
    //   filePath1 = file[0].path;
    //   filePath2 = file[1].path;
    // } else if (req.files[1] == "undefined" && req.files[1] == "undefined") {
    //   filePath1 = "#";
    //   filePath2 = "#";
    // } else {
    //   // filePath1 = "#";
    //   filePath2 = "#";
    //   if (req.files[0] != "undefined") {
    //     filePath1 = file[0].path;
    //   }
    //   if (req.files[1] != "undefined") {
    //     filePath1 = file[1].path;
    //   }
    // }

    if (file === undefined) filePath1 = "#";
    if (imgFile === undefined) filePath2 = "#";
    // console.log(marquee)
    // console.log(typeof(marquee))
    const dataArray = JSON.parse(req.body.marquee);
    dataArray.forEach((value, index) => {
      console.log(`Value at index ${index}:`, value);
    });
    // console.log(marquee[0])
    // console.log(marquee[0][0])
    // console.log(JSON.parse(marquee))
    // console.log(marquee)
    // console.log(typeof(marquee))
    let picka = [...dataArray];
    let pickachu = [];
    for (let i = 0; i < picka.length; i++) {
      pickachu.push(picka[i]);
    }
    console.log(pickachu);
    console.log(typeof pickachu);

    const data = await Model.create({
      firNumber,
      crimeCategory,
      description,
      date,
      file: filePath1,
      imgFile: filePath2,
      complete,
      district,
      policeStation,
      secondPoliceStation,
      secondDistrict,
      isHighlighted,
      marquee: pickachu,
    });
    res.status(200).json({
      message: "Crime uploaded successfully ",
      result: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};
//fetch all crime
const fetchCrime = async (req, res) => {
  try {
    const data = await Model.find({});
    res.status(200).json({
      result: data,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

//update crime by id
const updateCrime = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedData = req.body; // Assuming the updated data is in the request body

    // Use findByIdAndUpdate to update the crime record
    const updatedCrime = await Model.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedCrime) {
      return res.status(404).json({
        success: false,
        message: "Crime not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCrime,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error in updating crime by id",
    });
  }
};
//DELETE CRIME
const deleteCrime = async (req, res) => {
  try {
    const { id } = req.query;

    // Check if the data exists
    const deletedCrime = await Model.findByIdAndDelete(id);

    if (!deletedCrime) {
      return res.status(404).json({
        success: false,
        message: "Crime not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crime deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in deleting crime",
      error: err.message,
    });
  }
};

//Fetch crime by id
const getCrimeById = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await Model.findById(id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error in fetching crime by id",
    });
  }
};
// Fetch crimes by title using a query
const fetchCrimesByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const ele = req.body;
    const chkdistrict = ele.resultdistrictfromlocal;
    const data = await Model.find({
      $or: [
        {
          crimeCategory: title,
          district: { $regex: new RegExp(chkdistrict, "i") },
        },
        {
          crimeCategory: title,
          secondDistrict: { $regex: new RegExp(chkdistrict, "i") },
        },
        {
          crimeCategory: title,
          description: { $regex: new RegExp(chkdistrict, "i") },
        },
      ],
    });

    console.log("data", data);
    res.status(200).json({
      result: data,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

module.exports = {
  getCrimeById,
  deleteCrime,
  updateCrime,
  uploadCrime,
  fetchCrime,
  fetchCrimesByTitle,
};
