USE reservo;

CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL,
  `account_name` varchar(60) NOT NULL,
  `email_address` varchar(128) NOT NULL,
  `account_type` int(2) NOT NULL DEFAULT 1,
  `account_status` enum('active','abolished') NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `merchant_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  MODIFY COLUMN `account_id` BIGINT AUTO_INCREMENT;