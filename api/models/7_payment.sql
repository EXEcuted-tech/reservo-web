
USE reservo;
/*Reservation needs the following (in order):
 > accounts.sql
 > merchant_sched.sql
 > merchant_sql
 > package.sql
 > payment.sql
 > reservation.sql
*/
CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL,
  `reservation_id` bigint(20) NOT NULL,
  `total_expense` decimal(10,2) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `payment_status` enum('PENDING','PAID') NOT NULL,
  `payment_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  MODIFY COLUMN `payment_id` BIGINT AUTO_INCREMENT;