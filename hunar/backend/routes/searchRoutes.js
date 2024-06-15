const express = require("express");

const {
  firNumber,
  crimeCategory,
  filter,
  marquee,
  firfilter,
  filterIncidents,
} = require("../controllers/search");

const router = express.Router();

// router.post("/firNumber", firNumber);
router.get("/firNumber/:firNumber", firNumber);
router.post("/crimeCategory", crimeCategory);
router.post("/filter", filter);
router.get("/marquee", marquee);
router.get("/firfilter", firfilter);
router.post("/filterIncidents", filterIncidents);
module.exports = router;
