/*
SMART COURSE COMPANION — server.js
Auteur : Constance Fleury - 40348933
Description : Creation of the server : Port 3000 → serveur Node.js
*/
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const db = require('./db');

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const assignmentRoutes = require('./routes/assignments');
const gradesRoutes = require('./routes/grades');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/grades', gradesRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Server is awake' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
