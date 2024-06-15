const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all halfdoctors
router.get('/', (req, res) => {
    db.query('SELECT * FROM halfdoctor', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Get a specific halfdoctor by villagename
router.get('/:villagename', (req, res) => {
    const { villagename } = req.params;
    db.query('SELECT * FROM halfdoctor WHERE villagename = ?', [villagename], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Create a new halfdoctor
router.post('/', (req, res) => {
    const { name, password, email, villagename } = req.body;
    const query = 'INSERT INTO halfdoctor (name, password, email, villagename) VALUES (?, ?, ?, ?)';
    db.query(query, [name, password, email, villagename], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ name, password, email, villagename });
    });
});

// Update a halfdoctor
// router.put('/:villagename', (req, res) => {
//     const { villagename } = req.params;
//     const { id, name, password, email } = req.body;
//     const query = 'UPDATE halfdoctor SET id = ?, name = ?, password = ?, email = ? WHERE villagename = ?';
//     db.query(query, [id, name, password, email, villagename], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'Halfdoctor updated successfully.' });
//     });
// });

// Delete a halfdoctor
// router.delete('/:villagename', (req, res) => {
//     const { villagename } = req.params;
//     db.query('DELETE FROM halfdoctor WHERE villagename = ?', [villagename], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'Halfdoctor deleted successfully.' });
//     });
// });

module.exports = router;
