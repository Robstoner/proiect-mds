/*
  Warnings:

  - You are about to drop the column `magazin_id` on the `angajat` table. All the data in the column will be lost.
  - You are about to drop the `_magazintoprodus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_magazintoprodus` DROP FOREIGN KEY `_MagazinToProdus_A_fkey`;

-- DropForeignKey
ALTER TABLE `_magazintoprodus` DROP FOREIGN KEY `_MagazinToProdus_B_fkey`;

-- DropForeignKey
ALTER TABLE `angajat` DROP FOREIGN KEY `Angajat_magazin_id_fkey`;

-- AlterTable
ALTER TABLE `angajat` DROP COLUMN `magazin_id`;

-- DropTable
DROP TABLE `_magazintoprodus`;

-- CreateTable
CREATE TABLE `IstoricPost` (
    `angajat_id` INTEGER NOT NULL,
    `dataInceput` DATETIME(3) NOT NULL,
    `dataFinal` DATETIME(3) NOT NULL,
    `post_id` INTEGER NOT NULL,

    PRIMARY KEY (`angajat_id`, `dataInceput`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IstoricOferta` (
    `oferta_id` INTEGER NOT NULL,
    `dataInceput` DATETIME(3) NOT NULL,
    `dataFinal` DATETIME(3) NOT NULL,
    `raion_id` INTEGER NULL,
    `produs_id` INTEGER NULL,

    PRIMARY KEY (`oferta_id`, `dataInceput`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AngajatToMagazin` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AngajatToMagazin_AB_unique`(`A`, `B`),
    INDEX `_AngajatToMagazin_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IstoricPost` ADD CONSTRAINT `IstoricPost_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IstoricPost` ADD CONSTRAINT `IstoricPost_angajat_id_fkey` FOREIGN KEY (`angajat_id`) REFERENCES `Angajat`(`angajat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IstoricOferta` ADD CONSTRAINT `IstoricOferta_oferta_id_fkey` FOREIGN KEY (`oferta_id`) REFERENCES `Oferta`(`oferta_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IstoricOferta` ADD CONSTRAINT `IstoricOferta_raion_id_fkey` FOREIGN KEY (`raion_id`) REFERENCES `Raion`(`raion_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IstoricOferta` ADD CONSTRAINT `IstoricOferta_produs_id_fkey` FOREIGN KEY (`produs_id`) REFERENCES `Produs`(`produs_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AngajatToMagazin` ADD CONSTRAINT `_AngajatToMagazin_A_fkey` FOREIGN KEY (`A`) REFERENCES `Angajat`(`angajat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AngajatToMagazin` ADD CONSTRAINT `_AngajatToMagazin_B_fkey` FOREIGN KEY (`B`) REFERENCES `Magazin`(`magazin_id`) ON DELETE CASCADE ON UPDATE CASCADE;
