--1
select f.nume, f.website, a.nume, a.pret
from formatie f
join album a on f.id_formatie = a.id_formatie
join castiga c on c.id_formatie = a.id_formatie
join premiu p on c.id_premiu = p.id_premiu
where a.pret > 30 
    and p.frecventa like 'Anual';

--2  idk how to do
select a.id_album, a.nume
from album a
join castiga c on c.id_formatie = a.id_formatie
where to_date(a.data_l, 'dd-mon-yy') < to_date(c.data_d, 'dd-mon-yy')
order by a.data_l desc;

select a.id_album, a.nume
    from album a
    where to_date(a.data_l, 'dd-mon-yy') < to_date(c.data_d, 'dd-mon-yy')
        and c.id_formatie = a.id_formatie
        and rownum = 1
    order by a.data_l desc;

select f.nume, c.loc_ocupat
from castiga c
left join formatie f on c.id_formatie = f.id_formatie;

--------  gresit
select f.nume, c.loc_ocupat, a.nume, a.pret
from castiga c
left join formatie f on c.id_formatie = f.id_formatie
left join album a on f.id_formatie = a.id_formatie
where to_date(a.data_l, 'dd-mon-yy') < to_date(c.data_d, 'dd-mon-yy');
---------

--3
select f.nume, f.data_lansare, (select count(a.nume)
                            from album a
                            where a.id_formatie = f.id_formatie)
from formatie f
join castiga c on c.id_formatie = f.id_formatie
join premiu p on p.id_premiu = c.id_premiu
where p.frecventa like 'Bianual';


--4
select f.id_formatie, f.nume, f.data_lansare, f.data_retragere, f.website, f.tara_prov
                            from formatie f
                            join album a on f.id_formatie = a.id_formatie
                            where a.gen like 'Pop'
                            and f.id_formatie not in (select id_formatie
                                            from castiga);

select id_formatie
from castiga;

drop view formatii_pop;

-----------
create view formatii_pop as (select f.id_formatie idf, f.nume nume_formatie, f.data_lansare, f.data_retragere, f.website, f.tara_prov, a.id_album, a.nume, a.gen, a.data_l, a.pret
                            from formatie f
                            join album a on f.id_formatie = a.id_formatie
                            where a.gen like 'Pop'
                            and f.id_formatie not in (select id_formatie
                                            from castiga));   

insert into formatii_pop (id_album, nume, gen, data_l, pret)
values(100, 'album', 'Pop', '20-JAN-90', 25);
commit;
--------
