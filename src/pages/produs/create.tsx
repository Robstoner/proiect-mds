import Router from "next/router";
import { Alert, Button, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function ProdusCreate() {

    const [error, setError] = useState(false);

    const [fields, setFields] = useState({});

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitProdus(event) {
        event.preventDefault();
        
        fetch(`/api/produs/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();
            
            if (!res.ok)
                return Promise.reject(data);

            Router.push("/produs");
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
                    <Form.Label htmlFor="nume">Introduceti numele produsului</Form.Label>
                    <Form.Control name="nume" onChange={changeFormFields} type="text" placeholder="Introduceti numele produsului" /><br />
                    <Form.Label htmlFor="pret">Introduceti pretul produsului</Form.Label>
                    <Form.Control name="pret" onChange={changeFormFields} step=".01" type="number" placeholder="Introduceti pretul produsului" /><br />

                    <Button variant="primary" type="submit" onClick={submitProdus}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}