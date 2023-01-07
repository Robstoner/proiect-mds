INSERT INTO `franciza` (`locatie`, `numeDetinator`) 
VALUES ('Romania, Bucuresti', 'Schmidt Robert');

INSERT INTO `magazin` (`adresa`, `programStart`, `programFinal`, `dataDeschiderii`, `idFranciza`) 
VALUES ('Str. Drumul Taberei, Nr. 53', '10', '22', current_timestamp(), '1');

INSERT INTO `angajat` (`nume`, `prenume`, `dataAngajarii`) 
VALUES ('Schmidt', 'Helmuth', current_timestamp());

INSERT INTO `post` (`titlu`, `salariu`, `programStart`, `programFinal`) 
VALUES ('Manager', '10000', '9', '16');

INSERT INTO `contract` (`dataInceput`, `dataFinal`, `idAngajat`, `idPost`, `idMagazin`) 
VALUES ('2022-12-27', '2024-12-01', '1', '1', '1');

INSERT INTO `raion` (`nume`, `tipRaion`, `idMagazin`) 
VALUES ('Fructe', 'perisabile', '1');

INSERT INTO `produs` (`nume`, `pret`) 
VALUES ('Mere', '2.4');

INSERT INTO `produs` (`nume`, `pret`) 
VALUES ('Pere', '2.8');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('1', '1');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('2', '1');

INSERT INTO `raion` (`nume`, `tipRaion`, `idMagazin`) 
VALUES ('Carne', 'congelate', '1');

INSERT INTO `produs` (`nume`, `pret`) 
VALUES ('Ceafa de porc', '35.99');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('3', '2');

INSERT INTO `oferta` (`nume`, `dataInceput`, `dataFinal`, `procentajReducere`) 
VALUES ('Produse perisabile inainte de revelion', '2022-12-30', '2022-12-31', '0.25');

INSERT INTO `istoric_oferte` (`idProdus`, `idOferta`) 
VALUES ('3', '1');