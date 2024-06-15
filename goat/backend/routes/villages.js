// routes/villages.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM villages', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { village_id, village_name } = req.body;
    db.query('INSERT INTO villages (village_id, village_name) VALUES (?, ?)', [village_id, village_name], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: results.insertId, village_id, village_name });
    });
});

module.exports = router;
