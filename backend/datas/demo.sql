-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: graphql_demo
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `createdAt` timestamp(6) NULL DEFAULT NULL,
  `updatedAt` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'1234','1234',NULL,NULL),(2,'1234','1234',NULL,NULL),(3,'1234','1234',NULL,NULL),(4,'1234','1234',NULL,NULL),(5,'1234','1234',NULL,NULL),(6,'1234','1234',NULL,NULL),(7,'1234','1234',NULL,NULL),(8,'1234','1234',NULL,NULL),(9,'1234','1234',NULL,NULL),(10,'1234','1234',NULL,NULL),(11,'1234','1234',NULL,NULL),(12,'5','1234',NULL,'2019-12-27 06:37:29.000000'),(13,'4','1234',NULL,'2019-12-27 06:37:20.000000'),(16,'3','3',NULL,'2019-12-27 06:37:26.000000'),(17,'2','C',NULL,'2019-12-27 06:37:13.000000'),(21,'1','oooo','2019-12-27 04:54:38.000000','2019-12-27 06:37:10.000000');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `address` longtext NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` timestamp(6) NULL DEFAULT NULL,
  `updatedAt` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','柚須 柚須160番地1号 アイタス福岡903号室','ディ','グエントロン',NULL,'2019-12-24 01:24:41.000000','2019-12-24 01:24:41.000000'),(2,'admin1','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','柚須 柚須160番地1号 アイタス福岡903号室','ディ','グエントロン',NULL,'2019-12-27 04:21:27.000000','2019-12-27 04:21:27.000000'),(3,'admin2','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','ngõ  75 Hồ Tùng Mậu','Duy','Nguyễn',NULL,'2019-12-27 04:33:00.000000','2019-12-27 04:33:00.000000'),(4,'admin3','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','hồng nam- hưng yên- hưng yên','nguyễn','duy',NULL,'2019-12-27 04:37:04.000000','2019-12-27 04:37:04.000000'),(5,'admin4','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','hồng nam- hưng yên- hưng yên','nguyễn','duy',NULL,'2019-12-27 04:41:30.000000','2019-12-27 04:41:30.000000'),(6,'admin5','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','hồng nam- hưng yên- hưng yên','nguyễn','duy',NULL,'2019-12-27 04:44:03.000000','2019-12-27 04:44:03.000000'),(7,'admin6','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','hồng nam- hưng yên- hưng yên','nguyễn','duy',NULL,'2019-12-27 04:44:22.000000','2019-12-27 04:44:22.000000'),(8,'admin7','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','柚須 柚須160番地1号 アイタス福岡903号室','ディ','グエントロン',NULL,'2019-12-27 04:45:41.000000','2019-12-27 04:45:41.000000'),(9,'admin8','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','柚須 柚須160番地1号 アイタス福岡903号室','ディ','グエントロン',NULL,'2019-12-27 04:46:12.000000','2019-12-27 04:46:12.000000'),(10,'admin9','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','柚須 柚須160番地1号 アイタス福岡903号室','ディ','グエントロン',NULL,'2019-12-27 04:48:28.000000','2019-12-27 04:48:28.000000'),(11,'admin10','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','柚須 柚須160番地1号 アイタス福岡903号室','ディ','グエントロン',NULL,'2019-12-27 04:53:13.000000','2019-12-27 04:53:13.000000');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-27 17:34:54
