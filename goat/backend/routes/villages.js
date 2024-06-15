
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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM villages WHERE village_id = ?', [id], (err, results) => {
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { village_name } = req.body;
    db.query('UPDATE villages SET village_name = ? WHERE village_id = ?', [village_name, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Village updated successfully.' });
    });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM villages WHERE village_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Village deleted successfully.' });
    });
});

module.exports = router;
