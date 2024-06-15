// routes/goats.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM goats', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { house_no, weight, height, kids, vaccinations, disease, village_id } = req.body;
    const query = 'INSERT INTO goats (house_no, weight, height, kids, vaccinations, disease, village_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [house_no, weight, height, kids, vaccinations, disease, village_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: results.insertId, house_no, weight, height, kids, vaccinations, disease, village_id });
    });
});

module.exports = router;
