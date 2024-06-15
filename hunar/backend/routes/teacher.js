const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM teacher_data", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "select * from teacher_data where teacher_id=?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results[0]);
    }
  );
});

// select * from Teachers where teacher_id=1;

// teacher_id, password, name, class

router.post("/", (req, res) => {
  const { teacher_id, username, teacher_name, address, age, standard } =
    req.body;
  if (!teacher_id || !password || !name || !teacher_class) {
    return res.status(400).json({
      error:
        "All fields (teacher_id,username,teacher_name,address,age, standard) are required",
    });
  }

  // Insert into the database
  const query =
    "INSERT INTO teacher_data (teacher_id,username,teacher_name,address,age, standard) VALUES (?, ?, ?, ?,?,? )";
  db.query(
    query,
    [teacher_id, username, teacher_name, address, age, standard],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ error: "Failed to insert teacher into database" });
      }
      res.status(201).json({
        id: results.insertId,
        teacher_id,
        username,
        teacher_name,
        address,
        age,
        standard,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM teacher_data WHERE teacher_id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: "Teacher deleted successfully." });
    }
  );
});

module.exports = router;
