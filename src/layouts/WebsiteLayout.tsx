import Image from "next/future/image";
import Link from "next/link"
import { Container, Navbar, Nav, NavDropdown, SSRProvider } from "react-bootstrap";
import styles from "@styles/webLayout.module.scss";
import { forwardRef } from "react";

export default function WebsiteLayout({ children }) {

    return (
        <>
            <SSRProvider>
                <Navbar expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Lant de magazine</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/franciza">Franciza</Nav.Link>
                                <Nav.Link href="/magazin">Magazin</Nav.Link>
                                <Nav.Link href="/raion">Raion</Nav.Link>
                                <Nav.Link href="/produs">Produs</Nav.Link>
                                <Nav.Link href="/oferta">Oferta</Nav.Link>
                                <Nav.Link href="/angajat">Angajat</Nav.Link>
                                <Nav.Link href="/post">Post</Nav.Link>
                                <Nav.Link href="/contract">Contract</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar >
                {children}
                <Container fluid >
                    <Container className="text-center">
                        <hr />
                    </Container>
                </Container>
            </SSRProvider>
        </>
    )
}