
USE reservo;

ALTER TABLE `payment`
  ADD KEY `reservation_id` (`reservation_id`);

ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`);