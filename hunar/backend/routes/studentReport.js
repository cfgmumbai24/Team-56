const express = require('express');
const router = express.Router();
const db = require('../db');

// Get student by id with data from the last 3 months
router.get('/:id', (req, res) => {
    const { id } = req.params;

    // Calculate date 3 months ago from today
    const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());

    // Format three months ago date as YYYY-MM-DD
    const formattedDate = threeMonthsAgo.toISOString().split('T')[0];

    // Select student based on student_id and data_date within the last 3 months
    const query = 'SELECT * FROM Students WHERE student_id = ? AND data_date >= ?';
    db.query(query, [id, formattedDate], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

module.exports = router;
