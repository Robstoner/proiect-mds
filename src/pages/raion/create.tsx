import Router from "next/router";
import { Alert, Button, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function RaionCreate() {

    const [error, setError] = useState(false);

    const [fields, setFields] = useState({});

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const { data: magazine, error: magazineError, isLoading } = useSWR(`/api/magazin/`, fetcher);

    function submitRaion(event) {
        event.preventDefault();
        
        fetch(`/api/raion/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();
            
            if (!res.ok)
                return Promise.reject(data);

            Router.push("/raion");
            setError(true);

            return;
        }).catch(err => {
            setError(false);
        }
        );
    }

    if (isLoading) return <Preloader/>

    return (
        <WebsiteLayout>
            <Container>
                <Form validated={error}>
                <Form.Label htmlFor="nume">Introduceti numele raionului</Form.Label>
                    <Form.Control name="nume" onChange={changeFormFields} type="text" placeholder="Introduceti numele raionului" /><br />
                    <Form.Label htmlFor="tipRaion">Introduceti tipul raionului</Form.Label>
                    <Form.Control name="tipRaion" onChange={changeFormFields} type="text" placeholder="Introduceti tipul raionului" /><br />
                    <Form.Label htmlFor="idMagazin">Introduceti id-ul magazinului la care apartine raionul</Form.Label>
                    <Form.Control as="select" name="idMagazin" onChange={changeFormFields} placeholder="Introduceti id-ul magazinului la care apartine raionul">
                        {magazine.map(magazin => (
                            <option key={magazin.id} value={magazin.id}>{magazin.adresa}</option>
                        ), magazineError)}
                    </Form.Control><br />
                    <Button variant="primary" type="submit" onClick={submitRaion}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}