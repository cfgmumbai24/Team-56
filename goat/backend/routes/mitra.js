const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all mitra data
router.get('/', (req, res) => {
    db.query('SELECT * FROM mitra', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Get a specific mitra record by goat_id
router.get('/:goat_id', (req, res) => {
    const { goat_id } = req.params;
    db.query('SELECT * FROM mitra WHERE goat_id = ?', [goat_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Create a new mitra record
router.post('/', (req, res) => {
    const { goat_id, house_no, house_address, weight, height, Fkids, Mkids, vacA, vacB, vacC, disease, data_date, villagename } = req.body;
    const query = 'INSERT INTO mitra (goat_id, house_no, house_address, weight, height, Fkids, Mkids, vacA, vacB, vacC, disease, data_date, villagename) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [goat_id, house_no, house_address, weight, height, Fkids, Mkids, vacA, vacB, vacC, disease, data_date, villagename], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ goat_id, house_no, house_address, weight, height, Fkids, Mkids, vacA, vacB, vacC, disease, data_date, villagename });
    });
});

// Update a mitra record
// router.put('/:goat_id', (req, res) => {
//     const { goat_id } = req.params;
//     const { house_no, weight, height, Fkids, Mkids, vaccine, disease, data_date, villagename } = req.body;
//     const query = 'UPDATE mitra SET house_no = ?, weight = ?, height = ?, Fkids = ?, Mkids = ?, vaccine = ?, disease = ?, data_date = ?, villagename = ? WHERE goat_id = ?';
//     db.query(query, [house_no, weight, height, Fkids, Mkids, vaccine, disease, data_date, villagename, goat_id], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'Mitra record updated successfully.' });
//     });
// });

// Delete a mitra record
// router.delete('/:goat_id', (req, res) => {
//     const { goat_id } = req.params;
//     db.query('DELETE FROM mitra WHERE goat_id = ?', [goat_id], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'Mitra record deleted successfully.' });
//     });
// });

module.exports = router;
