// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const villageRoutes = require('./routes/villages');
const goatRoutes = require('./routes/goats');
const doctorRoutes = require('./routes/halfdoctor');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/villages', villageRoutes);
app.use('/api/goats', goatRoutes);
app.use('/api/halfdoctor', doctorRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
