
USE reservo;

/*Feedback needs the following (in order):
 > account.sql
*/

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