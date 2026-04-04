const express = require('express');
const router = express.Router();
const db = require('../db');
const protect = require('../middleware/auth');

// GET assignments for a course
router.get('/:course_code', protect, async (req, res) => {
    const { course_code } = req.params;
    const sql = 'SELECT * FROM assessments WHERE course_code = ?';
    const [rows] = await db.query(sql, [course_code]);
    res.status(200).json(rows);
});

// POST new assignment (instructor only)
router.post('/', protect, async (req, res) => {
    const { course_code, assessment_title, category, due_date, weight, total_points } = req.body;
    const sql = 'INSERT INTO assessments (course_code, assessment_title, category, due_date, weight, total_points) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(sql, [course_code, assessment_title, category, due_date, weight, total_points]);
    res.status(201).json({ message: 'Assignment created' });
});

module.exports = router;
