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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `last_time_update` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_key_email_product` (`email`,`product_id`),
  KEY `fk_product_idx` (`product_id`),
  KEY `fk_cart_user_idx` (`email`),
  CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (9,'customer@gmail.com',6,2,'2023-06-08 20:34:20'),(22,'duyduc@gmail.com',9,28,'2023-06-09 08:52:07'),(26,'duyduc@gmail.com',16,19,'2023-06-09 08:53:40'),(31,'duyduc@gmail.com',10,1,'2023-06-09 09:00:01'),(33,'duyduc@gmail.com',13,1,'2023-06-10 10:19:20'),(34,'duyduc@gmail.com',6,10,'2023-06-10 13:06:36');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Cốc Sứ'),(6,'Hộp Bút'),(7,'Khác'),(5,'Khung Ảnh'),(4,'Đèn Ngủ'),(2,'Đồ Chơi'),(3,'Đồng Hồ');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_idx` (`order_id`),
  KEY `fk_product_idx` (`product_id`),
  CONSTRAINT `fk_order_detail_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `fk_order_detail_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `payment_id` int DEFAULT NULL,
  `order_time` datetime DEFAULT NULL,
  `shipping_fee` float DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(400) DEFAULT NULL,
  `ward_code` int DEFAULT NULL,
  `district_id` int DEFAULT NULL,
  `province_id` int DEFAULT NULL,
  `message` varchar(400) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `last_updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_payment_method_idx` (`payment_id`),
  KEY `fk_user_idx` (`email`),
  CONSTRAINT `fk_order_payment_method` FOREIGN KEY (`payment_id`) REFERENCES `payment_method` (`id`),
  CONSTRAINT `fk_order_user` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'thien123dh@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `last_updated_by` varchar(320) DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  `avatar` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_idx` (`category_id`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (6,'Cốc Sứ Hai Màu','',10,129000,1,NULL,1,'https://shopquatructuyen.com/wp-content/uploads/2020/10/coc-su-2-mau-5.jpg'),(7,'Cốc Sứ EXO','Cốc sứ EXO được làm từ sứ cao cấp, có nước men sáng bóng. Cốc có nắp và muôi sứ đi kèm.Kích thước chiều cao cốc 12 cm, chiều rộng 11 cm, dung tích khoảng 250ml.Thân cốc được in họa tiết của ban nhạc EXO của Hàn Quốc.',99,149000,1,NULL,1,NULL),(8,'Bộ Cốc Sứ Tháp Eiffel x4','Bộ cốc được làm từ chất liệu sứ cao cấp với lớp men phủ bóng màu trắng sứ siêu nhẵn mịn.Dễ dàng chùi rửa sau mỗi lần sử dụng.Trên thân cốc được in họa tiết tháp Eiffel màu nâu mang phong cách cổ điển.Kích thước bộ cốc cao 21 cm. Đường kính miệng cốc là 7 cm',99,199000,1,NULL,1,'https://shopquatructuyen.com/wp-content/uploads/2018/07/bo-coc-su-thap-eiffel-2.jpg'),(9,'Bộ Cốc Sứ Mèo Hello Kitty','Bộ cốc sứ mèo Hello Kitty gồm 4 chiếc cốc đi kèm với giá đỡ bằng inox không gỉ.Cốc được làm từ chất liệu gốm sứ với nước men bóng, tránh bám bẩn.',99,199000,1,NULL,1,NULL),(10,'Cốc Sứ Nốt Nhạc','Cốc sứ nốt nhạc được làm từ chất liệu sứ cao cấp với men trắng bóng.Trên thân cốc được in họa tiết đàn piano, nốt nhạc với màu đen tương phản rất đẹp mắt.Cốc sứ nốt nhạc đi kèm với nắp gỗ và thìa inox. Thể tích khoảng 400 ml.',99,139000,1,NULL,1,NULL),(11,'Cốc Sứ Hình Hoa','Cốc sứ hình hoa được làm từ chất liệu sứ với nước men bóng chống bám bẩn. Cốc có quai, nắp sứ và đi kèm với chiếc muôi inox. Kích thước chiều cao 12,5 cm. Đường kính miệng cốc 8 cm.',99,119000,1,NULL,1,NULL),(12,'Cốc Phát Sáng','Cốc phát sáng làm từ chất liệu nhựa cứng. Sản phẩm dùng pin. Có chức năng tự động sáng khi rót nước. Khi hết nước cốc sẽ tự tắt. Đèn Led phát sáng đổi màu liên tục',99,89000,1,NULL,1,NULL),(13,'Cốc Tự Khuấy','Kích thước chiều cao 11,5 cm, chiều rộng 13 cm. Cốc sử dụng pin 3A. Có nhiều màu sắc để bạn lựa chọn. Cốc tự khuấy với chất liệu nhựa cao cấp và thép không gỉ',99,165000,1,NULL,1,NULL),(14,'Con Quay Solar System','Con quay Solar system hay còn được gọi với tên con quay hệ mặt trời Sản phẩm được làm chủ yếu từ chất liệu nhựa, kích thước đóng gói 20 x 30 x 11 cm.',99,419000,2,NULL,1,NULL),(15,'Con Quay Mezmo Top','Con quay Mezmo top được làm từ chất liệu nhôm và được chế tác bằng công nghệ CNC hiện đại. Có 3 màu sắc để lựa chọn: màu trắng, màu vàng và màu xám',99,259000,2,NULL,1,NULL),(16,'Trò Chơi Sudoku Gỗ','Trò chơi Sudoku được làm từ gỗ tự nhiên. Trong một bộ trò chơi có rất nhiều bài khác nhau để bạn giải mã.  Khi không dùng tới bạn có thể gấp hộp gỗ lại rất gọn gàng.',99,299000,2,NULL,1,NULL),(17,'Trò Chơi Xếp Gỗ','Trò chơi xếp gỗ được làm từ chất liệu gỗ tự nhiên, rất an toàn với trẻ em. Đây là một trò chơi trí tuệ, thúc đẩy phát triển khả năng tư duy của trẻ.',99,69000,2,NULL,1,NULL),(18,'Con Lắc Ra Quyết Định','Con lắc ra quyết định có kích thước chiều cao 21 cm, đường kính đế 10 cm. Phần đế chia thành 6 ô với 6 kết quả khác nhau mà người chơi phải tuân theo. Đây là món đồ chơi xả stress hiệu quả. ',99,149000,2,NULL,1,NULL),(19,'Mô Hình Siêu Anh Hùng Marvel','Mô hình siêu anh hùng Marvel dựa trên hình tượng các nhân vật nổi tiếng trong các bộ phim chuyển thể từ truyện tranh của hãng Marvel. Sản phẩm được làm từ chất liệu nhựa tổng hợp. Sản phẩm thích hợp làm quà tặng cho trẻ em, quà tặng tết thiếu nhi.',99,329000,2,NULL,1,NULL),(20,'Con Lắc Dao Động Vĩnh Cửu','Con lắc dao động vĩnh cửu được làm từ chất liệu nhựa là chủ đạo. Con lắc dùng pin 2A. Điểm nổi bật là những quả bóng nhiều màu sắc bắt mắt. Kích thước 10,5 x 23 cm. Con lắc có khả năng dao động liên tục không bị tác động bởi ma sát.',99,185000,2,NULL,1,NULL),(21,'Hộp Con Dấu Chữ Cái','Hộp con dấu chữ cái được làm từ chất liệu gỗ. Các con dấu được làm theo bảng chữ cái la tinh, bao gồm cả chữ hoa và chữ thường. Ngoài ra còn có các con dấu chữ số và một số ký tự đặc biệt. Kích thước của mỗi con dấu dài 3,8 cm, rộng 0,9 cm và cao 1,2 cm.',99,219000,2,NULL,1,NULL),(22,'Trò Chơi Bắn Bóng Rổ','Trò chơi bắn bóng rổ có kích thước chiều cao 24,5 cm, chiều rộng 13 cm và chiều dài 26 cm. Được làm từ chất liệu kim loại kết hợp với nhựa, bóng bằng cao su.  Sản phẩm có thể gấp gọn',99,199000,2,NULL,1,NULL),(23,'Con Quay Vortecon','Con quay Vortecon được làm từ thép không gỉ. Có 2 loại hình trụ hoặc hình cầu. Bạn có thể chọn loại mình thích thông qua phần ghi chú khi đặt hàng. Hiệu ứng ảo giác mà nó tạo ra là vô cùng ấn tượng.',99,199000,2,NULL,1,NULL),(24,'Đồng Hồ Cổ Để Bàn','Đồng hồ cổ để bàn được là theo phong cách cổ điển với chất liệu kim loại được sơn màu vàng đồng nhuốm màu thời gian. Trông chiếc đồng hồ tưởng chừng rất cũ kỹ nhưng thực ra lại không phải như vậy. Thiết kế cổ điển cùng với màu sắc giả cổ đã tôn lên vẻ cổ kính cho chiếc đồng hồ này.',99,499000,3,NULL,1,NULL),(25,'Đồng hồ báo thức trái tim','chiếc đồng hồ báo thức là vật dụng không thể thiếu trong cuộc sống hàng ngày của cá nhân và của gia đình. Ngày nay, dù có rất nhiều thiết bị khác nhau có chức năng xem giờ như điện thoại, máy tính, nhưng chiếc đồng hồ báo thức vẫn có giá trị sử dụng riêng. Mặt của đồng hồ báo thức trái tim được làm từ chất liệu kính.',99,380000,3,NULL,1,NULL),(26,'Đồng hồ báo thức cổ điển','Đồng hồ báo thức được làm theo phong cách cổ điển, được làm bằng chất liệu kim loại sơn màu đen mờ. Khi nhìn vào bạn tưởng như chúng vô cùng cũ kỹ nhưng không phải như bạn đang suy nghĩ. Thiết kế mang đậm phong cách cổ điển từ màu sắc cho tới các họa tiết trang trí bên trong với phong cách Vintage.',99,250000,3,NULL,1,NULL),(27,'Đồng hồ dán tường DIY Clock 360','Không giống như các mẫu đồng hồ treo tường thông thường khác. Đồng hồ dán tường Diy Clock 360 là một loại đồng hồ dán tường độc đáo. Có thiết kế phá cách, không theo khuôn mẫu thông thường. Chiếc đồng hồ này gồm có 2 bộ phần chính.',99,290000,3,NULL,1,NULL),(28,'Đồng hồ xe đạp 2 mặt','Đồng hồ cổ để bàn được là theo phong cách cổ điển với chất liệu kim loại được sơn màu vàng đồng nhuốm màu thời gian. Trông chiếc đồng hồ tưởng chừng rất cũ kỹ nhưng thực ra lại không phải như vậy. Thiết kế cổ điển cùng với màu sắc giả cổ đã tôn lên vẻ cổ kính cho chiếc đồng hồ này.',99,250000,3,NULL,1,NULL),(29,'Đồng hồ báo thức đèn Led','Đồng hồ có nhiều chức năng: báo ngày giờ, báo thức, nhiệt độ, ghi nhớ ngày tháng, … Đặc biệt có kèm theo bút có thể viết lên những lời ghi chú hay thông điệp muốn nhắn gửi. Đây là món quà tặng ý nghĩa cho bạn gái, hoặc làm quà sinh nhật, quà tặng bạn bè, …',99,290000,3,NULL,1,NULL),(30,'Đồng hồ báo thức Happy birthday','Đồng hồ báo thức Happy birthday được làm bằng chất liệu kim loại sơn bóng với nhiều màu sắc khác nhau cho bạn lựa chọn. Bên trong mặt số gồm 4 kim: Kim giờ, kim phút, kim giây và kim báo thức. Mặt trong đồng hồ được trang trí với nhiều chi tiết ngỗ nghĩnh, in dòng chữ Happy birtrday cách điệu trông đẹp mắt.',99,290000,3,NULL,1,NULL),(31,'Mô hình đồng hồ tháp Big ben','Được lấy cảm hứng từ chiếc đồng hồ tháp Big ben của thủ đô Luân Đôn nước Anh – một trong những địa điểm nổi tiếng nhất trên Thế giới. Sản phẩm này là mô hình thu nhỏ, mô phỏng lại chiếc đồng hồ tháp Big ben. Mô hình đồng hồ tháp Big ben có phần lõi được làm từ chất liệu thủy tinh trong suốt. ',99,199000,3,NULL,1,NULL),(32,'Đồng hồ báo thức hình thỏ','Được làm từ chất liệu nhựa tổng hợp. Có nhiều màu sắc khác nhau. Có chức năng xem giờ, báo thức, có đèn Led.',99,250000,3,NULL,1,NULL),(33,'Đồng hồ xe đạp 2 mặt','Bạn đang băn khăn chưa biết chọn sản phẩm nào cho riêng mình hay làm quà tặng đúng không? Hãy cùng Shop quà tặng trực tuyến tìm hiểu về 1 sản phẩm vừa làm đồ trang trí, có chức năng xem giờ, mang phong cách cổ điển sang trọng và thích hơp với nhiều không gian. Sản phẩm chúng tôi muốn giới thiệu ngay sau đây đó chính là chiếc đồng hồ xe đạp.',99,199000,3,NULL,1,NULL),(34,'Đèn ngủ Led 3D','Sau những giờ làm việc căng thẳng, mệt mỏi, ai cũng muốn được ở bên gia đình thân yêu, ấm cúng với giấc ngủ ngon trong căn phòng nhỏ xinh. Một chiếc đèn đáng yêu không thể thiếu trong gian phòng của bạn để dễ dàng đưa bạn chìm sâu vào giấc ngủ.',99,390000,4,NULL,1,NULL),(35,'Đèn ngủ gà con','Đèn ngủ gà con được chia thành 2 bộ phận chính: Phần đế được làm từ nhựa ABS cao cấp, với thiết kế cách điệu giống với vỏ quả trứng khi chú gà con đang chui ra. Thiết kế hình quả trứng mang đến cho chiếc đèn này khả năng cân bằng rất tốt. Giống như những chú lật đật.',99,250000,4,NULL,1,NULL),(36,'Đèn ngủ mặt trăng','Đèn ngủ mặt trăng là một chiếc đèn ngủ có thiết kế rất độc đáo và ấn tượng. Chiếc đèn này được mô phỏng giống như bề mặt trên mặt trăng với những điểm lồi lõm, sáng tối khác nhau. Khi bạn nhìn vào chiếc đèn bạn có cảm tượng như đang nhìn vào mặt trăng vậy.',99,199000,4,NULL,1,NULL),(37,'Đèn ngủ lồng kính','Đèn ngủ lồng kính được cấu tạo từ 2 phần chính. Phần thứ nhất là phần chân đế. Phần này được chế tác từ gỗ tự nhiên, nổi những đường vân gỗ rất đẹp mắt. Phần đế có gắn với dây dẫn điện và bóng đèn Led. Phần thứ 2 làm bằng thủy tinh được làm dưới dạng hình trụ, một đầu kín',99,120000,4,NULL,1,NULL),(38,'Đèn ngủ bốt điện thoại','Hình ảnh chiếc bốt điện thoại công cộng màu đỏ nổi bật ở thủ đô Luân Đôn của nước Anh chắc chắn không còn xa lạ đối với chúng ta. Thậm chí nó còn có thể được coi như một trong những biểu tượng của thủ đô sứ sở sương mù.',99,199000,4,NULL,1,NULL),(39,'Đèn ngủ 3D','Đèn ngủ 3D có cấu tạo chia thành 2 phần. Phần đế được làm từ chất liệu gỗ với màu nâu vàng tự nhiên và những đường vân rất đẹp mắt. Phần đế này được gắn những bóng đèn Led. Phần thứ 2 là phần chụp đèn được làm từ chất liệu thủy tinh. Đây cũng chính là phần tạo nên nét đặc biệt của chiếc đèn ngủ này.',99,399000,4,NULL,1,NULL),(40,'Đèn chiếu sao phiên bản 2','Đèn chiếu sao phiên bản 2 được làm từ chất liệu nhựa chủ đạo. Đèn có cấu tạo hình cầu giúp cho diện tích chiếu tỏa rộng và xa hơn. Đèn chiếu sao có thiết kế chắc chắn và kích thước lớn hơn so với phiên bản trước. Phần đế của đèn chiếu sao có nhiều màu sắc khác nhau: màu xanh, màu hồng, màu tím, …',99,199000,4,NULL,1,NULL),(41,'Đèn ngủ heo con','Đèn ngủ heo con được làm từ chất liệu nhựa ABS rất bền và an toàn. Có 2 mẫu để bạn lựa chọn: hình heo và hình gấu trúc',99,249000,4,NULL,1,NULL),(42,'Đèn đối lưu Lava Lamp','Đèn Lava lamp được cấu tạo cũng khá đơn giản. Bao gồm phần đế được làm từ nhôm, bên trong là hệ thống điện và 1 bóng đèn sợi đốt. Bên trên là một bình thủy tinh dày đựng 2 khối chất lỏng riêng biệt. Một khối chất lỏng trong suốt, còn 1 khối chất lỏng có màu (có nhiều màu sắc khác nhau tùy từng loại) động đặc ở nhiệt độ thường.',99,390000,4,NULL,1,NULL),(43,'Đèn chiếu sao','Đèn chiếu sao là một loại đèn ngủ đặc biệt. Nó có thể chiếu lên trần, tường phòng của bạn hình trăng sao, hình đôi tình nhân, …Với cấu tạo cũng tương đối đơn giản. Vỏ ngoài được làm từ chất liệu nhựa. Bên trong là những chiếc đèn Led có nhiều màu, một cơ cấu bánh răng có thể quay xung quanh trục. Nhờ bộ phận này mà thân đèn bên trên có thể quay 360 độ.',99,239000,4,NULL,1,NULL),(44,'Khung ảnh small lucky','Khung ảnh small lucky được làm từ chất liệu gỗ tự nhiên với đường vân đẹp mắt.',99,199000,5,NULL,1,NULL),(45,'Khung ảnh gỗ xe đạp','Khung ảnh gỗ xe đạp bạn có thể trang trí trên bàn hoạc treo trên tường. Với thiết kế phía sau có giá đỡ bạn có thể dễ dàng đặt trên bàn mà không lo bị đổ. Hoặc với chiếc móc nhỏ xinh bạn có thể dễ dàng treo lên tường với bất cứ vị trí nào bạn muốn, treo ngang hay dọc tùy theo bức ảnh của bạn.',99,129000,5,NULL,1,NULL),(46,'Khung ảnh gỗ 2 lớp','Khung ảnh được làm từ chất liệu gỗ tự nhiên với những đường vân gỗ rất tinh tế và đẹp mắt. Đặc biệt chiếc khung ảnh này có mặt trước được làm từ 2 lớp gỗ khác biệt ghép lại với nhau. Với 2 màu gỗ khác biệt tạo điểm nhấn và mang đến cho chiếc khung ảnh này một vẻ đẹp rất sang trọng và quyến rũ.',99,130000,5,NULL,1,NULL),(47,'Khung ảnh cổ điển','Chiếc khung ảnh này có thiết kế mang phong cổ châu Âu cổ điển. Thoạt nhìn ta sẽ có cảm giác như nó được làm từ kim loại đúc hoa văn. Tuy nhiên thực tế nó được làm từ chất liệu nhựa tổng hợp. Khung ảnh được làm với những họa tiết, hoa văn trang trí rất đẹp mắt theo phong cách cổ điển. Khung ảnh có kích thước chiều cao 23 cm, chiều rộng 18 cm. Bức ảnh bên trong có kích thước chiều cao 16cm, chiều rộ',99,199000,5,NULL,1,NULL),(48,'Khung ảnh mica','* Chất liệu Acrylic, không độc hại và không mùi, màn hình đa chức năng. * Có sẵn trong một hoặc hai mặt, ngang và dọc, có nhiều kích cỡ * Hai miếng acrylic dày 0,8 cm được dán lại với nhau để giữ ảnh tại chỗ. * Để đặt giấy chứng nhận, ảnh cưới, chụp ảnh, thẻ giá, nhãn, v.v.',99,169000,5,NULL,1,NULL),(49,'Khung ảnh để bàn xoay ngang','- Khung ảnh dùng để trang trí, để các bức ảnh Kỷ niệm trong các phòng ngủ, phòng khách, trang trí góc làm việc, học tập',99,111000,5,NULL,1,NULL),(50,'Khung ảnh trong sốt anzzar','Khung ảnh để bàn nhiều kích thước, khung ảnh trong suốt Anzzar',99,75000,5,NULL,1,NULL),(51,'Khung ảnh bằng khen','Viền khung nhựa Hàn Quốc cao cấp giả gỗ Composite siêu bền, siêu nhẹ, -Tấm lót bằng gỗ MDF chống ẩm mốc, đảm bảo cho khung và ảnh được an toàn và bền đẹp trong khoảng thời gian lâu nhất. - có gắn móc treo ngang dọc tùy chỉnh',99,32000,5,NULL,1,NULL),(52,'Khung ảnh xoay 360 độ','Khung ảnh dùng để trang trí, để các bức ảnh Kỷ niệm trong các phòng ngủ, phòng khách, trang trí góc làm việc, học tập',99,140000,5,NULL,1,NULL),(53,'Khung ảnh Hàn Quốc','Khung Ảnh Treo Tường Hàn Quốc Làm quà tặng lãng mạn cho người thân Vật Dụng hữu ích để trang trí phòng, nơi làm việc Sét bao gồm 7 khung ảnh và 7 kẹp gỗ, 1 đoạn dây thừng treo 7 khung 7 màu khác nhau, kẹp gỗ 7 màu khác nhau Đẹp mắt và ý nghĩa trong các sự kiện, họp mặt',99,25000,5,NULL,1,NULL),(54,'Chiến binh giữ bút','Sản phẩm này là một chiếc kệ để bút được làm dưới hình dạng một chiến binh với trang phục giáp sắt thời trung cổ. Có lẽ chúng ta đã quá quen với những chiếc hộp bút thông thường. Dùng để cắm bút trên bàn học, bàn làm việc. Chiến binh giữ bút không chỉ có tác dụng để bút thông thường, nó còn có thể coi như một món đồ trang trí thú vị, cá tính và vô cùng độc đáo. Mà chắc chắn ai khi lần đầu nhìn thấ',99,389000,6,NULL,1,NULL),(55,'Hộp bút thủy tinh','Đúng như tên gọi của sản phẩm, hộp bút thủy tinh được làm từ chất liệu thủy tinh cao cấp. Sản phẩm được chia làm 3 khối chính. Bên phải là ngăn để cắm bút, ngăn bên trái là đồng hồ (đồng hồ thật có chức năng chỉ giờ) và ngăn ở giữa có thể dùng để cardvisit.',99,350000,6,NULL,1,NULL),(56,'Hộp bút gỗ ngăn kéo','Hộp bút gỗ ngăn kéo được làm từ chất liệu gỗ thông siêu nhẹ với những đường vân gỗ đẹp mắt. Màu gỗ đặc trưng là màu vàng nhạt nguyên bản, không sơn màu. Chiếc hộp bút này được chia làm 2 khoang chính. Khoang để bút và khoang ngăn kéo. Khoang để bút được thiết kế rất thông minh. Bạn hoàn toàn có thể thay đổi kích thước các ô để bút tùy theo nhu cầu thực tế của mình. Chỉ bằng thao tác đơn giản là rú',99,150000,6,NULL,1,NULL),(57,'Hộp bút xe đạp','Hộp bút xe đạp trước hết nó là một chiếc hộp bút. Dùng để đựng bút đặt trên bàn học hoặc bàn làm việc. Nhưng không giống như những chiếc hộp bút thông thường khác, hộp bút xe đạp được tạo hình cách điệu hình dáng của một người đội nón đạp xe. Một hình ảnh rất đỗi quen thuộc với người Việt Nam chúng ta.',99,150000,6,NULL,1,NULL),(58,'Hộp bút đồng hồ cát','Hộp bút đồng hồ cát được làm từ chất liệu gỗ thông, có trọng lượng rất nhẹ. Hai chiếc đồng hồ cát được làm từ thủy tinh. Bên trong là những hạt cát màu sắc bắt mắt. Kích thước của sản phẩm có chiều dài 16,5 cm, chiều cao 10,5 cm. Thiết kế chắc chắn và không tốn nhiều diện tích. Rất thích hợp với những chiếc bàn học, bàn làm việc có kích thước nhỏ gọn, không quá rộng.',99,95000,6,NULL,1,NULL),(59,'Hộp bút giỏ sắt','Hộp bút giỏ sắt đơn thuần là một chiếc hộp bút. Giỏ bút dùng để đựng bút trên bàn học hoặc bàn làm việc. Được làm dạng giỏ với những đường đan mắt lưới. Phần đáy của hộp bút được làm từ kim loại liền với hai kiểu để cho bạn lựa chọn: giỏ hình vuông và giỏ hình tròn.',99,60000,6,NULL,1,NULL),(60,'Hộp Đựng Bút Họa Tiết In Nổi 3D','Chiếc hộp bút bây giờ không chỉ đơn thuần là nơi đựng dụng cụ học tập cho bé mà chiếc hộp bút còn mang sự thẩm mỹ và nổi bật cho bé khi sử dụng. Đơn giản hộp bút còn là thời trang. Với thiết kế độc đáo in hình đẹp mắt Bên trong là lớp khung vải chia các ngăn nhỏ chứa bút và dụng cụ học tập của bé. Một bên chứa c',99,70000,6,NULL,1,NULL),(61,'Hộp bút trong suốt size lớn','Hộp bút trong suốt size lớn cho bé đủ hoạ tiết xinh xắn phối hạt kim tuyến lấp lánh chuyển động lung linh làm cho hộp bút trở nên sinh động, bé thêm hứng thú Ngoài ra, với kích thước lớn của túi thì các mẹ và các bạn nữ có thể tha hồ đựng mỹ phẩm, trang sức, đồ trang điểm…ô cùng tiện lợi nhé! Với các họa tiết ngộ nghĩnh, đáng yêu, cùng các hạt kim tuyến lấp lánh di chuyển sống động, hộp bút sẽ tăn',99,29000,6,NULL,1,NULL),(62,'Hộp bút vải kèm sticker','Được làm từ vải cứng giặt nhanh khô và có lót 1 lớp vải giúp giảm thiểu tình trạng ướt vật dụng. Dây kéo zipper được làm kỹ lưỡng tránh đứt đoạn hoặc hư hỏng làm rơi rớt bút viết của các bạn học sinh. Ngoài việc dùng làm hộp đựng bút viết và dụng cụ học tập, nó còn có thể làm một chiếc ví đựng các vật dụng như son môi hoặc đựng tiền hoặc các vật dụng cá nhân tiện lợi.',99,45000,6,NULL,1,NULL),(63,'Hộp đựng bút TOTORO','Hộp đựng bút TOTORO siêu dễ thương - Hộp đựng đồ dùng học tập nhiều ngăn tiện dụng Kích thước : 23.5cm x 10.5cm x 4.5cm Trọng lượnglượng: 80g.',99,40000,6,NULL,1,NULL),(81,'Cầu tuyết phi hành gia','',17,25000,7,NULL,0,'https://work.download/image/8DV8E2CycIfN.jpg'),(82,'Cầu tuyết phi hành gia','',20,65000,7,NULL,0,'https://work.download/image/plUQuverVJnw.jpg'),(83,'Cầu tuyết phi hành gia','',100,49000,7,NULL,0,'https://work.download/image/Ju9xVO7VjGyf.jpg'),(84,'222223333','323323',33,3333,1,NULL,0,'');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(1000) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `is_main` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_idx` (`product_id`),
  CONSTRAINT `fk_image_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,'https://shopquatructuyen.com/wp-content/uploads/2020/02/coc-su-hinh-tho-1.jpg',3,1),(2,'https://shopquatructuyen.com/wp-content/uploads/2019/04/coc-dau-lau-2.jpg',5,1),(3,'https://shopquatructuyen.com/wp-content/uploads/2020/10/coc-su-2-mau-5.jpg',NULL,1),(4,'https://shopquatructuyen.com/wp-content/uploads/2018/11/coc-su-exo-2.jpg',7,1),(5,'https://shopquatructuyen.com/wp-content/uploads/2018/07/bo-coc-su-thap-eiffel-2.jpg',8,1),(6,'https://shopquatructuyen.com/wp-content/uploads/2019/04/bo-coc-su-meo-hellokitty-1.jpg',9,1),(7,'https://shopquatructuyen.com/wp-content/uploads/2020/10/coc-su-not-nhac-5.jpg',10,1),(8,'https://shopquatructuyen.com/wp-content/uploads/2019/04/coc-su-hinh-hoa-6.jpg',11,1),(9,'https://shopquatructuyen.com/wp-content/uploads/2018/07/coc-phat-sang-1.jpg',12,1),(10,'https://shopquatructuyen.com/wp-content/uploads/2018/09/coc-tu-khuay-1.jpg',13,1),(11,'https://shopquatructuyen.com/wp-content/uploads/2020/10/con-lac-soler-system-1.jpg',14,1),(12,'https://shopquatructuyen.com/wp-content/uploads/2020/10/con-quay-mezmotop-4.jpg',15,1),(13,'https://shopquatructuyen.com/wp-content/uploads/2019/07/tro-choi-sudoku-go-1.jpg',16,1),(14,'https://shopquatructuyen.com/wp-content/uploads/2019/07/tro-choi-xep-go-5.jpg',17,1),(15,'https://shopquatructuyen.com/wp-content/uploads/2019/07/con-lac-ra-quyet-dinh-4.jpg',18,1),(16,'https://shopquatructuyen.com/wp-content/uploads/2019/05/tuong-nguoi-nhen-spiderman-1.jpg',19,1),(17,'https://shopquatructuyen.com/wp-content/uploads/2018/11/con-lac-dao-dong-vinh-cuu-1.jpg',20,1),(18,'https://shopquatructuyen.com/wp-content/uploads/2018/11/hop-con-dau-chu-cai-2.jpg',21,1),(19,'https://shopquatructuyen.com/wp-content/uploads/2019/05/tro-choi-ban-bong-ro-2.jpg',22,1),(20,'https://shopquatructuyen.com/wp-content/uploads/2019/07/con-quay-vortecon-3.jpg',23,1),(21,'https://shopquatructuyen.com/wp-content/uploads/2018/11/dong-ho-co-de-ban-1.jpg',24,1),(22,'https://shopquatructuyen.com/wp-content/uploads/2019/05/dong-ho-bao-thuc-trai-tim-5.jpg',25,1),(23,'https://shopquatructuyen.com/wp-content/uploads/2019/05/dong-ho-bao-thuc-co-dien-3.jpg',26,1),(24,'https://shopquatructuyen.com/wp-content/uploads/2018/08/dong-ho-dan-tuong-diy-clocl-1.jpg',27,1),(25,'https://shopquatructuyen.com/wp-content/uploads/2019/05/dong-ho-xe-dap-2-mat-1.jpg',28,1),(26,'https://shopquatructuyen.com/wp-content/uploads/2019/05/dong-ho-bao-thuc-den-led-2.jpg',29,1),(27,'https://shopquatructuyen.com/wp-content/uploads/2019/05/dong-ho-bao-thuc-happy-birthday-1.jpg',30,1),(28,'https://shopquatructuyen.com/wp-content/uploads/2019/04/mo-hinh-dong-ho-thap-big-ben-1.jpg',31,1),(29,'https://shopquatructuyen.com/wp-content/uploads/2020/02/dong-ho-bao-thuc-hinh-tho-1.jpg',32,1),(30,'https://shopquatructuyen.com/wp-content/uploads/2018/08/dong-ho-xe-dap-co-1.jpg',33,1),(32,'https://shopquatructuyen.com/wp-content/uploads/2019/05/den-ngu-led-3D-1.jpg',34,1),(33,'https://shopquatructuyen.com/wp-content/uploads/2019/05/den-ngu-ga-con-3.jpg',35,1),(34,'https://shopquatructuyen.com/wp-content/uploads/2019/05/den-ngu-mat-trang-3.jpg',36,1),(35,'https://shopquatructuyen.com/wp-content/uploads/2019/04/den-ngu-led-long-kinh-2.jpg',37,1),(36,'https://shopquatructuyen.com/wp-content/uploads/2019/04/den-ngu-bot-dien-thoai-1.jpg',38,1),(37,'https://shopquatructuyen.com/wp-content/uploads/2019/04/den-ngu-3D-1.jpg',39,1),(38,'https://shopquatructuyen.com/wp-content/uploads/2018/11/den-chieu-sao-phien-ban-2-2.jpg',40,1),(39,'https://shopquatructuyen.com/wp-content/uploads/2018/09/den-ngu-heo-con-5.jpg',41,1),(40,'https://shopquatructuyen.com/wp-content/uploads/2018/07/den-doi-luu-lava-1.jpg',42,1),(41,'https://shopquatructuyen.com/wp-content/uploads/2019/05/den-chieu-sao-2.jpg',43,1),(42,'https://shopquatructuyen.com/wp-content/uploads/2020/10/khung-anh-small-lucky-3.jpg',44,1),(43,'https://shopquatructuyen.com/wp-content/uploads/2019/07/khung-anh-go-xe-dap-3.jpg',45,1),(44,'https://shopquatructuyen.com/wp-content/uploads/2019/05/khung-anh-go-2-lop-3.jpg',46,1),(45,'https://shopquatructuyen.com/wp-content/uploads/2019/05/khung-anh-co-dien-1.jpg',47,1),(46,'https://salt.tikicdn.com/cache/750x750/ts/product/75/ae/27/2cd51de6e41f2362d0296f4f3b846740.jpg.webp',48,1),(47,'https://salt.tikicdn.com/cache/750x750/ts/product/56/70/43/80b99d53fc6697558e6988b41ce0fae1.jpg.webp',49,1),(48,'https://salt.tikicdn.com/cache/750x750/ts/product/b8/b7/2e/a5767c8fc004d43255e0f799c7c3a28a.jpg.webp',50,1),(49,'https://salt.tikicdn.com/cache/750x750/ts/product/82/b5/fe/332f9481c036b59bb79dad27142c6781.png.webp',51,1),(50,'https://salt.tikicdn.com/cache/750x750/ts/product/18/97/f9/4b80cf87095e72536fe58884deced12a.jpg.webp',52,1),(51,'https://salt.tikicdn.com/cache/750x750/ts/product/97/b0/1e/b6f9a7650d6748d0edf592b72459b60d.PNG.webp',53,1),(52,'https://shopquatructuyen.com/wp-content/uploads/2019/04/chien-binh-giu-but-1.jpg',54,1),(53,'https://shopquatructuyen.com/wp-content/uploads/2019/04/hop-but-thuy-tinh-3.jpg',55,1),(54,'https://shopquatructuyen.com/wp-content/uploads/2018/11/hop-but-go-ngan-keo-1.jpg',56,1),(55,'https://shopquatructuyen.com/wp-content/uploads/2018/11/hop-but-xe-dap-1.jpg',57,1),(56,'https://shopquatructuyen.com/wp-content/uploads/2018/08/hop-but-dong-ho-cat-1.jpg',58,1),(57,'https://shopquatructuyen.com/wp-content/uploads/2019/04/hop-but-gio-sat-2.jpg',59,1),(58,'https://salt.tikicdn.com/cache/750x750/ts/product/6f/1a/50/393ce427cd6c290d7ce0e255bce63059.jpg.webp',60,1),(59,'https://salt.tikicdn.com/cache/750x750/ts/product/b3/a6/48/ba335a874e15f5438cca12afb8f5a49f.jpg.webp',61,1),(60,'https://salt.tikicdn.com/cache/750x750/ts/product/7c/59/d3/cf8ef86391953a4a9f09e86bfc8a0fd8.jpg.webp',62,1),(61,'https://salt.tikicdn.com/cache/750x750/ts/product/a4/d3/bc/accd80f0b82a0a1a38bd3b667ff11114.jpg.webp',63,1);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `order_detail_id` int NOT NULL,
  `comment` varchar(400) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `enable` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_key_email_order_detail_id` (`email`,`order_detail_id`),
  KEY `fk_user_idx` (`email`),
  KEY `fk_order_detail_idx` (`order_detail_id`),
  CONSTRAINT `fk_review_order_detail` FOREIGN KEY (`order_detail_id`) REFERENCES `order_detail` (`id`),
  CONSTRAINT `fk_review_user` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_CUSTOMER'),(3,'ROLE_MANAGER'),(2,'ROLE_STAFF');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `user` VALUES ('ambermassey@example.org',1,'AaronLucas','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Khách Hàng là','Thượng Đế haha','0123456789',2021,NULL,NULL,NULL,1,'Male'),('andrea38@example.com',2,'ElizabethSmith','ElizabethSmith','David','Wilson',NULL,NULL,NULL,NULL,NULL,1,'Male'),('ashleypowell@example.net',2,'RebeccaWilson','RebeccaWilson','Kristen','Phillips',NULL,NULL,NULL,NULL,NULL,1,'Male'),('carolthompson@example.com',2,'MatthewLe','MatthewLe','Nathan','Miller',NULL,NULL,NULL,NULL,NULL,1,'Male'),('ccarney@example.com',2,'ChasePhillips','ChasePhillips','Richard','Gonzales',NULL,NULL,NULL,NULL,NULL,1,'Male'),('csanchez@example.com',2,'JamesNguyen','JamesNguyen','Dennis','Wolf',NULL,NULL,NULL,NULL,NULL,1,'Male'),('customer@gmail.com',1,'customer','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Khách Hàng là','Thượng Đế','0123456789',2021,NULL,NULL,NULL,1,'Male'),('djohnson@example.net',2,'TylerSantiago','TylerSantiago','Joshua','Lowery',NULL,NULL,NULL,NULL,NULL,1,'Female'),('duyduc@gmail.com',2,'duyduc','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Duy','Đức','0934968393',2002,NULL,NULL,NULL,1,'Female'),('eatonamanda@example.com',2,'TimothyHernandez','TimothyHernandez','Sandra','Spears',NULL,NULL,NULL,NULL,NULL,1,'Female'),('fweiss@example.net',2,'CassidyJohnson','CassidyJohnson','Jennifer','Ruiz',NULL,NULL,NULL,NULL,NULL,1,'Female'),('goldenantonio@example.org',2,'MichaelTodd','MichaelTodd','Shawn','Ware',NULL,NULL,NULL,NULL,NULL,1,'Female'),('grantmichael@example.net',2,'TaylorColon','TaylorColon','Joseph','Carlson',NULL,NULL,NULL,NULL,NULL,1,'Female'),('jameswilliams@example.com',2,'JosephHicks','JosephHicks','Duane','Ferrell',NULL,NULL,NULL,NULL,NULL,1,'Female'),('jasmineking@example.org',2,'MitchellFields','MitchellFields','Pamela','Bell',NULL,NULL,NULL,NULL,NULL,1,'Female'),('jason16@example.org',2,'MelissaJones','MelissaJones','Miguel','Phillips',NULL,NULL,NULL,NULL,NULL,1,'Female'),('john17@example.org',2,'AnthonyBoyd','AnthonyBoyd','Victor','Santiago',NULL,NULL,NULL,NULL,NULL,1,'Female'),('karengutierrez@example.com',2,'EileenMelendez','EileenMelendez','Zoe','Day',NULL,NULL,NULL,NULL,NULL,1,'Female'),('lindsay30@example.com',2,'NatashaWheeler','NatashaWheeler','Dean','Cooper',NULL,NULL,NULL,NULL,NULL,1,'Other'),('manager@gmail.com',3,'manager','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Manager',NULL,NULL,NULL,NULL,NULL,NULL,1,'Other'),('marquezelizabeth@example.com',2,'LisaBell','LisaBell','Valerie','Jones',NULL,NULL,NULL,NULL,NULL,1,NULL),('matthew92@example.org',2,'JustinNewton','JustinNewton','Ashley','Valencia',NULL,NULL,NULL,NULL,NULL,1,NULL),('michael40@example.org',2,'RichardSullivan','RichardSullivan','Barbara','Griffith',NULL,NULL,NULL,NULL,NULL,1,NULL),('mtorres@example.org',2,'ManuelCox','ManuelCox','Robert','Howard',NULL,NULL,NULL,NULL,NULL,1,NULL),('navarroronald@example.net',2,'KimberlyStanley','KimberlyStanley','Scott','Rogers',NULL,NULL,NULL,NULL,NULL,1,NULL),('ochandler@example.net',2,'NicholasFischer','NicholasFischer','Emily','Alvarado',NULL,NULL,NULL,NULL,NULL,1,NULL),('oritter@example.com',2,'StephanieJones','StephanieJones','Donald','Stone',NULL,NULL,NULL,NULL,NULL,1,NULL),('oscott@example.net',2,'KevinLamb','KevinLamb','Adam','Hughes',NULL,NULL,NULL,NULL,NULL,1,NULL),('payala@example.net',2,'AnthonyLopez','AnthonyLopez','Luke','Daniel',NULL,NULL,NULL,NULL,NULL,1,NULL),('petersonjames@example.net',2,'PaulLivingston','PaulLivingston','Kelsey','Spencer',NULL,NULL,NULL,NULL,NULL,1,NULL),('ryan32@example.org',2,'RitaLynch','RitaLynch','Robin','Williams',NULL,NULL,NULL,NULL,NULL,1,NULL),('shepardaaron@example.org',2,'AmberBrock','AmberBrock','Karen','Lawrence',NULL,NULL,NULL,NULL,NULL,1,NULL),('staff@gmail.com',2,'staff','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Staff',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),('thien123dh@gmail.com',1,'Tôi là Thượng Đế','$2a$10$eiGJNzsBj.TKTG72BRRMteJlOIBv9x3KoaTAbzYKaX652FUB17pzG','Khách Hàng là','Khách Hàng là','0123456789',2021,NULL,NULL,NULL,1,'Male'),('torresaaron@example.net',2,'BrittanyObrien','BrittanyObrien','Timothy','Rogers',NULL,NULL,NULL,NULL,NULL,1,NULL),('wgonzalez@example.com',2,'VanessaEstrada','VanessaEstrada','Ryan','Martin',NULL,NULL,NULL,NULL,NULL,1,NULL),('wonglynn@example.com',2,'MeganWolfe','MeganWolfe','Jason','Parsons',NULL,NULL,NULL,NULL,NULL,1,NULL),('woodsamy@example.net',2,'LawrenceCummings','LawrenceCummings','Cheryl','Smith',NULL,NULL,NULL,NULL,NULL,1,NULL),('wswanson@example.com',2,'JacquelineWilson','JacquelineWilson','Carrie','Goodman',NULL,NULL,NULL,NULL,NULL,1,NULL),('xle@example.com',2,'KimberlyObrien','KimberlyObrien','Kathleen','Ford',NULL,NULL,NULL,NULL,NULL,1,NULL),('yhansen@example.net',2,'KennethJohnson','KennethJohnson','Leonard','Alexander',NULL,NULL,NULL,NULL,NULL,1,NULL);
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

-- Dump completed on 2023-06-14 12:52:35
