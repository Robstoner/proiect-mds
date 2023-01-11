import WebsiteLayout from "@layouts/WebsiteLayout";
import { Container, ListGroup } from "react-bootstrap";

export default function Home() {

  return (
    <WebsiteLayout>
      <Container>
        <h1>Proiect baze de date</h1>
        <h2>Proiect realizat de: Schmidt Robert Eduard</h2>
        <p>Un lanț de magazine este o grupare de magazine în care mai multe locații împărtășesc un brand, un management central și practici comerciale standardizate. Acesta poate funcționa pe modelul francizelor, cel prezentat în proiectul meu, în care brand-ul își licențiază imaginea unor investitori, care mai apoi deschid magazine folosind acel brand. Fiecare investitor are o franciza, iar francizele au magazine în care vând produse și lucrează angajați.
          <br /><br />
          Prin baza de date proiectata de mine se va ține evidența:
        </p>
        <ul>
          <li>Francizelor</li>
          <li>Magazinelor din diferitele francize</li>
          <li>Angajaților și posturilor pe care le ocupă</li>
          <li>Raioanelor și produselor vândute in magazine</li>
          <li>Ofertelor care se aplica produselor</li>
        </ul>

      </Container>
    </WebsiteLayout>
  )
}