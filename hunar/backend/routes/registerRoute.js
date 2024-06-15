const express = require("express");
const router = express.Router();
const db = require("../db");

// login route
router.get("/", (req, res) => {
  const { username, password, grade } = req.body;

  // Check if the user already exists
  const query = "SELECT * FROM teachers WHERE name = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while signing up." });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Insert the new user into the database
    const insertQuery =
      "INSERT INTO teachers (name, password, class) VALUES (?, ?, ?)";
    db.query(insertQuery, [username, password, grade], (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res
          .status(500)
          .json({ message: "An error occurred while signing up." });
      }

      const token = jwt.sign({ id: results.insertId, username }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User registered successfully", token });
    });
  });
});

module.exports = router;
