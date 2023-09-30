
CREATE DATABASE reservo;
USE reservo;

/*Account*/
CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(60) NOT NULL,
  `email_address` varchar(128) NOT NULL UNIQUE,
  `account_type` int(2) NOT NULL DEFAULT 1,
  `account_status` enum('active','abolished') NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



/*Feedback*/
CREATE TABLE `feedback` (
  `feedback_id` bigint(20) NOT NULL,
  `account_id` bigint(20) NOT NULL,
  `rating_value` int(11) NOT NULL,  
  `comment` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  MODIFY COLUMN `feedback_id` BIGINT AUTO_INCREMENT;

ALTER TABLE `feedback`
  ADD CONSTRAINT `account_idfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`);


/*Merchant Sched*/
CREATE TABLE `merchant_sched` (
  `sched_id` bigint(20) NOT NULL,
  `settings` varchar(255) DEFAULT NULL,
  `sched_status` int(11) NOT NULL,
  `time_open` datetime NOT NULL,
  `time_closed` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `merchant_sched`
  ADD PRIMARY KEY (`sched_id`),
  MODIFY COLUMN `sched_id` BIGINT AUTO_INCREMENT;


/*Merchant*/
CREATE TABLE `merchant` (
  `merchant_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `merchant_name` varchar(30) NOT NULL,
  `email_address` varchar(60) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `contact_number` varchar(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `settings` varchar(255) DEFAULT NULL,
  `sched_id` bigint(20) DEFAULT NULL,
  `accounts` varchar(255) NOT NULL,
  PRIMARY KEY (`merchant_id`),
  KEY `sched_id` (`sched_id`),
  CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`sched_id`) REFERENCES `merchant_sched` (`sched_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Inventory*/

CREATE TABLE `inventory` (
  `inventory_id` bigint(20) NOT NULL,
  `no_of_tables` int(11) NOT NULL,
  `no_of_chairs` int(11) NOT NULL,
  `no_of_plates` int(11) NOT NULL,
  `no_of_glasses` int(11) NOT NULL,
  `no_of_tableCloths` int(11) NOT NULL,
  `no_of_chairCovers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  MODIFY COLUMN `inventory_id` BIGINT AUTO_INCREMENT;


/*PACKAGE*/
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

ALTER TABLE `package`
  ADD PRIMARY KEY (`package_id`),
  ADD KEY `merchant_id` (`merchant_id`),
  MODIFY COLUMN `package_id` BIGINT AUTO_INCREMENT;

ALTER TABLE `package`
  ADD CONSTRAINT `package_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`);


/*Payment*/
CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL,
  `reservation_id` bigint(20) NOT NULL,
  `total_expense` decimal(10,2) DEFAULT NULL,
  `balance` decimal(10,2) NOT NULL,
  `payment_status` enum('PENDING','PAID') NOT NULL,
  `payment_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  MODIFY COLUMN `payment_id` BIGINT AUTO_INCREMENT;


CREATE TABLE `reservation` (
  `reservation_id` bigint(20) NOT NULL,
  `res_date` date NOT NULL,
  `res_time` time NOT NULL,
  `res_location` varchar(255) NOT NULL,
  `date_received` datetime NOT NULL,
  `party_size` int(11) NOT NULL,
  `settings` varchar(255) DEFAULT NULL,
  `additional_details` text DEFAULT NULL,
  `account_id` bigint(20) NOT NULL,
  `merchant_id` bigint(20) NOT NULL,
  `sched_id` bigint(20) DEFAULT NULL,
  `package_id` bigint(20) NOT NULL,
  `payment_id` bigint(20) NOT NULL,
  `inventory_id` bigint(20) NOT NULL,
  `status` enum('Ongoing','Finished') NOT NULL DEFAULT 'Ongoing'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Reservation*/
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `merchant_id` (`merchant_id`),
  ADD KEY `sched_id` (`sched_id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `inventory_id` (`inventory_id`),
  MODIFY COLUMN `reservation_id` BIGINT AUTO_INCREMENT;


ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`),
  ADD CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`sched_id`) REFERENCES `merchant_sched` (`sched_id`),
  ADD CONSTRAINT `reservation_ibfk_4` FOREIGN KEY (`package_id`) REFERENCES `package` (`package_id`),
  ADD CONSTRAINT `reservation_ibfk_5` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  ADD CONSTRAINT `reservation_ibfk_6` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`);



