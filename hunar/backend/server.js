const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "urjahunar",
});

// Check database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM teachers WHERE name = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: 'An error occurred while logging in.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

// API endpoint for signup
app.post('/api/signup', (req, res) => {
  const { username, password, grade } = req.body;

  // Check if the user already exists
  const query = 'SELECT * FROM teachers WHERE name = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: 'An error occurred while signing up.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert the new user into the database
    const insertQuery = 'INSERT INTO teachers (name, password, class) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, password, grade], (err, results) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: 'An error occurred while signing up.' });
      }

      const token = jwt.sign({ id: results.insertId, username }, SECRET_KEY, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered successfully', token });
    });
  });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

// Example protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route.', userId: req.userId });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
