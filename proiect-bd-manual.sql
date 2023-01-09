-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2023 at 11:12 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proiect-bd-manual`
--

-- --------------------------------------------------------

--
-- Table structure for table `angajat`
--

CREATE TABLE `angajat` (
  `id` int(11) NOT NULL,
  `nume` varchar(20) NOT NULL,
  `prenume` varchar(20) NOT NULL,
  `dataAngajarii` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `angajat`
--

INSERT INTO `angajat` (`id`, `nume`, `prenume`, `dataAngajarii`) VALUES
(1, 'Schmidt', 'Helmuth', '2023-01-10');

-- --------------------------------------------------------

--
-- Table structure for table `contract`
--

CREATE TABLE `contract` (
  `dataInceput` date NOT NULL,
  `dataFinal` date NOT NULL,
  `idAngajat` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `idMagazin` int(11) NOT NULL
) ;

--
-- Dumping data for table `contract`
--

INSERT INTO `contract` (`dataInceput`, `dataFinal`, `idAngajat`, `idPost`, `idMagazin`) VALUES
('2022-12-27', '2024-12-01', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `franciza`
--

CREATE TABLE `franciza` (
  `id` int(11) NOT NULL,
  `locatie` varchar(100) NOT NULL,
  `numeDetinator` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `franciza`
--

INSERT INTO `franciza` (`id`, `locatie`, `numeDetinator`) VALUES
(1, 'Romania, Bucuresti', 'Schmidt Robert');

-- --------------------------------------------------------

--
-- Table structure for table `istoric_oferte`
--

CREATE TABLE `istoric_oferte` (
  `idProdus` int(11) NOT NULL,
  `idOferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `istoric_oferte`
--

INSERT INTO `istoric_oferte` (`idProdus`, `idOferta`) VALUES
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `magazin`
--

CREATE TABLE `magazin` (
  `id` int(11) NOT NULL,
  `adresa` varchar(100) NOT NULL,
  `programStart` varchar(10) NOT NULL,
  `programFinal` varchar(10) NOT NULL,
  `dataDeschiderii` date NOT NULL DEFAULT current_timestamp(),
  `idFranciza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `magazin`
--

INSERT INTO `magazin` (`id`, `adresa`, `programStart`, `programFinal`, `dataDeschiderii`, `idFranciza`) VALUES
(1, 'Str. Drumul Taberei, Nr. 53', '10', '22', '2023-01-10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oferta`
--

CREATE TABLE `oferta` (
  `id` int(11) NOT NULL,
  `nume` varchar(45) NOT NULL,
  `dataInceput` date NOT NULL,
  `dataFinal` date NOT NULL,
  `procentajReducere` float NOT NULL CHECK (`procentajReducere` > 0 and `procentajReducere` < 1)
) ;

--
-- Dumping data for table `oferta`
--

INSERT INTO `oferta` (`id`, `nume`, `dataInceput`, `dataFinal`, `procentajReducere`) VALUES
(1, 'Produse perisabile inainte de revelion', '2022-12-30', '2022-12-31', 0.25);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `titlu` varchar(20) NOT NULL,
  `salariu` float NOT NULL CHECK (`salariu` > 0),
  `programStart` varchar(10) NOT NULL,
  `programFinal` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `titlu`, `salariu`, `programStart`, `programFinal`) VALUES
(1, 'Manager', 10000, '9', '16');

-- --------------------------------------------------------

--
-- Table structure for table `produs`
--

CREATE TABLE `produs` (
  `id` int(11) NOT NULL,
  `nume` varchar(45) NOT NULL,
  `pret` float NOT NULL CHECK (`pret` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produs`
--

INSERT INTO `produs` (`id`, `nume`, `pret`) VALUES
(1, 'Mere', 2.4),
(2, 'Pere', 2.8),
(3, 'Ceafa de porc', 35.99);

-- --------------------------------------------------------

--
-- Table structure for table `produs_raion`
--

CREATE TABLE `produs_raion` (
  `idProdus` int(11) NOT NULL,
  `idRaion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produs_raion`
--

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) VALUES
(1, 1),
(2, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `raion`
--

CREATE TABLE `raion` (
  `id` int(11) NOT NULL,
  `nume` varchar(20) NOT NULL,
  `tipRaion` varchar(20) NOT NULL,
  `idMagazin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `raion`
--

INSERT INTO `raion` (`id`, `nume`, `tipRaion`, `idMagazin`) VALUES
(1, 'Fructe', 'perisabile', 1),
(2, 'Carne', 'congelate', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `angajat`
--
ALTER TABLE `angajat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contract`
--
ALTER TABLE `contract`
  ADD PRIMARY KEY (`idAngajat`,`dataInceput`),
  ADD KEY `idPost` (`idPost`),
  ADD KEY `idMagazin` (`idMagazin`),
  ADD KEY `id` (`idAngajat`,`dataInceput`);

--
-- Indexes for table `franciza`
--
ALTER TABLE `franciza`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `istoric_oferte`
--
ALTER TABLE `istoric_oferte`
  ADD PRIMARY KEY (`idProdus`,`idOferta`),
  ADD KEY `idOferta` (`idOferta`);

--
-- Indexes for table `magazin`
--
ALTER TABLE `magazin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFranciza` (`idFranciza`);

--
-- Indexes for table `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produs`
--
ALTER TABLE `produs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produs_raion`
--
ALTER TABLE `produs_raion`
  ADD PRIMARY KEY (`idProdus`,`idRaion`),
  ADD KEY `idRaion` (`idRaion`);

--
-- Indexes for table `raion`
--
ALTER TABLE `raion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMagazin` (`idMagazin`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `angajat`
--
ALTER TABLE `angajat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `franciza`
--
ALTER TABLE `franciza`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `magazin`
--
ALTER TABLE `magazin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `produs`
--
ALTER TABLE `produs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `raion`
--
ALTER TABLE `raion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contract`
--
ALTER TABLE `contract`
  ADD CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`idAngajat`) REFERENCES `angajat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_ibfk_2` FOREIGN KEY (`idPost`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_ibfk_3` FOREIGN KEY (`idMagazin`) REFERENCES `magazin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `istoric_oferte`
--
ALTER TABLE `istoric_oferte`
  ADD CONSTRAINT `istoric_oferte_ibfk_1` FOREIGN KEY (`idProdus`) REFERENCES `produs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `istoric_oferte_ibfk_2` FOREIGN KEY (`idOferta`) REFERENCES `oferta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `magazin`
--
ALTER TABLE `magazin`
  ADD CONSTRAINT `magazin_ibfk_1` FOREIGN KEY (`idFranciza`) REFERENCES `franciza` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `produs_raion`
--
ALTER TABLE `produs_raion`
  ADD CONSTRAINT `produs_raion_ibfk_1` FOREIGN KEY (`idProdus`) REFERENCES `produs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produs_raion_ibfk_2` FOREIGN KEY (`idRaion`) REFERENCES `raion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `raion`
--
ALTER TABLE `raion`
  ADD CONSTRAINT `raion_ibfk_1` FOREIGN KEY (`idMagazin`) REFERENCES `magazin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
