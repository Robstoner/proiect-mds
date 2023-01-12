
create table franciza
(
    id int auto_increment primary key,
    locatie varchar(100) not null,
    numeDetinator varchar(30) not null
)
engine = InnoDB;

create table magazin
(
    id int auto_increment primary key,
    adresa varchar(100) not null,
    programStart varchar(10) not null,
    programFinal varchar(10) not null,
    dataDeschiderii date not null default current_timestamp,
    idFranciza int,
    foreign key (idFranciza) references franciza(id)
    on delete set null
    on update set null
)
engine = InnoDB;

create table angajat
(
    id int auto_increment primary key,
    nume varchar(20) not null,
    prenume varchar(20) not null,
    dataAngajarii date not null default current_timestamp
)
engine = InnoDB;

create table post
(
    id int auto_increment primary key,
    titlu varchar(20) not null,
    salariu float not null check (salariu > 0),
    programStart varchar(10) not null,
    programFinal varchar(10) not null
)
engine = InnoDB;

create table contract
(
    dataInceput date not null,
    dataFinal date not null,
    idAngajat int not null,
    idPost int,
    idMagazin int,
    foreign key (idAngajat) references angajat(id)
    on delete cascade
    on update cascade,
    foreign key (idPost) references post(id)
    on delete set null
    on update set null,
    foreign key (idMagazin) references magazin(id)
    on delete set null
    on update set null,
    index id (idAngajat, dataInceput), 
    primary key (idAngajat, dataInceput), -- cheie compusa
    constraint contract_data_chk check (dataInceput < dataFinal)
)
engine = InnoDB;

create table raion
(
    id int auto_increment primary key,
    nume varchar(20) not null,
    tipRaion varchar(20) not null,
    idMagazin int not null,
    foreign key (idMagazin) references magazin(id)
    on delete cascade
    on update cascade
)
engine = InnoDB;

create table oferta
(
    id int auto_increment primary key,
    nume varchar(45) not null,
    dataInceput date not null,
    dataFinal date not null,
    procentajReducere float not null check (procentajReducere > 0 and procentajReducere < 1),
    constraint oferta_data_chk check (dataInceput < dataFinal)
)
engine = InnoDB;

create table produs
(
    id int auto_increment primary key,
    nume varchar(45) not null,
    pret float not null check (pret > 0)
)
engine = InnoDB;

create table produs_raion
(
    idProdus int not null,
    idRaion int not null,
    primary key (idProdus, idRaion), -- cheie compusa
    foreign key (idProdus) references produs(id) 
    on delete cascade 
    on update cascade,
    foreign key (idRaion) references raion(id) 
    on delete cascade 
    on update cascade
)
engine = InnoDB;

create table istoric_oferte
(
    idProdus int not null,
    idOferta int not null,
    primary key (idProdus, idOferta), -- cheie compusa
    foreign key (idProdus) references produs(id) 
    on delete cascade 
    on update cascade,
    foreign key (idOferta) references oferta(id) 
    on delete cascade 
    on update cascade
)
engine = InnoDB;

INSERT INTO `franciza` (`locatie`, `numeDetinator`) 
VALUES ('Romania, Bucuresti', 'Schmidt Robert');

INSERT INTO `franciza` (`locatie`, `numeDetinator`) 
VALUES 
    ('Romania, Cluj-Napoca', 'Doe John'),
    ('Romania, Timisoara', 'Smith Jane'),
    ('Romania, Iasi', 'Brown Michael');

INSERT INTO `magazin` (`adresa`, `programStart`, `programFinal`, `dataDeschiderii`, `idFranciza`) 
VALUES ('Str. Drumul Taberei, Nr. 53', '10:00', '22:00', current_timestamp(), '1');

INSERT INTO `magazin` (`adresa`, `programStart`, `programFinal`, `dataDeschiderii`, `idFranciza`)
VALUES ('Str. Mihai Viteazul, Nr. 21', '09:00', '20:00', current_timestamp(), '1'),
       ('Str. 1 Mai, Nr. 2', '08:00', '18:00', current_timestamp(), '2'),
       ('Str. Mihai Eminescu, Nr. 3', '08:00', '18:00', current_timestamp(), '1'),
       ('Str. Ion Creanga, Nr. 4', '08:00', '18:00', current_timestamp(), '1'),
       ('Str. Vasile Alecsandri, Nr. 5', '08:00', '18:00', current_timestamp(), '2'),
       ('Str. Cara Anghel, Nr. 4', '08:00', '18:00', current_timestamp(), '2'),
       ('Soseaua Panduri, Nr. 4', '08:00', '18:00', current_timestamp(), '2'),
       ('Str. Mihail Sebastian, Nr. 5', '08:00', '18:00', current_timestamp(), '2'),
       ('Str. Iovita, Nr. 4', '08:00', '18:00', current_timestamp(), '3');


INSERT INTO `angajat` (`nume`, `prenume`, `dataAngajarii`) 
VALUES ('Schmidt', 'Helmuth', current_timestamp());

INSERT INTO `angajat` (`nume`, `prenume`, `dataAngajarii`)
VALUES ('Popescu', 'Alex', current_timestamp()),
       ('Gheorghe', 'Bogdan', '2022-12-27'),
       ('Mihai', 'Iulian', current_timestamp());

INSERT INTO `post` (`titlu`, `salariu`, `programStart`, `programFinal`) 
VALUES ('Manager', '10000', '9:00', '16:00');

INSERT INTO `post` (`titlu`, `salariu`, `programStart`, `programFinal`)
VALUES ('Casier', '5000', '10:00', '18:00'),
       ('Lucrator comercial', '6500', '08:00', '16:00'),
       ('Lucrator comercial', '6500', '14:00', '20:00');

INSERT INTO `contract` (`dataInceput`, `dataFinal`, `idAngajat`, `idPost`, `idMagazin`) 
VALUES ('2022-12-27', '2024-12-01', '1', '1', '1');

INSERT INTO `contract` (`dataInceput`, `dataFinal`, `idAngajat`, `idPost`, `idMagazin`)
VALUES ('2022-12-27', '2024-12-01', '2', '2', '1'),
       ('2022-12-27', '2024-12-01', '3', '3', '1'),
       ('2022-12-27', '2024-12-01', '4', '4', '1');

INSERT INTO `raion` (`nume`, `tipRaion`, `idMagazin`) 
VALUES ('Fructe', 'perisabile', '1');

INSERT INTO `raion` (`nume`, `tipRaion`, `idMagazin`)
VALUES ('Carne', 'congelate', '1'),
       ('Lactate', 'perisabile', '1'),
       ('Bauturi', 'non-perisabile', '1');

INSERT INTO `produs` (`nume`, `pret`) 
VALUES ('Mere', '2.4');

INSERT INTO `produs` (`nume`, `pret`) 
VALUES ('Pere', '2.8');

INSERT INTO `produs` (`nume`, `pret`)
VALUES ('Ceafa de porc', '35.99'),
       ('Suc', '2.99'),
       ('Lapte', '3.99'),
       ('Vin', '15.99');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('1', '1');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('2', '1');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`) 
VALUES ('3', '2');

INSERT INTO `produs_raion` (`idProdus`, `idRaion`)
VALUES ('4', '4'),
       ('5', '3'),
       ('6', '4');

INSERT INTO `oferta` (`nume`, `dataInceput`, `dataFinal`, `procentajReducere`) 
VALUES ('Carnuri inainte de revelion', '2022-12-30', '2022-12-31', '0.25');

INSERT INTO `oferta` (`nume`, `dataInceput`, `dataFinal`, `procentajReducere`)
VALUES ('Produse non-perisabile inainte de revelion', '2022-12-30', '2022-12-31', '0.15'),
       ('Lapte flash sale', '2023-01-01', '2023-01-02', '0.30');

INSERT INTO `istoric_oferte` (`idProdus`, `idOferta`) 
VALUES ('3', '1');

INSERT INTO `istoric_oferte` (`idProdus`, `idOferta`)
VALUES ('5', '3'),
       ('6', '2'),
       ('5', '2'),
       ('4', '2');