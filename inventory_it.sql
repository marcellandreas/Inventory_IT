-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 28 Des 2023 pada 09.36
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `pt`
--

DROP TABLE IF EXISTS `pt`;
CREATE TABLE `pt` (
  `id_pt` int(11) NOT NULL,
  `name_pt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `detail_stock`
--
ALTER TABLE `detail_stock`
  MODIFY `id_detail_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `detail_stock_temporary`
--
ALTER TABLE `detail_stock_temporary`
  MODIFY `id_detail_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `division`
--
ALTER TABLE `division`
  MODIFY `id_division` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `login_history`
--
ALTER TABLE `login_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pc_master`
--
ALTER TABLE `pc_master`
  MODIFY `id_pc_master` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pt`
--
ALTER TABLE `pt`
  MODIFY `id_pt` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `request_submission`
--
ALTER TABLE `request_submission`
  MODIFY `id_req_sub` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `stocks_temporary`
--
ALTER TABLE `stocks_temporary`
  MODIFY `id_stock` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `stock_request`
--
ALTER TABLE `stock_request`
  MODIFY `Id_submission_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `stock_submission`
--
ALTER TABLE `stock_submission`
  MODIFY `id_stock_sub` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT;

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
