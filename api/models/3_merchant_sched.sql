USE reservo;

CREATE TABLE `merchant_sched` (
  `sched_id` bigint(20) NOT NULL,
  `settings` varchar(255) DEFAULT NULL,
  `sched_status` int(11) NOT NULL,
  `time_open` datetime NOT NULL,
  `time_closed` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `merchant_sched`
  ADD PRIMARY KEY (`sched_id`);