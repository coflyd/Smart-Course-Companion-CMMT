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

router.post('/', protect, async (req, res) => {
    const { course_code, title, term, instructor_name } = req.body;
    if (!course_code || !title || !term || !instructor_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO courses (course_code, title, term, instructor_name) VALUES (?, ?, ?, ?)';
    await db.query(sql, [course_code, title, term, instructor_name]);
    res.status(201).json({ message: 'Course created' });
});

router.post('/enroll', protect, async (req, res) => {
    const { course_code, title, instructor_name, term } = req.body;
    const { id } = req.user;
    
    // Create the class if it doesn't exist
    await db.query(
        'INSERT IGNORE INTO courses (course_code, title, term, instructor_name) VALUES (?, ?, ?, ?)',
        [course_code, title, term, instructor_name]
    );
    
    // Enrollement of the student
    await db.query(
        'INSERT IGNORE INTO enrollment (course_code, student_id) VALUES (?, ?)',
        [course_code, id]
    );
    
    res.status(201).json({ message: 'Enrolled successfully' });
});

// DELETE enrollment
router.delete('/enroll/:course_code', protect, async (req, res) => {
    const { course_code } = req.params;
    const { id } = req.user;
    await db.query('DELETE FROM enrollment WHERE course_code = ? AND student_id = ?', [course_code, id]);
    res.status(200).json({ message: 'Course removed' });
});

// PUT edit course
router.put('/:course_code', protect, async (req, res) => {
    const { course_code } = req.params;
    const { title, instructor_name, term } = req.body;
    await db.query(
        'UPDATE courses SET title = ?, instructor_name = ?, term = ? WHERE course_code = ?',
        [title, instructor_name, term, course_code]
    );
    res.status(200).json({ message: 'Course updated' });
});

module.exports = router;
