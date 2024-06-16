const express = require("express");
const router = express.Router();
const db = require("../db");

// New route to get the average literacy score for a specific teacher grouped by month
router.get("/average-literacy-score/:teacher_id", (req, res) => {
  const { teacher_id } = req.params;
  db.query(
    "SELECT AVG(literacy_score) AS avg_literacy_score, MONTH(date_of_assign) AS month FROM scores WHERE teacher_id = ? GROUP BY MONTH(date_of_assign)",
    [teacher_id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Initialize an array of size 12 with default values of 0
      const monthlyAvgLiteracyScores = new Array(12).fill(0);

      // Populate the array with the average literacy scores
      results.forEach((result) => {
        monthlyAvgLiteracyScores[result.month - 1] = result.avg_literacy_score;
      });

      res.json(monthlyAvgLiteracyScores);
    }
  );
});

router.get("/average-numeracy-score/:teacher_id", (req, res) => {
  const { teacher_id } = req.params;
  db.query(
    "SELECT AVG(numeracy_score) AS avg_numeracy_score, MONTH(date_of_assign) AS month FROM scores WHERE teacher_id = ? GROUP BY MONTH(date_of_assign)",
    [teacher_id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Initialize an array of size 12 with default values of 0
      const monthlyAvgNumeracyScores = new Array(12).fill(0);

      // Populate the array with the average literacy scores
      results.forEach((result) => {
        monthlyAvgNumeracyScores[result.month - 1] = result.avg_numeracy_score;
      });

      res.json(monthlyAvgNumeracyScores);
    }
  );
});

router.get("/average-emotional-score/:teacher_id", (req, res) => {
  const { teacher_id } = req.params;
  db.query(
    "SELECT AVG(socio_emotional_score) AS avg_emotional_score, MONTH(date_of_assign) AS month FROM scores WHERE teacher_id = ? GROUP BY MONTH(date_of_assign)",
    [teacher_id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Initialize an array of size 12 with default values of 0
      const monthlyAvgEmotionalScores = new Array(12).fill(0);

      // Populate the array with the average literacy scores
      results.forEach((result) => {
        monthlyAvgEmotionalScores[result.month - 1] =
          result.avg_emotional_score;
      });

      res.json(monthlyAvgEmotionalScores);
    }
  );
});

module.exports = router;
