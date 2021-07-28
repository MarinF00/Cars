-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2021 at 04:39 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cars`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CarsAddOrEdit` (IN `_id` INT, IN `_name` VARCHAR(45), IN `_model` VARCHAR(45), IN `_year` INT, IN `_color` VARCHAR(45), IN `_description` VARCHAR(240), IN `_photo` VARCHAR(45), IN `_user_id` INT)  BEGIN
IF _id = 0 THEN
INSERT INTO cars(name,model,year,color,description,photo,user_id)
VALUES (_name,_model,_year,_color,_description,_photo,_user_id);
SET _id = last_insert_id();
ELSE
UPDATE cars
SET
name = _name,
model = _model,
year = _year,
color = _color,
description = _description,
photo = _photo,
user_id = _user_id
WHERE id = _id;
END IF;
SELECT _id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UsersAddOrEdit` (IN `_id` INT, IN `_first_name` VARCHAR(45), IN `_last_name` VARCHAR(45), IN `_email` VARCHAR(45), IN `_password` VARCHAR(45))  BEGIN
IF _id = 0 THEN
INSERT INTO users(first_name,last_name,email,password)
VALUES (_first_name,_last_name,_email,_password);
SET _id = last_insert_id();
ELSE
UPDATE users
SET
first_name = _first_name,
last_name = _last_name,
email = _email,
password = _password
WHERE id = _id;
END IF;
SELECT _id AS 'id';
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `name` varchar(240) COLLATE utf8_bin NOT NULL,
  `model` varchar(240) COLLATE utf8_bin NOT NULL,
  `year` int(11) NOT NULL,
  `color` varchar(240) COLLATE utf8_bin NOT NULL,
  `description` varchar(240) COLLATE utf8_bin NOT NULL,
  `photo` varchar(240) COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `name`, `model`, `year`, `color`, `description`, `photo`, `user_id`) VALUES
(1, 'Toyota', 'Corolla', 2006, 'Black', 'Cherna gotina kola', 'https://lh3.googleusercontent.com/proxy/L_yCNZewNJxn0k3HDn7lz-USs_A47WS-PQdalQsQQowYhXWIZ_6c--uSPN6lUzP7qvRuxdpXVXmr4tQhqI5Xt9BMbYgbxbkLlY38bO8Kn76bw9y22SalxIRet3dnaxMv4bL0SUoXT_El0c-OFZNDZY_Hc2jgBQ66AJ9m4vF6WlkdgRiTvsjAFQ83M8zk', 4),
(2, 'Ferarri', 'F40', 2021, 'Red', 'Cherna gotina kola', 'https://lh3.googleusercontent.com/proxy/L_yCNZewNJxn0k3HDn7lz-USs_A47WS-PQdalQsQQowYhXWIZ_6c--uSPN6lUzP7qvRuxdpXVXmr4tQhqI5Xt9BMbYgbxbkLlY38bO8Kn76bw9y22SalxIRet3dnaxMv4bL0SUoXT_El0c-OFZNDZY_Hc2jgBQ66AJ9m4vF6WlkdgRiTvsjAFQ83M8zk', 5),
(3, 'Audi', 'A9', 2013, 'Black', 'Cherna gotina kola', 'https://lh3.googleusercontent.com/proxy/L_yCNZewNJxn0k3HDn7lz-USs_A47WS-PQdalQsQQowYhXWIZ_6c--uSPN6lUzP7qvRuxdpXVXmr4tQhqI5Xt9BMbYgbxbkLlY38bO8Kn76bw9y22SalxIRet3dnaxMv4bL0SUoXT_El0c-OFZNDZY_Hc2jgBQ66AJ9m4vF6WlkdgRiTvsjAFQ83M8zk', 4),
(4, 'Mercedes', 'CLK', 2010, 'Silver', 'Cherna gotina kola', 'https://lh3.googleusercontent.com/proxy/L_yCNZewNJxn0k3HDn7lz-USs_A47WS-PQdalQsQQowYhXWIZ_6c--uSPN6lUzP7qvRuxdpXVXmr4tQhqI5Xt9BMbYgbxbkLlY38bO8Kn76bw9y22SalxIRet3dnaxMv4bL0SUoXT_El0c-OFZNDZY_Hc2jgBQ66AJ9m4vF6WlkdgRiTvsjAFQ83M8zk', 4),
(5, 'Dacia', 'Spring', 2021, 'Blue', 'Cherna gotina kola', 'https://lh3.googleusercontent.com/proxy/L_yCNZewNJxn0k3HDn7lz-USs_A47WS-PQdalQsQQowYhXWIZ_6c--uSPN6lUzP7qvRuxdpXVXmr4tQhqI5Xt9BMbYgbxbkLlY38bO8Kn76bw9y22SalxIRet3dnaxMv4bL0SUoXT_El0c-OFZNDZY_Hc2jgBQ66AJ9m4vF6WlkdgRiTvsjAFQ83M8zk', 4),
(10, 'Hallo', 'hallo', 1, 's', 'Cherna gotina kola', 'https://lh3.googleusercontent.com/proxy/L_yCNZewNJxn0k3HDn7lz-USs_A47WS-PQdalQsQQowYhXWIZ_6c--uSPN6lUzP7qvRuxdpXVXmr4tQhqI5Xt9BMbYgbxbkLlY38bO8Kn76bw9y22SalxIRet3dnaxMv4bL0SUoXT_El0c-OFZNDZY_Hc2jgBQ66AJ9m4vF6WlkdgRiTvsjAFQ83M8zk', 5),
(11, 'Marin', 'Marin', 2990, 'Silver', 'Cherna gotina kola', 'https://lh3.googleusercontent.com/proxy/L_yCNZewNJxn0k3HDn7lz-USs_A47WS-PQdalQsQQowYhXWIZ_6c--uSPN6lUzP7qvRuxdpXVXmr4tQhqI5Xt9BMbYgbxbkLlY38bO8Kn76bw9y22SalxIRet3dnaxMv4bL0SUoXT_El0c-OFZNDZY_Hc2jgBQ66AJ9m4vF6WlkdgRiTvsjAFQ83M8zk', 5),
(12, 'test', 'test', 2222222, 'TEST', 'Cherna gotina kola', 'https://lh3.googleusercontent.com/proxy/L_yCNZewNJxn0k3HDn7lz-USs_A47WS-PQdalQsQQowYhXWIZ_6c--uSPN6lUzP7qvRuxdpXVXmr4tQhqI5Xt9BMbYgbxbkLlY38bO8Kn76bw9y22SalxIRet3dnaxMv4bL0SUoXT_El0c-OFZNDZY_Hc2jgBQ66AJ9m4vF6WlkdgRiTvsjAFQ83M8zk', 5),
(14, 'Toyota', 'Yaris', 2000, 'Red', '', '', 4),
(15, 'Marin', 'Gotin', 2000, 'Red', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen ', 'https://www.marin.nl/__static_assets/images/seo/og-image.jpg', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(250) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(250) COLLATE utf8_bin NOT NULL,
  `email` varchar(240) COLLATE utf8_bin NOT NULL,
  `password` varchar(240) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(4, 'Marin', 'Filipov', 'Marin@gmail.com', '1234'),
(5, 'Ivan', 'Hello', 'hello@abv.bg', 'hello'),
(6, 'Mar1nF', 'Filipov', 'hello@abv.bg', '1234'),
(7, 'test', 'test', 'test@abv.bg', 'test'),
(8, 'asd', 'asd', 'asd@abv.bg', 'asdsa'),
(9, 'hello', 'world', 'world@abv.bg', 'world'),
(10, 'sadsa', 'dsadsad', 'asdasd@abv.bg', '123454672'),
(11, 'My', 'Name', 'Email@email.com', '2222'),
(12, 'My', 'Name', 'Email@email.com', '2222'),
(13, 'asdasd', 'asdasdasd', 'asdsd@abv.bg', '1234'),
(14, 'Joe', 'Johnson', 'j.johnson@example.com', 'Marin123'),
(15, '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
