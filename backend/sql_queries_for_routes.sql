/* Thushika Thavarajah (27516126) */

--=======
-- USERS
--=======

--Register new user
INSERT INTO users (name, email, password, role)
VALUES (?, ?, ?, ?);

--Login - find user by email
SELECT * FROM users
WHERE email = ?;

--=========
-- COURSES
--=========

-- Get all courses for an instructor
SELECT * FROM courses 
WHERE instructor_name = ?;

-- Get all courses for a student
SELECT courses.* FROM courses
JOIN enrollment ON courses.course_code = enrollment.course_code
WHERE enrollment.student_id = ?;

--Add a new course (instructor)
INSERT INTO courses (course_code, title, term, instructor_name)
VALUES (?, ?, ?, ?);

--Edit a course
UPDATE courses
SET title = ?, term = ?,  instructor_name = ?
WHERE course_code = ?;

--Delete a course
DELETE FROM courses
WHERE course_code = ?;

--============
-- ENROLLMENT
--============

--Student joins a course
INSERT INTO enrollment (course_code, student_id)
VALUES (?, ?);

--Student drops a course
DELETE FROM enrollment
WHERE course_code = ? AND student_id = ?;

--Get all students in a course
SELECT users.* FROM users
JOIN enrollment ON users.id = enrollment.student_id
WHERE enrollment.course_code = ?;

--=============
-- ASSESSMENTS
--=============

--Get all assessments for a course
SELECT * FROM assessments
WHERE course_code = ?;

--Add a new assessment (instructor)
INSERT INTO assessments (course_code, assessment_title, category, due_date, weight, total_points)
VALUES (?, ?, ?, ?, ?, ?);

--Edit an assessment
UPDATE assessments
SET assessment_title = ?, category = ?, due_date = ?, weight = ?, total_points = ?
WHERE id = ?;

--Delete an assessment
DELETE FROM assessments
WHERE id = ?;

--GET upcomming assessments for a student
SELECT assessments.*, courses.title as course_title
FROM assessments
JOIN enrollment ON assessments.course_code = enrollment.course_code
WHERE enrollment.student_id = ?
AND assessments.due_date >= NOW()
ORDER BY assessments.due_date ASC;

--=========
-- GRADES
--=========

--GET all grades for a student

SELECT grades.*, assessments.assessment_title, assessments.weight
FROM grades
JOIN assessments ON grades.assessments_id = assessments.id
WHERE grades.student_id = ?;

--Student enter/updates a grade
INSERT INTO grades (assessments_id, student_id, status, earned_marks, total_marks)
VALUES (?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
earned_marks = VALUES(earned_marks),
total_marks = VALUES(total_marks),
status = VALUES(status);

--Mark assessment as completed/pending
UPDATE grades
SET status = ?
WHERE assessments_id = ? AND student_id = ?;

--==============
-- CALCULATIONS
--==============

--Calculate current grade for a student in a course
SELECT
    SUM(grades.earned_marks / grades.total_marks * assessments.weight) / SUM(assessments.weight) * 100
    AS current_grade
FROM grades
JOIN assessments ON grades.assessments_id = assessments.id
WHERE grades.student_id = ?
AND assessments.course_code = ?
AND grades.status = 'completed';

-- Calculate percentage completion for a student in a course
SELECT

    COUNT(CASE WHEN status = 'completed' THEN 1 END) * 100/COUNT(*)
    AS completion_percentage
FROM grades
JOIN assessments ON grades.assessments_id = assessments.id
WHERE grades.student_id = ?
AND assessments.course_code = ?;

--Class average for an assessment (instructor)
SELECT
    AVG(earned_marks / total_marks * 100) AS class_average,
    COUNT( CASE WHEN status = 'completed' THEN 1 END) AS completed_count,
    COUNT(*) AS total_students
FROM grades
WHERE assessments_id = ?;

    



