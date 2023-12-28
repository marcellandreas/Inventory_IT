-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 28 Des 2023 pada 09.37
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory_it`
--
CREATE DATABASE IF NOT EXISTS `inventory_it` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `inventory_it`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `category` varchar(20) NOT NULL,
  `note` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id_category`, `category`, `note`) VALUES
(1, 'Monitor', NULL),
(2, 'MRAM3', NULL),
(3, 'MRAM2', NULL),
(6, 'HDD', NULL),
(7, 'SDD', NULL),
(8, 'Toner', NULL),
(9, 'Paint', NULL),
(10, 'Mouse', NULL),
(11, 'Pita Printer', NULL),
(12, 'Keyboard', NULL),
(13, 'Router', NULL),
(16, 'DVD-RW', NULL),
(17, 'CD-R', NULL),
(18, 'Battery Ups', NULL),
(19, 'Print', NULL),
(20, 'Power Supply', NULL),
(21, 'Battery C mos', NULL),
(22, 'Kabel ', NULL),
(23, 'DVD', NULL),
(24, 'RJ', NULL),
(25, 'Dan Lainnya', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_stock`
--

DROP TABLE IF EXISTS `detail_stock`;
CREATE TABLE `detail_stock` (
  `id_detail_stock` int(11) NOT NULL,
  `stock_detail_description` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `additional_info` varchar(50) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `stock_no` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_stock`
--

INSERT INTO `detail_stock` (`id_detail_stock`, `stock_detail_description`, `qty`, `brand`, `additional_info`, `note`, `post_date`, `stock_no`) VALUES
(1, 'Monitor Samsung ', 1, 'Samsung', '-', 'Berada diruangan IT', '2023-11-29 06:33:49', 'IT-ST-001'),
(3, '', 0, '', '', '', '2023-11-29 08:51:15', 'IT-ST-003'),
(4, '', 0, '', '', '', '2023-11-29 08:56:32', 'IT-ST-004'),
(5, 'Tinta Canon Cyan', 2, 'Canon', '', '', '2023-11-29 09:01:05', 'IT-ST-005'),
(6, 'Tinta Canon Magenta', 2, 'Canon', '', '', '2023-11-29 09:01:05', 'IT-ST-005'),
(7, 'Tinta Canon Black', 3, 'Canon', '', '3', '2023-11-29 09:01:05', 'IT-ST-005'),
(8, 'Tinta Canon Yellow', 3, 'Canon', '', '', '2023-11-29 09:01:05', 'IT-ST-005'),
(9, 'Tinta Epson Magenta ', 3, 'Epson', '', '', '2023-11-29 09:01:05', 'IT-ST-005'),
(10, 'Tinta Epson Cyan', 2, 'Epson', '', '', '2023-11-29 09:01:05', 'IT-ST-005'),
(11, 'Tinta Epson Black', 1, 'Epson', '', '', '2023-11-29 09:01:05', 'IT-ST-005'),
(12, 'Tinta Hp Black', 4, 'Hp', '', '', '2023-11-29 09:01:05', 'IT-ST-005'),
(13, 'Battery UPS 12v 12ah', 0, '-', '', '', '2023-11-29 09:10:49', 'IT-ST-006'),
(14, 'Battery UPS 12v 7ah', 0, '-', '', 'di ambil pak Dani R.', '2023-11-29 09:10:49', 'IT-ST-006'),
(17, 'Kabel Power', 58, '-', '', '', '2023-11-30 02:27:46', 'IT-ST-009'),
(18, 'Kabel Ide', 1, '', '', '', '2023-11-30 02:27:46', 'IT-ST-009'),
(19, 'Kabel Campuran HDMI', 3, '-', 'aten kvm switch cable', '', '2023-11-30 02:27:46', 'IT-ST-009'),
(20, 'Kabel female / male', 4, '-', '', '', '2023-11-30 02:27:46', 'IT-ST-009'),
(21, 'Microsoft Vista ', 38, 'Microsoft', '-', '', '2023-11-30 02:31:17', 'IT-ST-010'),
(22, 'Kabel Printer ', 15, '- ', '', '', '2023-11-30 02:36:01', 'IT-ST-009'),
(23, 'kabel lan ', 5, '-', '', '', '2023-11-30 02:36:32', 'IT-ST-009'),
(24, 'Kabel A to A', 2, '-', '', '', '2023-11-30 02:40:46', 'IT-ST-009'),
(25, 'Kabel av sega', 2, '-', '', '', '2023-11-30 02:40:46', 'IT-ST-009'),
(26, 'Kabel Ide to Sata', 2, '-', '', '', '2023-11-30 02:40:46', 'IT-ST-009'),
(27, 'Kabel Sata ', 8, '-', '', '', '2023-11-30 02:40:46', 'IT-ST-009'),
(28, 'Kabel Lan', 10, '-', '', '', '2023-11-30 02:40:46', 'IT-ST-009'),
(29, 'Kabel Vga', 5, '-', '', '', '2023-11-30 02:40:46', 'IT-ST-009'),
(30, 'Kabel Vga to Sega', 1, '-', '', '', '2023-11-30 02:40:46', 'IT-ST-009'),
(31, 'Kabel Telepon RJ 11', 14, '-', '', '', '2023-11-30 02:44:13', 'IT-ST-009'),
(32, 'RJ 45', 0, '-', '', '', '2023-11-30 02:46:18', 'IT-ST-011'),
(33, 'RJ 11', 0, '-', '', '', '2023-11-30 02:46:18', 'IT-ST-011'),
(34, 'MRAM3-4GB', 1, 'Seagate', 'apa', '-', '2023-12-11 08:48:05', 'IT-ST-002'),
(35, 'Monitor LG', 0, 'Lg', '-', 'digunakan untuk mengganti monitor yang rusak digudang', '2023-12-13 03:21:08', 'IT-ST-001'),
(36, 'Lg Monitor', 1, NULL, NULL, 'untuk saya ', '2023-12-26 12:54:33', 'IT-ST-001'),
(37, 'aa', 1, NULL, NULL, '', '2023-12-28 03:34:44', 'IT-ST-001');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_stock_temporary`
--

DROP TABLE IF EXISTS `detail_stock_temporary`;
CREATE TABLE `detail_stock_temporary` (
  `id_detail_stock` int(11) NOT NULL,
  `stock_detail_description` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `additional_info` varchar(50) NOT NULL,
  `note` varchar(255) NOT NULL,
  `post_user_id` int(11) NOT NULL,
  `post_username` varchar(20) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_stock` int(11) NOT NULL,
  `stock_no` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `division`
--

DROP TABLE IF EXISTS `division`;
CREATE TABLE `division` (
  `id_division` int(11) NOT NULL,
  `name_pt` varchar(20) NOT NULL,
  `name_division` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `division`
--

INSERT INTO `division` (`id_division`, `name_pt`, `name_division`) VALUES
(1, 'Apli', 'Accounting'),
(2, 'Perma', 'Accounting'),
(3, 'Bantara Indah', 'Accounting'),
(4, 'Divisi Kartu', 'Cmi'),
(5, 'BMS', 'Warehouse'),
(6, 'BMS', 'Marketing'),
(7, 'BMS', 'Invoice'),
(8, 'BMS', 'IT'),
(9, 'BMS', 'Logistik'),
(10, 'BMS', 'Sales Admin'),
(11, 'BMS', 'Accounting'),
(12, 'BMS', 'Finance'),
(13, 'Bantara Indah', 'Finance'),
(14, 'Bantara Indah', 'VPIC'),
(15, 'Bantara Indah', 'Invoice');

-- --------------------------------------------------------

--
-- Struktur dari tabel `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `item_no` varchar(50) NOT NULL,
  `item_description` varchar(255) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `category` varchar(20) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `status` enum('used','new','reused','') NOT NULL,
  `kondisi` enum('Good','Normal','Bad') NOT NULL,
  `item_location` varchar(100) NOT NULL,
  `note` varchar(255) NOT NULL,
  `date_registation` varchar(10) NOT NULL,
  `date_expired` varchar(10) DEFAULT NULL,
  `item_specification` varchar(255) NOT NULL,
  `post_user_id` int(10) NOT NULL,
  `post_username` varchar(20) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `items`
--

INSERT INTO `items` (`id`, `item_no`, `item_description`, `unit`, `category`, `brand`, `status`, `kondisi`, `item_location`, `note`, `date_registation`, `date_expired`, `item_specification`, `post_user_id`, `post_username`, `post_date`) VALUES
(1, 'IT-Kabel -0001', 'Kabel Power', 'PCS', 'Kabel ', '-', 'new', 'Good', 'Server', '', '2023-12-04', '', 'Kabel Power ', 1, 'marcell', '2023-12-04 12:51:46'),
(3, 'IT-Monitor-0001', 'Monitor LG', 'PCS', 'Monitor', 'Lg', 'used', 'Normal', 'Warehouse', 'Dipakai untuk mengganti monitor yang rusak digudang', '2023-12-13', '', 'Monitor lg ', 1, 'marcell', '2023-12-28 06:09:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `login_history`
--

DROP TABLE IF EXISTS `login_history`;
CREATE TABLE `login_history` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `login_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `login_history`
--

INSERT INTO `login_history` (`id`, `username`, `login_time`) VALUES
(1, 'dede', '2023-11-29 01:49:44'),
(2, 'marcell', '2023-11-29 02:10:10'),
(3, 'marcell', '2023-11-29 02:10:41'),
(4, 'dede', '2023-11-29 02:28:56'),
(5, 'marcell', '2023-11-29 03:37:27'),
(6, 'marcell', '2023-11-29 04:38:29'),
(7, 'marcell', '2023-11-29 06:08:43'),
(8, 'marcell', '2023-11-29 07:41:37'),
(9, 'marcell', '2023-11-29 08:50:35'),
(10, 'marcell', '2023-11-30 02:22:12'),
(11, 'marcell', '2023-11-30 03:49:23'),
(12, 'marcell', '2023-11-30 03:54:34'),
(13, 'marcell', '2023-11-30 03:58:35'),
(14, 'marcell', '2023-11-30 04:04:47'),
(15, 'marcell', '2023-11-30 04:08:55'),
(16, 'marcell', '2023-11-30 04:11:19'),
(17, 'marcell', '2023-11-30 04:15:12'),
(18, 'marcell', '2023-11-30 04:22:54'),
(19, 'marcell', '2023-11-30 04:35:05'),
(20, 'marcell', '2023-11-30 04:37:18'),
(21, 'marcell', '2023-11-30 04:38:01'),
(22, 'marcell', '2023-11-30 04:39:51'),
(23, 'marcell', '2023-11-30 04:42:00'),
(24, 'marcell', '2023-11-30 04:43:58'),
(25, 'marcell', '2023-11-30 04:44:45'),
(26, 'marcell', '2023-11-30 04:53:33'),
(27, 'marcell', '2023-11-30 06:33:45'),
(28, 'marcell', '2023-11-30 08:52:35'),
(29, 'marcell', '2023-12-03 15:06:53'),
(30, 'dede', '2023-12-03 15:17:44'),
(31, 'marcell', '2023-12-04 12:35:42'),
(32, 'dede', '2023-12-04 13:01:57'),
(33, 'dede', '2023-12-04 13:16:40'),
(34, 'dede', '2023-12-04 13:19:57'),
(35, 'marcell', '2023-12-06 03:14:17'),
(36, 'marcell', '2023-12-06 03:14:17'),
(37, 'marcell', '2023-12-06 03:15:12'),
(38, 'marcell', '2023-12-06 03:16:12'),
(39, 'marcell', '2023-12-06 03:20:16'),
(40, 'marcell', '2023-12-06 03:23:53'),
(41, 'marcell', '2023-12-11 08:34:20'),
(42, 'marcell', '2023-12-13 03:19:34'),
(43, 'dede', '2023-12-25 15:59:45'),
(44, 'zee', '2023-12-25 16:01:00'),
(45, 'dede', '2023-12-25 16:02:05'),
(46, 'dede', '2023-12-25 16:22:23'),
(47, 'dede', '2023-12-25 16:26:34'),
(48, 'dede', '2023-12-25 16:55:12'),
(49, 'marcell', '2023-12-25 16:56:55'),
(50, 'marcell', '2023-12-25 17:10:10'),
(51, 'marcell', '2023-12-25 17:16:13'),
(52, 'marcell', '2023-12-25 17:45:26'),
(53, 'marcell', '2023-12-25 17:47:22'),
(54, 'dede', '2023-12-25 17:47:54'),
(55, 'zee', '2023-12-25 17:49:59'),
(56, 'dede', '2023-12-25 18:24:01'),
(57, 'marcell', '2023-12-25 18:39:28'),
(58, 'marcell', '2023-12-26 06:05:14'),
(59, 'marcell', '2023-12-26 06:05:14'),
(60, 'dede', '2023-12-26 06:05:37'),
(61, 'dede', '2023-12-26 09:17:39'),
(62, 'dede', '2023-12-26 11:41:56'),
(63, 'dede', '2023-12-26 11:44:25'),
(64, 'dede', '2023-12-26 11:53:30'),
(65, 'marcell', '2023-12-26 12:54:11'),
(66, 'marcell', '2023-12-26 12:57:19'),
(67, 'marcell', '2023-12-26 13:04:28'),
(68, 'zee', '2023-12-26 13:57:23'),
(69, 'marcell', '2023-12-27 01:48:39'),
(70, 'dede', '2023-12-27 02:50:55'),
(71, 'marcell', '2023-12-27 04:07:51'),
(72, 'marcell', '2023-12-27 08:04:30'),
(73, 'marcell', '2023-12-27 09:17:59'),
(74, 'dede', '2023-12-27 09:34:44'),
(75, 'dede', '2023-12-27 09:47:03'),
(76, 'dede', '2023-12-27 12:48:13'),
(77, 'marcell', '2023-12-27 13:51:32'),
(78, 'marcell', '2023-12-27 14:35:02'),
(79, 'dede', '2023-12-27 14:55:59'),
(80, 'dede', '2023-12-27 15:57:22'),
(81, 'dede', '2023-12-27 16:19:55'),
(82, 'dede', '2023-12-28 01:42:42'),
(83, 'dede', '2023-12-28 01:42:42'),
(84, 'dede', '2023-12-28 01:42:42'),
(85, 'marcell', '2023-12-28 02:05:31'),
(86, 'marcell', '2023-12-28 02:25:56'),
(87, 'marcell', '2023-12-28 03:23:36'),
(88, 'marcell', '2023-12-28 04:33:04'),
(89, 'marcell', '2023-12-28 05:54:51'),
(90, 'administrator', '2023-12-28 06:52:53'),
(91, 'marcell', '2023-12-28 07:19:40'),
(92, 'marcell', '2023-12-28 07:45:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pc_linee`
--

DROP TABLE IF EXISTS `pc_linee`;
CREATE TABLE `pc_linee` (
  `pc_no` varchar(30) NOT NULL,
  `item_no` varchar(50) NOT NULL,
  `post_user_id` int(10) NOT NULL,
  `post_username` varchar(20) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pc_linee`
--

INSERT INTO `pc_linee` (`pc_no`, `item_no`, `post_user_id`, `post_username`, `post_date`) VALUES
('IT-PC-0001', 'IT-Kabel -0001', 1, 'marcell', '2023-12-04 12:53:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pc_master`
--

DROP TABLE IF EXISTS `pc_master`;
CREATE TABLE `pc_master` (
  `id_pc_master` int(11) NOT NULL,
  `pc_no` varchar(30) NOT NULL,
  `pc_description` varchar(255) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `category` enum('PC','LAPTOP') NOT NULL,
  `status` enum('used','new','reused') NOT NULL,
  `pc_location` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `date_registation` date NOT NULL,
  `date_expired` date DEFAULT NULL,
  `pc_spectification` varchar(255) NOT NULL,
  `post_user_id` int(10) NOT NULL,
  `post_username` varchar(30) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pc_master`
--

INSERT INTO `pc_master` (`id_pc_master`, `pc_no`, `pc_description`, `unit`, `category`, `status`, `pc_location`, `note`, `date_registation`, `date_expired`, `pc_spectification`, `post_user_id`, `post_username`, `post_date`) VALUES
(1, 'IT-PC-0001', 'Lapsop  ACER', 'PCS', 'PC', 'used', 'Ruang IT', '-', '2023-12-04', '2023-12-04', 'Laptop Redoen', 1, 'marcell', '2023-12-04 12:53:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pt`
--

DROP TABLE IF EXISTS `pt`;
CREATE TABLE `pt` (
  `id_pt` int(11) NOT NULL,
  `name_pt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pt`
--

INSERT INTO `pt` (`id_pt`, `name_pt`) VALUES
(1, 'Apli'),
(4, 'Bantara Indah'),
(2, 'BMS'),
(6, 'Divisi Kartu'),
(3, 'Lyra'),
(5, 'Perma');

-- --------------------------------------------------------

--
-- Struktur dari tabel `request_submission`
--

DROP TABLE IF EXISTS `request_submission`;
CREATE TABLE `request_submission` (
  `id_req_sub` int(11) NOT NULL,
  `no_pengajuan` varchar(15) DEFAULT NULL,
  `name_pt` varchar(20) NOT NULL,
  `name_division` varchar(20) NOT NULL,
  `approved_1` varchar(20) NOT NULL,
  `approved_2` varchar(20) NOT NULL,
  `status` enum('Diajukan','Disetujui1','Disetujui2','Selesai','Ditolak') DEFAULT 'Diajukan',
  `post_user_id` int(10) DEFAULT NULL,
  `post_username` varchar(30) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_approved_1` timestamp NULL DEFAULT NULL,
  `date_approved_2` timestamp NULL DEFAULT NULL,
  `date_done` timestamp NULL DEFAULT NULL,
  `request_type` enum('SUBMISSION','REQUEST') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `request_submission`
--

INSERT INTO `request_submission` (`id_req_sub`, `no_pengajuan`, `name_pt`, `name_division`, `approved_1`, `approved_2`, `status`, `post_user_id`, `post_username`, `post_date`, `date_approved_1`, `date_approved_2`, `date_done`, `request_type`) VALUES
(1, 'IT-2023-12-001', 'Bantara Indah', 'Accounting', 'marcell', 'zee', 'Disetujui1', 1, 'marcell', '2023-12-28 06:37:31', '2023-12-28 06:38:58', NULL, NULL, 'REQUEST');

-- --------------------------------------------------------

--
-- Struktur dari tabel `stocks`
--

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
  `id_stock` int(11) NOT NULL,
  `stock_no` varchar(20) NOT NULL,
  `stock_description` varchar(100) NOT NULL,
  `stock_qty` int(10) NOT NULL,
  `category` varchar(20) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `type` enum('Software','Hardware') NOT NULL DEFAULT 'Hardware',
  `note` varchar(255) NOT NULL,
  `post_user_id` int(11) NOT NULL,
  `post_username` varchar(20) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastSerial` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `stocks`
--

INSERT INTO `stocks` (`id_stock`, `stock_no`, `stock_description`, `stock_qty`, `category`, `unit`, `type`, `note`, `post_user_id`, `post_username`, `post_date`, `lastSerial`) VALUES
(1, 'IT-ST-001', 'Monitor ', 4, 'Monitor', 'PCS', 'Hardware', '', 1, 'marcell', '2023-11-29 06:33:49', 0),
(2, 'IT-ST-002', 'SDD ', 1, 'SDD', 'PCS', 'Hardware', '', 1, 'marcell', '2023-11-29 08:34:33', 0),
(3, 'IT-ST-003', 'Harddisk', 0, 'HDD', 'PCS', 'Hardware', '', 1, 'marcell', '2023-11-29 08:51:15', 0),
(4, 'IT-ST-004', 'Keyboard', 0, 'Keyboard', 'PCS', 'Hardware', '', 1, 'marcell', '2023-11-29 08:56:32', 0),
(5, 'IT-ST-005', 'Paint', 20, 'Paint', 'Ml', 'Hardware', '', 1, 'marcell', '2023-11-29 09:01:05', 0),
(6, 'IT-ST-006', 'Battery UPS', 0, 'Battery Ups', 'PCS', 'Hardware', '', 1, 'marcell', '2023-11-29 09:10:49', 0),
(9, 'IT-ST-009', 'Kabel', 130, 'Kabel ', 'PCS', 'Hardware', '', 1, 'marcell', '2023-11-30 02:27:46', 0),
(10, 'IT-ST-010', 'DVD', 38, 'DVD', 'PCS', 'Software', '', 1, 'marcell', '2023-11-30 02:31:17', 0),
(11, 'IT-ST-011', 'RJ Stock', 0, 'RJ', 'PCS', 'Hardware', '', 1, 'marcell', '2023-11-30 02:46:18', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `stocks_temporary`
--

DROP TABLE IF EXISTS `stocks_temporary`;
CREATE TABLE `stocks_temporary` (
  `id_stock` int(11) NOT NULL,
  `stock_description` varchar(100) NOT NULL,
  `stock_qty` int(10) NOT NULL,
  `categoty` varchar(20) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `type` enum('Hardware','Software') NOT NULL,
  `note` varchar(255) NOT NULL,
  `post_user_id` int(11) NOT NULL,
  `post_username` varchar(20) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `stock_request`
--

DROP TABLE IF EXISTS `stock_request`;
CREATE TABLE `stock_request` (
  `Id_submission_item` int(11) NOT NULL,
  `no_pengajuan` varchar(15) NOT NULL,
  `stock_no` varchar(50) NOT NULL,
  `stock_description` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `note` varchar(255) NOT NULL,
  `id_detail_stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `stock_request`
--

INSERT INTO `stock_request` (`Id_submission_item`, `no_pengajuan`, `stock_no`, `stock_description`, `qty`, `note`, `id_detail_stock`) VALUES
(1, 'IT-2023-12-001', 'IT-ST-009', 'Kabel Ide', 1, '', 18);

-- --------------------------------------------------------

--
-- Struktur dari tabel `stock_submission`
--

DROP TABLE IF EXISTS `stock_submission`;
CREATE TABLE `stock_submission` (
  `id_stock_sub` int(11) NOT NULL,
  `no_pengajuan` varchar(15) NOT NULL,
  `stock_no` varchar(50) DEFAULT NULL,
  `stock_description` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `brand` varchar(30) NOT NULL,
  `additional_info` varchar(50) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `id_detail_stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` int(10) NOT NULL,
  `code_user` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(999) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `code_user`, `username`, `password`, `full_name`, `email`, `role`, `created_at`) VALUES
(1, 'ADMIN-0001', 'marcell', '$2b$10$VkgyU/l1VHKtlLg6gBUYQ.3uqTUshirATB4f7iykoXA/2uxxEmmuK', 'Marcell aAndreas Samadhani Duha', 'marcellandreas.123@gmail.com', '1', '2023-11-29 08:49:05'),
(2, 'USER-0001', 'dede', '$2b$10$EugUr/w.KC8UbZh8JlbfUe4fD33dArSH3IRPIq1l5KiZphMsE9Vxq', 'dedea', 'marcell.andreas0105@gmail.com', '2', '2023-11-29 08:49:35'),
(3, 'USER-0002', 'zee', '$2b$10$8HOF3pSTZVl1AZFaTJ.s1euI3X/JIU1ewCQqBGPJgywqQa4TOSBze', 'zee', 'marcellandreas099@gmail.com', '3', '2023-12-25 23:00:49'),
(4, 'USER-0002', 'administrator', '$2b$10$bxjUbwI8rhNZwaHwEzOvXe/LhMbQxNzO4R0keHzsvdxVvaZ2VP/B6', 'administrator', 'marcellandreas.123@gmail.com', '1', '2023-12-28 13:52:43');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `category` (`category`);

--
-- Indeks untuk tabel `detail_stock`
--
ALTER TABLE `detail_stock`
  ADD PRIMARY KEY (`id_detail_stock`),
  ADD KEY `detail_stock_ibfk_1` (`stock_no`);

--
-- Indeks untuk tabel `detail_stock_temporary`
--
ALTER TABLE `detail_stock_temporary`
  ADD PRIMARY KEY (`id_detail_stock`),
  ADD KEY `detail_stock_temporary_ibfk_1` (`id_stock`);

--
-- Indeks untuk tabel `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`id_division`),
  ADD KEY `name_division` (`name_division`),
  ADD KEY `name_pt` (`name_pt`);

--
-- Indeks untuk tabel `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_no` (`item_no`);

--
-- Indeks untuk tabel `login_history`
--
ALTER TABLE `login_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Indeks untuk tabel `pc_linee`
--
ALTER TABLE `pc_linee`
  ADD UNIQUE KEY `item_no` (`item_no`),
  ADD KEY `pc_no` (`pc_no`);

--
-- Indeks untuk tabel `pc_master`
--
ALTER TABLE `pc_master`
  ADD PRIMARY KEY (`id_pc_master`),
  ADD KEY `pc_no` (`pc_no`),
  ADD KEY `post_user_id` (`post_user_id`),
  ADD KEY `post_username` (`post_username`);

--
-- Indeks untuk tabel `pt`
--
ALTER TABLE `pt`
  ADD PRIMARY KEY (`id_pt`),
  ADD UNIQUE KEY `name_pt` (`name_pt`);

--
-- Indeks untuk tabel `request_submission`
--
ALTER TABLE `request_submission`
  ADD PRIMARY KEY (`id_req_sub`),
  ADD UNIQUE KEY `no_pengajuan` (`no_pengajuan`) USING BTREE,
  ADD KEY `post_user_id` (`post_user_id`),
  ADD KEY `approved_1` (`approved_1`),
  ADD KEY `approved_2` (`approved_2`),
  ADD KEY `post_username` (`post_username`),
  ADD KEY `name_pt` (`name_pt`),
  ADD KEY `name_division` (`name_division`);

--
-- Indeks untuk tabel `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id_stock`),
  ADD KEY `stock_no` (`stock_no`),
  ADD KEY `post_user_id` (`post_user_id`),
  ADD KEY `post_username` (`post_username`),
  ADD KEY `stocks_ibfk_1` (`category`);

--
-- Indeks untuk tabel `stocks_temporary`
--
ALTER TABLE `stocks_temporary`
  ADD PRIMARY KEY (`id_stock`);

--
-- Indeks untuk tabel `stock_request`
--
ALTER TABLE `stock_request`
  ADD PRIMARY KEY (`Id_submission_item`),
  ADD KEY `stock_no` (`stock_no`),
  ADD KEY `no_pengajuan` (`no_pengajuan`);

--
-- Indeks untuk tabel `stock_submission`
--
ALTER TABLE `stock_submission`
  ADD PRIMARY KEY (`id_stock_sub`),
  ADD KEY `no_pengajuan` (`no_pengajuan`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `detail_stock`
--
ALTER TABLE `detail_stock`
  MODIFY `id_detail_stock` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT untuk tabel `detail_stock_temporary`
--
ALTER TABLE `detail_stock_temporary`
  MODIFY `id_detail_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `division`
--
ALTER TABLE `division`
  MODIFY `id_division` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `login_history`
--
ALTER TABLE `login_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT untuk tabel `pc_master`
--
ALTER TABLE `pc_master`
  MODIFY `id_pc_master` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `pt`
--
ALTER TABLE `pt`
  MODIFY `id_pt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `request_submission`
--
ALTER TABLE `request_submission`
  MODIFY `id_req_sub` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id_stock` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `stocks_temporary`
--
ALTER TABLE `stocks_temporary`
  MODIFY `id_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `stock_request`
--
ALTER TABLE `stock_request`
  MODIFY `Id_submission_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `stock_submission`
--
ALTER TABLE `stock_submission`
  MODIFY `id_stock_sub` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_stock`
--
ALTER TABLE `detail_stock`
  ADD CONSTRAINT `detail_stock_ibfk_1` FOREIGN KEY (`stock_no`) REFERENCES `stocks` (`stock_no`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `division`
--
ALTER TABLE `division`
  ADD CONSTRAINT `division_ibfk_1` FOREIGN KEY (`name_pt`) REFERENCES `pt` (`name_pt`) ON DELETE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `login_history`
--
ALTER TABLE `login_history`
  ADD CONSTRAINT `login_history_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pc_linee`
--
ALTER TABLE `pc_linee`
  ADD CONSTRAINT `pc_linee_ibfk_1` FOREIGN KEY (`item_no`) REFERENCES `items` (`item_no`),
  ADD CONSTRAINT `pc_linee_ibfk_2` FOREIGN KEY (`pc_no`) REFERENCES `pc_master` (`pc_no`);

--
-- Ketidakleluasaan untuk tabel `request_submission`
--
ALTER TABLE `request_submission`
  ADD CONSTRAINT `request_submission_ibfk_10` FOREIGN KEY (`name_division`) REFERENCES `division` (`name_division`) ON UPDATE CASCADE,
  ADD CONSTRAINT `request_submission_ibfk_11` FOREIGN KEY (`post_username`) REFERENCES `user` (`username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `request_submission_ibfk_6` FOREIGN KEY (`post_user_id`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE,
  ADD CONSTRAINT `request_submission_ibfk_7` FOREIGN KEY (`approved_1`) REFERENCES `user` (`username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `request_submission_ibfk_8` FOREIGN KEY (`approved_2`) REFERENCES `user` (`username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `request_submission_ibfk_9` FOREIGN KEY (`name_pt`) REFERENCES `pt` (`name_pt`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`category`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stocks_ibfk_2` FOREIGN KEY (`post_username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stocks_ibfk_3` FOREIGN KEY (`post_user_id`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `stock_request`
--
ALTER TABLE `stock_request`
  ADD CONSTRAINT `stock_request_ibfk_1` FOREIGN KEY (`no_pengajuan`) REFERENCES `request_submission` (`no_pengajuan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `stock_submission`
--
ALTER TABLE `stock_submission`
  ADD CONSTRAINT `stock_submission_ibfk_1` FOREIGN KEY (`no_pengajuan`) REFERENCES `request_submission` (`no_pengajuan`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
