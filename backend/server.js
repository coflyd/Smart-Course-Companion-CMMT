const db = require('./db');

const express = require('express'); // importes la librairie Express
const app = express(); //crées ton application serveur
PORT = 3000; //port

//le serveur quand reçois une requête, lis le JSON dedans
app.use(express.json());

app.get('/', (req, res) => { //route (request, response)
    res.json({ message: 'Server is awake' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});