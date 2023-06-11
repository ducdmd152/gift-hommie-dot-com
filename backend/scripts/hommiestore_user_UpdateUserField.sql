-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hommiestore
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(320) NOT NULL,
  `role_id` int DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(80) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `yob` int DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  `address` varchar(400) DEFAULT NULL,
  `ward_id` int DEFAULT NULL,
  `enabled` tinyint DEFAULT '1',
  `gender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `usename_UNIQUE` (`username`),
  KEY `fk_user_role_idx` (`role_id`),
  KEY `fk_user_to_role_idx` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('adamgoodwin@example.org',1,'Tôi là Thượng Đế','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Khách Hàng là','Khách Hàng là','0123456789',2021,NULL,NULL,NULL,1,'Male'),('ambermassey@example.org',1,'AaronLucas','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Khách Hàng là','Thượng Đế haha','0123456789',2021,NULL,NULL,NULL,1,'Male'),('andrea38@example.com',2,'ElizabethSmith','ElizabethSmith','David','Wilson',NULL,NULL,NULL,NULL,NULL,1,'Male'),('ashleypowell@example.net',2,'RebeccaWilson','RebeccaWilson','Kristen','Phillips',NULL,NULL,NULL,NULL,NULL,1,'Male'),('carolthompson@example.com',2,'MatthewLe','MatthewLe','Nathan','Miller',NULL,NULL,NULL,NULL,NULL,1,'Male'),('ccarney@example.com',2,'ChasePhillips','ChasePhillips','Richard','Gonzales',NULL,NULL,NULL,NULL,NULL,1,'Male'),('csanchez@example.com',2,'JamesNguyen','JamesNguyen','Dennis','Wolf',NULL,NULL,NULL,NULL,NULL,1,'Male'),('customer@gmail.com',1,'customer','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Khách Hàng là','Thượng Đế','0123456789',2021,NULL,NULL,NULL,1,'Male'),('djohnson@example.net',2,'TylerSantiago','TylerSantiago','Joshua','Lowery',NULL,NULL,NULL,NULL,NULL,1,'Female'),('duyduc@gmail.com',2,'duyduc','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Duy','Đức','0934968393',2002,NULL,NULL,NULL,1,'Female'),('eatonamanda@example.com',2,'TimothyHernandez','TimothyHernandez','Sandra','Spears',NULL,NULL,NULL,NULL,NULL,1,'Female'),('fweiss@example.net',2,'CassidyJohnson','CassidyJohnson','Jennifer','Ruiz',NULL,NULL,NULL,NULL,NULL,1,'Female'),('goldenantonio@example.org',2,'MichaelTodd','MichaelTodd','Shawn','Ware',NULL,NULL,NULL,NULL,NULL,1,'Female'),('grantmichael@example.net',2,'TaylorColon','TaylorColon','Joseph','Carlson',NULL,NULL,NULL,NULL,NULL,1,'Female'),('jameswilliams@example.com',2,'JosephHicks','JosephHicks','Duane','Ferrell',NULL,NULL,NULL,NULL,NULL,1,'Female'),('jasmineking@example.org',2,'MitchellFields','MitchellFields','Pamela','Bell',NULL,NULL,NULL,NULL,NULL,1,'Female'),('jason16@example.org',2,'MelissaJones','MelissaJones','Miguel','Phillips',NULL,NULL,NULL,NULL,NULL,1,'Female'),('john17@example.org',2,'AnthonyBoyd','AnthonyBoyd','Victor','Santiago',NULL,NULL,NULL,NULL,NULL,1,'Female'),('karengutierrez@example.com',2,'EileenMelendez','EileenMelendez','Zoe','Day',NULL,NULL,NULL,NULL,NULL,1,'Female'),('lindsay30@example.com',2,'NatashaWheeler','NatashaWheeler','Dean','Cooper',NULL,NULL,NULL,NULL,NULL,1,'Other'),('manager@gmail.com',3,'manager','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Manager',NULL,NULL,NULL,NULL,NULL,NULL,1,'Other'),('marquezelizabeth@example.com',2,'LisaBell','LisaBell','Valerie','Jones',NULL,NULL,NULL,NULL,NULL,1,NULL),('matthew92@example.org',2,'JustinNewton','JustinNewton','Ashley','Valencia',NULL,NULL,NULL,NULL,NULL,1,NULL),('michael40@example.org',2,'RichardSullivan','RichardSullivan','Barbara','Griffith',NULL,NULL,NULL,NULL,NULL,1,NULL),('mtorres@example.org',2,'ManuelCox','ManuelCox','Robert','Howard',NULL,NULL,NULL,NULL,NULL,1,NULL),('navarroronald@example.net',2,'KimberlyStanley','KimberlyStanley','Scott','Rogers',NULL,NULL,NULL,NULL,NULL,1,NULL),('ochandler@example.net',2,'NicholasFischer','NicholasFischer','Emily','Alvarado',NULL,NULL,NULL,NULL,NULL,1,NULL),('oritter@example.com',2,'StephanieJones','StephanieJones','Donald','Stone',NULL,NULL,NULL,NULL,NULL,1,NULL),('oscott@example.net',2,'KevinLamb','KevinLamb','Adam','Hughes',NULL,NULL,NULL,NULL,NULL,1,NULL),('payala@example.net',2,'AnthonyLopez','AnthonyLopez','Luke','Daniel',NULL,NULL,NULL,NULL,NULL,1,NULL),('petersonjames@example.net',2,'PaulLivingston','PaulLivingston','Kelsey','Spencer',NULL,NULL,NULL,NULL,NULL,1,NULL),('ryan32@example.org',2,'RitaLynch','RitaLynch','Robin','Williams',NULL,NULL,NULL,NULL,NULL,1,NULL),('shepardaaron@example.org',2,'AmberBrock','AmberBrock','Karen','Lawrence',NULL,NULL,NULL,NULL,NULL,1,NULL),('staff@gmail.com',2,'staff','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Staff',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('torresaaron@example.net',2,'BrittanyObrien','BrittanyObrien','Timothy','Rogers',NULL,NULL,NULL,NULL,NULL,1,NULL),('wgonzalez@example.com',2,'VanessaEstrada','VanessaEstrada','Ryan','Martin',NULL,NULL,NULL,NULL,NULL,1,NULL),('wonglynn@example.com',2,'MeganWolfe','MeganWolfe','Jason','Parsons',NULL,NULL,NULL,NULL,NULL,1,NULL),('woodsamy@example.net',2,'LawrenceCummings','LawrenceCummings','Cheryl','Smith',NULL,NULL,NULL,NULL,NULL,1,NULL),('wswanson@example.com',2,'JacquelineWilson','JacquelineWilson','Carrie','Goodman',NULL,NULL,NULL,NULL,NULL,1,NULL),('xle@example.com',2,'KimberlyObrien','KimberlyObrien','Kathleen','Ford',NULL,NULL,NULL,NULL,NULL,1,NULL),('yhansen@example.net',2,'KennethJohnson','KennethJohnson','Leonard','Alexander',NULL,NULL,NULL,NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-11  0:14:21
