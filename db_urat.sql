CREATE TABLE `proiect-bd-manual`.`franciza` 
( `id` INT NOT NULL AUTO_INCREMENT , 
`locatie` VARCHAR(100) NULL , 
`numeDetinator` VARCHAR(30) NULL , 
PRIMARY KEY (`id`)) 
ENGINE = InnoDB; 

CREATE TABLE `proiect-bd-manual`.`magazin`
( `id` INT NOT NULL AUTO_INCREMENT ,
`adresa` VARCHAR(100) NULL ,
`programStart` VARCHAR(10) NULL,
`programFinal` VARCHAR(10) NULL,
`dataDeschiderii` DATE NULL DEFAULT CURRENT_TIMESTAMP,
`idFranciza` INT NOT NULL,
PRIMARY KEY (`id`),
CONSTRAINT `fk_magazin_franciza`
FOREIGN KEY (`idFranciza`)
REFERENCES `proiect-bd-manual`.`franciza` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE)
ENGINE = InnoDB;
