-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 31, 2023 at 11:19 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reservo`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL,
  `account_name` varchar(60) NOT NULL,
  `email_address` varchar(128) NOT NULL,
  `account_type` int(2) NOT NULL DEFAULT 1,
  `account_status` enum('active','abolished') NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `date_signedup` datetime DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_name`, `email_address`, `account_type`, `account_status`, `passwd`, `contact_number`, `profile_picture`, `date_signedup`, `last_login`) VALUES
(1, 'Kathea Mari', 'kath@abc.com', 1, 'active', '$2b$10$/CgUHtvttyHLJ.7H8ipTsOLn8kFYSco4y0do7YHt0ODhxO68ZVr3S', '09551957593', 'https://i.imgur.com/zb1h8kj.jpg', '2023-10-10 10:10:07', '2023-10-31 17:34:38'),
(2, 'Zoro Ror', 'zoro@abc.com', 10, 'active', '$2a$12$aE46NqPsGf721SSnEWt/Helz3hZb82cnDO6X2oygMALeChrLelEsm', '09486526630', NULL, '2023-10-10 10:10:07', '2023-10-26 04:05:50'),
(3, 'PwenzWafow', 'pwinz@gmail.com', 10, 'active', '$2b$10$nFpIXKKEyDlX8Zzr/J6VCO9sgdRZHr.twcNaZMHkCSpAuDJMAlJIG', '09184920392', NULL, '2023-10-10 10:10:07', NULL),
(4, 'teste', 'test@abc.com', 1, 'active', '$2b$10$woTWU2Ssp9093XpKhUCujuCquhoZtJmBjAoV0bJYJYDKqFcIGstrm', '091231923090', NULL, '2023-10-10 10:10:07', NULL),
(8, 'Wawawow', 'waw@gmail.com', 10, 'active', '$2b$10$FDUiV57cDCwckqU1Dudk5.i7Kavt4sZ3LnZqyXYsbFSQkBxcizAyW', '09184920392', NULL, '2023-10-10 10:10:07', NULL),
(9, 'Wewew', 'ewe@gmail.com', 10, 'active', '$2b$10$ll6Ml.Ymam4xTP1N/q9CYeFT.GpyVeFiS/t8EF9F2izxkHfU1qJI6', '09184920392', NULL, '2023-10-10 10:10:07', NULL),
(26, 'Kathea Mari', 'katheamari@gmail.com', 10, 'active', '$2b$10$2wDQDZB08c8qIXYngtCtuu6XLcQa7o1MgMQmb4SUB4quXazs/Mbru', '09551957592', NULL, '2023-10-10 10:10:07', '2023-10-31 17:31:43'),
(27, 'Kathea Mari', 'mike@abc.com', 10, 'active', '$2b$10$Zo.FxMnq93tkeJvNLiZSSeG9cXWLyGZ9PUyNkYHKGZS5UhQNBTVk6', '09551957592', NULL, '2023-10-10 10:10:07', '2023-10-11 23:05:03'),
(28, 'Kiddim', 'kidd@abc.com', 10, 'active', '$2b$10$1/RHiAm8iAndqWbGOyN6.e48vt5enUH7w2MXo4cm4rbUFolEThyhe', '09551957592', NULL, '2023-10-10 10:10:07', NULL),
(29, 'heyater', 'heya@abc.com', 10, 'active', '$2b$10$UH4gCTVUF/MlOaSsSLB9MOaNWPJd1SPYXQjYUCb3s0K0kle9n683m', '09551957592', NULL, '2023-10-10 10:10:07', NULL),
(38, 'heyater', 'heyazz@abc.com', 10, 'active', '$2b$10$iVfQvYHE4PBq/9wdPMcxIOYxMKIe4hjmQWsJz5loOwXQc6wDu4MVi', '09551957592', NULL, '2023-10-10 10:10:07', NULL),
(39, 'heyater', 'heyazzz@abc.com', 10, 'active', '$2b$10$NZWMTSHjaHims.ca0skRaudfE1lI2Ra9LxTFa2dHQ1KUxqxHog4j.', '09551957592', NULL, '2023-10-10 10:10:07', '2023-10-11 23:05:28'),
(40, 'SUPERGODZ', 'katteu@xyz.com', 50, 'active', '$2a$12$aE46NqPsGf721SSnEWt/Helz3hZb82cnDO6X2oygMALeChrLelEsm', '09551957592', NULL, '2023-10-10 10:10:07', '2023-10-22 03:35:52'),
(41, 'testerr', 'testeri@gmail.com', 1, 'active', '$2b$10$4wJ1ZqzSlfJ.WH1qNa7jZuQxFS4OFVgd2GVJwKdP7oHoDPO0zkA.i', '09551957592', NULL, '2023-10-10 10:10:07', NULL),
(42, 'Waweeeee', 'wawee@abc.com', 10, 'active', '$2b$10$NL3mGwf9L2KfQAZ/jJdOjO9b8xXs039VdpoYh/EYdY0K7hf4hVw4u', '09551957592', NULL, '2023-10-10 10:10:07', NULL),
(43, 'yipyapyopp', 'katheamarizz@gmail.com', 10, 'active', '$2b$10$POYnX0hEocF1U3WE6OCZDeV112mxJq.WoMTI7t1YcAYF3MrAzogSW', '09551957592', NULL, '2023-10-26 04:30:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` bigint(20) NOT NULL,
  `account_id` bigint(20) NOT NULL,
  `merchant_id` bigint(20) NOT NULL,
  `rating_value` int(11) NOT NULL,
  `comment` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `account_id`, `merchant_id`, `rating_value`, `comment`) VALUES
(1, 1, 1, 5, 'test'),
(2, 1, 1, 5, NULL),
(3, 1, 1, 5, NULL),
(4, 38, 2, 3, NULL),
(5, 1, 2, 4, NULL),
(6, 27, 3, 3, NULL),
(7, 29, 3, 3, NULL),
(8, 1, 1, 3, 'tetstdaw'),
(9, 1, 1, 4, 'heyaaa'),
(10, 1, 1, 3, 'more more'),
(11, 1, 1, 3, 'sgesgsege'),
(14, 1, 1, 3, 'test'),
(15, 1, 1, 5, 'latest'),
(18, 1, 1, 3, 'hey');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` bigint(20) NOT NULL,
  `no_of_tables` int(11) DEFAULT NULL,
  `no_of_chairs` int(11) DEFAULT NULL,
  `no_of_plates` int(11) DEFAULT NULL,
  `no_of_glasses` int(11) DEFAULT NULL,
  `no_of_tableCloths` int(11) DEFAULT NULL,
  `no_of_chairCovers` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `no_of_tables`, `no_of_chairs`, `no_of_plates`, `no_of_glasses`, `no_of_tableCloths`, `no_of_chairCovers`) VALUES
(1, 151, 15, 2032, 351, 155, 123),
(2, NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL, NULL, NULL, NULL, NULL, NULL),
(4, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL),
(6, NULL, NULL, NULL, NULL, NULL, NULL),
(7, NULL, NULL, NULL, NULL, NULL, NULL),
(8, NULL, NULL, NULL, NULL, NULL, NULL),
(9, NULL, NULL, NULL, NULL, NULL, NULL),
(10, NULL, NULL, NULL, NULL, NULL, NULL),
(11, NULL, NULL, NULL, NULL, NULL, NULL),
(12, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, NULL, NULL, NULL, NULL, NULL),
(15, NULL, NULL, NULL, NULL, NULL, NULL),
(16, NULL, NULL, NULL, NULL, NULL, NULL),
(17, NULL, NULL, NULL, NULL, NULL, NULL),
(18, NULL, NULL, NULL, NULL, NULL, NULL),
(19, NULL, NULL, NULL, NULL, NULL, NULL),
(20, NULL, NULL, NULL, NULL, NULL, NULL),
(21, NULL, NULL, NULL, NULL, NULL, NULL),
(22, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 12, 123, 123, 123, 123, 123),
(24, NULL, NULL, NULL, NULL, NULL, NULL),
(25, NULL, NULL, NULL, NULL, NULL, NULL),
(26, NULL, NULL, NULL, NULL, NULL, NULL),
(27, NULL, NULL, NULL, NULL, NULL, NULL),
(28, NULL, NULL, NULL, NULL, NULL, NULL),
(29, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `merchant`
--

CREATE TABLE `merchant` (
  `merchant_id` bigint(20) NOT NULL,
  `merchant_name` varchar(30) NOT NULL,
  `email_address` varchar(60) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `contact_number` varchar(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `settings` longtext DEFAULT NULL,
  `form_deets` longtext DEFAULT NULL,
  `sched_id` bigint(20) DEFAULT NULL,
  `accounts` longtext NOT NULL,
  `date_registered` datetime DEFAULT NULL,
  `merch_status` enum('Active','Pending') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `merchant`
--

INSERT INTO `merchant` (`merchant_id`, `merchant_name`, `email_address`, `logo`, `contact_number`, `address`, `settings`, `form_deets`, `sched_id`, `accounts`, `date_registered`, `merch_status`) VALUES
(1, 'Derf\'s Grill and Resto', 'derfs@abc.com', 'https://i.imgur.com/ld0SpjN.jpg', '09551957593', '{\"country\":\"Philippines\",\"region\":\"Central Visayas\",\"province\":\"Cebu\",\"municipality\":\"Cebu City\",\"barangay\":\"Talamban\"}', '{\"description\":\"Most delicious lechon belly found in Cebu! We also offer other kinds of Filipino viands that will surely suit to your taste!\",\"tags\":[\"On-Site\",\"Off-Site\",\"Delivery\"]}', '{\"form\":[{\"label\":\"test\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"tester\",\"type\":\"number\",\"value\":\"120\"},{\"label\":\"testtestest\",\"type\":\"text\",\"value\":\"ROOROROROR\"},{\"label\":\"yeehehehehe\",\"type\":\"number\",\"value\":\"1234567\"},{\"label\":\"asdfasdfasdf\",\"type\":\"text\",\"value\":\"asdfasdf\"},{\"label\":\"tester\",\"type\":\"text\",\"value\":\"wawaw\"},{\"label\":\"tet\",\"type\":\"text\",\"value\":\"shgeesh\"},{\"label\":\"teter\",\"type\":\"text\",\"value\":\"heyaa\"},{\"label\":\"hey\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"wewew\",\"type\":\"number\",\"value\":\"123123123\"}]}', NULL, '{\"2\":{\"email\":\"zoro@abc.com\",\"position\":\"employee\"},\"26\":{\"email\":\"katheamari@gmail.com\",\"position\":\"employee\"},\"28\":{\"email\":\"kidd@abc.com\",\"position\":\"manager\"},\"29\":{\"email\":\"heya@abc.com\",\"position\":\"manager\"},\"38\":{\"email\":\"heyazz@abc.com\",\"position\":\"manager\"},\"39\":{\"email\":\"heyazzz@abc.com\",\"position\":\"manager\"}}', '2023-10-26 04:22:48', 'Pending'),
(2, 'J&J Lechon Belly', 'j&j@abc.com', 'https://i.imgur.com/uRdrrhL.jpg', '09123456789', '{\"country\":\"Philippines\",\"region\":\"Central Visayas\",\"province\":\"Cebu\",\"municipality\":\"Cebu City\",\"barangay\":\"Talamban\"}', '{\"description\":\"Most delicious lechon belly found in Cebu! We also offer other kinds of Filipino viands that will surely suit to your taste!\",\"tags\":[\"On-Site\",\"Off-Site\",\"Delivery\"]}', NULL, NULL, '{\"27\":{\"email\":\"mike@abc.com\",\"position\":\"employee\"}}', '2023-10-26 04:22:48', 'Pending'),
(3, 'Kuzina D\' Aiman', 'kuzina@abc.com', 'https://i.imgur.com/UID7wOz.jpg', '09123456793', '{\"country\":\"Philippines\",\"region\":\"Central Visayas\",\"province\":\"Cebu\",\"municipality\":\"\",\"barangay\":\"Asturias\"}', '{\"description\":\"The best silogan on Asturias! We serve various Filipino viands especially our Silogan dishes!\",\"tags\":[\"On-Site\",\"Reserve\",\"Delivery\"]}', NULL, NULL, '{\"42\":{\"email\":\"wawee@abc.com\",\"position\":\"manager\"}}', '2023-10-26 04:22:48', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `merchant_sched`
--

CREATE TABLE `merchant_sched` (
  `sched_id` bigint(20) NOT NULL,
  `settings` varchar(255) DEFAULT NULL,
  `sched_status` int(11) NOT NULL,
  `time_open` datetime NOT NULL,
  `time_closed` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `package_id` bigint(20) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `package_desc` text NOT NULL,
  `price` float NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date DEFAULT NULL,
  `time_start` time NOT NULL,
  `time_end` time DEFAULT NULL,
  `visibility` enum('PUBLISHED','NOT PUBLISHED') NOT NULL,
  `item_list` text DEFAULT NULL,
  `image_filepath` text NOT NULL,
  `tags` text DEFAULT NULL,
  `merchant_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`package_id`, `package_name`, `package_desc`, `price`, `date_start`, `date_end`, `time_start`, `time_end`, `visibility`, `item_list`, `image_filepath`, `tags`, `merchant_id`) VALUES
(1, 'Package A', 'test', 500, '0000-00-00', NULL, '00:00:00', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/AZOtzD7.jpg', NULL, 1),
(2, 'Package B', 'test', 1000, '2023-10-07', NULL, '19:21:57', NULL, 'PUBLISHED', 'test', 'https://i.imgur.com/zb1h8kj.jpg', NULL, 1),
(3, 'Package C', 'test', 300, '2023-10-04', NULL, '19:21:57', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/zb1h8kj.jpg', NULL, 2),
(4, 'Package D', 'test', 1500, '2023-10-07', NULL, '19:21:57', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/zb1h8kj.jpg', NULL, 2),
(5, 'Package E', 'test', 150, '2023-10-03', NULL, '19:21:57', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/zb1h8kj.jpg', NULL, 3),
(6, 'Package F', 'test', 800, '2023-10-07', NULL, '19:21:57', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/zb1h8kj.jpg', NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL,
  `total_expense` decimal(10,2) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `payment_status` enum('PENDING','PAID') NOT NULL,
  `payment_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `total_expense`, `balance`, `payment_status`, `payment_date`) VALUES
(1, 0.00, 12.21, 'PENDING', '0000-00-00 00:00:00'),
(2, 500.00, 50.50, 'PENDING', '0000-00-00 00:00:00'),
(3, 0.00, 12.21, 'PENDING', '0000-00-00 00:00:00'),
(4, 0.00, 123.31, 'PENDING', '0000-00-00 00:00:00'),
(5, 0.00, 12.21, 'PENDING', '0000-00-00 00:00:00'),
(6, 0.00, 12.21, 'PENDING', '0000-00-00 00:00:00'),
(7, 0.00, 12.21, 'PENDING', '0000-00-00 00:00:00'),
(8, 0.00, 12.21, 'PENDING', '0000-00-00 00:00:00'),
(9, 0.00, 12.21, 'PENDING', '0000-00-00 00:00:00'),
(10, 0.00, 12.21, 'PENDING', '0000-00-00 00:00:00'),
(11, 0.00, 123.21, 'PENDING', '0000-00-00 00:00:00'),
(12, 0.00, 99999999.99, 'PENDING', '0000-00-00 00:00:00'),
(13, 0.00, 99999999.99, 'PENDING', '0000-00-00 00:00:00'),
(14, 0.00, 123123.23, 'PENDING', '0000-00-00 00:00:00'),
(15, 0.00, 123123.23, 'PENDING', '0000-00-00 00:00:00'),
(16, 0.00, 10.51, 'PENDING', '0000-00-00 00:00:00'),
(17, 0.00, 123123.21, 'PENDING', '0000-00-00 00:00:00'),
(18, 0.00, 123.21, 'PENDING', '0000-00-00 00:00:00'),
(19, 0.00, 123.21, 'PENDING', '0000-00-00 00:00:00'),
(20, 0.00, 13123.00, 'PENDING', '0000-00-00 00:00:00'),
(21, 0.00, 13123.00, 'PENDING', '0000-00-00 00:00:00'),
(22, 0.00, 13123.00, 'PENDING', '0000-00-00 00:00:00'),
(23, 0.00, 123123.00, 'PENDING', '0000-00-00 00:00:00'),
(24, 0.00, 123123.00, 'PENDING', '0000-00-00 00:00:00'),
(25, 0.00, 123.00, 'PENDING', '0000-00-00 00:00:00'),
(26, 0.00, 123.00, 'PENDING', '0000-00-00 00:00:00'),
(27, 0.00, 123.00, 'PENDING', '0000-00-00 00:00:00'),
(28, 0.00, 123.00, 'PENDING', '0000-00-00 00:00:00'),
(29, 0.00, 123.00, 'PENDING', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `reservation_id` bigint(20) NOT NULL,
  `res_date` date NOT NULL,
  `res_time` time NOT NULL,
  `res_location` varchar(255) NOT NULL,
  `date_received` datetime NOT NULL,
  `party_size` int(11) NOT NULL,
  `settings` longtext DEFAULT NULL,
  `additional_details` text DEFAULT NULL,
  `account_id` bigint(20) NOT NULL,
  `merchant_id` bigint(20) NOT NULL,
  `sched_id` bigint(20) DEFAULT NULL,
  `package_id` bigint(20) NOT NULL,
  `payment_id` bigint(20) NOT NULL,
  `inventory_id` bigint(20) NOT NULL,
  `status` enum('Ongoing','Finished') NOT NULL DEFAULT 'Ongoing'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`reservation_id`, `res_date`, `res_time`, `res_location`, `date_received`, `party_size`, `settings`, `additional_details`, `account_id`, `merchant_id`, `sched_id`, `package_id`, `payment_id`, `inventory_id`, `status`) VALUES
(1, '2023-10-07', '22:30:03', 'Philippines', '2023-10-10 17:33:03', 9, NULL, 'why', 1, 1, NULL, 1, 1, 1, 'Finished'),
(2, '2023-10-18', '22:30:39', 'Philippines', '2023-10-10 17:34:39', 5, NULL, NULL, 1, 1, NULL, 1, 2, 2, 'Finished'),
(3, '2023-10-18', '22:30:05', 'Philippines', '2023-10-10 17:36:05', 5, NULL, NULL, 1, 1, NULL, 1, 3, 3, 'Ongoing'),
(4, '2023-10-12', '17:36:25', 'USA', '2023-10-10 17:36:25', 123, NULL, NULL, 1, 1, NULL, 1, 4, 4, 'Ongoing'),
(5, '2023-10-13', '17:40:36', 'test', '2023-10-10 17:37:36', 123, NULL, NULL, 1, 1, NULL, 2, 5, 5, 'Ongoing'),
(6, '2023-10-12', '21:40:24', 'Korea', '2023-10-10 17:40:24', 5, NULL, NULL, 1, 1, NULL, 1, 6, 6, 'Ongoing'),
(7, '2023-10-11', '17:43:19', 'Japan', '2023-10-10 17:43:19', 5, NULL, NULL, 1, 1, NULL, 1, 7, 7, 'Ongoing'),
(8, '2023-10-04', '17:49:59', 'USA', '2023-10-10 17:46:59', 4, NULL, NULL, 1, 1, NULL, 1, 8, 8, 'Ongoing'),
(9, '2023-10-11', '18:02:24', 'USA', '2023-10-10 18:00:24', 4, NULL, NULL, 1, 1, NULL, 1, 9, 9, 'Ongoing'),
(10, '2023-10-18', '22:00:44', 'USAtest', '2023-10-10 18:00:44', 123, NULL, NULL, 1, 1, NULL, 2, 10, 10, 'Ongoing'),
(11, '2023-10-20', '18:02:39', 'seseses', '2023-10-10 18:01:39', 123, NULL, NULL, 1, 3, NULL, 5, 11, 11, 'Ongoing'),
(12, '2023-10-13', '18:09:20', 'Kani1', '2023-10-10 18:06:20', 12, NULL, 'hey', 1, 3, NULL, 5, 16, 16, 'Ongoing'),
(13, '2023-10-13', '18:08:51', 'Kani2', '2023-10-10 18:06:51', 123, NULL, 'hey', 1, 3, NULL, 6, 17, 17, 'Ongoing'),
(14, '2023-10-12', '18:10:17', 'Kani3', '2023-10-10 18:07:17', 123, NULL, 'hey', 1, 3, NULL, 6, 19, 19, 'Ongoing'),
(16, '2023-09-28', '05:04:58', 'test', '2023-10-26 04:04:58', 15, '{\"additional_details\":[{\"label\":\"test\",\"type\":\"text\",\"value\":\"heyeyey\"},{\"label\":\"tester\",\"type\":\"number\",\"value\":\"12313123\"},{\"label\":\"testtestest\",\"type\":\"text\",\"value\":\"hey\"},{\"label\":\"yeehehehehe\",\"type\":\"number\",\"value\":\"12321\"},{\"label\":\"asdfasdfasdf\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"tester\",\"type\":\"text\",\"value\":\"iscute\"},{\"label\":\"tet\",\"type\":\"text\",\"value\":\"wewhehw\"},{\"label\":\"teter\",\"type\":\"text\",\"value\":\"ilove\"},{\"label\":\"hey\",\"type\":\"text\",\"value\":\"my\"},{\"label\":\"wewew\",\"type\":\"number\",\"value\":\"123123\"}]}', 'yey', 1, 1, NULL, 1, 23, 23, 'Ongoing'),
(17, '2023-10-05', '04:36:25', 'adsfa', '2023-10-26 04:35:25', 12, '{\"additional_details\":[{\"label\":\"test\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"tester\",\"type\":\"number\",\"value\":\"120\"},{\"label\":\"testtestest\",\"type\":\"text\",\"value\":\"ROOROROROR\"},{\"label\":\"yeehehehehe\",\"type\":\"number\",\"value\":\"1234567\"},{\"label\":\"asdfasdfasdf\",\"type\":\"text\",\"value\":\"asdfasdf\"},{\"label\":\"tester\",\"type\":\"text\",\"value\":\"wawaw\"},{\"label\":\"tet\",\"type\":\"text\",\"value\":\"shgeesh\"},{\"label\":\"teter\",\"type\":\"text\",\"value\":\"heyaa\"},{\"label\":\"hey\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"wewew\",\"type\":\"number\",\"value\":\"123123123\"}]}', '', 1, 1, NULL, 1, 24, 24, 'Ongoing'),
(18, '2023-10-27', '05:43:02', 'test', '2023-10-26 04:44:02', 123, '{\"additional_details\":[{\"label\":\"test\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"tester\",\"type\":\"number\",\"value\":\"120\"},{\"label\":\"testtestest\",\"type\":\"text\",\"value\":\"ROOROROROR\"},{\"label\":\"yeehehehehe\",\"type\":\"number\",\"value\":\"1234567\"},{\"label\":\"asdfasdfasdf\",\"type\":\"text\",\"value\":\"asdfasdf\"},{\"label\":\"tester\",\"type\":\"text\",\"value\":\"wawaw\"},{\"label\":\"tet\",\"type\":\"text\",\"value\":\"shgeesh\"},{\"label\":\"teter\",\"type\":\"text\",\"value\":\"heyaa\"},{\"label\":\"hey\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"wewew\",\"type\":\"number\",\"value\":\"123123123\"}]}', '', 1, 1, NULL, 2, 25, 25, 'Ongoing'),
(19, '2023-10-05', '04:47:07', 'asdf', '2023-10-26 04:45:07', 123, '{\"additional_details\":[{\"label\":\"test\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"tester\",\"type\":\"number\",\"value\":\"120\"},{\"label\":\"testtestest\",\"type\":\"text\",\"value\":\"ROOROROROR\"},{\"label\":\"yeehehehehe\",\"type\":\"number\",\"value\":\"1234567\"},{\"label\":\"asdfasdfasdf\",\"type\":\"text\",\"value\":\"asdfasdf\"},{\"label\":\"tester\",\"type\":\"text\",\"value\":\"wawaw\"},{\"label\":\"tet\",\"type\":\"text\",\"value\":\"shgeesh\"},{\"label\":\"teter\",\"type\":\"text\",\"value\":\"heyaa\"},{\"label\":\"hey\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"wewew\",\"type\":\"number\",\"value\":\"123123123\"}]}', '', 1, 1, NULL, 2, 26, 26, 'Ongoing'),
(20, '2023-10-12', '04:47:56', 'asdfasd', '2023-10-26 04:45:56', 123, '{\"additional_details\":[{\"label\":\"test\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"tester\",\"type\":\"number\",\"value\":\"120\"},{\"label\":\"testtestest\",\"type\":\"text\",\"value\":\"ROOROROROR\"},{\"label\":\"yeehehehehe\",\"type\":\"number\",\"value\":\"1234567\"},{\"label\":\"asdfasdfasdf\",\"type\":\"text\",\"value\":\"asdfasdf\"},{\"label\":\"tester\",\"type\":\"text\",\"value\":\"wawaw\"},{\"label\":\"tet\",\"type\":\"text\",\"value\":\"shgeesh\"},{\"label\":\"teter\",\"type\":\"text\",\"value\":\"heyaa\"},{\"label\":\"hey\",\"type\":\"text\",\"value\":\"Katteu\"},{\"label\":\"wewew\",\"type\":\"number\",\"value\":\"123123123\"}]}', '', 1, 1, NULL, 2, 27, 27, 'Ongoing'),
(21, '2023-10-26', '06:16:27', 'asdfsadf', '2023-10-26 05:16:27', 23, '{\"additional_details\":[{\"label\":\"test\",\"type\":\"text\",\"value\":\"\"},{\"label\":\"tester\",\"type\":\"number\",\"value\":\"\"},{\"label\":\"testtestest\",\"type\":\"text\",\"value\":\"\"},{\"label\":\"yeehehehehe\",\"type\":\"number\",\"value\":\"\"},{\"label\":\"asdfasdfasdf\",\"type\":\"text\",\"value\":\"\"},{\"label\":\"tester\",\"type\":\"text\",\"value\":\"\"},{\"label\":\"tet\",\"type\":\"text\",\"value\":\"\"},{\"label\":\"teter\",\"type\":\"text\",\"value\":\"\"},{\"label\":\"hey\",\"type\":\"text\",\"value\":\"\"},{\"label\":\"wewew\",\"type\":\"number\",\"value\":\"\"}]}', '', 1, 1, NULL, 2, 28, 28, 'Ongoing'),
(22, '2023-10-28', '05:22:48', 'test', '2023-10-26 05:18:48', 12, '{\"additional_details\":[{\"label\":\"test\",\"type\":\"text\",\"value\":\"Laaoaoaoa\"},{\"label\":\"tester\",\"type\":\"number\",\"value\":\"121\"},{\"label\":\"testtestest\",\"type\":\"text\",\"value\":\"ASDASD\"},{\"label\":\"yeehehehehe\",\"type\":\"number\",\"value\":\"121\"},{\"label\":\"asdfasdfasdf\",\"type\":\"text\",\"value\":\"asdas\"},{\"label\":\"tester\",\"type\":\"text\",\"value\":\"wawaw\"},{\"label\":\"tet\",\"type\":\"text\",\"value\":\"asdfasdf\"},{\"label\":\"teter\",\"type\":\"text\",\"value\":\"heyeaaya\"},{\"label\":\"hey\",\"type\":\"text\",\"value\":\"\"},{\"label\":\"wewew\",\"type\":\"number\",\"value\":\"\"}]}', '', 1, 1, NULL, 2, 29, 29, 'Ongoing');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `email_address` (`email_address`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `account_idfk_1` (`account_id`),
  ADD KEY `merchant_idfk_1` (`merchant_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`merchant_id`),
  ADD KEY `sched_id` (`sched_id`);

--
-- Indexes for table `merchant_sched`
--
ALTER TABLE `merchant_sched`
  ADD PRIMARY KEY (`sched_id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`package_id`),
  ADD KEY `merchant_id` (`merchant_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `merchant_id` (`merchant_id`),
  ADD KEY `sched_id` (`sched_id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `incvetory_id` (`inventory_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `merchant`
--
ALTER TABLE `merchant`
  MODIFY `merchant_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `merchant_sched`
--
ALTER TABLE `merchant_sched`
  MODIFY `sched_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `package_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `reservation_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `account_idfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  ADD CONSTRAINT `merchant_idfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`);

--
-- Constraints for table `merchant`
--
ALTER TABLE `merchant`
  ADD CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`sched_id`) REFERENCES `merchant_sched` (`sched_id`);

--
-- Constraints for table `package`
--
ALTER TABLE `package`
  ADD CONSTRAINT `package_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`),
  ADD CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`sched_id`) REFERENCES `merchant_sched` (`sched_id`),
  ADD CONSTRAINT `reservation_ibfk_4` FOREIGN KEY (`package_id`) REFERENCES `package` (`package_id`),
  ADD CONSTRAINT `reservation_ibfk_5` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  ADD CONSTRAINT `reservation_ibfk_6` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
