const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "IWANTTOWIN";
// login route
router.post("/", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM user_login WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while logging in." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    console.log(results);
    const user = results[0];
    const token = jwt.sign({ id: user.id, username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  });
});

module.exports = router;
