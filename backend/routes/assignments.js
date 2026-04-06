const express = require('express');
const router = express.Router();
const db = require('../db');
const protect = require('../middleware/auth');

router.get('/upcoming', protect, async (req, res) => {
    const { id } = req.user;
    const sql = `SELECT assessments.*
                 FROM assessments
                 JOIN enrollment ON assessments.course_code = enrollment.course_code
                 WHERE enrollment.student_id = ?
                 AND assessments.due_date >= NOW()
                 ORDER BY assessments.due_date ASC`;
    const [rows] = await db.query(sql, [id]);
    res.status(200).json(rows);
});

router.get('/:course_code', protect, async (req, res) => {
    const { course_code } = req.params;
    const sql = 'SELECT * FROM assessments WHERE course_code = ?';
    const [rows] = await db.query(sql, [course_code]);
    res.status(200).json(rows);
});

router.post('/', protect, async (req, res) => {
    const { course_code, assessment_title, category, due_date, weight, total_points } = req.body;
    const sql = 'INSERT INTO assessments (course_code, assessment_title, category, due_date, weight, total_points) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(sql, [course_code, assessment_title, category, due_date, weight, total_points]);
    res.status(201).json({ message: 'Assignment created' });
});

module.exports = router;
