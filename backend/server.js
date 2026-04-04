/*
SMART COURSE COMPANION — server.js
Auteur : Constance Fleury - 40348933
Description : Creation of the server  : Port 3000 → serveur Node.js
*/

//added later in the dev 
const db = require('./db');

const express = require('express'); // import the librairy Express
const app = express(); // application serveur
PORT = 3000; //port

//When the server receives a request, it reads the JSON contained within it
app.use(express.json());

const authRoutes= require('./routes/auth'); 
app.use('/api/auth', authRoutes);

//Courses
const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);

//Assignment
const assignmentRoutes = require('./routes/assignments');
app.use('/api/assignments', assignmentRoutes);

//Grades
const gradesRoutes = require('./routes/grades');
app.use('/api/grades', gradesRoutes);


app.get('/', (req, res) => { //route (request, response)
    res.json({ message: 'Server is awake' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
