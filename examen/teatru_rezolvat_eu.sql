--1.1
--reprezentatii nume, prenume actori, denumirea pieselor
--luna martie
--din treatrul condus de alexandra uerem
--ordonat crescator dupa pretul biletelor

select p.denumire, a.nume, a.prenume
from reprezentatie r
join piesa p on r.cod_piesa = p.cod_piesa
join actor a on p.cod_piesa = a.cod_piesa
where upper(to_char(r.data_spectacol, 'mon')) like 'MAR' 
    and r.cod_teatru = (select cod_teatru
                        from teatru
                        where upper(prenume_director) like 'ALEXANDRA'
                        and upper(nume_director) like 'UREM')
order by r.pret_bilet asc;

--1.2
--actori adrian badelina, eugen blont
--denumirea teatrelor in care au jucat in feb
--ordonat alfabetic dupa denumirea orasului

select distinct t.nume
from actor a
join reprezentatie r on a.cod_piesa = r.cod_piesa
join teatru t on t.cod_teatru = r.cod_teatru
where (upper(a.nume) like 'BADELINA'
    and upper(a.prenume) like 'ADRIAN')
    or (upper(a.nume) like 'BLONT'
    and upper(a.prenume) like 'EUGEN')
    and upper(to_char(r.data_spectacol, 'mon')) like 'FEB';
 
--2.1   
--nume prenume artist
--denumire piesa
--nr de reprezentatii a piesei la TBD

select count(cod_piesa)
from reprezentatie r
join teatru t on r.cod_teatru = t.cod_teatru
where upper(t.nume) like 'TBD';

--THIS ONE WORKS
select p.nume_scriitor, p.prenume_scriitor, p.denumire, (select count(cod_piesa)
                                from reprezentatie r
                                join teatru t on r.cod_teatru = t.cod_teatru
                                where upper(t.nume) like 'TBD'
                                    and r.cod_piesa = p.cod_piesa) nr_la_TBD
from piesa p;

--2.2
--denumirea si codul teatrului
--suma preturilor biletelor pt repr cu dragos homer

select sum(r.pret_bilet)
from reprezentatie r
join piesa p on p.cod_piesa = r.cod_piesa
join actor a on a.cod_piesa = p.cod_piesa
where upper(a.nume) like 'HOMER'
    and upper(a.prenume) like 'DRAGOS';

--THIS ONE WORKS
select t.nume, t.cod_teatru, nvl((select sum(r.pret_bilet)
                                from reprezentatie r
                                join piesa p on p.cod_piesa = r.cod_piesa
                                join actor a on a.cod_piesa = p.cod_piesa
                                where upper(a.nume) like 'HOMER'
                                    and upper(a.prenume) like 'DRAGOS'
                                    and r.cod_teatru = t.cod_teatru), 0) suma_pret_homer
from teatru t;

--3.1
--actorii cod, nume, prenume
--reprezentatii la fel ca lucian istrate

select distinct r.cod_teatru
from reprezentatie r
join actor a on r.cod_piesa = a.cod_piesa
where upper(a.nume) like 'ISTRATE'
    and upper(a.prenume) like 'LUCIAN';

--THIS ONE WORKS
select distinct a.cod_actor, a.nume, a.prenume
from actor a
join reprezentatie r on a.cod_piesa = r.cod_piesa
where r.cod_teatru in (select distinct r.cod_teatru
                    from reprezentatie r
                    join actor a on r.cod_piesa = a.cod_piesa
                    where upper(a.nume) like 'ISTRATE'
                        and upper(a.prenume) like 'LUCIAN');
                        
--3.2
--denumire, cod teatru
--s au jucat DOAR piesele in care a jucat miruna zaroiu

select cod_teatru
from teatru
minus
select distinct r.cod_teatru
from reprezentatie r
join actor a using(cod_piesa)
where upper(a.nume) like 'ZAROIU'
    and upper(a.prenume) like 'MIRUNA';
    
select distinct cod_piesa
from reprezentatie r
join actor a using(cod_piesa)
where upper(a.nume) like 'ZAROIU'
    and upper(a.prenume) like 'MIRUNA';
    
select distinct t.nume, cod_teatru
from reprezentatie
join teatru t using (cod_teatru)
where cod_teatru not in (select cod_teatru
                    from teatru
                    minus
                    select distinct r.cod_teatru
                    from reprezentatie r
                    join actor a using(cod_piesa)
                    where upper(a.nume) like 'ZAROIU'
                        and upper(a.prenume) like 'MIRUNA');
                 
                       
--THIS ONE WORKS
select distinct r.cod_teatru
from reprezentatie r
where not exists (select distinct re.cod_piesa
        from reprezentatie re
        where re.cod_teatru = r.cod_teatru
        minus
        select distinct cod_piesa
        from reprezentatie r
        join actor a using(cod_piesa)
        where upper(a.nume) like 'ZAROIU'
            and upper(a.prenume) like 'MIRUNA');

--4.1

update reprezentatie r
set pret_bilet = pret_bilet + (select count(cod_actor)
                                from actor a
                                where a.cod_piesa = r.cod_piesa)
where pret_bilet = (select min(pret_bilet)
                    from reprezentatie);
                    
rollback;


--4.2

update actor a
set salariu = salariu + (select count(r.cod_piesa)
                        from reprezentatie r
                        where r.cod_piesa = a.cod_piesa)
where salariu = (select min(salariu)
                from actor);