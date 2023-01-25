--1.1 Pentru toate reprezentatiile din luna Martie de la teatrul
--condus de Alexandra Urem afisati numele si prenumele
--actorilor dar si denumirea pieselor in care au jucat.
--Ordonati rezultatul crescator dupa pretul biletelor
!!! am pus urem in loc de uerem ca asa pusesem in insert-uri (la examen nu vor fi astfel de erori, promit:)) )\
!!!! daca nu stiti sa faceti exercitiu asta singur va sparg

select ac.nume, ac.prenume, pi.denumire
from reprezentatie rep
join teatru te on rep.cod_teatru = te.cod_teatru
join piesa pi on rep.cod_piesa = pi.cod_piesa
join actor ac on pi.cod_piesa = ac.cod_piesa
where to_char(data_spectacol ,'mm') = '03'
  and upper(prenume_director||nume_director) = 'ALEXANDRAUREM'
order by pret_bilet;

--1.2 Pentru actorii Adrian Badelina sau Eugen Bleont afisati  denumirea tuturor
--teatrelor in care au jucat in luna Februarie.
--Ordonati rezultatul alfabetic dupa denumirea orasului in care se afla teatrul

select distinct te.nume, oras
from reprezentatie rep
join teatru te on rep.cod_teatru = te.cod_teatru
join piesa pi on rep.cod_piesa = pi.cod_piesa
join actor ac on pi.cod_piesa = ac.cod_piesa
where to_char(data_spectacol ,'mm') = '02'
  and upper(ac.prenume||ac.nume) in ('ADRIANBADELINA','EUGENBLONT')
order by oras;

--2.1 Pentru fiecare artist afisati numele si prenumele sau, denumirea piesei si
--numarul total de reprezentatii al piesei respective de la teatrul TBD
!! pentru fiecare artist => grop by artist (nume/prenume)
!! vrem numele piesei => punem in select si denumirea piesei
!! numarul de reprezentatii => count(reprezentatii)
!! avem group by deci luam tot ce avem in select si nu e folosit in functie si grupam dupa coloanele respective (nume, prenume, nume_piesa)
!! vrem doar reprezentatiile din tbd atunci mai adaugam un where
!!! coloanele folosite in where nu trebuie puse neaparat in group by (le punem doar daca coloanele respective sunt puse si in select)
select ac.nume, ac.prenume, pi.denumire, count(rep.data_spectacol)
from actor ac
join piesa pi on pi.cod_piesa = ac.cod_piesa
join reprezentatie rep on rep.cod_piesa = pi.cod_piesa
join teatru te on rep.cod_teatru = te.cod_teatru
where upper(te.nume) = 'TBD'
group by (ac.nume, ac.prenume, pi.denumire);

--2.2 Pentru fiecare teatru afisati denumirea si cudul teatrului dar si suma
--tuturor preturilor biletelor pentru reprezentatiile pieselor in care a
--jucat Dragos Homer
!! pentru fiecare teatru => grou by (teatru)
!! suma tuturor biletelor => sum
!! doar piesele in care a jucat dragos => where

select te.nume, te.cod_teatru, sum(rep.pret_bilet)
from teatru te
join reprezentatie rep on rep.cod_teatru = te.cod_teatru
join actor ac on rep.cod_piesa = ac.cod_piesa
where upper(ac.prenume||ac.nume) = 'DRAGOSHOMER'
group by (te.nume, te.cod_teatru);


--3.1 Afisati toti actorii (codul, numele si prenumele) care au avut reprezentatii
--in aceleasi teatre ca si Lucian Istrate
!!a) care sunt teatrele in care a jucat lucian
!!b) care sunt actorii care au jucat in teatrele din a)
with te_lucian  as (
  --teatrele in care a jucat lucian
  select distinct cod_teatru
  from reprezentatie rep
  join actor ac on rep.cod_piesa = ac.cod_piesa
  where upper(ac.prenume||ac.nume)='LUCIANISTRATE'
  )
select distinct ac.nume, ac.prenume, ac.cod_actor
from actor ac
join reprezentatie rep on rep.cod_piesa=ac.cod_piesa
where rep.cod_teatru in (select cod_teatru
                         from te_lucian);

--3.2 Afisati toate tatrele (denumirea, codul) in care s-au jucat doar piesele
--in care a jucat si actrita Miruna Zaroiu
!! multimea A = {piese miruna}
!! multimea B = {piesele teatrului afisat}
!! doar piese cu miruna  => B / A = {}
!! ex:
!!piese_miruna = {a,b,c}
!!teatru_1 = {a,b}
!!teatru_2 = {a,b,c,d}
!!teatru_3 = {a,b,c}
!!teatru 4 = {d}
!!se vor afisa teatru_1 si teatru_3


select cod_teatru, nume
from teatru teatru_afis
where not exists (-- not exists => multimea rezultat este goala (subquery-ul nu are niciun rand)
  select cod_piesa --multimea pieselor din teatrul afisat
  from reprezentatie rep
  where rep.cod_teatru = teatru_afis.cod_teatru
  MINUS
  select distinct cod_piesa --piesele in care a jucat mirina
  from actor
  where upper(prenume||nume)='MIRUNAZAROIU'
)


--4.1Cresteti pretul biletului pentru reprezentatia ce are cel mai mic pret
--adunand la acesta  numarul actorilor ce joaca la piesa respectiva
!! a) update + nuamrul actorilor din piesa reprezentatie updatate
!! b) pretul reprezentatiei schimbate = cel mai mic pret

update reprezentatie rep_schimbata
set pret_bilet = pret_bilet +
        (select count(cod_actor) -- numarul actorilor care au jucat in piesa
         from actor
         where cod_piesa=rep_schimbata.cod_piesa)
where pret_bilet = (select min(pret_bilet) --cel mai mic pret
                    from reprezentatie);

--4.2Cresteti salariul celui mai prost platit actor, adunand la acesta numarul
--de reprezentatii pe care l-a avut piesa in care joaca

update actor ac_promovat
set salariu = salariu + (select count(*) --reprezentatiile piesei
                         from reprezentatie
                         where cod_piesa = ac_promovat.cod_piesa)
where salariu = (select min(salariu) --salariul minim
                 from actor);
!!nu ar trebui sa vedeti nicio modificare pt ca piesa saracului actor nu a avut nicio reprezentatie