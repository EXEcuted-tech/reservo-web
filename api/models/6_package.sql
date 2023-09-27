/*Package needs the following (in order):
 > merchant_sched.sql
 > merchant_sql
*/
USE reservo;
CREATE TABLE `package` (
  `package_id` bigint(20) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `package_desc` text NOT NULL,
  `package_date_availability_start` date NOT NULL,
  `package_date_availability_end` date NOT NULL,
  `package_time_availability_start` time NOT NULL,
  `package_time_availability_end` time NOT NULL,
  `package_visibility` enum('PUBLISHED','NOT PUBLISHED') NOT NULL,
  `item_list` text NOT NULL,
  `image_filepath` text NOT NULL,
  `tags` text NOT NULL,
  `merchant_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `package`
  ADD PRIMARY KEY (`package_id`),
  ADD KEY `merchant_id` (`merchant_id`);

ALTER TABLE `package`
  ADD CONSTRAINT `package_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`);