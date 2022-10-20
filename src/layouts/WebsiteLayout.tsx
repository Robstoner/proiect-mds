import Image from "next/future/image";
import Link from "next/link"
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from "@styles/webLayout.module.scss";
import { forwardRef } from "react";

export default function WebsiteLayout({ children }) {

    return (
        <>
            <Navbar expand="lg" className="py-3">
                <Container>
                    TOP TEXT
                </Container>
            </Navbar >
            {children}
            <Container fluid >
                <Container className="text-center">
                    BOTTOM TEXT
                </Container>
            </Container>
        </>
    )
}