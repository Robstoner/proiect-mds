--1
select p.nume, p.prenume, s.nume, s.prenume
from profesor p
join student s on to_char(p.data_nasterii, 'mm') = to_char(s.data_nasterii, 'mm')
join note n on n.cod_student = s.cod_student
join curs c on c.cod_curs = n.cod_curs;


--2
select cod_curs
from note
where cod_student = 1
    and nota < 5;

select (s.nume || ' ' || s.prenume) stud
from student s
join note n on s.cod_student = n.cod_student
where n.nota < 5
group by ((s.nume || ' ' || s.prenume));


---------
select  distinct s.nume, s.prenume
from student s
join note n on s.cod_student = n.cod_student
where n.nota < 5
    and s.cod_student <> 1
    and n.cod_curs in (select cod_curs
                from note
                where cod_student = 1
                and nota < 5);
---------

--3
select n.cod_curs, count(n.cod_student)
from note n
where nota >= 5
    and c.cod_curs = n.cod_curs
group by (n.cod_curs);


------
select p.nume, c.denumire, c.cod_curs, (select count(n.cod_student)
                        from note n
                        where nota >= 5
                        and c.cod_curs = n.cod_curs)
from profesor p
join curs c on p.cod_profesor = c.cod_profesor;
--------

--4
create table credite (
cod_student number(4, 0) primary key,
cnp number not null,
nr_credite number ,
foreign key (cod_student) references student(cod_student)
);