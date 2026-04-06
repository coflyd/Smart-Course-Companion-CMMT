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

// GET course stats for instructor (Overview)
router.get('/course-stats/:course_code', protect, async (req, res) => {
    const { course_code } = req.params;
    
    const [enrolled] = await db.query(
        'SELECT COUNT(*) as count FROM enrollment WHERE course_code = ?',
        [course_code]
    );
    
    const [avgResult] = await db.query(`
        SELECT AVG(earned_marks / total_marks * 100) as class_average
        FROM grades
        JOIN assessments ON grades.assessments_id = assessments.id
        WHERE assessments.course_code = ? AND grades.status = 'completed'
    `, [course_code]);

    const [assessments] = await db.query(`
        SELECT assessments.id, assessments.assessment_title,
               COUNT(CASE WHEN grades.status = 'completed' THEN 1 END) as completed_count,
               COUNT(grades.id) as total_count
        FROM assessments
        LEFT JOIN grades ON assessments.id = grades.assessments_id
        WHERE assessments.course_code = ?
        GROUP BY assessments.id, assessments.assessment_title
    `, [course_code]);

    res.status(200).json({
        enrolled: enrolled[0].count,
        class_average: avgResult[0].class_average ? Math.round(avgResult[0].class_average) : 0,
        assessments
    });
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
