-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: packpacker
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('66cb4abe95a5');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinics`
--

DROP TABLE IF EXISTS `clinics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `clinicLoc` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `ix_clinics_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinics`
--

LOCK TABLES `clinics` WRITE;
/*!40000 ALTER TABLE `clinics` DISABLE KEYS */;
INSERT INTO `clinics` VALUES (1,'SAGE Concord','2055 Meridian Park Blvd','(925) 627-7243','concord@sagecenters.com','2023-09-21 18:27:36','2023-09-21 18:32:02');
/*!40000 ALTER TABLE `clinics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinics_and_procedures`
--

DROP TABLE IF EXISTS `clinics_and_procedures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinics_and_procedures` (
  `clinic_id` int DEFAULT NULL,
  `procedure_id` int DEFAULT NULL,
  KEY `clinic_id` (`clinic_id`),
  KEY `procedure_id` (`procedure_id`),
  CONSTRAINT `clinics_and_procedures_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`),
  CONSTRAINT `clinics_and_procedures_ibfk_2` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinics_and_procedures`
--

LOCK TABLES `clinics_and_procedures` WRITE;
/*!40000 ALTER TABLE `clinics_and_procedures` DISABLE KEYS */;
/*!40000 ALTER TABLE `clinics_and_procedures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instruments`
--

DROP TABLE IF EXISTS `instruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instruments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `onHand` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_instruments_name` (`name`),
  KEY `ix_instruments_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruments`
--

LOCK TABLES `instruments` WRITE;
/*!40000 ALTER TABLE `instruments` DISABLE KEYS */;
INSERT INTO `instruments` VALUES (2,'Dingman Periosteal Elevator','Bendy-tipped scrapy-boi.','https://www.integralife.com/dingman-periosteal-elevator/product/surgical-instruments-hospitals-surgery-centers-tissue-banks-padgett-plastic-reconstructive-surgery-elevator-dingman-periosteal-elevator','2023-09-21 19:57:16',NULL,5),(3,'Mini Hohmann Retractor','Knee-looker-inner','https://www.integralife.com/mini-hohmann-retractor/product/surgical-instruments-miltex-instruments-veterinary-orthopedic-mini-hohmann-retractor','2023-09-21 20:07:11',NULL,1),(4,'Frazier Suction Tip','Comes in a variety of French','https://www.integralife.com/frazier-suction-tube/product/surgical-instruments-hospitals-surgery-centers-tissue-banks-ruggles-redmond-suction-tubes-accessories-frazier-suction-tube','2023-09-21 20:49:59',NULL,1),(5,'Gold-handled Pin Cutters','Gold-handled Pin Cutters','https://surgicalmart.com/shop/orthopedic-instruments/wire-pin-cutters/t-c-wire-pin-cutter-18-5-side-cutting-with-adjustable-bolt-sm3610/','2023-09-23 13:04:43',NULL,0),(6,'Senn Retractor','Rakey-man, grabby-fella, nurse-stabbinator.','','2023-09-26 11:19:22',NULL,5),(7,'Balfour, Baby','Wee baby balfour for openin\' bellies.','','2023-09-26 11:19:44',NULL,1),(8,'Finochetto, small','Cranky-chest crackinator.','','2023-09-26 11:20:10',NULL,1),(9,'Finochetto, medium','Cranky-chest crackinator.','','2023-09-26 11:20:19',NULL,1),(10,'Finochetto, large','Cranky-chest crackinator.','','2023-09-26 11:20:40',NULL,1),(11,'Freer','Frees things','','2023-09-26 11:21:49',NULL,20),(12,'Allis Tissue Forceps','Clamp for hookin\' hoses and saccules','','2023-09-26 11:22:33',NULL,40),(13,'Hemostat, Kelly','All the way','','2023-09-26 11:22:54',NULL,40),(14,'Hemostat, Mosquito','Wee snappy boy','','2023-09-26 11:23:06',NULL,40),(15,'Thumb Forceps, Debakey','Can be holey or un-holey.','','2023-09-26 11:23:25',NULL,20),(16,'Lone Star Retractor','Mark\'s Favorite Toy','','2023-09-26 11:23:40',NULL,2),(17,'Gauze, Square','Gauze','','2023-09-26 21:00:26',NULL,150),(18,'Frazier Tip Suction, 10 Fr','10 Fr Frazier Tip','','2023-09-26 21:01:24',NULL,3),(19,'Frazier Tip Suction, 12 Fr','Frazier Tip Suction 12 Fr','','2023-09-26 21:01:43',NULL,5),(20,'Poole Tip, Curved','Two pieces, inner and outer.','','2023-09-26 21:01:59',NULL,8),(21,'Poole Tip, Straight','Nobody likes these.','','2023-09-26 21:02:10',NULL,5),(22,'Ioban','Skin prep, push to use.','','2023-09-26 21:02:36',NULL,30),(23,'Duraprep','Sterile drape for wrapping legs.','','2023-09-26 21:02:48',NULL,20),(24,'Balfour, CSU','CSU Balfour','','2023-09-26 21:06:16',NULL,1);
/*!40000 ALTER TABLE `instruments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instruments_and_procedures`
--

DROP TABLE IF EXISTS `instruments_and_procedures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instruments_and_procedures` (
  `instrument_id` int DEFAULT NULL,
  `procedure_id` int DEFAULT NULL,
  KEY `instrument_id` (`instrument_id`),
  KEY `procedure_id` (`procedure_id`),
  CONSTRAINT `instruments_and_procedures_ibfk_1` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`),
  CONSTRAINT `instruments_and_procedures_ibfk_2` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruments_and_procedures`
--

LOCK TABLES `instruments_and_procedures` WRITE;
/*!40000 ALTER TABLE `instruments_and_procedures` DISABLE KEYS */;
INSERT INTO `instruments_and_procedures` VALUES (5,1);
/*!40000 ALTER TABLE `instruments_and_procedures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packs`
--

DROP TABLE IF EXISTS `packs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_packs_name` (`name`),
  KEY `ix_packs_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packs`
--

LOCK TABLES `packs` WRITE;
/*!40000 ALTER TABLE `packs` DISABLE KEYS */;
INSERT INTO `packs` VALUES (1,'Ortho Pack','2023-09-21 20:17:35',NULL,NULL),(2,'Arthrex Drill 1','2023-09-23 12:55:21',NULL,NULL),(3,'Arthrex Drill 2','2023-09-23 12:57:15',NULL,NULL),(4,'Basic Pack','2023-09-26 08:17:33',NULL,'Part of every good setup'),(5,'TPLO Complete Set','2023-09-26 10:02:12',NULL,'Instruments, Screws, and plates.'),(6,'TPLO Locking Set','2023-09-26 10:02:27',NULL,'Instruments, Screws, and plates.'),(7,'TPLO Mini Set','2023-09-26 10:02:36',NULL,'Instruments, Screws, and plates.'),(8,'Mini Frag Set','2023-09-26 10:02:54',NULL,'Instruments, Screws, and plates.'),(9,'Small Frag Set','2023-09-26 10:03:00',NULL,'Instruments, Screws, and plates.'),(10,'MicroAire Drill','2023-09-26 10:03:30',NULL,'Instruments, Screws, and plates.'),(11,'TPLO Saw','2023-09-26 10:04:02',NULL,'Saw, hose, 24 blade.'),(12,'Saggital Saw','2023-09-26 10:04:16',NULL,'Saw, hose.'),(13,'Oscillating Saw','2023-09-26 10:04:29',NULL,'Saw, hose.'),(14,'Minor Pack','2023-09-26 10:05:11',NULL,'Blue towel with gauze, needle holders, scissors.'),(15,'Pin Pack','2023-09-26 10:05:34',NULL,'Variety of pins.'),(16,'Back Pack','2023-09-26 10:06:00',NULL,'Stuff and a Hall air drill.'),(17,'Dental Pack','2023-09-26 10:06:16',NULL,'Stuff for dentals.'),(18,'Laparoscopy Tray','2023-09-26 10:06:46',NULL,'Stuff for laparoscopies.'),(19,'Arthroscopy Tray','2023-09-26 10:07:03',NULL,'Stuff for arthroscopies.'),(20,'Scope camera and light source','2023-09-26 10:07:25',NULL,'Scope camera and light source.'),(21,'Arthroscopy Stifle Tray','2023-09-26 10:07:49',NULL,'Instruments for Arthroscopy.'),(22,'1.9 Scope','2023-09-26 10:08:19',NULL,'Scope.'),(23,'2,7 Scope','2023-09-26 10:08:26',NULL,'Scope.'),(24,'Tabletop Plate Bender','2023-09-26 10:08:44',NULL,'Bends plates on the table.'),(25,'Tightrope Pack','2023-09-26 10:09:03',NULL,'Has stuff.'),(26,'K-Wire Pack','2023-09-26 10:09:21',NULL,'Has k-wires of a variety of sizes.'),(27,'Cruciate Crimping Pack','2023-09-26 10:12:11',NULL,'Has stuff.'),(28,'1.5-4.0 Instruments and Plates','2023-09-26 10:12:28',NULL,'Has stuff.');
/*!40000 ALTER TABLE `packs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packs_and_instruments`
--

DROP TABLE IF EXISTS `packs_and_instruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packs_and_instruments` (
  `pack_id` int DEFAULT NULL,
  `instrument_id` int DEFAULT NULL,
  KEY `pack_id` (`pack_id`),
  KEY `instrument_id` (`instrument_id`),
  CONSTRAINT `packs_and_instruments_ibfk_1` FOREIGN KEY (`pack_id`) REFERENCES `packs` (`id`),
  CONSTRAINT `packs_and_instruments_ibfk_2` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packs_and_instruments`
--

LOCK TABLES `packs_and_instruments` WRITE;
/*!40000 ALTER TABLE `packs_and_instruments` DISABLE KEYS */;
INSERT INTO `packs_and_instruments` VALUES (1,2),(1,4);
/*!40000 ALTER TABLE `packs_and_instruments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packs_and_procedures`
--

DROP TABLE IF EXISTS `packs_and_procedures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packs_and_procedures` (
  `pack_id` int DEFAULT NULL,
  `procedure_id` int DEFAULT NULL,
  KEY `pack_id` (`pack_id`),
  KEY `procedure_id` (`procedure_id`),
  CONSTRAINT `packs_and_procedures_ibfk_1` FOREIGN KEY (`pack_id`) REFERENCES `packs` (`id`),
  CONSTRAINT `packs_and_procedures_ibfk_2` FOREIGN KEY (`procedure_id`) REFERENCES `procedures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packs_and_procedures`
--

LOCK TABLES `packs_and_procedures` WRITE;
/*!40000 ALTER TABLE `packs_and_procedures` DISABLE KEYS */;
INSERT INTO `packs_and_procedures` VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `packs_and_procedures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedures`
--

DROP TABLE IF EXISTS `procedures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procedures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedures`
--

LOCK TABLES `procedures` WRITE;
/*!40000 ALTER TABLE `procedures` DISABLE KEYS */;
INSERT INTO `procedures` VALUES (1,'TPLO','Tibial Plateau Leveling Osteotomy','2023-09-21 18:41:48',NULL),(2,'OVH','Spay','2023-09-25 13:53:20',NULL),(3,'Arthroscopy','Using a camera to look at joints.','2023-09-25 13:54:06',NULL),(4,'R/U Fracture Repair','Radial Ulna fracture repair','2023-09-25 13:54:37',NULL),(5,'TPLO MD','Dosch TPLO','2023-09-25 13:54:51',NULL),(6,'TPLO TK','Tiffany TPLO','2023-09-25 13:55:00',NULL),(7,'TPLO MA','Marty TPLO','2023-09-25 13:55:42',NULL),(8,'Femur Fracture','Femur Fracture Repair','2023-09-25 13:55:57',NULL),(9,'Humeral Condylar Fracture','Humeral Condylar Fracture Repair','2023-09-25 13:56:38',NULL);
/*!40000 ALTER TABLE `procedures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_users_email` (`email`),
  KEY `ix_users_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_and_clinics`
--

DROP TABLE IF EXISTS `users_and_clinics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_and_clinics` (
  `clinic_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  KEY `clinic_id` (`clinic_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `users_and_clinics_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`),
  CONSTRAINT `users_and_clinics_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_and_clinics`
--

LOCK TABLES `users_and_clinics` WRITE;
/*!40000 ALTER TABLE `users_and_clinics` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_and_clinics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26 21:14:37
