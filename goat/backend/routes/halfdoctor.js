// routes/halfdoctor.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM halfdoctor', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { doctor_id, doctor_name, village_id } = req.body;
    const query = 'INSERT INTO halfdoctor (doctor_id, doctor_name, village_id) VALUES (?, ?, ?)';
    db.query(query, [doctor_id, doctor_name, village_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: results.insertId, doctor_id, doctor_name, village_id });
    });
});

module.exports = router;
