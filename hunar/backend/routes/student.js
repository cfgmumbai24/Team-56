const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all doctors
router.get("/", (req, res) => {
  db.query("SELECT * FROM student", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Get a specific student by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM student WHERE student_id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
});

// Create a new student
router.post("/", (req, res) => {
  const { roll_no, standard, student_name } = req.body;
  const query =
    "INSERT INTO student (roll_no,standard,student_name) VALUES (?, ?, ?)";
  // serialno,student_id, name, teacher_id, data_date
  db.query(query, [roll_no, standard, student_name], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      id: results.insertId,
      roll_no,
      standard,
      student_name,
    });
  });
});

// Delete a student
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM student WHERE student_id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: "Student deleted successfully." });
  });
});

module.exports = router;
