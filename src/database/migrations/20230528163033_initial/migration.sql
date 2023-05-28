-- CreateTable
CREATE TABLE `angajat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(20) NOT NULL,
    `prenume` VARCHAR(20) NOT NULL,
    `dataAngajarii` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contract` (
    `dataInceput` DATE NOT NULL,
    `dataFinal` DATE NOT NULL,
    `idAngajat` INTEGER NOT NULL,
    `idPost` INTEGER NULL,
    `idMagazin` INTEGER NULL,

    INDEX `id`(`idAngajat`, `dataInceput`),
    INDEX `idMagazin`(`idMagazin`),
    INDEX `idPost`(`idPost`),
    PRIMARY KEY (`idAngajat`, `dataInceput`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `franciza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locatie` VARCHAR(100) NOT NULL,
    `numeDetinator` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `magazin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adresa` VARCHAR(100) NOT NULL,
    `programStart` VARCHAR(10) NOT NULL,
    `programFinal` VARCHAR(10) NOT NULL,
    `dataDeschiderii` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idFranciza` INTEGER NULL,

    INDEX `idFranciza`(`idFranciza`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oferta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(45) NOT NULL,
    `dataInceput` DATE NOT NULL,
    `dataFinal` DATE NOT NULL,
    `procentajReducere` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titlu` VARCHAR(20) NOT NULL,
    `salariu` FLOAT NOT NULL,
    `programStart` VARCHAR(10) NOT NULL,
    `programFinal` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(45) NOT NULL,
    `pret` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produs_raion` (
    `idProdus` INTEGER NOT NULL,
    `idRaion` INTEGER NOT NULL,

    INDEX `idRaion`(`idRaion`),
    PRIMARY KEY (`idProdus`, `idRaion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `raion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(20) NOT NULL,
    `tipRaion` VARCHAR(20) NOT NULL,
    `idMagazin` INTEGER NOT NULL,

    INDEX `idMagazin`(`idMagazin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `istoric_oferte` (
    `idProdus` INTEGER NOT NULL,
    `idOferta` INTEGER NOT NULL,

    INDEX `idOferta`(`idOferta`),
    PRIMARY KEY (`idProdus`, `idOferta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`idAngajat`) REFERENCES `angajat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_ibfk_2` FOREIGN KEY (`idPost`) REFERENCES `post`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_ibfk_3` FOREIGN KEY (`idMagazin`) REFERENCES `magazin`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `magazin` ADD CONSTRAINT `magazin_ibfk_1` FOREIGN KEY (`idFranciza`) REFERENCES `franciza`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `produs_raion` ADD CONSTRAINT `produs_raion_ibfk_1` FOREIGN KEY (`idProdus`) REFERENCES `produs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produs_raion` ADD CONSTRAINT `produs_raion_ibfk_2` FOREIGN KEY (`idRaion`) REFERENCES `raion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `raion` ADD CONSTRAINT `raion_ibfk_1` FOREIGN KEY (`idMagazin`) REFERENCES `magazin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `istoric_oferte` ADD CONSTRAINT `istoric_oferte_ibfk_1` FOREIGN KEY (`idProdus`) REFERENCES `produs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `istoric_oferte` ADD CONSTRAINT `istoric_oferte_ibfk_2` FOREIGN KEY (`idOferta`) REFERENCES `oferta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
