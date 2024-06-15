
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all doctors
router.get('/', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Get a specific student by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM students WHERE student_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Create a new student
router.post('/', (req, res) => {
    const { serialno, student_id, name, teacher_id, data_date } = req.body;
    const query = 'INSERT INTO students (serialno,student_id, name, teacher_id, data_date) VALUES (?, ?, ?,?,?)';
    // serialno,student_id, name, teacher_id, data_date
    db.query(query, [serialno, student_id, name, teacher_id, data_date], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: results.insertId, serialno, student_id, name, teacher_id, data_date });
    });
});



// Delete a doctor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE serialno = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Student deleted successfully.' });
    });
});

module.exports = router;
