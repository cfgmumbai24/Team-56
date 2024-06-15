require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dirRoutes = require('./routes/dir');
const goatRoutes = require('./routes/goats');
const mitraRoutes = require('./routes/mitra');
const halfdoctorRoutes = require('./routes/halfdoctor');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/dir', dirRoutes);
app.use('/api/goats', goatRoutes);
app.use('/api/mitra', mitraRoutes);
app.use('/api/halfdoctor', halfdoctorRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
