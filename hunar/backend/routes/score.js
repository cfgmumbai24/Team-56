
const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
    db.query('SELECT * FROM scores', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { score_id } = req.params;
    // serialno, score_id, student_id, score_date, numeracy_score, literacy_score, socio_economic_score
    db.query('SELECT * FROM scores WHERE score_id = ?', [score_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { serialno, score_id, student_id, score_date, numeracy_score, literacy_score, socio_economic_score } = req.body;
    db.query('INSERT INTO scores (serialno, score_id, student_id, score_date, numeracy_score, literacy_score, socio_economic_score) VALUES (?, ?,?,?,?,?,?)', [serialno, score_id, student_id, score_date, numeracy_score, literacy_score, socio_economic_score], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: results.insertId, serialno, score_id, student_id, score_date, numeracy_score, literacy_score, socio_economic_score });
    });
});

// router.put('/:score_id', (req, res) => {
//     const { score_id } = req.params;
//     db.query('UPDATE villages SET village_name = ? WHERE score_id = ?', [village_name, score_id], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'Village updated successfully.' });
//     });
// });


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM scores WHERE score_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Score deleted successfully.' });
    });
});

module.exports = router;
