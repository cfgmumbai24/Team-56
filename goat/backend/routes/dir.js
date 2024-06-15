const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM dir', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Create a new user
router.post('/', (req, res) => {
    const { username, password, role } = req.body;
    db.query('INSERT INTO dir (username, password,role) VALUES (?, ?, ?)', [username, password, role], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ username, password, role });
    });
});

// Update a user
// router.put('/:username', (req, res) => {
//     const { username } = req.params;
//     const { password } = req.body;
//     db.query('UPDATE dir SET password = ? WHERE username = ?', [password, username], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'User updated successfully.' });
//     });
// });

// // Delete a user
// router.delete('/:username', (req, res) => {
//     const { username } = req.params;
//     db.query('DELETE FROM dir WHERE username = ?', [username], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'User deleted successfully.' });
//     });
// });

module.exports = router;
