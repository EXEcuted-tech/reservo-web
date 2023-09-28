USE reservo;

/* Merchant needs the following (in order): > merchant_sched.sql */

CREATE TABLE `merchant` (
  `merchant_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `merchant_name` varchar(30) NOT NULL,
  `email_address` varchar(60) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `contact_number` varchar(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `settings` varchar(255) DEFAULT NULL,
  `sched_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`merchant_id`),
  KEY `sched_id` (`sched_id`),
  CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`sched_id`) REFERENCES `merchant_sched` (`sched_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
