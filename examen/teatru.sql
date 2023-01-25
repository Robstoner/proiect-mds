drop table actor cascade constraints;
drop table reprezentatie cascade constraints;
drop table piesa cascade constraints;
drop table teatru cascade constraints;

create table teatru(
  cod_teatru number(4) primary key,
  nume varchar2(20),
  oras varchar2(20),
  prenume_director varchar2(50),
  nume_director varchar2(50)
);
     
create table piesa(
  cod_piesa number(4) primary key,
  denumire varchar2(50),
  prenume_scriitor varchar2(50),
  nume_scriitor varchar2(50)
);

create table actor(
  cod_actor number(4) primary key,
  prenume varchar2(20),
  nume varchar2(20),
  data_nasterii date,
  salariu number(6),
  cod_piesa number(4) references piesa(cod_piesa)
);

create table reprezentatie(
  cod_teatru number(4) references teatru(cod_teatru),
  cod_piesa number(4) references piesa(cod_piesa),
sala varchar2(20),
data_spectacol date,
pret_bilet number(5),
PRIMARY KEY(cod_teatru ,cod_piesa,data_spectacol)
);

insert into teatru
values(1,'Bulandra','Bucuresti','Radu','Amati');

insert into teatru
values(2,'TBD','Bucuresti','Alexandra','Urem');

insert into teatru
values(3,'Teatrul Mic','Tecuci','Florentina','Cristea');

insert into teatru
values(4,'TPP','Bucuresti','Bogdan','Griga');

insert into teatru
values(5,'TASC','Bucuresti','Daniel','Dragu');

insert into piesa
values(1,'A fi sau a nu fi','Radu','Amati');

insert into piesa
values(2,'Fara greseala','Alexandra','Urem');

insert into piesa
values(3,'Celebritate','Cristian','Dasuc');

insert into piesa
values(4,'Melcul vietii','Claudiu','Iohan');

insert into piesa
values(5,'Viata si viata','Ion','Ilescu');

insert into piesa
values(6,'Stana Domnului','George','Becaliani');

insert into piesa
values(7,'E bine','Marius','Dumitru');

insert into actor
values(1,'Adrian','Badelina',TO_DATE('14-06-1998','dd-mm-yyyy'),1000, 1);

insert into actor
values(2,'Eugen','Blont',TO_DATE('14-03-1998','dd-mm-yyyy'),1200, 2);

insert into actor
values(3,'Dragos','Homer',TO_DATE('24-06-1998','dd-mm-yyyy'),1100, 3);

insert into actor
values(4,'Lucian','Istrate',TO_DATE('14-10-1998','dd-mm-yyyy'),2000, 7);

insert into actor
values(5,'Miruna','Zaroiu',TO_DATE('01-01-1998','dd-mm-yyyy'),3000, 7);

insert into actor
values(6,'Gheorghe','Sultan',TO_DATE('14-06-1999','dd-mm-yyyy'),1000, 2);

insert into actor
values(7,'Alexandru','Niguta',TO_DATE('15-07-1999','dd-mm-yyyy'),900, 5);

insert into actor
values(8,'Valentin','Savu',TO_DATE('15-03-1999','dd-mm-yyyy'),1250, 2);

insert into reprezentatie
values(2,1,'Sala Mare',TO_DATE('14-03-2020','dd-mm-yyyy'),50);

insert into reprezentatie
values(1,1,'Sala Mare',TO_DATE('15-03-2020','dd-mm-yyyy'),60);

insert into reprezentatie
values(2,1,'Sala Mare',TO_DATE('16-03-2020','dd-mm-yyyy'),60);

insert into reprezentatie
values(1,2,'Sala Mare',TO_DATE('14-02-2020','dd-mm-yyyy'),110);

insert into reprezentatie
values(2,2,'Sala Mare',TO_DATE('15-02-2020','dd-mm-yyyy'),120);

insert into reprezentatie
values(3,1,'Sala Mare',TO_DATE('14-02-2020','dd-mm-yyyy'),60);

insert into reprezentatie
values(3,1,'Sala Mare',TO_DATE('15-02-2020','dd-mm-yyyy'),60);

insert into reprezentatie
values(1,2,'Sala Mare',TO_DATE('24-02-2020','dd-mm-yyyy'),110);

insert into reprezentatie
values(2,1,'Sala Mare',TO_DATE('25-02-2020','dd-mm-yyyy'),60);

insert into reprezentatie
values(3,3,'Sala Mica',TO_DATE('14-02-2020','dd-mm-yyyy'),20);

insert into reprezentatie
values(3,3,'Sala Mica',TO_DATE('15-02-2020','dd-mm-yyyy'),20);

insert into reprezentatie
values(1,3,'Sala Mica',TO_DATE('24-02-2020','dd-mm-yyyy'),20);

insert into reprezentatie
values(1,3,'Sala Mica',TO_DATE('14-03-2020','dd-mm-yyyy'),20);

insert into reprezentatie
values(1,7,'Sala Mica',TO_DATE('14-05-2020','dd-mm-yyyy'),40);

insert into reprezentatie
values(1,7,'Sala Mica',TO_DATE('15-05-2020','dd-mm-yyyy'),40);

insert into reprezentatie
values(2,7,'Sala Mica',TO_DATE('16-05-2020','dd-mm-yyyy'),50);

insert into reprezentatie
values(4,7,'12A',TO_DATE('14-05-2020','dd-mm-yyyy'), 15);

insert into reprezentatie
values(4,7,'122C',TO_DATE('15-05-2020','dd-mm-yyyy'),40);

commit;
           
--1.1 Pentru toate reprezentatiile din luna Martie de la teatrul condus de Alexandra Uerem afisati numele si prenumele actorilor dar si denumirea pieselor in care au jucat. Ordonati rezultatul crescator dupa pretul biletelor
--1.2 Pentru actorii Adrian Badelina si Eugen Bleont afisati  denumirea tuturor teatrelor in care au jucat in luna Februarie. Ordonati rezultatul alfabetic dupa denumirea orasului in care se afla teatrul
--
--2.1 Pentru fiecare artist afisati numele si prenumele sau, denumirea piesei si numarul total de reprezentatii al piesei respective de la teatrul TBD
--2.2 Pentru fiecare teatru afisatidenumirea si cudul teatrului dar si suma tuturor preturilor biletelor pentru reprezentatiile pieselor in care a jucat Dragos Homer
--
--3.1 Afisati toti actorii (codul, numele si prenumele) care au avut reprezentatii in aceleasi teatre ca si Lucian Istrate
--3.2 Afisati toate tatrele (denumirea, codul) in care s-au jucat doar piesele in care a jucat si actrita Miruna Zaroiu
--
--4.1Cresteti pretul biletului pentru reprezentatia ce are cel mai mic pret adunand la acesta  numarul actorilor ce joaca la piesa respectiva
--4.2Cresteti salariul celui mai prost platit actor, adunand la acesta numarul de reprezentatii pe care l-a avut piesa in care joaca