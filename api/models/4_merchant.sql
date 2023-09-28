USE reservo;
/*Merchant needs the following (in order):
 > merchant_sched.sql
*/

CREATE TABLE `merchant` (
  `merchant_id` bigint(20) NOT NULL,
  `merchant_name` varchar(30) NOT NULL,
  `email_address` varchar(60) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `contact_number` varchar(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `settings` varchar(255) DEFAULT NULL,
  `sched_id` bigint(20) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `merchant`
  ADD PRIMARY KEY (`merchant_id`),
  ADD KEY `sched_id` (`sched_id`),
  MODIFY COLUMN `merchant_id` BIGINT AUTO_INCREMENT;


ALTER TABLE `merchant`
  ADD CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`sched_id`) REFERENCES `merchant_sched` (`sched_id`);