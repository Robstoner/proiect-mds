# Reguli proiect Baze de Date

O franciza poate avea 0 sau mai multe magazine si 0 sau mai multi angajati

Un magazin poate avea 0 sau mai multe raioane si 0 sau mai multi angajati

Un raion poate avea 0 sau mai mult produse si apartine de un magazin

Un post poate fi asignat la 0 sau mai multi angajati

Un produs poate apartine in 0 sau mai multe raioane si poate avea 0 sau 1 oferta aplicata

O oferta se poate aplica unui produs sau niciunuia

Un angajat trebuie sa lucreze la un magazin si sa aiba un post

Cand o oferta expira se adauga la istoric_oferta impreuna cu id ul produsului caruia i s-a aplicat si va fi stearsa din respectivul produs

Cand un angajat isi schimba postul sau locul in care lucreaza va fi adaugat la istoric_angajat impreuna cu id ul postului, id ul magazinului la care a lucrat si perioada in care a lucrat
