-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 28, 2022 at 04:51 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_mumicu`
--

-- --------------------------------------------------------

--
-- Table structure for table `absensi`
--

CREATE TABLE `absensi` (
  `id` int(11) NOT NULL,
  `username` varchar(99) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `status` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `username` varchar(99) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `auth_level` int(11) NOT NULL DEFAULT 3,
  `gender` varchar(11) DEFAULT NULL,
  `status` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `username`, `phone_number`, `password`, `refresh_token`, `auth_level`, `gender`, `status`) VALUES
(1, 'Candra Sidik Dermawan', 'candrasdk', '085156775933', '$2b$10$v1PYzWGluNHvEp67ILvJSeqjK/a.tb2jlBKz2L4VwRwlvWKA004Vu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJDYW5kcmEgU2lkaWsgRGVybWF3YW4iLCJ1c2VyTmFtZSI6ImNhbmRyYXNkayIsImF1dGhMZXZlbCI6MiwiaWF0IjoxNjU4ODM1NDAxLCJleHAiOjE2OTAzNzE0MDF9.vHey67G_K_D-oazLZ_9BptE8Y76nTGhZu1DU_NeyYsQ', 2, 'Laki-Laki', 'Usia Nikah'),
(2, 'Super Admin', 'superadmin', '777777777777', '$2b$10$KyyfevzQNI.Ibm.97QrkR.hxKx1yo3e7HA/opSTjYqkFT9bCX711C', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZnVsbE5hbWUiOiJTdXBlciBBZG1pbiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImF1dGhMZXZlbCI6MywiaWF0IjoxNjU4MjAwMjk2LCJleHAiOjE2ODk3MzYyOTZ9.gBMQxweDk4XKed7X4_HqXbJXJOQHHag5yNGhGvA48ig', 1, 'Undefined', 'Undefined'),
(3, 'Anindia Putri', 'anindiaaputri', '081296665775', '$2b$10$YFPZZlGNzpHl79wnrY.yNuLaqV0HZ7jZANhmh4BZ0ouzNeWxf4WV2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZnVsbE5hbWUiOiJBbmluZGlhIFB1dHJpIiwidXNlck5hbWUiOiJhbmluZGlhYXB1dHJpIiwiYXV0aExldmVsIjozLCJpYXQiOjE2NTgyMzc1ODIsImV4cCI6MTY4OTc3MzU4Mn0.RgJVl65PajQTRP7-eDbVq7kUd1Nvc5h2Hmt8Fvipx8E', 3, 'Perempuan', 'Usia Nikah'),
(4, 'Irfan Wibowo', 'irfan_wibowo', '085788899901', '$2b$10$Tvo5vNpfR60Bo0kUj.P6POmdyhsk4Emmh4F8sRQEAI.v3a7qQOLTy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZnVsbE5hbWUiOiJJcmZhbiBXaWJvd28iLCJ1c2VyTmFtZSI6ImlyZmFuX3dpYm93byIsImF1dGhMZXZlbCI6MywiaWF0IjoxNjU4MjM3NjUyLCJleHAiOjE2ODk3NzM2NTJ9.AkebbwlCWSXFmMepIauT5o2iCq5-SlbsC06IXpftv2Y', 3, 'Laki-Laki', 'Usia Nikah'),
(5, 'Titik Anggraeni', 'tkanggrni', '089663173741', '$2b$10$p.J4rWIH9/.J1mnArJVYdu5Do2/dZbH.SJU9HS1vhE3V0jeKC2SQq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZnVsbE5hbWUiOiJUaXRpayBBbmdncmFlbmkiLCJ1c2VyTmFtZSI6InRrYW5nZ3JuaSIsImF1dGhMZXZlbCI6MywiaWF0IjoxNjU4MjM3NzgyLCJleHAiOjE2ODk3NzM3ODJ9.kGCzVEX6uIqMeO8Q93VE0NcM1GQBYipYJX7k9Osqkfo', 3, 'Perempuan', 'Usia Nikah'),
(6, 'Damar Gita Lestari', 'damargita', '082312076994', '$2b$10$m0lJ8oR7p1W0qlk1byGa1unbnYxl/7AaSgMjC.QKbPwtGdzIDju5m', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZnVsbE5hbWUiOiJEYW1hciBHaXRhIExlc3RhcmkiLCJ1c2VyTmFtZSI6ImRhbWFyZ2l0YSIsImF1dGhMZXZlbCI6MywiaWF0IjoxNjU4ODE0NjY3LCJleHAiOjE2OTAzNTA2Njd9.5dhnPrD4EXZq2JeyKhvaMyZ2EojRyY2xM69duBuOl9s', 3, 'Perempuan', 'Usia Nikah'),
(7, 'Damar Gilang', 'damargilang._', '085156891363', '$2b$10$83T4Cqh6/C1aPEE8yfwNcOQtIwoeA8omr8BmnURWcUUiJhT0QFMC6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZnVsbE5hbWUiOiJEYW1hciBHaWxhbmciLCJ1c2VyTmFtZSI6ImRhbWFyZ2lsYW5nLl8iLCJhdXRoTGV2ZWwiOjMsImlhdCI6MTY1ODgxMzUxMSwiZXhwIjoxNjkwMzQ5NTExfQ.CnhiP6dmVxSUdkeNfqkrX5V-D---MYdvE2ya61MU1K8', 3, 'Laki-Laki', 'Usia Nikah'),
(8, 'Ma\'arif Zayana Ilham', 'zayn_ilhm', '081381599332', '$2b$10$7UkwBcxiFLWiwSMf1bjw2OLBT8En3Nh0t9ipnOQe5MILYYA.pKSgC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZnVsbE5hbWUiOiJNYSdhcmlmIFpheWFuYSBJbGhhbSIsInVzZXJOYW1lIjoiemF5bl9pbGhtIiwiYXV0aExldmVsIjozLCJpYXQiOjE2NTg4MTM2NzUsImV4cCI6MTY5MDM0OTY3NX0.HcUKKVTpBF2Mx-Q0696Zc0Abs_C4jjrB9aI1xqUfF4c', 3, 'Laki-Laki', 'Usia Nikah');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absensi`
--
ALTER TABLE `absensi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
