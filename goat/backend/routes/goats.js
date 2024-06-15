const express = require('express');
const router = express.Router();
const db = require('../db');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Get all goats
router.get('/', (req, res) => {
    db.query('SELECT * FROM goats', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Get a specific goat by id
router.get('/goat-details/:goat_id', (req, res) => {
    const { goat_id } = req.params;
    db.query('SELECT * FROM goats WHERE goat_id = ?', [goat_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/goat-address-details/:goat_id', (req, res) => {
    const { goat_id } = req.params;
    db.query('SELECT house_address FROM goats WHERE goat_id = ?', [goat_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Create a new goat
// Create a new goat
router.post('/', (req, res) => {
    const { goat_id, dob, house_no, house_address } = req.body;
    const query = 'INSERT INTO goats (goat_id, dob, house_no, house_address) VALUES (?, ?, ?, ?)';
    db.query(query, [goat_id, dob, house_no, house_address], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ goat_id, dob, house_no, house_address });
    });
});

// // Update a goat
// router.put('/:goat_id', (req, res) => {
//     const { goat_id } = req.params;
//     const { dob, house_no } = req.body;
//     db.query('UPDATE goats SET dob = ?, house_no = ? WHERE goat_id = ?', [dob, house_no, goat_id], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'Goat updated successfully.' });
//     });
// });

// Delete a goat
// router.delete('/:goat_id', (req, res) => {
//     const { goat_id } = req.params;
//     db.query('DELETE FROM goats WHERE goat_id = ?', [goat_id], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'Goat deleted successfully.' });
//     });
// });

// Classify goat
router.get('/classify/:goat_id', async (req, res) => {
    const { goat_id } = req.params;

    db.query('SELECT * FROM mitra WHERE goat_id = ?', [goat_id], async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'Goat data not found' });
        }

        const goat = results[0];
        const prompt = `Act as a veterinarian and prepare a report.Classify the following goat as healthy or unhealthy based on the data: 
        Weight: ${goat.weight}, 
        Height: ${goat.height}, 
        Fkids: ${goat.Fkids}, 
        Mkids: ${goat.Mkids}, 
        VaccineA: ${goat.vacA ? 'Yes' : 'No'}, 
        VaccineB: ${goat.vacB ? 'Yes' : 'No'},
        VaccineC: ${goat.vacC ? 'Yes' : 'No'},
        Disease: ${goat.disease ? 'Yes' : 'No'}`;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            res.json({ classification: text });
        } catch (error) {
            console.error('Error generating content:', error);
            res.status(500).send({ message: 'Error classifying goat' });
        }
    });
});


// Route to get count of allocated and unallocated goats
router.get('/allocation-status', (req, res) => {
    const queryAllocated = 'SELECT COUNT(*) AS allocated FROM goats WHERE house_no IS NOT NULL';
    const queryUnallocated = 'SELECT COUNT(*) AS unallocated FROM goats WHERE house_no IS NULL';

    // Execute first query
    db.query(queryAllocated, (err, allocatedResults) => {
        if (err) {
            console.error('Error executing queryAllocated:', err);
            return res.status(500).send(err);
        }

        // Execute second query
        db.query(queryUnallocated, (err, unallocatedResults) => {
            if (err) {
                console.error('Error executing queryUnallocated:', err);
                return res.status(500).send(err);
            }

            const allocated = allocatedResults[0].allocated;
            const unallocated = unallocatedResults[0].unallocated;
            res.json({ allocated, unallocated });
        });
    });
});

module.exports = router;


module.exports = router;