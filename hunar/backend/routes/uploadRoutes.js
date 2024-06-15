const express = require("express");
const {
  updateCrime,
  uploadCrime,
  deleteCrime,
  fetchCrime,
  fetchCrimesByTitle,
  getCrimeById,
} = require("../controllers/uploadCrime");
const {
  uploadIncident,
  updateIncident,
  fetchIncidents,
  fetchIncidentsByTitle,
  getIncidentById,
  deleteIncident,
} = require("../controllers/uploadIncident");
const { upload } = require("../controllers/uploader");

const router = express.Router();

// router.post("/uploadCrime", upload.single("file"), uploadCrime);
//CRIME UPLOADS
router.post("/uploadCrime", upload.array("file", 2), uploadCrime);
router.get("/fetchCrime", fetchCrime);
router.post("/fetchCrimeByTitle", fetchCrimesByTitle);
router.put("/updateCrime", updateCrime);
router.get("/getCrimeById", getCrimeById);
router.delete("/deleteCrime", deleteCrime);
//INCIDENT UPLOADS
router.post("/uploadIncident", upload.array("file", 2), uploadIncident);
router.post("/fetchIncidents", fetchIncidents);
router.get("/fetchIncidentsByTitle", fetchIncidentsByTitle);
router.put("/updateIncident", updateIncident);
router.get("/getIncidentById", getIncidentById);
router.delete("/deleteIncident", deleteIncident);
module.exports = router;
