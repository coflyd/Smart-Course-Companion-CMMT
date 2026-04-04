/*
SMART COURSE COMPANION — server.js
Auteur : Constance Fleury - 40348933
Description : Creation of the server  : Port 3000 → serveur Node.js
*/

const express = require('express'); // import the librairy Express
const app = express(); // application serveur
const PORT = 3000; //port
const db = require('./db');

const cors = require('cors');
app.use(cors());

//When the server receives a request, it reads the JSON contained within it
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
