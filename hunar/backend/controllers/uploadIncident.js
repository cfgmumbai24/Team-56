const Model = require("../models/incident");

//UPLOAD Incident
const uploadIncident = async (req, res) => {
  try {
    const {
      firNumber,
      complete,
      heading,
      type,
      subtype,
      description,
      state,
      district,
      ps,
      place,
      latitude,
      longitude,
      remark,
      file,
      date,
      isHighlighted,
      crimeCategory,
      marqueeData,
    } = req.body;
    let filePath1;
    if (file === undefined) filePath1 = "#";
    const data = await Model.create({
      firNumber,
      complete,
      heading,
      type,
      subtype,
      crimeCategory,
      description,
      state,
      district,
      ps,
      place,
      latitude,
      longitude,
      remark,
      date,
      file: filePath1,
      isHighlighted,
      marqueeData,
    });
    res.status(200).json({
      message: "Incident uploaded successfully ",
      result: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

//FETCH ALL INCIDENTS
const fetchIncidents = async (req, res) => {
  try {
    const ele = req.body;
    console.log("ele", ele);
    console.log(ele.resultdistrictfromlocal);
    const data = await Model.find({});
    console.log("data", data);

    return res.status(200).json({
      result: data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//UPDATE Incident BY ID
const updateIncident = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedData = req.body;
    const updatedIncident = await Model.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedIncident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedIncident,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in updating incident by id",
    });
  }
};

//DELETE INCIDENT
const deleteIncident = async (req, res) => {
  try {
    const { id } = req.query;

    // Check if the data exists
    const deletedIncident = await Model.findByIdAndDelete(id);

    if (!deletedIncident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in deleting Incident",
      error: err.message,
    });
  }
};

//FETCH INCIDENT BY ID
const getIncidentById = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await Model.findById(id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error in fetching Incident by id",
    });
  }
};

// Fetch crimes by title using a query
const fetchIncidentsByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    // Modify this query to filter data based on the title parameter
    const data = await Model.find({ type: title });

    res.status(200).json({
      result: data,
    });
    //console.log(`${title} crimes data:`, data);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

module.exports = {
  uploadIncident,
  updateIncident,
  fetchIncidents,
  fetchIncidentsByTitle,
  getIncidentById,
  deleteIncident,
};
