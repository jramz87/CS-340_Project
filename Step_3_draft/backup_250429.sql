/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.27-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_ramirj22
-- ------------------------------------------------------
-- Server version	10.11.11-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bikes`
--

DROP TABLE IF EXISTS `Bikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bikes` (
  `bikeID` int(11) NOT NULL AUTO_INCREMENT,
  `color` enum('Black','White','Red','Blue','Green','Pink','Purple','Yellow','Orange','Silver','Other') NOT NULL,
  `style` enum('Mountain','Road','Fat','Hybrid','Enduro','BMX','Cruiser','Kids','Electric') NOT NULL,
  `brand` varchar(45) NOT NULL,
  `status` enum('In Repair','In Review','For Sale','Sold') NOT NULL,
  `dateReceived` date NOT NULL,
  PRIMARY KEY (`bikeID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bikes`
--

LOCK TABLES `Bikes` WRITE;
/*!40000 ALTER TABLE `Bikes` DISABLE KEYS */;
INSERT INTO `Bikes` VALUES (1,'Pink','Mountain','Santa Cruz','Sold','2024-08-15'),(2,'Red','Road','Cannondale','For Sale','2024-12-20'),(3,'Black','Electric','Aventon','In Review','2025-02-03'),(4,'Green','Cruiser','Trek','Sold','2025-02-10'),(5,'Red','Enduro','Crew','Sold','2025-02-15'),(6,'Other','Kids','Trek','In Repair','2025-02-28'),(7,'White','Hybrid','Specialized','Sold','2025-03-01'),(8,'Black','Mountain','Felt','In Repair','2025-03-22');
/*!40000 ALTER TABLE `Bikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Contacts` (
  `contactID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`contactID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (1,'Klaus','Von Hellman','305-278-2483','klausv@oaklaura-bikes.com'),(2,'Hilary','Smith','462-384-2333','hilarys@oaklaura-bikes.com'),(3,'Jennifer','Valdez','305-989-3455','jenval@hotmail.com'),(4,'Joe','Wright','303-258-2333','justjoe@gmail.com'),(5,'Damian','Malloy','416-222-8888','dammal@hotmail.com'),(6,'Tabitha','Chen','233-377-8883','tchen@gmail.com'),(7,'Tom','Truss','495-333-2345','tom@aol.com'),(8,'Adea','Remmington','303-646-9288','adea@biscuits.com'),(9,'Joe','Johnson','453-197-4228','j.johnson@yahoo.com');
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `contactID` int(11) NOT NULL,
  `receiveNewsletter` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customerID`),
  KEY `contactID` (`contactID`),
  CONSTRAINT `Customers_ibfk_1` FOREIGN KEY (`contactID`) REFERENCES `Contacts` (`contactID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,3,0),(2,4,1),(3,7,1),(4,8,0);
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RepairReports`
--

DROP TABLE IF EXISTS `RepairReports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RepairReports` (
  `repairID` int(11) NOT NULL AUTO_INCREMENT,
  `personnelID` int(11) NOT NULL,
  `dateRepaired` date NOT NULL,
  `hoursSpent` decimal(4,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `bikeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`repairID`),
  KEY `bikeID` (`bikeID`),
  KEY `personnelID` (`personnelID`),
  CONSTRAINT `RepairReports_ibfk_1` FOREIGN KEY (`bikeID`) REFERENCES `Bikes` (`bikeID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `RepairReports_ibfk_2` FOREIGN KEY (`personnelID`) REFERENCES `StorePersonnel` (`personnelID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RepairReports`
--

LOCK TABLES `RepairReports` WRITE;
/*!40000 ALTER TABLE `RepairReports` DISABLE KEYS */;
INSERT INTO `RepairReports` VALUES (1,3,'2024-08-30',3.00,'flushed brakes, replaced chain and cleaned',1),(2,1,'2024-09-02',0.50,'Employee review, bike approved for sale',1),(3,5,'2024-10-01',5.00,'patched damaged inner tubes (q=12)',NULL),(4,2,'2025-01-03',3.00,'Replaced pedals and performed employee review: approved for sale',2),(5,1,'2025-02-15',0.50,'Bike received in good condition, cleaned and reviewed: approved for sale',4),(6,3,'2025-02-15',2.00,'retuned derailluer and cleaned, ready for review',3),(7,1,'2025-02-16',0.25,'Bike received new: approved for sale',5),(8,2,'2025-03-01',0.25,'bike arrived new, approved for sale',7);
/*!40000 ALTER TABLE `RepairReports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesReports`
--

DROP TABLE IF EXISTS `SalesReports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SalesReports` (
  `salesID` int(11) NOT NULL AUTO_INCREMENT,
  `bikeID` int(11) NOT NULL,
  `dateSold` date NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `customerID` int(11) NOT NULL,
  PRIMARY KEY (`salesID`),
  UNIQUE KEY `bikeID` (`bikeID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `SalesReports_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON UPDATE CASCADE,
  CONSTRAINT `SalesReports_ibfk_2` FOREIGN KEY (`bikeID`) REFERENCES `Bikes` (`bikeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesReports`
--

LOCK TABLES `SalesReports` WRITE;
/*!40000 ALTER TABLE `SalesReports` DISABLE KEYS */;
INSERT INTO `SalesReports` VALUES (1,5,'2025-02-22',459.00,1),(2,4,'2025-02-22',999.97,1),(3,1,'2025-03-02',999.99,2),(4,7,'2025-03-15',649.00,4);
/*!40000 ALTER TABLE `SalesReports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StorePersonnel`
--

DROP TABLE IF EXISTS `StorePersonnel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StorePersonnel` (
  `personnelID` int(11) NOT NULL AUTO_INCREMENT,
  `role` enum('Employee','Volunteer') NOT NULL,
  `contactID` int(11) NOT NULL,
  PRIMARY KEY (`personnelID`),
  KEY `contactID` (`contactID`),
  CONSTRAINT `StorePersonnel_ibfk_1` FOREIGN KEY (`contactID`) REFERENCES `Contacts` (`contactID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StorePersonnel`
--

LOCK TABLES `StorePersonnel` WRITE;
/*!40000 ALTER TABLE `StorePersonnel` DISABLE KEYS */;
INSERT INTO `StorePersonnel` VALUES (1,'Employee',1),(2,'Employee',2),(3,'Volunteer',4),(4,'Volunteer',5),(5,'Volunteer',6);
/*!40000 ALTER TABLE `StorePersonnel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_cascade`
--

DROP TABLE IF EXISTS `child_cascade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `child_cascade` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `info` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `child_cascade_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parent` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_cascade`
--

LOCK TABLES `child_cascade` WRITE;
/*!40000 ALTER TABLE `child_cascade` DISABLE KEYS */;
INSERT INTO `child_cascade` VALUES (101,1,'Child with CASCADE');
/*!40000 ALTER TABLE `child_cascade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_no_action`
--

DROP TABLE IF EXISTS `child_no_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `child_no_action` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `info` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `child_no_action_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parent` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_no_action`
--

LOCK TABLES `child_no_action` WRITE;
/*!40000 ALTER TABLE `child_no_action` DISABLE KEYS */;
INSERT INTO `child_no_action` VALUES (301,1,'Child with no action specified');
/*!40000 ALTER TABLE `child_no_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_restrict`
--

DROP TABLE IF EXISTS `child_restrict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `child_restrict` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `info` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `child_restrict_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parent` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_restrict`
--

LOCK TABLES `child_restrict` WRITE;
/*!40000 ALTER TABLE `child_restrict` DISABLE KEYS */;
INSERT INTO `child_restrict` VALUES (201,1,'Child with RESTRICT');
/*!40000 ALTER TABLE `child_restrict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent`
--

DROP TABLE IF EXISTS `parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parent` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
INSERT INTO `parent` VALUES (1,'Parent Record');
/*!40000 ALTER TABLE `parent` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-29 17:41:21
