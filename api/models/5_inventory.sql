USE reservo;

/*Inventory needs the following (in order):
 > merchant_sched.sql
 > merchant_sql
*/

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