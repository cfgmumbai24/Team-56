
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

router.get('/:house_no', (req, res) => {
    const { house_no } = req.params;
    db.query('SELECT * FROM goats WHERE house_no = ?', [house_no], (err, results) => {
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


router.put('/:house_no', (req, res) => {
    const { house_no } = req.params;
    const { weight, height, kids, vaccinations, disease, village_id } = req.body;
    const query = 'UPDATE goats SET weight = ?, height = ?, kids = ?, vaccinations = ?, disease = ?, village_id = ? WHERE house_no = ?';
    db.query(query, [weight, height, kids, vaccinations, disease, village_id, house_no], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Goat updated successfully.' });
    });
});

router.delete('/:house_no', (req, res) => {
    const { house_no } = req.params;
    db.query('DELETE FROM goats WHERE house_no = ?', [house_no], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Goat deleted successfully.' });
    });
});

module.exports = router;

