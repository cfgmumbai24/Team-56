
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all doctors
router.get('/', (req, res) => {
    db.query('SELECT * FROM halfdoctor', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Get a specific doctor by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM halfdoctor WHERE doctor_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Create a new doctor
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

// Update a doctor
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { doctor_name, village_id } = req.body;
    const query = 'UPDATE halfdoctor SET doctor_name = ?, village_id = ? WHERE doctor_id = ?';
    db.query(query, [doctor_name, village_id, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Doctor updated successfully.' });
    });
});

// Delete a doctor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM halfdoctor WHERE doctor_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Doctor deleted successfully.' });
    });
});

module.exports = router;
