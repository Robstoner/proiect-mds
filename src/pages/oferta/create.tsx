import Router from "next/router";
import { Alert, Button, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function OfertaCreate() {

    const [error, setError] = useState(false);

    const [fields, setFields] = useState({});

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitOferta(event) {
        event.preventDefault();
        
        fetch(`/api/oferta/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();
            
            if (!res.ok)
                return Promise.reject(data);

            Router.push("/oferta");
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
                    <Form.Label htmlFor="nume">Introduceti numele ofertei</Form.Label>
                    <Form.Control name="nume" onChange={changeFormFields} type="text" placeholder="Introduceti numele ofertei" /><br />
                    <Form.Label htmlFor="dataInceput">Introduceti data la care incepe oferta</Form.Label>
                    <Form.Control name="dataInceput" onChange={changeFormFields} type="date" placeholder="Introduceti data la care incepe oferta" /><br />
                    <Form.Label htmlFor="dataFinal">Introduceti data la care se termina oferta</Form.Label>
                    <Form.Control name="dataFinal" onChange={changeFormFields} type="date" placeholder="Introduceti data la care se termina oferta" /><br />
                    <Form.Label htmlFor="procentajReducere">Introduceti procentajul scazut din produs, numar intre 0 si 1</Form.Label>
                    <Form.Control name="procentajReducere" onChange={changeFormFields} type="number" step="0.1" min={0} max={1} placeholder="Introduceti procentajul scazut din produs" /><br />
                    
                    <Button variant="primary" type="submit" onClick={submitOferta}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}