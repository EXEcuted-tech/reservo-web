CREATE DATABASE reservo;
USE reservo;


CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL,
  `account_name` varchar(60) NOT NULL,
  `email_address` varchar(128) NOT NULL,
  `account_type` int(2) NOT NULL DEFAULT 1,
  `account_status` enum('active','abolished') NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `account` (`account_id`, `account_name`, `email_address`, `account_type`, `account_status`, `passwd`, `contact_number`) VALUES
(1, 'Kathea Mari', 'kath@abc.com', 1, 'active', '$2a$12$aE46NqPsGf721SSnEWt/Helz3hZb82cnDO6X2oygMALeChrLelEsm', '09551957592'),
(2, 'Zoro Ror', 'zoro@abc.com', 10, 'active', '$2a$12$aE46NqPsGf721SSnEWt/Helz3hZb82cnDO6X2oygMALeChrLelEsm', '09551957592'),
(3, 'PwenzWafow', 'pwinz@gmail.com', 10, 'active', '$2b$10$nFpIXKKEyDlX8Zzr/J6VCO9sgdRZHr.twcNaZMHkCSpAuDJMAlJIG', '09184920392'),
(4, 'teste', 'test@abc.com', 1, 'active', '$2b$10$woTWU2Ssp9093XpKhUCujuCquhoZtJmBjAoV0bJYJYDKqFcIGstrm', '091231923090'),
(8, 'Wawawow', 'waw@gmail.com', 10, 'active', '$2b$10$FDUiV57cDCwckqU1Dudk5.i7Kavt4sZ3LnZqyXYsbFSQkBxcizAyW', '09184920392'),
(9, 'Wewew', 'ewe@gmail.com', 10, 'active', '$2b$10$ll6Ml.Ymam4xTP1N/q9CYeFT.GpyVeFiS/t8EF9F2izxkHfU1qJI6', '09184920392'),
(26, 'Kathea Mari', 'katheamari@gmail.com', 10, 'active', '$2b$10$8/nECqrnNFboFpuQikAt/OXNFXNAZoO2wkF08.IJnVEqFCxVkHWeW', '09551957592'),
(27, 'Kathea Mari', 'mike@abc.com', 10, 'active', '$2b$10$Zo.FxMnq93tkeJvNLiZSSeG9cXWLyGZ9PUyNkYHKGZS5UhQNBTVk6', '09551957592'),
(28, 'Kiddim', 'kidd@abc.com', 10, 'active', '$2b$10$1/RHiAm8iAndqWbGOyN6.e48vt5enUH7w2MXo4cm4rbUFolEThyhe', '09551957592'),
(29, 'heyater', 'heya@abc.com', 10, 'active', '$2b$10$UH4gCTVUF/MlOaSsSLB9MOaNWPJd1SPYXQjYUCb3s0K0kle9n683m', '09551957592'),
(38, 'heyater', 'heyazz@abc.com', 10, 'active', '$2b$10$iVfQvYHE4PBq/9wdPMcxIOYxMKIe4hjmQWsJz5loOwXQc6wDu4MVi', '09551957592'),
(39, 'heyater', 'heyazzz@abc.com', 10, 'active', '$2b$10$NZWMTSHjaHims.ca0skRaudfE1lI2Ra9LxTFa2dHQ1KUxqxHog4j.', '09551957592'),
(40, 'SUPERGODZ', 'katteu@xyz.com', 50, 'active', '$2a$12$aE46NqPsGf721SSnEWt/Helz3hZb82cnDO6X2oygMALeChrLelEsm', '09551957592'),
(41, 'testerr', 'testeri@gmail.com', 1, 'active', '$2b$10$4wJ1ZqzSlfJ.WH1qNa7jZuQxFS4OFVgd2GVJwKdP7oHoDPO0zkA.i', '09551957592'),
(42, 'Waweeeee', 'wawee@abc.com', 10, 'active', '$2b$10$NL3mGwf9L2KfQAZ/jJdOjO9b8xXs039VdpoYh/EYdY0K7hf4hVw4u', '09551957592');


CREATE TABLE `feedback` (
  `feedback_id` bigint(20) NOT NULL,
  `account_id` bigint(20) NOT NULL,
  `merchant_id` bigint(20) NOT NULL,
  `rating_value` int(11) NOT NULL,
  `comment` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `feedback` (`feedback_id`, `account_id`, `merchant_id`, `rating_value`, `comment`) VALUES
(1, 1, 1, 5, 'test'),
(2, 1, 1, 5, NULL),
(3, 1, 1, 5, NULL),
(4, 38, 2, 3, NULL),
(5, 1, 2, 4, NULL),
(6, 27, 3, 3, NULL),
(7, 29, 3, 3, NULL);



CREATE TABLE `inventory` (
  `inventory_id` bigint(20) NOT NULL,
  `no_of_tables` int(11) NOT NULL,
  `no_of_chairs` int(11) NOT NULL,
  `no_of_plates` int(11) NOT NULL,
  `no_of_glasses` int(11) NOT NULL,
  `no_of_tableCloths` int(11) NOT NULL,
  `no_of_chairCovers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `inventory` (`inventory_id`, `no_of_tables`, `no_of_chairs`, `no_of_plates`, `no_of_glasses`, `no_of_tableCloths`, `no_of_chairCovers`) VALUES
(1, 1, 1, 1, 1, 1, 1);



CREATE TABLE `merchant` (
  `merchant_id` bigint(20) NOT NULL,
  `merchant_name` varchar(30) NOT NULL,
  `email_address` varchar(60) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `contact_number` varchar(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `settings` longtext DEFAULT NULL,
  `sched_id` bigint(20) DEFAULT NULL,
  `accounts` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `merchant` (`merchant_id`, `merchant_name`, `email_address`, `logo`, `contact_number`, `address`, `settings`, `sched_id`, `accounts`) VALUES
(1, 'Derf\'s Grill and Resto', 'derfs@abc.com', 'https://i.imgur.com/ld0SpjN.jpg', '09551957592', '{\"country\":\"Philippines\",\"region\":\"Western Visayas\",\"province\":\"Leyte\",\"municipality\":\"Maasin City\",\"barangay\":\"Maasin\"}', '{\"description\":\"The best restaurant catering service on Leyte! We offer a variety of services for any events that you want to reserve for!\",\"tags\":[\"On-Site\",\"Off-Site\",\"Catering\"]}', NULL, '{\"2\":{\"email\":\"zoro@abc.com\",\"position\":\"employee\"},\"26\":{\"email\":\"katheamari@gmail.com\",\"position\":\"employee\"},\"28\":{\"email\":\"kidd@abc.com\",\"position\":\"manager\"},\"29\":{\"email\":\"heya@abc.com\",\"position\":\"manager\"},\"38\":{\"email\":\"heyazz@abc.com\",\"position\":\"manager\"},\"39\":{\"email\":\"heyazzz@abc.com\",\"position\":\"manager\"}}'),
(2, 'J&J Lechon Belly', 'j&j@abc.com', 'https://i.imgur.com/uRdrrhL.jpg', '09123456789', '{\"country\":\"Philippines\",\"region\":\"Central Visayas\",\"province\":\"Cebu\",\"municipality\":\"Cebu City\",\"barangay\":\"Talamban\"}', '{\"description\":\"Most delicious lechon belly found in Cebu! We also offer other kinds of Filipino viands that will surely suit to your taste!\",\"tags\":[\"On-Site\",\"Off-Site\",\"Delivery\"]}', NULL, '{\"27\":{\"email\":\"mike@abc.com\",\"position\":\"employee\"}}'),
(3, 'Kuzina D\' Aiman', 'kuzina@abc.com', 'https://i.imgur.com/UID7wOz.jpg', '09123456793', '{\"country\":\"Philippines\",\"region\":\"Central Visayas\",\"province\":\"Cebu\",\"municipality\":\"\",\"barangay\":\"Asturias\"}', '{\"description\":\"The best silogan on Asturias! We serve various Filipino viands especially our Silogan dishes!\",\"tags\":[\"On-Site\",\"Reserve\",\"Delivery\"]}', NULL, '{\"42\":{\"email\":\"wawee@abc.com\",\"position\":\"manager\"}}');


CREATE TABLE `merchant_sched` (
  `sched_id` bigint(20) NOT NULL,
  `settings` varchar(255) DEFAULT NULL,
  `sched_status` int(11) NOT NULL,
  `time_open` datetime NOT NULL,
  `time_closed` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



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



INSERT INTO `package` (`package_id`, `package_name`, `package_desc`, `price`, `date_start`, `date_end`, `time_start`, `time_end`, `visibility`, `item_list`, `image_filepath`, `tags`, `merchant_id`) VALUES
(1, 'test', 'test', 500, '0000-00-00', NULL, '00:00:00', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/AZOtzD7.jpg', NULL, 1),
(2, 'Package B', 'test', 1000, '2023-10-07', NULL, '19:21:57', NULL, 'PUBLISHED', 'test', 'https://i.imgur.com/zb1h8kj.jpg', NULL, 1),
(3, 'test', 'test', 300, '2023-10-04', NULL, '19:21:57', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/zb1h8kj.jpg', NULL, 2),
(4, 'test', 'test', 1500, '2023-10-07', NULL, '19:21:57', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/zb1h8kj.jpg', NULL, 2),
(5, 'test', 'test', 150, '2023-10-03', NULL, '19:21:57', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/zb1h8kj.jpg', NULL, 3),
(6, 'test', 'test', 800, '2023-10-07', NULL, '19:21:57', NULL, 'PUBLISHED', NULL, 'https://i.imgur.com/zb1h8kj.jpg', NULL, 3);



CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL,
  `total_expense` decimal(10,2) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `payment_status` enum('PENDING','PAID') NOT NULL,
  `payment_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `payment` (`payment_id`, `total_expense`, `balance`, `payment_status`, `payment_date`) VALUES
(1, 500.00, 100.00, 'PENDING', '2023-09-29 19:05:34'),
(2, 0.00, 500.00, 'PENDING', '0000-00-00 00:00:00'),
(3, 0.00, 500.00, 'PENDING', '0000-00-00 00:00:00');



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



INSERT INTO `reservation` (`reservation_id`, `res_date`, `res_time`, `res_location`, `date_received`, `party_size`, `settings`, `additional_details`, `account_id`, `merchant_id`, `sched_id`, `package_id`, `payment_id`, `inventory_id`, `status`) VALUES
(1, '2023-08-08', '10:15:00', 'USA', '2023-09-30 01:57:14', 5, NULL, NULL, 1, 1, NULL, 1, 1, 1, 'Ongoing'),
(2, '2023-08-08', '10:15:00', 'Philippines', '2023-09-30 01:57:20', 5, NULL, NULL, 1, 1, NULL, 1, 1, 1, 'Ongoing'),
(3, '2023-08-07', '10:15:00', 'Korea', '2023-09-30 01:57:29', 5, NULL, NULL, 1, 1, NULL, 1, 1, 1, 'Finished'),
(4, '2023-08-08', '10:15:00', 'Korea', '2023-09-30 03:30:52', 5, NULL, NULL, 2, 1, NULL, 1, 1, 1, 'Ongoing'),
(5, '2023-08-08', '10:15:00', 'Italy', '2023-09-30 04:16:20', 5, NULL, NULL, 2, 1, NULL, 1, 1, 1, 'Ongoing'),
(6, '2023-08-08', '10:15:00', 'France', '2023-09-30 04:16:24', 5, NULL, NULL, 2, 1, NULL, 1, 1, 1, 'Ongoing'),
(7, '2023-08-08', '10:15:00', 'Singapore', '2023-09-30 04:16:32', 5, NULL, NULL, 1, 1, NULL, 1, 1, 1, 'Ongoing');


ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `email_address` (`email_address`);


ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `account_idfk_1` (`account_id`),
  ADD KEY `merchant_idfk_1` (`merchant_id`);

ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);


ALTER TABLE `merchant`
  ADD PRIMARY KEY (`merchant_id`),
  ADD KEY `sched_id` (`sched_id`);


ALTER TABLE `merchant_sched`
  ADD PRIMARY KEY (`sched_id`);


ALTER TABLE `package`
  ADD PRIMARY KEY (`package_id`),
  ADD KEY `merchant_id` (`merchant_id`);


ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);


ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `merchant_id` (`merchant_id`),
  ADD KEY `sched_id` (`sched_id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `incvetory_id` (`inventory_id`);


ALTER TABLE `account`
  MODIFY `account_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;


ALTER TABLE `feedback`
  MODIFY `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `inventory`
  MODIFY `inventory_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `merchant`
  MODIFY `merchant_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `merchant_sched`
  MODIFY `sched_id` bigint(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE `package`
  MODIFY `package_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `payment`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `reservation`
  MODIFY `reservation_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `feedback`
  ADD CONSTRAINT `account_idfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  ADD CONSTRAINT `merchant_idfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`);

ALTER TABLE `merchant`
  ADD CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`sched_id`) REFERENCES `merchant_sched` (`sched_id`);


ALTER TABLE `package`
  ADD CONSTRAINT `package_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`);


ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`),
  ADD CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`sched_id`) REFERENCES `merchant_sched` (`sched_id`),
  ADD CONSTRAINT `reservation_ibfk_4` FOREIGN KEY (`package_id`) REFERENCES `package` (`package_id`),
  ADD CONSTRAINT `reservation_ibfk_5` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  ADD CONSTRAINT `reservation_ibfk_6` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`);

