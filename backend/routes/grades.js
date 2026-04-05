/*
SMART COURSE COMPANION — routes/grades.js
Auteur : Constance Fleury - 40348933
*/
const express = require('express');
const router = express.Router();
const db = require('../db');
const protect = require('../middleware/auth');

// GET grades for a student
router.get('/student/:student_id', protect, async (req, res) => {
    const { student_id } = req.params;
    const sql = `SELECT grades.*, assessments.assessment_title, assessments.weight 
                   FROM grades 
                      JOIN assessments ON grades.assessments_id = assessments.id 
                         WHERE grades.student_id = ?`;
    const [rows] = await db.query(sql, [student_id]);
    res.status(200).json(rows);
});

//Get the grades of the student by Id in URL
router.get('/me', protect, async (req, res) => {
    const { id } = req.user;
    const sql = `SELECT grades.*, assessments.assessment_title, assessments.weight, assessments.course_code
                 FROM grades 
                 JOIN assessments ON grades.assessments_id = assessments.id 
                 WHERE grades.student_id = ?`;
    const [rows] = await db.query(sql, [id]);
    res.status(200).json(rows);
});

// POST grades (instructor)
router.post('/', protect, async (req, res) => {
    const { assessments_id, status, earned_marks, total_marks } = req.body;
    const { id } = req.user;
    const sql = `INSERT INTO grades (assessments_id, student_id, status, earned_marks, total_marks) 
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 earned_marks = VALUES(earned_marks),
                 total_marks = VALUES(total_marks),
                 status = VALUES(status)`;
    await db.query(sql, [assessments_id, id, status, earned_marks, total_marks]);
    res.status(201).json({ message: 'Grade saved' });
});

module.exports = router;
