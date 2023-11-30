-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2023 at 03:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogs_bg`
--

-- --------------------------------------------------------

--
-- Table structure for table `bg_blog_category`
--

CREATE TABLE `bg_blog_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `category_description` tinytext NOT NULL,
  `sub_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_blog_category`
--

INSERT INTO `bg_blog_category` (`id`, `category_name`, `category_description`, `sub_category`) VALUES
(16, 'سیاست', 'یہ سیاست کا زمرہ ہے۔', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bg_blog_comment`
--

CREATE TABLE `bg_blog_comment` (
  `id` int(11) NOT NULL,
  `comment_author_name` tinytext NOT NULL,
  `comment_content` text NOT NULL,
  `comment_date` datetime NOT NULL,
  `blog_id` int(11) NOT NULL,
  `comment_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bg_blog_post`
--

CREATE TABLE `bg_blog_post` (
  `id` int(11) NOT NULL,
  `blog_title` text NOT NULL,
  `blog_description` text NOT NULL,
  `blog_content` longtext NOT NULL,
  `blog_author` varchar(30) NOT NULL,
  `blog_publish_date` date NOT NULL,
  `blog_image` varchar(50) NOT NULL,
  `blog_likes` int(11) NOT NULL,
  `blog_category` int(11) NOT NULL,
  `blog_status` tinyint(1) NOT NULL DEFAULT 1,
  `blog_keywords` text NOT NULL,
  `blog_tags` text NOT NULL,
  `blog_slug` tinytext NOT NULL,
  `blog_time` time NOT NULL DEFAULT current_timestamp(),
  `blog_delete_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_blog_post`
--

INSERT INTO `bg_blog_post` (`id`, `blog_title`, `blog_description`, `blog_content`, `blog_author`, `blog_publish_date`, `blog_image`, `blog_likes`, `blog_category`, `blog_status`, `blog_keywords`, `blog_tags`, `blog_slug`, `blog_time`, `blog_delete_status`) VALUES
(102, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'سیاسی خبریں', '<p><strong>نئی دہلی:</strong> <span style=\"color: rgb(46,46,46);font-size: 18px;font-family: Ali Nastaliq;\">قومی دارالحکومت دہلی میں ہونے والے جی 20 سربراہی اجلاس کی تیاریاں آخری مراحل میں ہیں۔ اس سربراہی اجلاس میں 9-10 ستمبر کو ہونے والی سربراہی کانفرنس میں بین الاقوامی تنظیموں سمیت تقریباً 40 عالمی رہنما شرکت کریں گے۔ اس دوران پروٹوکول کے حوالے سے چوکسی رہے گی اور اس پر عمل نہ کرنے والوں کو تکلیف کا سامنا کرنا پڑ سکتا ہے۔ ایسے میں وزیر اعظم نریندر مودی نے سربراہی اجلاس کے پیش نظر اپنے وزراء کو \'کیا کرنا ہے اور کیا نہیں\' کے بارے میں آگاہ کیا ہے۔ انہوں نے وزراء سے کہا ہے کہ بھارت منڈپم تک پہنچنے کے لیے شٹل سروس لی جانی چاہیے۔ اس کے لیے اپنی سرکاری گاڑی استعمال نہ کریں۔</span><br><br><span style=\"color: rgb(46,46,46);font-size: 18px;font-family: Ali Nastaliq;\">خارجہ سکریٹری ونے موہن کواترا نے وزراء کو پروٹوکول اور متعلقہ معاملات کے بارے میں تفصیلی جانکاری دی۔ انہوں نے کہا کہ یہ ہندوستان میں منعقد ہونے والی سب سے بڑی تقریبات میں سے ایک ہے اور اس کے لیے کئی سطحوں پر سکیورٹی، تفتیش اور پروٹوکول وغیرہ پر عمل کیا جائے گا۔ ایسے میں وزراء کو لاپرواہی یا کسی غلطی کی وجہ سے پریشانی کا سامنا کرنا پڑ سکتا ہے۔ ایسی صورتحال میں تمام معلومات لیں اور طے شدہ شیڈول کے مطابق اس پر عمل کریں</span>&nbsp;</p>\r\n', 'پادروالا احمد', '2023-09-08', 'image-1694601923273.book2.png', 0, 16, 1, 'سیاسی خبریں', 'سیاسی خبریں', 'wzraa-srkary-gaڑy-ka-astamal-nہ-kryں،-wzyr-aazm-nے-btaya-jy-20-kے-dwran-kya-krna-ہے-awr-kya-nہyں', '16:00:21', 1),
(105, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں ', 'سیاسی خبریں', '<p><strong>نئی دہلی:</strong> <span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">قومی دارالحکومت دہلی میں ہونے والے جی 20 سربراہی اجلاس کی تیاریاں آخری مراحل میں ہیں۔ اس سربراہی اجلاس میں 9-10 ستمبر کو ہونے والی سربراہی کانفرنس میں بین الاقوامی تنظیموں سمیت تقریباً 40 عالمی رہنما شرکت کریں گے۔ اس دوران پروٹوکول کے حوالے سے چوکسی رہے گی اور اس پر عمل نہ کرنے والوں کو تکلیف کا سامنا کرنا پڑ سکتا ہے۔ ایسے میں وزیر اعظم نریندر مودی نے سربراہی اجلاس کے پیش نظر اپنے وزراء کو \'کیا کرنا ہے اور کیا نہیں\' کے بارے میں آگاہ کیا ہے۔ انہوں نے وزراء سے کہا ہے کہ بھارت منڈپم تک پہنچنے کے لیے شٹل سروس لی جانی چاہیے۔ اس کے لیے اپنی سرکاری گاڑی استعمال نہ کریں۔</span><br><br><span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">خارجہ سکریٹری ونے موہن کواترا نے وزراء کو پروٹوکول اور متعلقہ معاملات کے بارے میں تفصیلی جانکاری دی۔ انہوں نے کہا کہ یہ ہندوستان میں منعقد ہونے والی سب سے بڑی تقریبات میں سے ایک ہے اور اس کے لیے کئی سطحوں پر سکیورٹی، تفتیش اور پروٹوکول وغیرہ پر عمل کیا جائے گا۔ ایسے میں وزراء کو لاپرواہی یا کسی غلطی کی وجہ سے پریشانی کا سامنا کرنا پڑ سکتا ہے۔ ایسی صورتحال میں تمام معلومات لیں اور طے شدہ شیڈول کے مطابق اس پر عمل کریں</span>&nbsp;</p>\r\n', 'پادروالا احمد', '2023-09-08', 'image-1694601902575.book2.png', 0, 16, 1, 'vfdvfd,vfdv', 'vfdvf,vdvf', 'wzraa-srkary-gaڑy-ka-astamal-nہ-kryں،-wzyr-aazm-nے-btaya-jy-20-kے-dwran-kya-krna-ہے-awr-kya-nہyں1', '17:44:24', 1),
(106, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'سیاسی خبریں', '<p>&nbsp;<span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">سربراہی کانفرنس میں بین الاقوامی تنظیموں سمیت تقریباً 40 عالمی رہنما شرکت کریں گے۔ اس دوران پروٹوکول کے حوالے سے چوکسی رہے گی اور اس پر عمل نہ کرنے والوں کو تکلیف کا سامنا کرنا پڑ سکتا ہے۔ ایسے میں وزیر اعظم نریندر مودی نے سربراہی اجلاس کے پیش نظر اپنے وزراء کو \'کیا کرنا ہے اور کیا نہیں\' کے بارے میں آگاہ کیا ہے۔ انہوں نے وزراء سے کہا ہے کہ بھارت منڈپم تک پہنچنے کے لیے شٹل سروس لی جانی چاہیے۔ اس کے لیے اپنی سرکاری گاڑی استعمال نہ کریں۔</span><br><br><span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">خارجہ سکریٹری ونے موہن کواترا نے وزراء کو پروٹوکول اور متعلقہ معاملات کے بارے میں تفصیلی جانکاری دی۔ انہوں نے کہا کہ یہ ہندوستان میں منعقد ہونے والی سب سے بڑی تقریبات میں سے ایک ہے اور اس کے لیے کئی سطحوں پر سکیورٹی، تفتیش اور پروٹوکول وغیرہ پر عمل کیا جائے گا۔ ایسے میں وزراء کو لاپرواہی یا کسی غلطی کی وجہ سے پریشانی کا سامنا کرنا پڑ سکتا ہے۔ ایسی صورتحال میں تمام معلومات لیں اور طے شدہ شیڈول کے مطابق اس پر عمل کریں</span>&nbsp;</p>\r\n', 'پادروالا احمد', '2023-09-11', 'image-1694425214481.book2.png', 0, 16, 1, 'ccdcc,cdc', 'dcdcd,cd', 'wzraa-srkary-gaڑy-ka-astamal-nہ-kryں،-wzyr-aazm-nے-btaya-jy-20-kے-dwran-kya-krna-ہے-awr-kya-nہyں2', '14:40:14', 1),
(107, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'سیاسی خبریں', '<p>&nbsp;<span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">سربراہی کانفرنس میں بین الاقوامی تنظیموں سمیت تقریباً 40 عالمی رہنما شرکت کریں گے۔ اس دوران پروٹوکول کے حوالے سے چوکسی رہے گی اور اس پر عمل نہ کرنے والوں کو تکلیف کا سامنا کرنا پڑ سکتا ہے۔ ایسے میں وزیر اعظم نریندر مودی نے سربراہی اجلاس کے پیش نظر اپنے وزراء کو \'کیا کرنا ہے اور کیا نہیں\' کے بارے میں آگاہ کیا ہے۔ انہوں نے وزراء سے کہا ہے کہ بھارت منڈپم تک پہنچنے کے لیے شٹل سروس لی جانی چاہیے۔ اس کے لیے اپنی سرکاری گاڑی استعمال نہ کریں۔</span><br><br><span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">خارجہ سکریٹری ونے موہن کواترا نے وزراء کو پروٹوکول اور متعلقہ معاملات کے بارے میں تفصیلی جانکاری دی۔ انہوں نے کہا کہ یہ ہندوستان میں منعقد ہونے والی سب سے بڑی تقریبات میں سے ایک ہے اور اس کے لیے کئی سطحوں پر سکیورٹی، تفتیش اور پروٹوکول وغیرہ پر عمل کیا جائے گا۔ ایسے میں وزراء کو لاپرواہی یا کسی غلطی کی وجہ سے پریشانی کا سامنا کرنا پڑ سکتا ہے۔ ایسی صورتحال میں تمام معلومات لیں اور طے شدہ شیڈول کے مطابق اس پر عمل کریں</span>&nbsp;</p>\r\n', 'پادروالا احمد', '2023-09-11', 'image-1694425249322.book1.png', 0, 16, 1, 'cdcds,cdcds', 'cdcd,cd', 'wzraa-srkary-gaڑy-ka-astamal-nہ-kryں،-wzyr-aazm-nے-btaya-jy-20-kے-dwran-kya-krna-ہے-awr-kya-nہyں3', '14:40:49', 1),
(110, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'سیاسی خبریں', '<p><span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">سربراہی کانفرنس میں بین الاقوامی تنظیموں سمیت تقریباً 40 عالمی رہنما شرکت کریں گے۔ اس دوران پروٹوکول کے حوالے سے چوکسی رہے گی اور اس پر عمل نہ کرنے والوں کو تکلیف کا سامنا کرنا پڑ سکتا ہے۔ ایسے میں وزیر اعظم نریندر مودی نے سربراہی اجلاس کے پیش نظر اپنے وزراء کو \'کیا کرنا ہے اور کیا نہیں\' کے بارے میں آگاہ کیا ہے۔ انہوں نے وزراء سے کہا ہے کہ بھارت منڈپم تک پہنچنے کے لیے شٹل سروس لی جانی چاہیے۔ اس کے لیے اپنی سرکاری گاڑی استعمال نہ کریں۔</span><br><br><span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">خارجہ سکریٹری ونے موہن کواترا نے وزراء کو پروٹوکول اور متعلقہ معاملات کے بارے میں تفصیلی جانکاری دی۔ انہوں نے کہا کہ یہ ہندوستان میں منعقد ہونے والی سب سے بڑی تقریبات میں سے ایک ہے اور اس کے لیے کئی سطحوں پر سکیورٹی، تفتیش اور پروٹوکول وغیرہ پر عمل کیا جائے گا۔ ایسے میں وزراء کو لاپرواہی یا کسی غلطی کی وجہ سے پریشانی کا سامنا کرنا پڑ سکتا ہے۔ ایسی صورتحال میں تمام معلومات لیں اور طے شدہ شیڈول کے مطابق اس پر عمل کریں</span>&nbsp;&nbsp;</p>\r\n', 'cvvfd', '2023-10-05', 'image-1694602022822.book2.png', 0, 16, 1, 'vdsvfvfddv', 'vfd', 'wzraa-srkary-gaڑy-ka-astamal-nہ-kryں،-wzyr-aazm-nے-btaya-jy-20-kے-dwran-kya-krna-ہے-awr-kya-nہyں4', '15:47:02', 1),
(111, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'سیاسی خبریں', '<p><span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">سربراہی کانفرنس میں بین الاقوامی تنظیموں سمیت تقریباً 40 عالمی رہنما شرکت کریں گے۔ اس دوران پروٹوکول کے حوالے سے چوکسی رہے گی اور اس پر عمل نہ کرنے والوں کو تکلیف کا سامنا کرنا پڑ سکتا ہے۔ ایسے میں وزیر اعظم نریندر مودی نے سربراہی اجلاس کے پیش نظر اپنے وزراء کو \'کیا کرنا ہے اور کیا نہیں\' کے بارے میں آگاہ کیا ہے۔ انہوں نے وزراء سے کہا ہے کہ بھارت منڈپم تک پہنچنے کے لیے شٹل سروس لی جانی چاہیے۔ اس کے لیے اپنی سرکاری گاڑی استعمال نہ کریں۔</span><br><br><span style=\"color: rgb(46,46,46);background-color: rgb(229,231,235);font-size: 18px;font-family: Ali Nastaliq;\">خارجہ سکریٹری ونے موہن کواترا نے وزراء کو پروٹوکول اور متعلقہ معاملات کے بارے میں تفصیلی جانکاری دی۔ انہوں نے کہا کہ یہ ہندوستان میں منعقد ہونے والی سب سے بڑی تقریبات میں سے ایک ہے اور اس کے لیے کئی سطحوں پر سکیورٹی، تفتیش اور پروٹوکول وغیرہ پر عمل کیا جائے گا۔ ایسے میں وزراء کو لاپرواہی یا کسی غلطی کی وجہ سے پریشانی کا سامنا کرنا پڑ سکتا ہے۔ ایسی صورتحال میں تمام معلومات لیں اور طے شدہ شیڈول کے مطابق اس پر عمل کریں</span>&nbsp;&nbsp;</p>\r\n', 'vvrget', '2023-09-20', 'image-1694602060836.book1.png', 0, 16, 1, 'gtrg,rtg', 'gtgt', 'wzraa-srkary-gaڑy-ka-astamal-nہ-kryں،-wzyr-aazm-nے-btaya-jy-20-kے-dwran-kya-krna-ہے-awr-kya-nہyں5', '15:47:40', 1),
(112, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'nghnhgnhgnhg', '<p>nghnhg</p>\r\n', 'nghnghn', '2023-08-29', 'image-1694602100724.book2.png', 0, 16, 1, 'nhgn,ghn', 'nhgn', 'bfnnyhnhn', '15:48:20', 1),
(113, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'bfgbgfbfg', '<p>bgfbfgbfg</p>\r\n', 'bgfbfg', '2023-09-04', 'image-1694602120105.book1.png', 0, 16, 1, 'bgfbfg,fgbf', 'bfgb', 'vdfvb', '15:48:40', 1),
(114, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'gfbgfbgfbg', '<p>fgbfgb</p>\r\n', 'bgfb', '2023-10-02', 'image-1694602137277.book2.png', 0, 16, 1, 'bgfb', 'fbgfbfb', 'bfg', '15:48:57', 1),
(115, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'fgbfgbfg', '<p>fgbfgbfgb</p>\r\n', 'bfgb', '2023-09-06', 'image-1694602161070.book2.png', 0, 16, 1, 'bfgb,bfg', 'bgf', 'bgfb', '15:49:21', 1),
(116, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'bfgbfg', '<p>gbfgbfgb</p>\r\n', 'bfgbfg', '2023-09-05', 'image-1694602176422.book1.png', 0, 16, 1, 'bgf,b', 'bfg,bfgb', 'bfgb', '15:49:36', 1),
(117, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'vfddfvdd', '<p>dfvdfvfv</p>\r\n', 'fdvd', '2023-08-28', 'image-1694602230282.book1.png', 0, 16, 1, 'vdfvdfv', 'vdfvd', 'dcsdv', '15:50:30', 1),
(118, 'وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں', 'vdfv', '<p>وزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیںوزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیںوزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران<strong> </strong><span style=\"color: rgb(235,107,86);\"><strong>کیا کرنا ہے اور کیا ن</strong></span>ہیںوزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیںوزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیںوزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیںوزراء سرکاری گاڑی کا استعمال نہ کریں، وزیر اعظم نے بتایا جی 20 کے دوران کیا کرنا ہے اور کیا نہیں</p>\r\n', 'vfdv', '2023-09-06', 'image-1694773010911.STUDENT PHOTO.png', 0, 16, 1, 'vv,v', 'dvfd,v', 'vdfv', '15:50:46', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bg_blog_user`
--

CREATE TABLE `bg_blog_user` (
  `uname` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_blog_user`
--

INSERT INTO `bg_blog_user` (`uname`, `password`) VALUES
('admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `bg_books_category`
--

CREATE TABLE `bg_books_category` (
  `id` int(11) NOT NULL,
  `category_name` tinytext NOT NULL,
  `category_description` text NOT NULL,
  `sub_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_books_category`
--

INSERT INTO `bg_books_category` (`id`, `category_name`, `category_description`, `sub_category`) VALUES
(13, 'سوسنرسرن', 'سنرس', NULL),
(14, 'islam', 'islam', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bg_books_detail`
--

CREATE TABLE `bg_books_detail` (
  `id` int(11) NOT NULL,
  `book_title` tinytext NOT NULL,
  `book_author` tinytext NOT NULL,
  `book_publish_date` datetime NOT NULL,
  `book_publish_time` time NOT NULL DEFAULT current_timestamp(),
  `book_description` text NOT NULL,
  `book_thumbnail` text NOT NULL,
  `book_pdf` text NOT NULL,
  `book_status` tinyint(1) NOT NULL DEFAULT 1,
  `book_isdownload` tinyint(1) NOT NULL,
  `book_likes` int(11) NOT NULL,
  `books_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_books_detail`
--

INSERT INTO `bg_books_detail` (`id`, `book_title`, `book_author`, `book_publish_date`, `book_publish_time`, `book_description`, `book_thumbnail`, `book_pdf`, `book_status`, `book_isdownload`, `book_likes`, `books_category`) VALUES
(68, 'احسن البیان', 'پدروالا احمد', '2023-09-09 00:00:00', '09:21:35', 'احسن البیان', 'image-1694251132980.book1.png', 'image-1694082044061.reacttheory.pdf', 1, 1, 0, 13),
(74, 'زندگی سے لطف اٹھائے', 'پدروالا احمد', '2023-09-13 00:00:00', '09:49:40', 'زندگی سے لطف اٹھائے', 'image-1694251502858.book2.png', 'image-1694251502859.reacttheory.pdf', 1, 1, 0, 13),
(76, '	زندگی سے لطف اٹھائے', '	زندگی سے لطف اٹھائے', '2023-09-13 00:00:00', '09:49:38', '	زندگی سے لطف اٹھائے', 'image-1694424362461.book2.png', '', 1, 1, 0, 13),
(77, '	زندگی سے لطف اٹھائے', 'پدروالا احمد', '2023-09-13 00:00:00', '09:49:44', 'زندگی سے لطف اٹھائے	\r\n', 'image-1694424398744.book2.png', '', 1, 1, 0, 13);

-- --------------------------------------------------------

--
-- Table structure for table `bg_img_api`
--

CREATE TABLE `bg_img_api` (
  `id` int(11) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bg_name_category`
--

CREATE TABLE `bg_name_category` (
  `id` int(11) NOT NULL,
  `category_name` tinytext NOT NULL,
  `category_description` text NOT NULL,
  `sub_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_name_category`
--

INSERT INTO `bg_name_category` (`id`, `category_name`, `category_description`, `sub_category`) VALUES
(9, 'vdfvdf', 'vdf', NULL),
(11, 'cdcd', 'cdfvfd', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bg_name_detail`
--

CREATE TABLE `bg_name_detail` (
  `id` int(11) NOT NULL,
  `name_lang1` tinytext NOT NULL,
  `name_description` text NOT NULL,
  `name_lang2` tinytext NOT NULL,
  `name_meaning_lang1` text NOT NULL,
  `name_meaning_lang2` text NOT NULL,
  `name_content` mediumtext NOT NULL,
  `name_gender` tinytext NOT NULL,
  `name_likes` int(11) NOT NULL,
  `name_category` int(11) NOT NULL,
  `upload_date` date NOT NULL,
  `upload_time` time NOT NULL,
  `name_priority` int(11) NOT NULL DEFAULT 1,
  `name_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_name_detail`
--

INSERT INTO `bg_name_detail` (`id`, `name_lang1`, `name_description`, `name_lang2`, `name_meaning_lang1`, `name_meaning_lang2`, `name_content`, `name_gender`, `name_likes`, `name_category`, `upload_date`, `upload_time`, `name_priority`, `name_status`) VALUES
(10, 'bgfbfg', 'gbfgb', 'bfg', 'bb', 'bgfbf', 'bgfbgf', 'male', 0, 9, '2023-09-07', '13:02:30', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `img`
--

CREATE TABLE `img` (
  `id` int(11) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `img`
--

INSERT INTO `img` (`id`, `img`) VALUES
(1, '0'),
(2, '0'),
(3, '0'),
(4, '0'),
(5, '0'),
(6, '0'),
(7, '0'),
(8, '0'),
(9, '0'),
(10, '0'),
(11, '0'),
(12, '0'),
(13, '0'),
(14, '0'),
(15, '0'),
(16, '0'),
(17, '0'),
(18, '0'),
(19, '0'),
(20, '0'),
(21, '0'),
(22, '0'),
(23, '0'),
(24, '0'),
(25, '0'),
(26, '0'),
(27, '0'),
(28, '0'),
(29, '0'),
(30, '0'),
(31, '0'),
(32, '0'),
(33, '0'),
(34, '0'),
(35, '0'),
(36, '0'),
(37, '0'),
(38, '0'),
(39, '0'),
(40, '0'),
(41, '0'),
(42, '0'),
(43, '0'),
(44, '0'),
(45, '0'),
(46, '0'),
(47, '0'),
(48, '0'),
(49, '0'),
(50, '0'),
(51, '0'),
(52, '0'),
(53, '0'),
(54, '0'),
(55, '0'),
(56, '0'),
(57, '0'),
(58, '0'),
(59, '0'),
(60, '0'),
(61, '0'),
(62, '0'),
(63, '0'),
(64, '0'),
(65, '0'),
(66, '0'),
(67, '0'),
(68, '0'),
(69, '0'),
(70, '0'),
(71, '0'),
(72, '0'),
(73, '0'),
(74, '0'),
(75, '0'),
(76, '0'),
(77, '0'),
(78, '0'),
(79, '0'),
(80, '0'),
(81, '0'),
(82, '0'),
(83, '0'),
(84, '0'),
(85, '0'),
(86, '0'),
(87, '0'),
(88, '0'),
(89, '0'),
(90, '0'),
(91, '0'),
(92, '0'),
(93, '0'),
(94, '0'),
(95, '0'),
(96, '0'),
(97, '0'),
(98, '0'),
(99, '0'),
(100, '0'),
(101, '0'),
(102, '0'),
(103, '0'),
(104, '0'),
(105, '0'),
(106, '0'),
(107, '0'),
(108, '0'),
(109, '0'),
(110, '0'),
(111, '0'),
(112, '0'),
(113, '0'),
(114, '0'),
(115, '0'),
(116, '0'),
(117, '0'),
(118, '0'),
(119, '0'),
(120, '0'),
(121, '0'),
(122, '0'),
(123, '0'),
(124, '0'),
(125, '0'),
(126, '0'),
(127, '0'),
(128, '0'),
(129, '0'),
(130, '0'),
(131, '0'),
(132, '0'),
(133, '0'),
(134, '0'),
(135, '0'),
(136, '0'),
(137, '0'),
(138, '0'),
(139, '0'),
(140, '0'),
(141, '0'),
(142, '0'),
(143, '0'),
(144, '0'),
(145, '0'),
(146, '0'),
(147, '0'),
(148, '0'),
(149, '0'),
(150, '0'),
(151, '0'),
(152, '0'),
(153, '0'),
(154, '0'),
(155, '0'),
(156, '0'),
(157, '0'),
(158, '0'),
(159, '0'),
(160, '0'),
(161, '0'),
(162, '0'),
(163, '0'),
(164, '0'),
(165, '0'),
(166, '0'),
(167, '0'),
(168, '0'),
(169, '0'),
(170, '0'),
(171, '0'),
(172, '0'),
(173, '0'),
(174, '0'),
(175, 'image-1686196630135.image_2.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bg_blog_category`
--
ALTER TABLE `bg_blog_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bg_blog_comment`
--
ALTER TABLE `bg_blog_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Indexes for table `bg_blog_post`
--
ALTER TABLE `bg_blog_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_category` (`blog_category`);

--
-- Indexes for table `bg_books_category`
--
ALTER TABLE `bg_books_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bg_books_detail`
--
ALTER TABLE `bg_books_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `books_category` (`books_category`);

--
-- Indexes for table `bg_img_api`
--
ALTER TABLE `bg_img_api`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bg_name_category`
--
ALTER TABLE `bg_name_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bg_name_detail`
--
ALTER TABLE `bg_name_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name_category` (`name_category`);

--
-- Indexes for table `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bg_blog_category`
--
ALTER TABLE `bg_blog_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `bg_blog_comment`
--
ALTER TABLE `bg_blog_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bg_blog_post`
--
ALTER TABLE `bg_blog_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `bg_books_category`
--
ALTER TABLE `bg_books_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `bg_books_detail`
--
ALTER TABLE `bg_books_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `bg_img_api`
--
ALTER TABLE `bg_img_api`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bg_name_category`
--
ALTER TABLE `bg_name_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bg_name_detail`
--
ALTER TABLE `bg_name_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `img`
--
ALTER TABLE `img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bg_blog_comment`
--
ALTER TABLE `bg_blog_comment`
  ADD CONSTRAINT `bg_blog_comment_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `bg_blog_post` (`id`);

--
-- Constraints for table `bg_blog_post`
--
ALTER TABLE `bg_blog_post`
  ADD CONSTRAINT `bg_blog_post_ibfk_1` FOREIGN KEY (`blog_category`) REFERENCES `bg_blog_category` (`id`);

--
-- Constraints for table `bg_books_detail`
--
ALTER TABLE `bg_books_detail`
  ADD CONSTRAINT `bg_books_detail_ibfk_1` FOREIGN KEY (`books_category`) REFERENCES `bg_books_category` (`id`);

--
-- Constraints for table `bg_name_detail`
--
ALTER TABLE `bg_name_detail`
  ADD CONSTRAINT `bg_name_detail_ibfk_1` FOREIGN KEY (`name_category`) REFERENCES `bg_name_category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
