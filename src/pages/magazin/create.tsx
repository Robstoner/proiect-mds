import Router from "next/router";
import { Alert, Button, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function FrancizaCreate() {

    const [error, setError] = useState(false);

    const [fields, setFields] = useState({});

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const { data: francize, error: francizeError, isLoading } = useSWR(`/api/franciza/`, fetcher);

    function submitFranciza(event) {
        event.preventDefault();
        
        fetch(`/api/magazin/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();
            
            if (!res.ok)
                return Promise.reject(data);

            Router.push("/magazin");
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
                    <Form.Control name="adresa" onChange={changeFormFields} type="text" placeholder="Introduceti adresa"  /><br />
                    <Form.Control name="programStart" onChange={changeFormFields} type="time" placeholder="Introduceti ora la care incepe programul magazinului" /><br />
                    <Form.Control name="programFinal" onChange={changeFormFields} type="time" placeholder="Introduceti ora la care se termina programul magazinului" /><br />
                    <Form.Control name="dataDeschiderii" onChange={changeFormFields} type="date" placeholder="Introduceti data la care a fost deschis magazinul" /><br />
                    <Form.Control as="select" defaultValue="" name="idFranciza" onChange={changeFormFields} placeholder="Introduceti id-ul francizei la care apartine magazinul">
                        <option value="">Selectati franciza</option>
                        {francize.map(franciza => (
                            <option key={franciza.id} value={franciza.id}>{franciza.locatie}</option>
                        ), francizeError)}
                    </Form.Control><br />
                    <Button variant="primary" type="submit" onClick={submitFranciza}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}