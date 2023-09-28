-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: packpacker
-- ------------------------------------------------------
-- Server version	8.0.34

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
INSERT INTO `alembic_version` VALUES ('a867d3bd5d86');
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
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruments`
--

LOCK TABLES `instruments` WRITE;
/*!40000 ALTER TABLE `instruments` DISABLE KEYS */;
INSERT INTO `instruments` VALUES (2,'Dingman Periosteal Elevator','Bendy-tipped scrapy-boi.','https://www.integralife.com/dingman-periosteal-elevator/product/surgical-instruments-hospitals-surgery-centers-tissue-banks-padgett-plastic-reconstructive-surgery-elevator-dingman-periosteal-elevator','2023-09-21 19:57:16',NULL,5),(3,'Mini Hohmann Retractor','Knee-looker-inner','https://www.integralife.com/mini-hohmann-retractor/product/surgical-instruments-miltex-instruments-veterinary-orthopedic-mini-hohmann-retractor','2023-09-21 20:07:11',NULL,1),(4,'Suction, Frazier Tip, 8 Fr','8 Fr Frazier Tip','https://www.integralife.com/frazier-suction-tube/product/surgical-instruments-hospitals-surgery-centers-tissue-banks-ruggles-redmond-suction-tubes-accessories-frazier-suction-tube','2023-09-21 20:49:59','2023-09-27 21:31:38',1),(5,'Pin Cutters, Gold-handled','Gold-handled Pin Cutters','https://surgicalmart.com/shop/orthopedic-instruments/wire-pin-cutters/t-c-wire-pin-cutter-18-5-side-cutting-with-adjustable-bolt-sm3610/','2023-09-23 13:04:43','2023-09-27 21:30:11',5),(6,'Retractor, Senn','Rakey-man, grabby-fella, nurse-stabbinator.','','2023-09-26 11:19:22','2023-09-27 21:30:19',20),(7,'Retractor, Balfour, Baby','Small belly-spreader','string','2023-09-26 11:19:44','2023-09-27 20:58:46',4),(8,'Retractor, Finochetto, small','Cranky-chest crackinator.','','2023-09-26 11:20:10','2023-09-27 21:30:30',3),(9,'Retractor, Finochetto, medium','Cranky-chest crackinator.','','2023-09-26 11:20:19','2023-09-27 21:30:24',30),(10,'Retractor, Finochetto, large','Cranky-chest crackinator.','','2023-09-26 11:20:40','2023-09-27 21:30:26',5),(11,'Elevator, Freer','Frees things','','2023-09-26 11:21:49','2023-09-28 11:15:39',20),(12,'Forceps, Carmalt','Carmalts','','2023-09-26 11:22:33','2023-09-28 11:10:01',40),(13,'Hemostat, Kelly, Curved','All the way','','2023-09-26 11:22:54','2023-09-28 11:07:40',40),(14,'Hemostat, Mosquito','Wee snappy boy','','2023-09-26 11:23:06',NULL,40),(15,'Thumb Forceps, Debakey','Can be holey or un-holey.','','2023-09-26 11:23:25',NULL,20),(16,'Lone Star Retractor','Mark\'s Favorite Toy','','2023-09-26 11:23:40',NULL,2),(17,'Gauze, 4x4','Gauze','','2023-09-26 21:00:26','2023-09-27 21:32:15',150),(18,'Frazier Tip Suction, 10 Fr','10 Fr Frazier Tip','','2023-09-26 21:01:24',NULL,3),(19,'Frazier Tip Suction, 12 Fr','Frazier Tip Suction 12 Fr','','2023-09-26 21:01:43',NULL,5),(20,'Suction, Poole Tip, Curved','Two pieces, inner and outer.','','2023-09-26 21:01:59','2023-09-27 21:32:04',8),(21,'Suction, Poole Tip, Straight','Nobody likes these.','','2023-09-26 21:02:10','2023-09-27 21:32:09',5),(23,'Duraprep','Sterile drape for wrapping legs.','','2023-09-26 21:02:48','2023-09-27 21:39:33',30),(24,'Retractor, Balfour, CSU','CSU Balfour','','2023-09-26 21:06:16','2023-09-27 21:39:19',3),(25,'Forceps, Rongeur, Double Action','Grabby-fellas','','2023-09-27 08:50:12','2023-09-28 11:19:39',20),(26,'Needle Driver, Baumgartner','The ones without scissors.','','2023-09-27 08:52:39',NULL,20),(27,'Needle Driver, Olsen-Hegar','The ones with scissors.','','2023-09-27 08:53:49',NULL,20),(28,'Osteotome','Variety size','','2023-09-27 08:54:29',NULL,10),(29,'Scissors, Metzenbaum, Large','Dissecting scissors.','','2023-09-27 08:54:59','2023-09-28 11:08:07',20),(30,'Scissors, Mayo','More scissors','','2023-09-27 08:55:32',NULL,10),(31,'Scissors, Sharp-Blunt','For cutting drapes.','','2023-09-27 08:55:50',NULL,10),(32,'Thumb Forceps, Rat-tooth','Pinchy grabbers','','2023-09-27 08:56:27',NULL,40),(33,'Thumb Forceps, Brown Adson','The usual grabbers','','2023-09-27 08:57:00',NULL,30),(34,'Pliers','Pliers','','2023-09-27 08:57:48',NULL,2),(35,'Pin Puller','Pin puller','','2023-09-27 08:57:58',NULL,15),(36,'Cerclage Wire','Cerclage Wire, variety sizes','','2023-09-27 08:58:15',NULL,1),(37,'Hobby Saw','Saws stuff','','2023-09-27 08:58:37',NULL,5),(38,'Gigli Wire','Gigli Wire','','2023-09-27 08:58:49',NULL,5),(39,'Loop Cerclage Wire','Variety Size','','2023-09-27 08:59:01',NULL,20),(40,'Arthrex Wires','Variety sizes','','2023-09-27 08:59:17',NULL,10),(41,'Pin Cutter, Dyke','Wire cutters that are sideways.','','2023-09-27 09:00:26',NULL,5),(42,'Pin Cutter, End-On','The ones Marty likes.','','2023-09-27 09:00:44',NULL,5),(43,'Wire Twister','Twists wire','','2023-09-27 09:00:57',NULL,2),(44,'Wire Passer','Passes wire','','2023-09-27 09:01:09',NULL,2),(45,'Bone Rasp','Rasps bone','','2023-09-27 09:01:22',NULL,10),(46,'Hand Chuck','Screws Stuff In?','','2023-09-27 09:01:43','2023-09-27 21:33:05',2),(47,'Stockinette, 2\"','Stockinette, 2\"','','2023-09-27 09:02:17',NULL,10),(48,'Stockinette, 4\"','Stockinette, 4\"','','2023-09-27 09:02:26',NULL,10),(49,'Stockinette, 6\"','Stockinette, 6\"','','2023-09-27 09:02:38',NULL,10),(50,'Vetwrap and Foil, 2\"','Vetwrap and Foil, 2\"','','2023-09-27 09:02:51',NULL,10),(51,'Vetwrap and Foil, 4\"','Vetwrap and Foil, 4\"','','2023-09-27 09:03:01',NULL,10),(52,'Towel Clamp','Towel Clamp','','2023-09-27 09:03:24',NULL,40),(53,'Cotton-Tipped Applicator','A pack of sterile q-tips','','2023-09-27 09:03:45',NULL,20),(54,'Penrose Drain','Penrose Drain','','2023-09-27 09:03:58',NULL,10),(55,'Tongue Depressor','Sterile tongue blades','','2023-09-27 09:04:14',NULL,20),(56,'Drill Bit, 1.1','Drill Bit, 1.1','','2023-09-27 09:04:35',NULL,2),(57,'Drill Tap, 1.1','Drill Tap, 1.1','','2023-09-27 09:04:45',NULL,2),(58,'Drill Tap, 1.5','Drill Tap, 1.5','','2023-09-27 09:05:00',NULL,5),(59,'Drill Bit, 1.5','Drill Bit, 1.5','','2023-09-27 09:05:11',NULL,5),(60,'Drill Bit, 1.8','Drill Bit, 1.8','','2023-09-27 09:05:24',NULL,2),(61,'Drill Bit, 2.7','Drill Bit, 2.7','','2023-09-27 09:06:44',NULL,3),(62,'Drill Bit, 2.8','Drill Bit, 2.8','','2023-09-27 09:06:55',NULL,5),(63,'Drill Bit, 3.2','Drill Bit, 3.2','','2023-09-27 09:07:22',NULL,5),(64,'Drill Bit, 3.5','Drill Bit, 3.5','','2023-09-27 09:07:31',NULL,5),(65,'Drill Bit, 4.0','Drill Bit, 4.0','','2023-09-27 09:07:41',NULL,5),(66,'Drill Bit, 4.5','Drill Bit, 4.5','','2023-09-27 09:07:49',NULL,5),(67,'Drill Bit, 2.5','Drill Bit, 2.5','','2023-09-27 09:07:59',NULL,5),(68,'Drill Tap, 3.5','Drill Tap, 3.5','','2023-09-27 09:08:10',NULL,5),(69,'Drill Bit, Cannulated, 2.7','Drill Bit, Cannulated, 2.7','','2023-09-27 09:08:27',NULL,2),(70,'Drill Bit, Cannulated, 3.5','Drill Bit, Cannulated, 3.5','','2023-09-27 09:08:35',NULL,2),(71,'Gelpi, small','The babiest gelpis','','2023-09-27 09:09:01',NULL,20),(72,'Gelpi, medium','An in-betweener Gelpi.','','2023-09-27 09:09:20',NULL,40),(73,'Gelpi, large','The big boy','','2023-09-27 09:09:29',NULL,40),(74,'Handle, Quick Coupling','Quick-coupling handle','','2023-09-27 09:09:55',NULL,3),(75,'Lap Pad','Lap pads to mop up lots of stuff','','2023-09-27 09:10:13',NULL,50),(76,'Graft Cup','Sterile cups for mixing','','2023-09-27 09:10:38',NULL,10),(77,'Bone Anchor','I honestly have no idea what this does.','','2023-09-27 09:10:52',NULL,5),(78,'Pin, Toggle','This toggles stuff? I don\'t know what this does either.','','2023-09-27 09:11:17',NULL,20),(79,'Screwdriver, T8','T8 Screwdriver','','2023-09-27 09:46:46',NULL,2),(80,'Screwdriver, T15','T15 Screwdriver','','2023-09-27 09:47:10',NULL,2),(81,'Screwdriver, Tip, T8','T8 Screwdriver Tip','','2023-09-27 09:47:36',NULL,5),(82,'Screwdriver, Tip, T15','T15 Screwdriver Tip','','2023-09-27 09:47:49',NULL,5),(83,'Blade, 10','10 blade','','2023-09-27 09:48:34',NULL,50),(84,'Blade, 11','11 Blade','','2023-09-27 09:58:33',NULL,50),(85,'Blade, 15','15 Blade','','2023-09-27 09:58:42',NULL,50),(86,'Blade, TPLO, 24','The standard TPLO blade','','2023-09-27 09:59:41',NULL,3),(87,'Blade, TPLO, 12','TPLO Saw blade','','2023-09-27 10:00:32',NULL,2),(88,'Blade, TPLO, 14','TPLO blade','','2023-09-27 10:00:44',NULL,2),(89,'Blade, TPLO, 16','TPLO blade','','2023-09-27 10:00:55',NULL,2),(90,'Blade, TPLO, 18','TPLO blade','','2023-09-27 10:01:11',NULL,2),(91,'Blade, TPLO, 20','TPLO blade','','2023-09-27 10:01:20',NULL,2),(92,'Blade, TPLO, 22','TPLO blade','','2023-09-27 10:01:29',NULL,2),(93,'Blade, TPLO, 26','TPLO blade','','2023-09-27 10:01:40',NULL,2),(95,'Blade, TPLO, 30','TPLO blade','','2023-09-27 10:02:00',NULL,2),(96,'Blade, TPLO, 28','TPLO blade','','2023-09-27 10:54:06',NULL,2),(97,'Needle Driver, Crilewood','The other really good one without scissors','','2023-09-27 13:55:59',NULL,10),(98,'Calipers','Calipers','','2023-09-27 14:43:57',NULL,2),(99,'TPLO Jig','Jig for TPLO','','2023-09-27 14:44:14',NULL,4),(100,'Depth Gauge, small','Measures depth of drill holes.','','2023-09-27 14:44:34',NULL,5),(101,'Depth Gauge, large','Measures depth of drill holes.','','2023-09-27 14:44:44',NULL,4),(102,'Probe, Meniscal','Probe for the meniscus','','2023-09-27 14:44:59',NULL,2),(103,'Drill Guide, Locking','Drill guides for locking set.','','2023-09-27 14:46:02',NULL,10),(104,'Drill Guide, Non-Locking','Non-locking drill guide','','2023-09-27 14:46:16',NULL,10),(105,'Plate Benders','Set of two benders for plates.','','2023-09-27 14:47:10',NULL,5),(106,'Cautery, Monopolar','Bovie Handle','','2023-09-27 14:47:38',NULL,30),(107,'Cautery, Bipolar','Bipolar Cautery','','2023-09-27 14:47:52',NULL,10),(108,'Cautery, Ligasure, large','Bigasure','','2023-09-27 14:48:06',NULL,10),(109,'Cautery, Ligasure, small','Smallasure','','2023-09-27 14:48:18',NULL,10),(110,'Forceps, Doyen','Long clampy boys','','2023-09-27 14:57:54',NULL,10),(111,'Bobby Pins','Sterile bobby pins','','2023-09-27 14:58:09',NULL,20),(112,'Hook, Spay','Spay Hook','','2023-09-27 14:58:18',NULL,10),(113,'Forceps, Bone, Lalonde','Clamp for bones','','2023-09-27 14:59:44',NULL,5),(114,'Forceps, Satinsky','I don\'t know what this does.','','2023-09-27 15:00:10',NULL,5),(115,'Spoon, Bladder','Bladder stone getter.','','2023-09-27 15:00:43',NULL,5),(116,'Spoon, Gall Bladder','Gets goop outta the gall bladder.','','2023-09-27 15:00:56',NULL,5),(117,'Hemostat, Ochsner','Hemostat','','2023-09-27 15:03:04',NULL,5),(118,'Curette, Ear','Gets ear wax out.','','2023-09-27 15:03:18',NULL,5),(119,'Curette, Bone','Gets bones out?','','2023-09-27 15:03:29',NULL,5),(120,'Sterile Towel','Blue towels.','','2023-09-27 15:03:44',NULL,100),(121,'Drapes','Drape Pack','','2023-09-27 15:04:01',NULL,30),(122,'Stapler, TA-60','TA-60 Stapler','','2023-09-27 15:04:30',NULL,5),(123,'Cartridge, TA-60, Blue','Blue TA-60 Cartridge','','2023-09-27 15:04:47',NULL,20),(124,'Cartridge, TA-60, White','White TA-60 Cartridges','','2023-09-27 15:05:03',NULL,20),(125,'Stapler, 50mm GIA','GIA 50mm Stapler','','2023-09-27 15:05:38',NULL,3),(126,'Stapler, 60mm GIA','60mm GIA Stapler','','2023-09-27 15:06:02',NULL,5),(127,'Stapler, Skin','Attaches drapes to skin.','','2023-09-27 15:06:17',NULL,30),(128,'Retractor, Army-Navy','Army-Navy','','2023-09-27 15:11:10',NULL,2),(129,'Retractor, Ribbon','Ribbon retractor','','2023-09-27 15:11:21',NULL,3),(130,'Retractor, Rake','Rake Retractor','','2023-09-27 15:11:31',NULL,3),(131,'Forceps, Sponge','Sponge Forcep','','2023-09-27 15:11:51',NULL,5),(132,'Retractor, Weitlaner','Weitlaner Retractor','','2023-09-27 15:12:15',NULL,3),(133,'Hemostat, Mosquito, Curved','Curved Mosquito','','2023-09-27 15:12:46',NULL,5),(134,'Hemostat, Mosquito, Straight','Straight mosquito.','','2023-09-27 15:12:57',NULL,10),(135,'Forceps, Allis','10','','2023-09-27 15:13:19',NULL,5),(136,'Forceps, Babcocks','Stuff','','2023-09-27 15:13:37',NULL,20),(137,'Needle, 18G','18G needle','','2023-09-27 18:09:10',NULL,50),(138,'Syringe, 35mL','35mL Syringe','','2023-09-27 18:09:23',NULL,50),(139,'Bowl, Saline','Saline bowl','','2023-09-27 18:09:37',NULL,20),(140,'Screw, Locking, 1.5, 12mm','Locking 12mm 1.5','','2023-09-28 08:24:06','2023-09-28 08:44:18',10),(141,'Screw, Locking, 1.5, 10mm','10mm 1.5 locking screw','','2023-09-28 08:43:55',NULL,10),(142,'Screw, Locking, 1.5, 14mm','Screw, Locking, 1.5, 14 mm','','2023-09-28 08:45:40',NULL,10),(143,'Screw, Locking, 1.5, 16mm','Screw, Locking, 1.5, 16mm','','2023-09-28 08:45:51',NULL,10),(144,'Screw, Locking, 1.5, 18mm','Screw, Locking, 1.5, 18mm','','2023-09-28 08:46:07',NULL,10),(145,'Screw, Locking, 1.5, 20mm','Screw, Locking, 1.5, 20mm','','2023-09-28 08:46:17',NULL,10),(146,'Screw, Locking, 1.5, 22mm','Screw, Locking, 1.5, 22mm','','2023-09-28 08:46:29',NULL,10),(147,'Screw, Locking, 1.5, 24mm','Screw, Locking, 1.5, 24mm','','2023-09-28 08:46:44',NULL,10),(148,'Screw, Locking, 1.5, 11mm','Screw, Locking, 1.5, 11mm','','2023-09-28 08:46:54','2023-09-28 09:04:40',10),(149,'Screw, Locking, 1.5, 9mm','Screw, Locking, 1.5, 9mm','','2023-09-28 08:47:06','2023-09-28 09:04:22',10),(150,'Screw, Locking, 1.5, 8mm','Screw, Locking, 1.5, 8mm','','2023-09-28 08:47:14','2023-09-28 09:04:14',10),(151,'Screw, Locking, 1.5, 7mm','Screw, Locking, 1.5, 7mm','','2023-09-28 08:47:27','2023-09-28 09:03:55',10),(152,'Screw, Locking, 1.5, 6mm','Screw, Locking, 1.5, 6mm','','2023-09-28 08:47:45','2023-09-28 09:04:04',10),(153,'Screw, Locking, 2.7, 10mm','Screw, Locking, 2.7, 10mm','','2023-09-28 08:54:44',NULL,10),(154,'Screw, Locking, 2.7, 12mm','Screw, Locking, 2.7, 12mm','','2023-09-28 08:55:01',NULL,10),(155,'Screw, Locking, 2.7, 14mm','Screw, Locking, 2.7, 14mm','','2023-09-28 08:55:17',NULL,10),(156,'Screw, Locking, 2.7, 16mm','Screw, Locking, 2.7, 16mm','','2023-09-28 08:55:26',NULL,10),(157,'Screw, Locking, 2.7, 18mm','Screw, Locking, 2.7, 18mm','','2023-09-28 08:55:36',NULL,10),(158,'Screw, Locking, 2.7, 20mm','Screw, Locking, 2.7, 20mm','','2023-09-28 08:55:47',NULL,10),(159,'Screw, Locking, 2.7, 22mm','Screw, Locking, 2.7, 22mm','','2023-09-28 08:55:56',NULL,10),(160,'Screw, Locking, 2.7, 24mm','Screw, Locking, 2.7, 24mm','','2023-09-28 08:56:09',NULL,10),(161,'Screw, Locking, 2.7, 26mm','Screw, Locking, 2.7, 26mm','','2023-09-28 08:56:16',NULL,10),(162,'Screw, Locking, 2.7, 28mm','Screw, Locking, 2.7, 28mm','','2023-09-28 08:56:25',NULL,10),(163,'Screw, Locking, 2.7, 30mm','Screw, Locking, 2.7, 30mm','','2023-09-28 08:56:36',NULL,10),(164,'Screw, Locking, 2.7, 32mm','Screw, Locking, 2.7, 32mm','','2023-09-28 08:56:44',NULL,10),(165,'Screw, Locking, 2.7, 34mm','Screw, Locking, 2.7, 34mm','','2023-09-28 08:56:53',NULL,10),(166,'Screw, Locking, 3.5, 10mm','Screw, Locking, 3.5, 10mm','','2023-09-28 08:57:38',NULL,10),(167,'Screw, Locking, 3.5, 12mm','Screw, Locking, 3.5, 12mm','','2023-09-28 08:57:48',NULL,10),(168,'Screw, Locking, 3.5, 14mm','Screw, Locking, 3.5, 14mm','','2023-09-28 08:58:02',NULL,10),(169,'Screw, Locking, 3.5, 16mm','Screw, Locking, 3.5, 16mm','','2023-09-28 08:58:14',NULL,10),(170,'Screw, Locking, 3.5, 18mm','Screw, Locking, 3.5, 18mm','','2023-09-28 08:58:25',NULL,10),(171,'Screw, Locking, 3.5, 20mm','Screw, Locking, 3.5, 20mm','','2023-09-28 08:58:35',NULL,10),(172,'Screw, Locking, 3.5, 22mm','Screw, Locking, 3.5, 22mm','','2023-09-28 08:58:48',NULL,10),(173,'Screw, Locking, 3.5, 24mm','Screw, Locking, 3.5, 24mm','','2023-09-28 08:58:58',NULL,10),(174,'Screw, Locking, 3.5, 26mm','Screw, Locking, 3.5, 26mm','','2023-09-28 08:59:15',NULL,10),(175,'Screw, Locking, 3.5, 28mm','Screw, Locking, 3.5, 28mm','','2023-09-28 09:00:44',NULL,10),(176,'Screw, Locking, 3.5, 30mm','Screw, Locking, 3.5, 30mm','','2023-09-28 09:00:53',NULL,10),(177,'Screw, Locking, 3.5, 32mm','Screw, Locking, 3.5, 32mm','','2023-09-28 09:01:02',NULL,10),(178,'Screw, Locking, 3.5, 34mm','Screw, Locking, 3.5, 34mm','','2023-09-28 09:01:12',NULL,10),(179,'Screw, Locking, 3.5, 36mm','Screw, Locking, 3.5, 36mm','','2023-09-28 09:01:19',NULL,10),(180,'Screw, Locking, 3.5, 38mm','Screw, Locking, 3.5, 38mm','','2023-09-28 09:01:28',NULL,10),(181,'Screw, Locking, 3.5, 40mm','Screw, Locking, 3.5, 40mm','','2023-09-28 09:01:38',NULL,10),(182,'Screw, Locking, 3.5, 45mm','Screw, Locking, 3.5, 45mm','','2023-09-28 09:01:50',NULL,10),(183,'Screw, Locking, 3.5, 50mm','Screw, Locking, 3.5, 50mm','','2023-09-28 09:02:01',NULL,10),(184,'Screw, Locking, 3.5, 55mm','Screw, Locking, 3.5, 55mm','','2023-09-28 09:02:42',NULL,10),(185,'Screw, Locking, 3.5, 60mm','Screw, Locking, 3.5, 60mm','','2023-09-28 09:02:51',NULL,10),(186,'Drill, Arthrex, Battery Holder','Holder for Arthrex battery','','2023-09-28 09:11:10',NULL,2),(187,'Drill, Arthrex, Battery Aseptic Transfer Kit','Battery toilet seat','','2023-09-28 09:11:39','2023-09-28 09:12:10',2),(188,'Drill, Arthrex, Pin Collet','Pin Collet for Arthrex','','2023-09-28 09:11:59',NULL,1),(189,'Drill, Arthrex, Drill','The actual handpiece','','2023-09-28 09:12:34',NULL,2),(190,'Drill, Arthrex, Sagittal Saw Attachment','Sagittal saw for Arthrex drill','','2023-09-28 09:13:00',NULL,1),(191,'Drill, Arthrex, Quick Coupler','The thing that takes the drill bits.','','2023-09-28 09:16:41',NULL,2),(192,'Saw, TPLO, Handle','TPLO Saw Handle','','2023-09-28 09:17:03',NULL,2),(193,'Saw, TPLO, Hose','The pneumatic hose for the TPLO saw','','2023-09-28 09:17:18','2023-09-28 09:20:44',3),(194,'Saw, TPLO, Allen Wrench','Allen wrench for TPLO saw','','2023-09-28 09:17:34',NULL,3),(195,'Saw, TPLO, Blade Wrench','The thing that tightens the blade.','','2023-09-28 09:21:09',NULL,5),(196,'Plate, TPLO, Left, 2.7mm','L 2.7 TPLO plate','','2023-09-28 09:55:56',NULL,2),(197,'Plate, TPLO, Right, 2.7mm','2.7mm Right TPLO plate','','2023-09-28 09:56:20',NULL,2),(198,'Plate, TPLO, Left, 3.5mm','3.5mm left TPLO plate','','2023-09-28 09:56:42',NULL,2),(199,'Plate, TPLO, Right, 3.5mm','Right 3.5mm TPLO plate','','2023-09-28 09:57:03',NULL,2),(200,'Plate, TPLO, Left, Broad, 3.5mm','Broad left TPLO 3.5 plate.','','2023-09-28 09:57:25',NULL,2),(201,'Plate, TPLO, Right, Broad, 3.5mm','Right broad 3.5mm TPLO plate','','2023-09-28 09:57:39','2023-09-28 09:57:45',2),(202,'Plate, TPLO, Left, Short','Left short TPLO plate','','2023-09-28 09:58:31',NULL,2),(203,'Plate, TPLO, Right, Short','Short right TPLO plate','','2023-09-28 09:58:43',NULL,2),(204,'Screw, Cancellous, 4.0, 12mm','Screw, Cancellous, 4.0, 12mm','','2023-09-28 10:03:55',NULL,2),(205,'Screw, Cancellous, 4.0, 14mm','Screw, Cancellous, 4.0, 14mm','','2023-09-28 10:04:05',NULL,2),(206,'Screw, Cancellous, 4.0, 16mm','Screw, Cancellous, 4.0, 16mm','','2023-09-28 10:04:14',NULL,2),(207,'Screw, Cancellous, 4.0, 18mm','Screw, Cancellous, 4.0, 18mm','','2023-09-28 10:04:30',NULL,2),(208,'Screw, Cancellous, 4.0, 20mm','Screw, Cancellous, 4.0, 20mm','','2023-09-28 10:04:45',NULL,2),(209,'Screw, Cancellous, 4.0, 22mm','Screw, Cancellous, 4.0, 22mm','','2023-09-28 10:04:58',NULL,2),(210,'Screw, Cancellous, 4.0, 24mm','Screw, Cancellous, 4.0, 24mm','','2023-09-28 10:05:07',NULL,2),(211,'Screw, Cancellous, 4.0, 26mm','Screw, Cancellous, 4.0, 26mm','','2023-09-28 10:05:15',NULL,2),(212,'Screw, Cancellous, 4.0, 28mm','Screw, Cancellous, 4.0, 28mm','','2023-09-28 10:05:23',NULL,2),(213,'Screw, Cancellous, 4.0, 30mm','Screw, Cancellous, 4.0, 30mm','','2023-09-28 10:05:33',NULL,2),(214,'Screw, Cancellous, 4.0, 32mm','Screw, Cancellous, 4.0, 32mm','','2023-09-28 10:05:46',NULL,2),(215,'Screw, Cancellous, 4.0, 34mm','Screw, Cancellous, 4.0, 34mm','','2023-09-28 10:06:02',NULL,2),(216,'Screw, Cancellous, 4.0, 36mm','Screw, Cancellous, 4.0, 36mm','','2023-09-28 10:06:11',NULL,2),(217,'Screw, Cancellous, 4.0, 38mm','Screw, Cancellous, 4.0, 38mm','','2023-09-28 10:06:23',NULL,2),(218,'Screw, Cancellous, 4.0, 40mm','Screw, Cancellous, 4.0, 40mm','','2023-09-28 10:06:33',NULL,2),(219,'Screw, Cancellous, 4.0, 42mm','Screw, Cancellous, 4.0, 42mm','','2023-09-28 10:06:46',NULL,0),(220,'Screw, Cancellous, 4.0, 44mm','Screw, Cancellous, 4.0, 44mm','','2023-09-28 10:07:00',NULL,0),(221,'Screw, Cancellous, 4.0, 45mm','Screw, Cancellous, 4.0, 45mm','','2023-09-28 10:07:12',NULL,1),(222,'Screw, Cancellous, 4.0, 46mm','Screw, Cancellous, 4.0, 46mm','','2023-09-28 10:07:22',NULL,1),(223,'Screw, Cancellous, 4.0, 50mm','Screw, Cancellous, 4.0, 50mm','','2023-09-28 10:07:36',NULL,4),(224,'Screw, Cortical, 3.5mm, 12mm','Screw, Cortical, 3.5mm, 12mm','','2023-09-28 10:08:32',NULL,4),(225,'Screw, Cortical, 3.5mm, 14mm','Screw, Cortical, 3.5mm, 14mm','','2023-09-28 10:08:45',NULL,4),(226,'Screw, Cortical, 3.5mm, 16mm','Screw, Cortical, 3.5mm, 16mm','','2023-09-28 10:08:54',NULL,4),(227,'Screw, Cortical, 3.5mm, 18mm','Screw, Cortical, 3.5mm, 18mm','','2023-09-28 10:09:02',NULL,4),(228,'Screw, Cortical, 3.5mm, 20mm','Screw, Cortical, 3.5mm, 20mm','','2023-09-28 10:09:12',NULL,4),(229,'Screw, Cortical, 3.5mm, 22mm','Screw, Cortical, 3.5mm, 22mm','','2023-09-28 10:09:22',NULL,2),(230,'Screw, Cortical, 3.5mm, 24mm','Screw, Cortical, 3.5mm, 24mm','','2023-09-28 10:09:34',NULL,4),(231,'Screw, Cortical, 3.5mm, 26mm','Screw, Cortical, 3.5mm, ','','2023-09-28 10:09:42',NULL,4),(232,'Screw, Cortical, 3.5mm, 28mm','Screw, Cortical, 3.5mm, 28mm','','2023-09-28 10:09:54',NULL,4),(233,'Screw, Cortical, 3.5mm, 30mm','Screw, Cortical, 3.5mm, 30mm','','2023-09-28 10:10:05',NULL,4),(234,'Screw, Cortical, 3.5mm, 32mm','Screw, Cortical, 3.5mm, 32mm','','2023-09-28 10:10:14',NULL,4),(235,'Screw, Cortical, 3.5mm, 34mm','Screw, Cortical, 3.5mm, 34mm','','2023-09-28 10:10:36',NULL,4),(236,'Screw, Cortical, 3.5mm, 36mm','Screw, Cortical, 3.5mm, 36mm','','2023-09-28 10:10:45',NULL,4),(237,'Screw, Cortical, 3.5mm, 38mm','Screw, Cortical, 3.5mm, 38mm','','2023-09-28 10:10:57',NULL,4),(238,'Screw, Cortical, 3.5mm, 40mm','Screw, Cortical, 3.5mm, 40mm','','2023-09-28 10:11:06',NULL,4),(239,'Screw, Cortical, 3.5mm, 42mm','Screw, Cortical, 3.5mm, 42mm','','2023-09-28 10:11:20',NULL,4),(240,'Screw, Cortical, 3.5mm, 44mm','Screw, Cortical, 3.5mm, 44mm','','2023-09-28 10:11:28',NULL,4),(241,'Elevator, AO','Brown-handled elevator','','2023-09-28 10:40:40',NULL,5),(242,'Screwdriver, Hex Head','Hex head screwdriver','','2023-09-28 10:41:03',NULL,5),(243,'Screwdriver, Cruciform','Cruciform Screwdriver','','2023-09-28 10:41:14',NULL,5),(244,'Mallet','Mallet','','2023-09-28 10:41:38',NULL,5),(245,'TPLO Measuring Device','The ring of rulers','','2023-09-28 10:42:34',NULL,5),(246,'Scissors, Metzenbaum, Small','Small metz','','2023-09-28 11:08:21',NULL,10),(247,'Forceps, Bone, Crab Claw, Small','Small crabclaw','','2023-09-28 11:12:04',NULL,5),(248,'Forceps, Bone, Crab Claw, Medium','Forceps, Bone, Crab Claw, Medium','','2023-09-28 11:12:17',NULL,5),(249,'Forceps, Bone, Crab Claw, Large','Forceps, Bone, Crab Claw, Large','','2023-09-28 11:12:29',NULL,5),(250,'Forceps, Bone, Kern, Small','Forceps, Bone, Kern , Small','','2023-09-28 11:13:07','2023-09-28 11:13:39',5),(251,'Forceps, Bone, Kern, Medium','Forceps, Bone, Kern , Medium','','2023-09-28 11:13:18','2023-09-28 11:13:44',5),(252,'Forceps, Bone, Kern, Large','Forceps, Bone, Kern, Large','','2023-09-28 11:13:34',NULL,5),(253,'Clamp, Bone, ASIF, Large, Speedlock','Clamp, Bone, ASIF, Large, Speedlock','','2023-09-28 11:14:33',NULL,5),(254,'Clamp, Bone, ASIF, Small, Speedlock','Clamp, Bone, ASIF, Small, Speedlock','','2023-09-28 11:14:43',NULL,5),(255,'Clamp, Bone, ASIF, Small, Ratchet','Clamp, Bone, ASIF, Small, Ratchet','','2023-09-28 11:17:25',NULL,5),(256,'Clamp, Bone, ASIF, Large, Ratchet','Clamp, Bone, ASIF, Large, Ratchet','','2023-09-28 11:17:35',NULL,5),(257,'Forceps, Rongeur, Single Action','Single action rongeur','','2023-09-28 11:19:15',NULL,5);
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
  `quantity` int NOT NULL DEFAULT '1',
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
INSERT INTO `instruments_and_procedures` VALUES (5,1,1),(23,3,1);
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
  `quantity` int NOT NULL DEFAULT '1',
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
INSERT INTO `packs_and_instruments` VALUES (1,2,1),(1,4,1);
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

-- Dump completed on 2023-09-28 11:39:14
