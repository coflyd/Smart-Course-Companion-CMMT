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

const authRoutes= require('./routes/auth'); 

const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);

//When the server receives a request, it reads the JSON contained within it
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => { //route (request, response)
    res.json({ message: 'Server is awake' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
