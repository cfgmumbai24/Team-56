const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all student data from the last 3 months
router.get("/", (req, res) => {
  // Calculate date 3 months ago from today
  const today = new Date();
  const threeMonthsAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 3,
    today.getDate()
  );

  // Format three months ago date as YYYY-MM-DD
  const formattedDate = threeMonthsAgo.toISOString().split("T")[0];

  // Select students and their scores from the past 3 months
  const query = `
        SELECT 
            s.student_id, 
            s.roll_no, 
            s.standard, 
            s.student_name,
            sc.score_id, 
            sc.date_of_assign, 
            sc.literacy_score, 
            sc.numeracy_score, 
            sc.socio_emotional_score
        FROM 
            student s
        JOIN 
            scores sc ON s.student_id = sc.student_id
        WHERE 
            sc.date_of_assign >= ?;
    `;
  db.query(query, [formattedDate], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
