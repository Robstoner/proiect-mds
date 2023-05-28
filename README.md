# Proiect Metode Dezvoltare Software - 2023

## Echipa
- Schmidt Robert
- Belu Mihai

## Descriere
Proiectul consta intr-o aplicatie web pentru gestiunea unei francize de magazine. Aplicatia va permite gestionarea stocului, a angajatilor si a magazinelor. 

## Tehnologii folosite

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [NextJS](https://nextjs.org/)
- [MySQL](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)

## Baza de date

Pentru a rula proiectul, trebuie sa aveti instalat MySQL si sa creati o baza de date cu numele `mds`. In folderul `prisma` se afla fisierul `schema.prisma` care contine structura bazei de date. Pentru a crea tabelele, rulati comanda `npx prisma migrate deploy` in folderul de baza al proiectului.

## Rulare cu Docker

Instalati Docker Desktop de [aici](https://www.docker.com/products/docker-desktop).

In folderul proiectului rulati comenzile:
```bash
docker build -t mds .
docker run -p 3000:3000 mds
```