/*
SMART COURSE COMPANION — routes/auth.js
Auteur : Constance Fleury - 40348933
Description: link at the Regiter/Login - check
*/
const express = require('express'); 
const router = express.Router(); 
const bcrypt= require('bcrypt'); 
const db = require('../db'); 

const jwt = require('jsonwebtoken');

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

router.post('/login', async (req, res) => {
    const { email, password } = req.body; 

    if (!email || !password){
        return res.status(400).json({ error : 'All fields are required' })
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(sql, [email]);
    const user = rows[0]; 

    if(!user){
         return res.status(400).json({ error : 'User not found' })
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Wrong password' });
    }
    const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '5h' }
    );
    res.status(200).json({ token, role: user.role });
});

module.exports = router;
