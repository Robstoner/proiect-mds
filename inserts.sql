INSERT INTO `franciza` (`id`, `locatie`, `numeDetinator`) 
VALUES (NULL, 'Romania, Bucuresti', 'Schmidt Robert');

INSERT INTO `magazin` (`id`, `adresa`, `programStart`, `programFinal`, `dataDeschiderii`, `idFranciza`) 
VALUES (NULL, 'Str. Drumul Taberei, Nr. 53', '10', '22', current_timestamp(), '1');

INSERT INTO `angajat` (`id`, `nume`, `prenume`, `data_angajarii`) 
VALUES (NULL, 'Schmidt', 'Helmuth', current_timestamp());

INSERT INTO `post` (`id`, `titlu`, `salariu`, `programStart`, `programFinal`) 
VALUES (NULL, 'Manager', '10000', '9', '16');

INSERT INTO `contract` (`dataInceput`, `dataFinal`, `idAngajat`, `idPost`, `idMagazin`) 
VALUES ('2022-12-27', '2024-12-01', '2', '1', '1');

INSERT INTO `raion` (`id`, `nume`, `tipRaion`, `idMagazin`) 
VALUES (NULL, 'Fructe', 'perisabile', '1');

INSERT INTO `produs` (`id`, `nume`, `pret`) 
VALUES (NULL, 'Mere', '2.4');

INSERT INTO `produs` (`id`, `nume`, `pret`) 
VALUES (NULL, 'Pere', '2.8');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('1', '1');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('2', '1');

INSERT INTO `raion` (`id`, `nume`, `tipRaion`, `idMagazin`) 
VALUES (NULL, 'Carne', 'congelate', '1');

INSERT INTO `produs` (`id`, `nume`, `pret`) 
VALUES (NULL, 'Ceafa de porc', '35.99');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('3', '2');

INSERT INTO `oferta` (`id`, `nume`, `dataInceput`, `dataFinal`, `procentajReducere`) 
VALUES (NULL, 'Produse perisabile inainte de revelion', '2022-12-30', '2022-12-31', '25');

INSERT INTO `produs_oferta` (`idProdus`, `idOferta`) 
VALUES ('3', '1');