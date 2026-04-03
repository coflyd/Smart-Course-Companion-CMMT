-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2026 at 03:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `assessment_title` varchar(150) NOT NULL,
  `category` enum('assignment','lab','quiz','exam','project','homework','participation') NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `weight` decimal(5,2) NOT NULL,
  `total_points` decimal(5,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `course_code`, `assessment_title`, `category`, `due_date`, `weight`, `total_points`, `created_at`) VALUES
(1, 'COMP 352', 'Midterm Exam', 'exam', '2026-03-15 00:00:00', 20.00, 100.00, '2026-04-03 01:48:00'),
(2, 'COMP 352', 'Lab 1', 'lab', '2026-02-10 00:00:00', 10.00, 100.00, '2026-04-03 01:48:00'),
(3, 'COMP 352', 'Assignment 1', 'assignment', '2026-02-20 00:00:00', 15.00, 100.00, '2026-04-03 01:48:00'),
(4, 'STAT 280', 'Midterm Exam', 'exam', '2026-03-16 00:00:00', 20.00, 100.00, '2026-04-03 01:48:00'),
(5, 'STAT 280', 'Quiz 1', 'quiz', '2026-02-12 00:00:00', 10.00, 100.00, '2026-04-03 01:48:00'),
(6, 'STAT 280', 'Assignment 1', 'assignment', '2026-02-25 00:00:00', 15.00, 100.00, '2026-04-03 01:48:00'),
(7, 'COMP 228', 'Midterm Exam', 'exam', '2026-03-17 00:00:00', 20.00, 100.00, '2026-04-03 01:48:00'),
(8, 'COMP 228', 'Lab 1', 'lab', '2026-02-11 00:00:00', 10.00, 100.00, '2026-04-03 01:48:00'),
(9, 'COMP 228', 'Assignment 1', 'assignment', '2026-02-22 00:00:00', 15.00, 100.00, '2026-04-03 01:48:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `term` text NOT NULL,
  `instructor_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_code`, `title`, `term`, `instructor_name`) VALUES
(1, 'COMP 352', 'Data Structures and Algorithms', 'Winter 2026', 'Cat Catington'),
(2, 'STAT 280', 'Statistical Programming', 'Winter 2026', 'Cat Catington'),
(3, 'COMP 228', 'System Hardware', 'Winter 2026', 'Cat Catington');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `id` int(11) NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`id`, `course_code`, `student_id`) VALUES
(10, 'COMP 352', 2),
(11, 'COMP 352', 3),
(12, 'COMP 352', 4),
(13, 'STAT 280', 5),
(14, 'STAT 280', 6),
(15, 'STAT 280', 7),
(16, 'COMP 228', 8),
(17, 'COMP 228', 9),
(18, 'COMP 228', 10);

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `assessments_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `earned_marks` decimal(5,2) NOT NULL,
  `total_marks` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `assessments_id`, `student_id`, `status`, `earned_marks`, `total_marks`) VALUES
(1, 1, 2, 'completed', 85.00, 100.00),
(2, 2, 2, 'completed', 90.00, 100.00),
(3, 3, 2, 'pending', 0.00, 100.00),
(4, 1, 3, 'completed', 78.00, 100.00),
(5, 2, 3, 'completed', 88.00, 100.00),
(6, 3, 3, 'completed', 92.00, 100.00),
(7, 1, 4, 'completed', 95.00, 100.00),
(8, 2, 4, 'pending', 0.00, 100.00),
(9, 3, 4, 'completed', 80.00, 100.00),
(10, 4, 5, 'completed', 72.00, 100.00),
(11, 5, 5, 'completed', 88.00, 100.00),
(12, 6, 5, 'pending', 0.00, 100.00),
(13, 4, 6, 'completed', 91.00, 100.00),
(14, 5, 6, 'completed', 85.00, 100.00),
(15, 6, 6, 'completed', 79.00, 100.00),
(16, 4, 7, 'completed', 83.00, 100.00),
(17, 5, 7, 'pending', 0.00, 100.00),
(18, 6, 7, 'completed', 87.00, 100.00),
(19, 7, 8, 'completed', 88.00, 100.00),
(20, 8, 8, 'completed', 92.00, 100.00),
(21, 9, 8, 'pending', 0.00, 100.00),
(22, 7, 9, 'completed', 76.00, 100.00),
(23, 8, 9, 'completed', 84.00, 100.00),
(24, 9, 9, 'completed', 91.00, 100.00),
(25, 7, 10, 'completed', 94.00, 100.00),
(26, 8, 10, 'completed', 88.00, 100.00),
(27, 9, 10, 'pending', 0.00, 100.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','instructor') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Cat Catington', 'meow@test.com', '1234', 'instructor', '2026-04-03 01:48:00'),
(2, 'Dog Dosky', 'woof@test.com', '1234', 'student', '2026-04-03 01:48:00'),
(3, 'Chicken Chikinian', 'cluck@test.com', '1234', 'student', '2026-04-03 01:48:00'),
(4, 'Emma Marshall', 'emma@test.com', '1234', 'student', '2026-04-03 01:48:00'),
(5, 'Bruce Wayne', 'iambatman@test.com', '1234', 'student', '2026-04-03 01:48:00'),
(6, 'Spider Man', 'peterwho@test.com', '1234', 'student', '2026-04-03 01:48:00'),
(7, 'Bla Bla', 'blabla@test.com', '1234', 'student', '2026-04-03 01:48:00'),
(8, 'Ranoutta Ideas', 'idkman@test.com', '1234', 'student', '2026-04-03 01:48:00'),
(9, 'King Kong', 'gorrila@test.com', '1234', 'student', '2026-04-03 01:48:00'),
(10, 'Snow White', 'poisonapple@test.com', '1234', 'student', '2026-04-03 01:48:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
