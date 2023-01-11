import Router from "next/router";
import { Alert, Button, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function AngajatCreate() {

    const [error, setError] = useState(false);

    const [fields, setFields] = useState({});

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitAngajat(event) {
        event.preventDefault();
        
        fetch(`/api/angajat/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();
            
            if (!res.ok)
                return Promise.reject(data);

            Router.push("/angajat");
            setError(true);

            return;
        }).catch(err => {
            setError(false);
        }
        );
    }

    return (
        <WebsiteLayout>
            <Container>
                <Form validated={error}>
                    <Form.Label htmlFor="nume">Introduceti numele angajatului</Form.Label>
                    <Form.Control name="nume" onChange={changeFormFields} type="text" placeholder="Introduceti numele angajatului"  /><br />
                    <Form.Label htmlFor="prenume">Introduceti prenumele angajatului</Form.Label>
                    <Form.Control name="prenume" onChange={changeFormFields} type="text" placeholder="Introduceti prenumele angajatului" /><br />
                    <Form.Label htmlFor="dataAngajarii">Introduceti prima data la care a fost angajat</Form.Label>
                    <Form.Control name="dataAngajarii" onChange={changeFormFields} type="date" placeholder="Introduceti prima data la care a fost angajat" /><br />
                    <Button variant="primary" type="submit" onClick={submitAngajat}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}