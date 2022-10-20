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
                    
                </Container>
            </Navbar >
            {children}
            <Container fluid className={styles.footer}>
                <Container className="text-center">
                    
                </Container>
            </Container>
            <Container className={styles.copyright}>
                ©2022 Copyright - Ghlass. All rights reserved.
            </Container>
        </>

    )
}