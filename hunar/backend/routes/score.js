const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM scores", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { score_id } = req.params;
  // serialno, score_id, student_id, score_date, numeracy_score, literacy_score, socio_economic_score
  db.query(
    "SELECT * FROM scores WHERE score_id = ?",
    [score_id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    }
  );
});

router.post("/", (req, res) => {
  const {
    student_id,
    teacher_id,
    date_of_assign,
    literacy_score,
    numeracy_score,
    socio_emotional_score,
  } = req.body;
  db.query(
    "INSERT INTO scores (student_id,teacher_id,date_of_assign,literacy_score,numeracy_score,socio_emotional_score) VALUES (?, ?,?,?,?,?)",
    [
      student_id,
      teacher_id,
      date_of_assign,
      literacy_score,
      numeracy_score,
      socio_emotional_score,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        id: results.insertId,
        student_id,
        teacher_id,
        date_of_assign,
        literacy_score,
        numeracy_score,
        socio_emotional_score,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM scores WHERE score_id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: "Score deleted successfully." });
  });
});

module.exports = router;
