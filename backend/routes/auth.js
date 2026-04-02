const express = require('express'); 
const router = express.Router(); 
const bcrypt= require('bcrypt'); 
const db = require('../db'); 

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body; 

    if (!name || !email || !password || !role ){
        return res.status(400).json({ error : 'All fields are required' })
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    await db.query(sql, [name, email, hashedPassword, role]);
    res.status(201).json({ message: 'User created successfully' });

});

module.exports = router;