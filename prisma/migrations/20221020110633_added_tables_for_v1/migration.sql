-- CreateTable
CREATE TABLE `Franciza` (
    `franciza_id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeDetinator` VARCHAR(191) NOT NULL,
    `tara` VARCHAR(191) NOT NULL,
    `nrAngajati` INTEGER NOT NULL,

    UNIQUE INDEX `Franciza_franciza_id_key`(`franciza_id`),
    PRIMARY KEY (`franciza_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Magazin` (
    `magazin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `locatie` VARCHAR(191) NOT NULL,
    `program` VARCHAR(191) NOT NULL,
    `dataDeschiderii` DATETIME(3) NOT NULL,
    `franciza_id` INTEGER NOT NULL,

    UNIQUE INDEX `Magazin_magazin_id_key`(`magazin_id`),
    PRIMARY KEY (`magazin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produs` (
    `produs_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(191) NOT NULL,
    `pret` INTEGER NOT NULL,
    `oferta_id` INTEGER NULL,
    `raion_id` INTEGER NOT NULL,

    UNIQUE INDEX `Produs_produs_id_key`(`produs_id`),
    PRIMARY KEY (`produs_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oferta` (
    `oferta_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(191) NOT NULL,
    `procentajScazut` INTEGER NOT NULL,
    `durata` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Oferta_oferta_id_key`(`oferta_id`),
    PRIMARY KEY (`oferta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Raion` (
    `raion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(191) NOT NULL,
    `magazin_id` INTEGER NOT NULL,
    `oferta_id` INTEGER NULL,

    UNIQUE INDEX `Raion_raion_id_key`(`raion_id`),
    PRIMARY KEY (`raion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Angajat` (
    `angajat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(191) NOT NULL,
    `prenume` VARCHAR(191) NOT NULL,
    `dataAngajarii` DATETIME(3) NOT NULL,
    `eligibilPrima` BOOLEAN NOT NULL,
    `magazin_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    UNIQUE INDEX `Angajat_angajat_id_key`(`angajat_id`),
    PRIMARY KEY (`angajat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `post_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nume` VARCHAR(191) NOT NULL,
    `salariuBrut` INTEGER NOT NULL,
    `valoarePrima` INTEGER NOT NULL,

    UNIQUE INDEX `Post_post_id_key`(`post_id`),
    PRIMARY KEY (`post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MagazinToProdus` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MagazinToProdus_AB_unique`(`A`, `B`),
    INDEX `_MagazinToProdus_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Magazin` ADD CONSTRAINT `Magazin_franciza_id_fkey` FOREIGN KEY (`franciza_id`) REFERENCES `Franciza`(`franciza_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produs` ADD CONSTRAINT `Produs_oferta_id_fkey` FOREIGN KEY (`oferta_id`) REFERENCES `Oferta`(`oferta_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produs` ADD CONSTRAINT `Produs_raion_id_fkey` FOREIGN KEY (`raion_id`) REFERENCES `Raion`(`raion_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Raion` ADD CONSTRAINT `Raion_magazin_id_fkey` FOREIGN KEY (`magazin_id`) REFERENCES `Magazin`(`magazin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Raion` ADD CONSTRAINT `Raion_oferta_id_fkey` FOREIGN KEY (`oferta_id`) REFERENCES `Oferta`(`oferta_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Angajat` ADD CONSTRAINT `Angajat_magazin_id_fkey` FOREIGN KEY (`magazin_id`) REFERENCES `Magazin`(`magazin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Angajat` ADD CONSTRAINT `Angajat_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MagazinToProdus` ADD CONSTRAINT `_MagazinToProdus_A_fkey` FOREIGN KEY (`A`) REFERENCES `Magazin`(`magazin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MagazinToProdus` ADD CONSTRAINT `_MagazinToProdus_B_fkey` FOREIGN KEY (`B`) REFERENCES `Produs`(`produs_id`) ON DELETE CASCADE ON UPDATE CASCADE;
