-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2025 at 08:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prime_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) NOT NULL,
  `slug` text NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `preface` varchar(255) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `keyword` varchar(75) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `insert_user` int(11) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `update_user` int(11) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `release_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id`, `lang`, `slug`, `title`, `preface`, `detail`, `keyword`, `image`, `status`, `insert_user`, `insert_date`, `update_user`, `update_date`, `release_date`) VALUES
(1, 'id', 'sample-aja', 'Sample Blog', 'Preface Sample Blog', 'Ini Detailnya lorem ipsum', 'lorem, ipsum', 'img/about-img.png', 1, NULL, NULL, NULL, NULL, NULL),
(2, 'id', 'sample2', 'Sample Blog 2', 'Preface Sample Blog 2', 'Ini Detailnya lorem ipsum 2', 'lorem, ipsum2', 'img/about-img.png', 1, NULL, NULL, NULL, NULL, NULL),
(3, 'id', 'sample-aja3', 'Sample Blog', 'Preface Sample Blog', 'Ini Detailnya lorem ipsum', 'lorem, ipsum', 'img/about-img.png', 1, NULL, NULL, NULL, NULL, NULL),
(4, 'id', 'sample-aja-4', 'Sample Blog 2', 'Preface Sample Blog 2', 'Ini Detailnya lorem ipsum 2', 'lorem, ipsum2', 'https://www.primeforklift.co.id/assets/uploads/images/thumbs/221124095818.jpg', 1, NULL, NULL, NULL, NULL, NULL),
(5, 'cn', '仅样本', '示例博客', '前言示例博客', '这是 lorem ipsum 的详细信息', '乱码、假名', 'img/about-img.png', 1, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `article_view`
-- (See below for the actual view)
--
CREATE TABLE `article_view` (
`id` mediumtext
,`lang` varchar(50)
,`slug` text
,`title` varchar(255)
,`preface` varchar(255)
,`detail` text
,`keyword` varchar(75)
,`image` varchar(255)
,`status` tinyint(4)
,`insert_user` int(11)
,`insert_date` datetime
,`update_user` int(11)
,`update_date` datetime
,`release_date` datetime
);

-- --------------------------------------------------------

--
-- Table structure for table `catalogues`
--

CREATE TABLE `catalogues` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) NOT NULL,
  `slug` text NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `id_merk` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `spec` text NOT NULL,
  `image` text DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catalogues`
--

INSERT INTO `catalogues` (`id`, `lang`, `slug`, `name`, `id_merk`, `description`, `spec`, `image`, `id_category`, `status`) VALUES
(1, 'id', 'FORKLIFT-TOYOTA-2,5-TON', 'FORKLIFT TOYOTA 2,5 TON', 1, 'Deskripsi', 'Model:-;\r\nKapasitas:-;\r\nLifting Height:-;\r\nLoad Center:-;\r\nTransmision:-;\r\nEngine:-;\r\nType:-;', 'img/JGBHGYHG-4.png', 1, 1),
(2, 'id', 'FORKLIFT-TOYOTA-2,5-TON', 'FORKLIFT TOYOTA 2,5 TON', 1, 'Deskripsi Sparepart', '', 'img/JGBHGYHG-4.png', 2, 1),
(3, 'id', 'FORKLIFT-TOYOTA-2,5-TON', 'FORKLIFT TOYOTA 2,5 TON', 1, 'Deskripsi', 'Model:-;\r\nKapasitas:-;\r\nLifting Height:-;\r\nLoad Center:-;\r\nTransmision:-;\r\nEngine:-;\r\nType:-;', 'img/JGBHGYHG-4.png', 3, 1),
(4, 'id', 'FORKLIFT-TOYOTA-2,5-TON', 'FORKLIFT TOYOTA 2,5 TON', 1, 'Deskripsi Sparepart', '', 'img/JGBHGYHG-4.png', 4, 1),
(5, 'id', 'FORKLIFT-TOYOTA-2,5-TON', 'FORKLIFT TOYOTA 2,5 TON', 1, 'Deskripsi Sparepart', '', 'img/JGBHGYHG-4.png', 5, 1),
(6, 'id', 'FORKLIFT-TOYOTA-25-TON', 'FORKLIFT TOYOTA 2,5 TON', 1, 'Deskripsi', 'Model:-;\r\nKapasitas:-;\r\nLifting Height:-;\r\nLoad Center:-;\r\nTransmision:-;\r\nEngine:-;\r\nType:-;', 'img/JGBHGYHG-4.png', 1, 1),
(7, 'id', '', 'FORKLIFT TOYOTA 2,5 TON', 1, 'Deskripsi', 'Model:-;\r\nKapasitas:-;\r\nLifting Height:-;\r\nLoad Center:-;\r\nTransmision:-;\r\nEngine:-;\r\nType:-;', 'img/JGBHGYHG-4.png', 1, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `catalogues_view`
-- (See below for the actual view)
--
CREATE TABLE `catalogues_view` (
`id` mediumtext
,`lang` varchar(50)
,`slug` text
,`name` varchar(50)
,`id_merk` int(11)
,`merk` varchar(50)
,`description` text
,`spec` text
,`image` text
,`id_category` int(11)
,`status` tinyint(4)
);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) NOT NULL DEFAULT '0',
  `parent_id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `lang`, `parent_id`, `name`, `status`) VALUES
(1, 'id', 0, 'Unit Forklift', 1),
(2, 'id', 0, 'Sparepart', 1),
(3, 'id', 0, 'Ban Forklift', 1),
(4, 'id', 0, 'Battery', 1),
(5, 'id', 0, 'Attachment', 1),
(16, 'cn', 0, '叉车单元', 1),
(17, 'cn', 0, '备件', 1),
(18, 'cn', 0, '叉车轮胎', 1),
(19, 'cn', 0, '电池', 1),
(20, 'cn', 0, '附件', 1),
(21, 'jp', 0, 'フォークリフトユニット', 1);

-- --------------------------------------------------------

--
-- Table structure for table `chat_main`
--

CREATE TABLE `chat_main` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `locked` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

CREATE TABLE `chat_message` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) DEFAULT NULL,
  `message` varchar(150) DEFAULT NULL,
  `admin_id` int(11) NOT NULL DEFAULT 0,
  `datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `link` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `lang`, `name`, `image`, `link`, `status`) VALUES
(1, 'id', 'Wulling', 'Unit_Forklift.jpg', 'https://adad', 1);

-- --------------------------------------------------------

--
-- Table structure for table `configs`
--

CREATE TABLE `configs` (
  `config_id` int(10) UNSIGNED NOT NULL,
  `lang` varchar(50) NOT NULL,
  `config_name` varchar(100) DEFAULT NULL,
  `config_value` text DEFAULT NULL,
  `config_type` varchar(25) NOT NULL DEFAULT 'text',
  `order` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `icon_class` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `insert_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `configs`
--

INSERT INTO `configs` (`config_id`, `lang`, `config_name`, `config_value`, `config_type`, `order`, `image`, `icon_class`, `status`, `insert_date`, `update_date`) VALUES
(1, 'id', 'About Us', '<h4>PT PRIME FORKLIFT SERVICES</h4>\r\n            <p style=\"text-align:justify;\">IT\'S PRIME SERVICES\r\n                Berbekal pengalaman di pemeliharaan Forklift berbagai merek selama lebih dari 20 tahun, maka kami\r\n                mendirikan perusahaan PT PRIME FORKLIFT SERVICE ini untuk dapat melayani Pelanggan dengan PRIMA.\r\n                \"IT\'S PRIME SERVICES\" menjadi Slogan Kami.\r\n                PT. Prime Forklift Services, berdiri karena VISI dari founder yang ingin :\r\n                \"Menjadi rekan TERPERCAYA dalam penangan barang\" / \"To be A TRUSTED partner in material handling\"\r\n                Kami juga dipercaya sebagai Authorized Dealer dari Forklift merk Komatsu, Mitsubishi dan Nichiyu.</p>', 'about', '1', 'img/about-img.png', '', 1, NULL, NULL),
(2, 'id', 'Visi', '<p style=\"text-align:justify;\">Menjadi mitra terpercaya dalam penanganan barang, dengan menyediakan solusi\r\n                alat angkut (material handling equipment) terbaik untuk mendukung efisiensi dan produktivitas pelanggan.\r\n            </p>', 'about', '2', '', '', 1, NULL, NULL),
(3, 'id', 'Misi', '<p style=\"text-align:justify;\">Menyediakan pelayanan prima yang responsif dan solusif untuk memnuhi\r\n                kebutuhan pelanggan.</p>\r\n            <p style=\"text-align:justify;\">Menyediakan suku cadang alat angkut (material handling equipment) yang\r\n                berkualitas tinggi dan terpercaya untuk mendukung performa alat angkut.</p>\r\n            <p style=\"text-align:justify;\">Menyediakan alat angkut (material handling equipment) berkualitas dengan\r\n                standar keselamatan, efisiensi, daya tahan terbaik untuk mendukung produktivitas pelanggan</p>\r\n        </div>', 'about', '3', '', '', 1, NULL, NULL),
(4, 'id', 'telp', '&nbsp (0267)-8402034', 'contact', '1', 'img/phone-solid.svg', '', 1, NULL, NULL),
(5, 'id', 'wa', '&nbsp 082210812989', 'contact', '2', 'img/whatsapp-brands.svg', '', 1, NULL, NULL),
(6, 'id', 'email', '&nbsp mangcoding123@gmail.com', 'contact', '3', 'img/envelope-solid.svg', '', 1, NULL, NULL),
(7, 'id', 'address', '&nbsp Jl.Raya Kosambi 1\n                        No.18 F<br />&nbsp&nbsp&nbsp&nbsp Karawang, Jawa Barat, Indonesia', 'contact', '4', 'img/location-dot-solid.svg', '', 1, NULL, NULL),
(8, 'id', 'owh', '&nbsp Senin - Jumat : 07:30 - 16:30<br />&nbsp&nbsp&nbsp&nbsp Sabtu :\n                        07:30 - 12:00', 'contact', '5', 'img/clock-solid.svg', '', 1, NULL, NULL),
(9, 'id', 'fb', '-', 'soc', '1', 'img/fb.png', '', 1, NULL, NULL),
(10, 'id', 'tiktok', '-', 'soc', '2', 'img/tik.png', '', 1, NULL, NULL),
(11, 'id', 'linkedin', '-', 'soc', '3', 'img/lin.png', '', 1, NULL, NULL),
(12, 'id', 'ig', '-', 'soc', '4', 'img/ig.png', '', 1, NULL, NULL),
(13, 'id', 'tokopedia', '-', 'market', '1', 'img/image-23.png', '', 1, NULL, NULL),
(14, 'id', 'shopee', '-', 'market', '2', 'img/image-24.png', '', 1, NULL, NULL),
(15, 'id', 'blibli', '-', 'market', '3', 'img/image-25.png', '', 1, NULL, NULL),
(16, 'cn', '关于我们', '<h4>PT PRIME 叉车服务</h4>\n            <p style=\"text-align:justify;\">这是优质服务\n                我们拥有 20 多年维护各种品牌叉车的经验，\n                成立了 PT PRIME FORKLIFT SERVICE 公司，以便能够为 PRIME 客户提供服务。\n                “IT\'S PRIME SERVICES”是我们的口号。\n                PT。 Prime Forklift Services 的成立源于创始人的愿景：\n                “成为物料搬运领域值得信赖的合作伙伴”\n                我们也是小松、三菱和力至优叉车值得信赖的授权经销商。</p>', 'about', '1', 'img/about-img.png', '', 1, NULL, NULL),
(17, 'cn', '每个人', '<p style=\"text-align:justify;\">通过提供解决方案，成为值得信赖的货物处理合作伙伴\n                最好的物料搬运设备，以支持客户的效率和生产力。\n            </p>', 'about', '2', '', '', 1, NULL, NULL),
(18, 'cn', '使命', '<p style=\"text-align:justify;\">提供响应迅速、以解决方案为导向的优质服务，以满足\n                客户需求。</p>\n            <p style=\"text-align:justify;\">提供运输设备（物料搬运设备）的备件\n                高质量和可靠的支持运输设备的性能。</p>\n            <p style=\"text-align:justify;\">提供优质的运输设备（物料搬运设备），\n                最佳安全性、效率和耐用性标准，以支持客户生产力</p>', 'about', '3', '', '', 1, NULL, NULL),
(19, 'cn', 'telp', '&nbsp (0267)-8402034', 'contact', '1', 'img/phone-solid.svg', '', 1, NULL, NULL),
(20, 'cn', 'wa', '&nbsp 082210812989', 'contact', '2', 'img/whatsapp-brands.svg', '', 1, NULL, NULL),
(21, 'cn', 'email', '&nbsp mangcoding123@gmail.com', 'contact', '3', 'img/envelope-solid.svg', '', 1, NULL, NULL),
(22, 'cn', 'address', '&nbsp 拉亚路 Kosambi 1\n                        No.18 F<br />&nbsp&nbsp&nbsp&nbsp Karawang, Jawa Barat, Indonesia', 'contact', '4', 'img/location-dot-solid.svg', '', 1, NULL, NULL),
(23, 'cn', 'owh', '周日 - 周日 : 07:30 - 16:30<br />&nbsp&nbsp&nbsp&nbsp 周六 :\n07:30 - 12:00', 'contact', '5', 'img/clock-solid.svg', '', 1, NULL, NULL),
(24, 'cn', 'fb', '-', 'soc', '1', 'img/fb.png', '', 1, NULL, NULL),
(25, 'cn', 'tiktok', '-', 'soc', '2', 'img/tik.png', '', 1, NULL, NULL),
(26, 'cn', 'linkedin', '-', 'soc', '3', 'img/lin.png', '', 1, NULL, NULL),
(27, 'cn', 'ig', '-', 'soc', '4', 'img/ig.png', '', 1, NULL, NULL),
(28, 'cn', 'tokopedia', '-', 'market', '1', 'img/image-23.png', '', 1, NULL, NULL),
(29, 'cn', 'shopee', '-', 'market', '2', 'img/image-24.png', '', 1, NULL, NULL),
(30, 'cn', 'blibli', '-', 'market', '3', 'img/image-25.png', '', 1, NULL, NULL),
(31, 'jp', '私たちについて', '<h4>PTプライムフォークリフトサービス</h4>\n            <p style=\"text-align:justify;\">プライムサービス\n                20年以上にわたり様々なブランドのフォークリフトをメンテナンスしてきた経験を活かし、\n                PRIMEで顧客にサービスを提供できるように、PT PRIME FORKLIFT SERVICEという会社を設立しました。\n                「IT\'S PRIME SERVICES」が私たちのスローガンです。\n                PT. Prime Forklift Services は、次のような創設者のビジョンに基づいて設立されました。\n                「マテリアルハンドリングにおける信頼できるパートナーとなる」\n                また、コマツ、三菱、ニチユフォークリフトの正規代理店としても信頼を得ております。</p>', 'about', '1', 'img/about-img.png', '', 1, NULL, NULL),
(32, 'jp', 'みんな', '<p style=\"text-align:justify;\">ソリューションを提供することで、商品の取り扱いにおいて信頼できるパートナーになる\n                顧客の効率性と生産性をサポートする最高の資材搬送設備。\n            </p>', 'about', '2', '', '', 1, NULL, NULL),
(33, 'jp', 'ミッション', '<p style=\"text-align:justify;\">お客様のニーズを満たすために、応答性とソリューション指向性に優れたサービスを提供します。\n                顧客のニーズに応える。</p>\n            <p style=\"text-align:justify;\">輸送機器（マテリアルハンドリング機器）のスペアパーツの提供\n                輸送機器の性能を支える高品質と信頼性。</p>\n            <p style=\"text-align:justify;\">高品質の輸送機器（マテリアルハンドリング機器）を提供する\n                顧客の生産性をサポートするための最高の安全性、効率性、耐久性基準</p>', 'about', '3', '', '', 1, NULL, NULL),
(34, 'jp', 'telp', '&nbsp (0267)-8402034', 'contact', '1', 'img/phone-solid.svg', '', 1, NULL, NULL),
(35, 'jp', 'wa', '&nbsp 082210812989', 'contact', '2', 'img/whatsapp-brands.svg', '', 1, NULL, NULL),
(36, 'jp', 'email', '&nbsp mangcoding123@gmail.com', 'contact', '3', 'img/envelope-solid.svg', '', 1, NULL, NULL),
(37, 'jp', 'address', '&nbsp Jl.Raya Kosambi 1\n                        No.18 F<br />&nbsp&nbsp&nbsp&nbsp Karawang, Jawa Barat, Indonesia', 'contact', '4', 'img/location-dot-solid.svg', '', 1, NULL, NULL),
(38, 'jp', 'owh', '&nbsp Senin - Jumat : 07:30 - 16:30<br />&nbsp&nbsp&nbsp&nbsp Sabtu :\n                        07:30 - 12:00', 'contact', '5', 'img/clock-solid.svg', '', 1, NULL, NULL),
(39, 'jp', 'fb', '-', 'soc', '1', 'img/fb.png', '', 1, NULL, NULL),
(40, 'jp', 'tiktok', '-', 'soc', '2', 'img/tik.png', '', 1, NULL, NULL),
(41, 'jp', 'linkedin', '-', 'soc', '3', 'img/lin.png', '', 1, NULL, NULL),
(42, 'jp', 'ig', '-', 'soc', '4', 'img/ig.png', '', 1, NULL, NULL),
(43, 'jp', 'tokopedia', '-', 'market', '1', 'img/image-23.png', '', 1, NULL, NULL),
(44, 'jp', 'shopee', '-', 'market', '2', 'img/image-24.png', '', 1, NULL, NULL),
(45, 'jp', 'blibli', '-', 'market', '3', 'img/image-25.png', '', 1, NULL, NULL),
(46, 'gn', 'Über uns', '<h4>PT PRIME GABELSTAPLERDIENSTE</h4>\n            <p style=\"text-align:justify;\">ES IST PRIME SERVICES\n                Ausgestattet mit Erfahrung in der Wartung verschiedener Marken von Gabelstaplern seit mehr als 20 Jahren, wir\n                Um Kunden mit PRIME bedienen zu können, gründete man die Firma PT PRIME FORKLIFT SERVICE.\n                „IT’S PRIME SERVICES“ ​​ist unser Slogan.\n                PT. Prime Forklift Services wurde aufgrund der VISION des Gründers gegründet, der Folgendes wollte:\n                „Ein VERTRAUENSWÜRDIGER Partner im Materialhandling sein“\n                Wir sind außerdem ein vertrauenswürdiger autorisierter Händler für Gabelstapler von Komatsu, Mitsubishi und Nichiyu.</p>', 'about', '1', 'img/about-img.png', '', 1, NULL, NULL),
(47, 'gn', 'Alle', '<p style=\"text-align:justify;\">Werden Sie ein vertrauenswürdiger Partner im Warenumschlag, indem Sie Lösungen anbieten\n                die beste Materialhandhabungsausrüstung zur Unterstützung der Effizienz und Produktivität des Kunden.\n            </p>', 'about', '2', '', '', 1, NULL, NULL),
(48, 'gn', 'Mission', '<p style=\"text-align:justify;\">Wir bieten exzellenten Service, der reaktionsschnell und lösungsorientiert ist, um\n                Kundenbedürfnisse.</p>\n            <p style=\"text-align:justify;\">Bereitstellung von Ersatzteilen für Transportgeräte (Materialtransportgeräte)\n                hochwertig und zuverlässig, um die Leistung der Transportausrüstung zu unterstützen.</p>\n            <p style=\"text-align:justify;\">Bereitstellung hochwertiger Transportausrüstung (Materialhandhabungsausrüstung) mit\n                höchste Standards in puncto Sicherheit, Effizienz und Haltbarkeit zur Unterstützung der Kundenproduktivität</p>', 'about', '3', '', '', 1, NULL, NULL),
(49, 'gn', 'telp', '&nbsp (0267)-8402034', 'contact', '1', 'img/phone-solid.svg', '', 1, NULL, NULL),
(50, 'gn', 'wa', '&nbsp 082210812989', 'contact', '2', 'img/whatsapp-brands.svg', '', 1, NULL, NULL),
(51, 'gn', 'email', '&nbsp mangcoding123@gmail.com', 'contact', '3', 'img/envelope-solid.svg', '', 1, NULL, NULL),
(52, 'gn', 'address', '&nbsp Jl.Raya Kosambi 1\n                        No.18 F<br />&nbsp&nbsp&nbsp&nbsp Karawang, Jawa Barat, Indonesia', 'contact', '4', 'img/location-dot-solid.svg', '', 1, NULL, NULL),
(53, 'gn', 'owh', '&nbsp Senin - Jumat : 07:30 - 16:30<br />&nbsp&nbsp&nbsp&nbsp Sabtu :\n                        07:30 - 12:00', 'contact', '5', 'img/clock-solid.svg', '', 1, NULL, NULL),
(54, 'gn', 'fb', '-', 'soc', '1', 'img/fb.png', '', 1, NULL, NULL),
(55, 'gn', 'tiktok', '-', 'soc', '2', 'img/tik.png', '', 1, NULL, NULL),
(56, 'gn', 'linkedin', '-', 'soc', '3', 'img/lin.png', '', 1, NULL, NULL),
(57, 'gn', 'ig', '-', 'soc', '4', 'img/ig.png', '', 1, NULL, NULL),
(58, 'gn', 'tokopedia', '-', 'market', '1', 'img/image-23.png', '', 1, NULL, NULL),
(59, 'gn', 'shopee', '-', 'market', '2', 'img/image-24.png', '', 1, NULL, NULL),
(60, 'gn', 'blibli', '-', 'market', '3', 'img/image-25.png', '', 1, NULL, NULL),
(61, 'id', 'Misi2', '<p style=\"text-align:justify;\">Menyediakan pelayanan prima yang responsif dan solusif untuk memnuhi\r\n                kebutuhan pelanggan.</p>\r\n            <p style=\"text-align:justify;\">Menyediakan suku cadang alat angkut (material handling equipment) yang\r\n                berkualitas tinggi dan terpercaya untuk mendukung performa alat angkut.</p>\r\n            <p style=\"text-align:justify;\">Menyediakan alat angkut (material handling equipment) berkualitas dengan\r\n                standar keselamatan, efisiensi, daya tahan terbaik untuk mendukung produktivitas pelanggan</p>\r\n        </div>', 'about', '3', '', '', 1, NULL, NULL),
(62, 'id', 'Why', 'Kenapa Harus Pilih Kami?', 'why', '1', 'img/why-img.png', '', 1, NULL, NULL),
(63, 'id', 'Why-Item:Pelayanan Prima', 'Tim kami melayani pelanggan dengan prima dari mulai pemilihan unit, pembuatan\n                            kontrak hingga pengiriman unit sampai ke lokasi proyek. selain itu kami mempunyai teknisi yang\n                            standby jika terjadi sesuatu yang secepatnya perlu tindakan.', 'why', '2', 'img/guarantee.png', '', 1, NULL, NULL),
(64, 'id', 'Why-Item:Unit Prima', 'Semua unit forklift disediakan dalam kondisi terawat dengan tipe unit yang variatif\n                            seperti forklift diesel, elektrik, reachtruck ,stacker elektrik,handpallet dll.', 'why', '3', 'img/membership-card.png', '', 1, NULL, NULL),
(66, 'id', 'Why-Item:Harga Sewa Kompetitif', 'Kami ada beberapa layanan di antaranya : rental harian, bulanan maupun tahunan.\n                            Spesialis alat berat terpercaya, memberikan harga sesuai yang pelanggan butuhkan dan bersaing\n                            serta selalu memberikan layanan yang prima untuk kepuasan pelanggan.', 'why', '3', 'img/Receive-Cash.png', '', 1, NULL, NULL),
(67, 'cn', 'Why', '为什么选择我们？', 'why', '1', 'img/why-img.png', '', 1, NULL, NULL),
(68, 'cn', 'Why-Item:优质服务', '我们的团队为客户提供卓越的服务，从单位选择、合同创建到单位交付到项目地点。除此之外，如果发生需要立即采取行动的情况，我们还有技术人员随时待命。', 'why', '2', 'img/guarantee.png', '', 1, NULL, NULL),
(69, 'cn', 'Why-Item:\n总理单位', '我们的团队为客户提供卓越的服务，从单位选择、合同创建到单位交付到项目地点。除此之外，如果发生需要立即采取行动的情况，我们还有技术人员随时待命。', 'why', '3', 'img/membership-card.png', '', 1, NULL, NULL),
(70, 'cn', 'Why-Item:有竞争力的租赁价格', '我们的团队为客户提供卓越的服务，从单位选择、合同创建到单位交付到项目地点。除此之外，如果发生需要立即采取行动的情况，我们还有技术人员随时待命。', 'why', '3', 'img/Receive-Cash.png', '', 1, NULL, NULL),
(71, 'jp', 'Why', 'Kenapa Harus Pilih Kami?', 'why', '1', 'img/why-img.png', '', 1, NULL, NULL),
(72, 'jp', 'Why-Item:Pelayanan Prima', 'Tim kami melayani pelanggan dengan prima dari mulai pemilihan unit, pembuatan\n                            kontrak hingga pengiriman unit sampai ke lokasi proyek. selain itu kami mempunyai teknisi yang\n                            standby jika terjadi sesuatu yang secepatnya perlu tindakan.', 'why', '2', 'img/guarantee.png', '', 1, NULL, NULL),
(73, 'jp', 'Why-Item:Unit Prima', 'Kami ada beberapa layanan di antaranya : rental harian, bulanan maupun tahunan.\n                            Spesialis alat berat terpercaya, memberikan harga sesuai yang pelanggan butuhkan dan bersaing\n                            serta selalu memberikan layanan yang prima untuk kepuasan pelanggan.', 'why', '3', 'img/membership-card.png', '', 1, NULL, NULL),
(74, 'jp', 'Why-Item:Harga Sewa Kompetitif', 'Kami ada beberapa layanan di antaranya : rental harian, bulanan maupun tahunan.\n                            Spesialis alat berat terpercaya, memberikan harga sesuai yang pelanggan butuhkan dan bersaing\n                            serta selalu memberikan layanan yang prima untuk kepuasan pelanggan.', 'why', '3', 'img/Receive-Cash.png', '', 1, NULL, NULL),
(75, 'gn', 'Why', 'Kenapa Harus Pilih Kami?', 'why', '1', 'img/why-img.png', '', 1, NULL, NULL),
(76, 'gn', 'Why-Item:Pelayanan Prima', 'Tim kami melayani pelanggan dengan prima dari mulai pemilihan unit, pembuatan\n                            kontrak hingga pengiriman unit sampai ke lokasi proyek. selain itu kami mempunyai teknisi yang\n                            standby jika terjadi sesuatu yang secepatnya perlu tindakan.', 'why', '2', 'img/guarantee.png', '', 1, NULL, NULL),
(77, 'gn', 'Why-Item:Unit Prima', 'Kami ada beberapa layanan di antaranya : rental harian, bulanan maupun tahunan.\n                            Spesialis alat berat terpercaya, memberikan harga sesuai yang pelanggan butuhkan dan bersaing\n                            serta selalu memberikan layanan yang prima untuk kepuasan pelanggan.', 'why', '3', 'img/membership-card.png', '', 1, NULL, NULL),
(78, 'gn', 'Why-Item:Harga Sewa Kompetitif', 'Kami ada beberapa layanan di antaranya : rental harian, bulanan maupun tahunan.\n                            Spesialis alat berat terpercaya, memberikan harga sesuai yang pelanggan butuhkan dan bersaing\n                            serta selalu memberikan layanan yang prima untuk kepuasan pelanggan.', 'why', '3', 'img/Receive-Cash.png', '', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `caption` varchar(75) DEFAULT NULL,
  `upload_date` datetime DEFAULT NULL,
  `type` enum('normal','catalogue','logo') NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `preface` varchar(200) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `update_user` int(11) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lang`
--

CREATE TABLE `lang` (
  `id` int(11) NOT NULL,
  `sort_name` varchar(25) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `flag_image` text NOT NULL,
  `status` int(11) NOT NULL,
  `translate_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lang`
--

INSERT INTO `lang` (`id`, `sort_name`, `name`, `flag_image`, `status`, `translate_id`) VALUES
(1, 'id', 'Indonesia', 'img/id.png', 1, 'id'),
(2, 'cn', 'Cina', 'img/cn.png', 1, 'zh'),
(3, 'jp', 'Jepang', 'img/jp.png', 1, 'ja'),
(4, 'gn', 'German', 'img/gn.png', 1, 'de'),
(9, 'ind', 'india', 'uploads/446933bacf5912b1ab51b3af63ec0b591db1bcfb.png', 1, ''),
(10, 'ind', 'India', 'uploads/0bbcf3531f2d7c0f29b4c9da922988803d40a5e0.png', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) DEFAULT NULL,
  `parent` varchar(50) DEFAULT NULL,
  `order` varchar(50) DEFAULT NULL,
  `menu_type` tinyint(1) DEFAULT 0,
  `menu_name` varchar(50) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `insert_date` datetime DEFAULT NULL,
  `insert_by` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `lang`, `parent`, `order`, `menu_type`, `menu_name`, `link`, `status`, `insert_date`, `insert_by`) VALUES
(1, 'id', NULL, '1', 0, 'Beranda', '#', 1, NULL, NULL),
(2, 'id', NULL, '2', 0, 'Tentang Kami', 'tentang-kami', 1, NULL, NULL),
(3, 'id', NULL, '3', 1, 'Produk', '#', 1, NULL, NULL),
(4, 'id', NULL, '4', 1, 'Layanan', '#', 1, NULL, NULL),
(5, 'id', NULL, '5', 0, 'Blog', 'blog', 1, NULL, NULL),
(6, 'id', NULL, '6', 2, 'Hubungi Kami', '#', 1, NULL, NULL),
(7, 'id', '3', '7', NULL, 'Semua Produk', 'produk', 0, NULL, NULL),
(8, 'id', '3', '8', NULL, 'Unit Forklift', 'forklift', 1, NULL, NULL),
(9, 'id', '3', '9', NULL, 'Sparepart', 'sparepart', 1, NULL, NULL),
(10, 'id', '3', '10', NULL, 'Ban Forklift', 'ban', 1, NULL, NULL),
(11, 'id', '3', '11', NULL, 'Battery', 'battery', 1, NULL, NULL),
(12, 'id', '3', '12', NULL, 'Attachment', 'attachment', 1, NULL, NULL),
(13, 'id', '4', '13', NULL, 'Semua Layanan', 'layanan', 1, NULL, NULL),
(14, 'id', '4', '14', NULL, 'Rental Forklift', 'rental', 1, NULL, NULL),
(15, 'id', '4', '15', NULL, 'Service', 'service', 1, NULL, NULL),
(16, 'cn', NULL, '1', 0, '主页', '#', 1, NULL, NULL),
(17, 'cn', NULL, '2', 0, '关于我们', '关于我们', 1, NULL, NULL),
(18, 'cn', NULL, '3', 1, '产品', '#', 1, NULL, NULL),
(19, 'cn', NULL, '4', 1, '服务', '#', 1, NULL, NULL),
(20, 'cn', NULL, '5', 0, '博客', '博客', 1, NULL, NULL),
(21, 'cn', NULL, '6', 2, '联系我们', '#', 1, NULL, NULL),
(22, 'cn', '18', '7', NULL, '所有产品', '产品', 1, NULL, NULL),
(23, 'cn', '18', '8', NULL, '机组叉车', '叉车', 1, NULL, NULL),
(24, 'cn', '18', '9', NULL, '备件', '备件', 1, NULL, NULL),
(25, 'cn', '18', '10', NULL, '禁止叉车', '胎\'', 1, NULL, NULL),
(26, 'cn', '18', '11', NULL, '电池', '电池', 1, NULL, NULL),
(27, 'cn', '18', '12', NULL, '依恋', '依恋', 1, NULL, NULL),
(30, 'cn', '19', '13', NULL, '所有服务', '所有服务', 1, NULL, NULL),
(31, 'cn', '19', '14', NULL, '租赁叉车', '出租', 1, NULL, NULL),
(32, 'cn', '19', '15', NULL, '服务', '服务', 1, NULL, NULL),
(33, 'jp', NULL, '1', 0, 'ホームページ', '#', 1, NULL, NULL),
(34, 'jp', NULL, '2', 0, '私たちについて', '私たちについて', 1, NULL, NULL),
(35, 'jp', NULL, '3', 1, '製品', '#', 1, NULL, NULL),
(36, 'jp', NULL, '4', 1, 'サービス', '#', 1, NULL, NULL),
(37, 'jp', NULL, '5', 0, 'ブログ', 'ブログ', 1, NULL, NULL),
(38, 'jp', NULL, '6', 2, 'お問い合わせ', '#', 1, NULL, NULL),
(39, 'jp', '35', '7', NULL, 'すべての製品', '製品', 1, NULL, NULL),
(40, 'jp', '35', '8', NULL, 'ユニットフォークリフト', 'フォークリフト', 1, NULL, NULL),
(41, 'jp', '35', '9', NULL, 'スペアパーツ', 'スペアパーツ', 1, NULL, NULL),
(42, 'jp', '35', '10', NULL, 'フォークリフトの禁止', '禁止', 1, NULL, NULL),
(43, 'jp', '35', '11', NULL, 'バッテリー', 'バッテリー', 1, NULL, NULL),
(44, 'jp', '35', '12', NULL, 'アタッチメント', 'アタッチメント', 1, NULL, NULL),
(45, 'jp', '36', '13', NULL, 'すべてのサービス', 'すべてのサービス', 1, NULL, NULL),
(46, 'jp', '36', '14', NULL, 'レンタルフォークリフト', 'レンタル', 1, NULL, NULL),
(47, 'jp', '36', '15', NULL, 'サービス', 'サービス', 1, NULL, NULL),
(48, 'gn', NULL, '1', 0, 'Startseite', '#', 1, NULL, NULL),
(49, 'gn', NULL, '2', 0, 'Über uns', 'über-uns', 1, NULL, NULL),
(50, 'gn', NULL, '3', 1, 'Produkt', '#', 1, NULL, NULL),
(51, 'gn', NULL, '4', 1, 'Service', '#', 1, NULL, NULL),
(52, 'gn', NULL, '5', 0, 'Blog', 'blog', 1, NULL, NULL),
(53, 'gn', NULL, '6', 2, 'Kontaktieren Sie uns', '#', 1, NULL, NULL),
(54, 'gn', '50', '7', NULL, 'Alle Produkte', 'produkt', 1, NULL, NULL),
(55, 'gn', '50', '8', NULL, 'Einheit Gabelstapler', 'gabelstapler', 1, NULL, NULL),
(56, 'gn', '50', '9', NULL, 'Ersatzteile', 'ersatzteile', 1, NULL, NULL),
(57, 'gn', '50', '10', NULL, 'Verbot von Gabelstaplern', 'verbot', 1, NULL, NULL),
(58, 'gn', '50', '11', NULL, 'Batterie', 'batterie', 1, NULL, NULL),
(59, 'gn', '50', '12', NULL, 'Anhang', 'anhang', 1, NULL, NULL),
(60, 'gn', '51', '13', NULL, 'Alle Dienstleistungen', 'alle-ienstleistungen', 1, NULL, NULL),
(61, 'gn', '51', '14', NULL, 'Mietstapler\n\n', 'vermietung', 1, NULL, NULL),
(62, 'gn', '51', '15', NULL, 'Service', 'service', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `merk`
--

CREATE TABLE `merk` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `merk`
--

INSERT INTO `merk` (`id`, `lang`, `nama`, `status`) VALUES
(1, 'id', 'Toyota', 1),
(2, 'id', 'Niciyu', 1),
(4, 'id', 'Mitshubishi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telp` varchar(50) DEFAULT '0',
  `address` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `insert_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `lang`, `country`, `name`, `email`, `telp`, `address`, `message`, `status`, `insert_date`) VALUES
(2, 'id', 'Indonesia', 'Doni Nurramdan', 'nurramdandoni@gmail.com', '0895330802566', 'Kuningan Jawa Barat', 'Selamat Siang,  Saya Berminat membeli unit Forklift', 1, '2025-05-24 04:57:53');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('01-article.js'),
('01-users.js'),
('02-catalogues.js'),
('02-karyawan.js'),
('03-category.js'),
('04-chat-main.js'),
('05-chat-message.js'),
('06-clients.js'),
('07-configs.js'),
('08-gallery.js'),
('09-info.js'),
('10-lang.js'),
('11-merk.js'),
('12-services.js'),
('13-slider.js'),
('14-users.js'),
('15-article-view.js'),
('16-catalogues-view.js'),
('17-v-article.js'),
('18-v-catalogues.js'),
('19-v-messages.js'),
('20-menus.js'),
('21-message.js');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) NOT NULL,
  `title_name` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `preface` varchar(255) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `insert_date` date NOT NULL DEFAULT current_timestamp(),
  `update_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `lang`, `title_name`, `group`, `name`, `preface`, `detail`, `image`, `status`, `insert_date`, `update_date`) VALUES
(1, 'id', 'Rental Forklift', 'rental', 'Rental Forklift', 'Solusi Sewa Forklift untuk Semua Kebutuhan Anda!', '<p>PT. PRIME FORKLIFT SERVICES Salah satu perusahaan jasa sewa forklift yang pelayanan nya mencakup\r\n                    daerah Karawang , Cikarang , Bekasi dan sekitarnya. menjadi perusahaan sewa yang terpercaya dan\r\n                    pelayanan yang profesional untuk membantu kelancaran perindustrian.\r\n                </p>\r\n                <p>Kenapa harus sewa forklift ? Besarnya biaya maintance forklift dan dapat menimbulkan kendala dalam semua proses berlangsungnya aktifitas di pabrik maka dari itu kami menawarkan solusi bagi anda dengan sewa kontrak kami menjamin semua kelancaran alat berat forklift ketika di pakai.\r\n                </p>', 'img/pngwing-com-10-5.png', 1, '2025-05-09', '2025-05-09'),
(2, 'id', 'Rental Forklift', 'rental', 'Forklift Diesel', NULL, 'Model:-;\nKapasitas:-;\nLifting Height:-;\nDaya Batterai:-;\nDurasi Operasi:-;\nUkuran Fork:-;\nLama Rental:-;', 'img/pngwing-com-10-6.png', 1, '2025-05-09', '2025-05-09'),
(3, 'id', 'Rental Forklift', 'rental', 'Forklift Elektrik Counter Balance', NULL, 'Model:-;\nKapasitas:-;\nLifting Height:-;\nDaya Batterai:-;\nDurasi Operasi:-;\nUkuran Fork:-;\nLama Rental:-;', 'img/pngwing-com-10-8.png', 1, '2025-05-09', '2025-05-09'),
(4, 'id', 'Rental Forklift', 'rental', 'Forklift Elektrik Reachtruck', NULL, 'Model:-;\nKapasitas:-;\nLifting Height:-;\nDaya Batterai:-;\nDurasi Operasi:-;\nUkuran Fork:-;\nLama Rental:-;', 'img/JGBHGYHG-3.png', 1, '2025-05-09', '2025-05-09'),
(5, 'id', 'Rental Forklift', 'rental', 'Stacker Elektrik Handpallet', NULL, 'Model:-;\nKapasitas:-;\nLifting Height:-;\nDaya Batterai:-;\nDurasi Operasi:-;\nUkuran Fork:-;\nLama Rental:-;', 'img/JGBHGYHG-4.png', 1, '2025-05-09', '2025-05-09'),
(6, 'id', 'Layanan Service', 'service', 'Servis Periodik/Rutin', NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aliquam neque temporibus alias et inventore fuga repellendus ut quae a. Odit molestias earum esse dolores quas ab ullam, reprehenderit magni.', 'img/helmet-safety-solid.svg', 1, '2025-05-09', '2025-05-09'),
(7, 'id', 'Layanan Service', 'service', 'Service General/ Besar', NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aliquam neque temporibus alias et inventore fuga repellendus ut quae a. Odit molestias earum esse dolores quas ab ullam, reprehenderit magni.', 'img/gear-solid-white.svg', 1, '2025-05-09', '2025-05-09'),
(8, 'id', 'Layanan Service', 'service', 'Overhaul Transmisi', NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aliquam neque temporibus alias et inventore fuga repellendus ut quae a. Odit molestias earum esse dolores quas ab ullam, reprehenderit magni.', 'img/Automation.png', 1, '2025-05-09', '2025-05-09'),
(9, 'id', 'Layanan Service', 'service', 'Overhaul Engine', NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi aliquam neque temporibus alias et inventore fuga repellendus ut quae a. Odit molestias earum esse dolores quas ab ullam, reprehenderit magni.', 'img/Engine.png', 1, '2025-05-09', '2025-05-09'),
(10, 'cn', '租赁叉车', 'rental', '租赁叉车', '满足您所有需求的叉车租赁解决方案！', '<p>PT。 PRIME FORKLIFT SERVICES 叉车租赁服务公司之一，其服务包括：\n                    加拉旺、西卡朗、勿加泗及周边地区。成为值得信赖的租赁公司，\n                    专业服务助力行业畅通。\n                </p>\n                <p>为什么要租叉车？叉车维护的高成本可能会对工厂正在进行的所有活动过程造成障碍，因此我们通过租赁合同为您提供解决方案，我们保证所有叉车重型设备在使用时顺利运行。\n                </p>', 'img/pngwing-com-10-5.png', 1, '2025-05-09', '2025-05-09'),
(11, 'cn', '租赁叉车', 'rental', '叉车柴油', NULL, '模型：-;\n容量：-;\n提升高度：-；\n电池电量：-；\n操作持续时间:-;\n叉子尺寸：-；\n租赁期:-;', 'img/pngwing-com-10-6.png', 1, '2025-05-09', '2025-05-09'),
(12, 'cn', '租赁叉车', 'rental', '平衡重电动叉车', NULL, '模型：-;\n容量：-;\n提升高度：-；\n电池电量：-；\n操作持续时间:-;\n叉子尺寸：-；\n租赁期:-;', 'img/pngwing-com-10-8.png', 1, '2025-05-09', '2025-05-09'),
(13, 'cn', '租赁叉车', 'rental', '电动前移式叉车', NULL, '模型：-;\n容量：-;\n提升高度：-；\n电池电量：-；\n操作持续时间:-;\n叉子尺寸：-；\n租赁期:-;', 'img/JGBHGYHG-3.png', 1, '2025-05-09', '2025-05-09'),
(14, 'cn', '租赁叉车', 'rental', '堆高机电动手动托盘车', NULL, '模型：-;\n容量：-;\n提升高度：-；\n电池电量：-；\n操作持续时间:-;\n叉子尺寸：-；\n租赁期:-;', 'img/JGBHGYHG-4.png', 1, '2025-05-09', '2025-05-09'),
(15, 'cn', '服务', 'service', '定期/例行服务', NULL, 'Lorem ipsum dolor，请坐 amet consectetur adipisicing elit。选择一些或其他时间，发明者逃跑以击退哪一个。他痛恨那些因任何大事而痛苦的人的烦恼。', 'img/helmet-safety-solid.svg', 1, '2025-05-09', '2025-05-09'),
(16, 'cn', '服务', 'service', '服务一般/大型', NULL, 'Lorem ipsum dolor，请坐 amet consectetur adipisicing elit。选择一些或其他时间，发明者逃跑以击退哪一个。他痛恨那些因任何大事而痛苦的人的烦恼。', 'img/gear-solid-white.svg', 1, '2025-05-09', '2025-05-09'),
(17, 'cn', '服务', 'service', '变速箱检修', NULL, 'Lorem ipsum dolor，请坐 amet consectetur adipisicing elit。选择一些或其他时间，发明者逃跑以击退哪一个。他痛恨那些因任何大事而痛苦的人的烦恼。', 'img/Automation.png', 1, '2025-05-09', '2025-05-09'),
(18, 'cn', '服务', 'service', '大修发动机', NULL, 'Lorem ipsum dolor，请坐 amet consectetur adipisicing elit。选择一些或其他时间，发明者逃跑以击退哪一个。他痛恨那些因任何大事而痛苦的人的烦恼。', 'img/Engine.png', 1, '2025-05-09', '2025-05-09');

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `lang` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `insert_date` datetime DEFAULT NULL,
  `insert_by` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `lang`, `title`, `image`, `text`, `link`, `status`, `insert_date`, `insert_by`) VALUES
(1, 'id', 'SELAMAT DATANG DI PRIME FORKLIFT SERVICES', 'img/plant-production-cars-modern-automotive-industry-electric-car-factory-conveyor.png', 'Solusi Terbaik untuk Forklift Anda\nPrime Forklift Services adalah mitra terpercaya Anda dalam menyediakan forklift berkualitas, layanan sewa fleksibel, dan suku cadang asli terbaik.', NULL, 1, NULL, NULL),
(2, 'cn', '欢迎来到 Prime 叉车服务', 'img/plant-production-cars-modern-automotive-industry-electric-car-factory-conveyor.png', '适合您的叉车的最佳解决方案\nPrime Forklift Services 是您值得信赖的合作伙伴，提供优质的叉车、灵活的租赁服务和最好的原装备件', NULL, 1, NULL, NULL),
(3, 'jp', 'プライムフォークリフトサービスへようこそ', 'img/plant-production-cars-modern-automotive-industry-electric-car-factory-conveyor.png', 'フォークリフトに最適なソリューション\nPrime Forklift Services は、高品質のフォークリフト、柔軟なレンタル サービス、最高の純正スペアパーツを提供する信頼できるパートナーです。', NULL, 1, NULL, NULL),
(4, 'gn', 'WILLKOMMEN BEI PRIME FORKLIFT SERVICES', 'img/plant-production-cars-modern-automotive-industry-electric-car-factory-conveyor.png', 'Die beste Lösung für Ihren Gabelstapler\nPrime Forklift Services ist Ihr zuverlässiger Partner für die Bereitstellung hochwertiger Gabelstapler, flexibler Mietservices und der besten Originalersatzteile.', NULL, 1, NULL, NULL),
(5, 'id', 'title2', 'image2', 'text2', 'link2', 0, '2025-05-09 00:35:24', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `lang` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `role` varchar(5) DEFAULT '1',
  `status` tinyint(1) DEFAULT 1,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `insert_date` datetime NOT NULL DEFAULT current_timestamp(),
  `insert_user` int(11) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_user` int(11) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `lang`, `username`, `password`, `name`, `role`, `status`, `email`, `phone`, `insert_date`, `insert_user`, `update_date`, `update_user`, `date_of_birth`, `gender`) VALUES
(1, 'id', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'Doni Nuramdan', '1', 1, 'nurramdandoni@gmail.com', '082', '2025-05-09 07:18:49', NULL, NULL, NULL, NULL, 'male');

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_article`
-- (See below for the actual view)
--
CREATE TABLE `v_article` (
`id` int(11)
,`slug` text
,`title` varchar(255)
,`preface` varchar(255)
,`detail` text
,`keyword` varchar(75)
,`image` varchar(255)
,`status` tinyint(4)
,`insert_user` int(11)
,`insert_date` datetime
,`update_user` int(11)
,`update_date` datetime
,`release_date` datetime
,`release_age` int(7)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_catalogues`
-- (See below for the actual view)
--
CREATE TABLE `v_catalogues` (
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_messages`
-- (See below for the actual view)
--
CREATE TABLE `v_messages` (
`id` int(11)
,`chat_id` int(11)
,`message` varchar(150)
,`admin_id` int(11)
,`name` varchar(50)
,`datetime` datetime
);

-- --------------------------------------------------------

--
-- Structure for view `article_view`
--
DROP TABLE IF EXISTS `article_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `article_view`  AS SELECT if(`article`.`slug` is null or `article`.`slug` = '',`article`.`id`,`article`.`slug`) AS `id`, `article`.`lang` AS `lang`, `article`.`slug` AS `slug`, `article`.`title` AS `title`, `article`.`preface` AS `preface`, `article`.`detail` AS `detail`, `article`.`keyword` AS `keyword`, `article`.`image` AS `image`, `article`.`status` AS `status`, `article`.`insert_user` AS `insert_user`, `article`.`insert_date` AS `insert_date`, `article`.`update_user` AS `update_user`, `article`.`update_date` AS `update_date`, `article`.`release_date` AS `release_date` FROM `article` ;

-- --------------------------------------------------------

--
-- Structure for view `catalogues_view`
--
DROP TABLE IF EXISTS `catalogues_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `catalogues_view`  AS SELECT if(`catalogues`.`slug` is null or `catalogues`.`slug` = '',`catalogues`.`id`,`catalogues`.`slug`) AS `id`, `catalogues`.`lang` AS `lang`, `catalogues`.`slug` AS `slug`, `catalogues`.`name` AS `name`, `catalogues`.`id_merk` AS `id_merk`, `merk`.`nama` AS `merk`, `catalogues`.`description` AS `description`, `catalogues`.`spec` AS `spec`, `catalogues`.`image` AS `image`, `catalogues`.`id_category` AS `id_category`, `catalogues`.`status` AS `status` FROM (`catalogues` join `merk` on(`merk`.`id` = `catalogues`.`id_merk`)) ;

-- --------------------------------------------------------

--
-- Structure for view `v_article`
--
DROP TABLE IF EXISTS `v_article`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_article`  AS SELECT `article`.`id` AS `id`, `article`.`slug` AS `slug`, `article`.`title` AS `title`, `article`.`preface` AS `preface`, `article`.`detail` AS `detail`, `article`.`keyword` AS `keyword`, `article`.`image` AS `image`, `article`.`status` AS `status`, `article`.`insert_user` AS `insert_user`, `article`.`insert_date` AS `insert_date`, `article`.`update_user` AS `update_user`, `article`.`update_date` AS `update_date`, `article`.`release_date` AS `release_date`, (select to_days(current_timestamp()) - to_days(`article`.`release_date`)) AS `release_age` FROM `article` ;

-- --------------------------------------------------------

--
-- Structure for view `v_catalogues`
--
DROP TABLE IF EXISTS `v_catalogues`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_catalogues`  AS SELECT `a`.`id` AS `id`, `a`.`slug` AS `slug`, `a`.`name` AS `name`, `a`.`id_merk` AS `id_merk`, `b`.`nama` AS `merk`, `a`.`description` AS `description`, `a`.`image` AS `image`, `a`.`type` AS `type`, `a`.`status` AS `status` FROM (`catalogues` `a` join `merk` `b` on(`a`.`id_merk` = `b`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `v_messages`
--
DROP TABLE IF EXISTS `v_messages`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_messages`  AS SELECT `a`.`id` AS `id`, `a`.`chat_id` AS `chat_id`, `a`.`message` AS `message`, `a`.`admin_id` AS `admin_id`, `b`.`name` AS `name`, `a`.`datetime` AS `datetime` FROM (`chat_message` `a` left join `users` `b` on(`a`.`admin_id` = `b`.`id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `catalogues`
--
ALTER TABLE `catalogues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_main`
--
ALTER TABLE `chat_main`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_id` (`chat_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `configs`
--
ALTER TABLE `configs`
  ADD PRIMARY KEY (`config_id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lang`
--
ALTER TABLE `lang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merk`
--
ALTER TABLE `merk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `catalogues`
--
ALTER TABLE `catalogues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `chat_main`
--
ALTER TABLE `chat_main`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_message`
--
ALTER TABLE `chat_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `configs`
--
ALTER TABLE `configs`
  MODIFY `config_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lang`
--
ALTER TABLE `lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `merk`
--
ALTER TABLE `merk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD CONSTRAINT `chat_message_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat_main` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
