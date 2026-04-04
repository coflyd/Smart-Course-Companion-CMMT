const express = require('express');
const router = express.Router();
const db = require('../db');
const protect = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
    const { id, role } = req.user;
    
    let sql;
    let params;
    
    if (role === 'instructor') {
        sql = 'SELECT * FROM courses WHERE instructor_name = (SELECT name FROM users WHERE id = ?)';
        params = [id];
    } else {
        sql = 'SELECT courses.* FROM courses JOIN enrollment ON courses.course_code = enrollment.course_code WHERE enrollment.student_id = ?';
        params = [id];
    }
    
    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
});

module.exports = router;