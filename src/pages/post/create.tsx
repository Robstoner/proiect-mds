import Router from "next/router";
import { Alert, Button, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function PostCreate() {

    const [error, setError] = useState(false);

    const [fields, setFields] = useState({});

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitPost(event) {
        event.preventDefault();
        
        fetch(`/api/post/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();
            
            if (!res.ok)
                return Promise.reject(data);

            Router.push("/post");
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
                    <Form.Label htmlFor="titlu">Introduceti titlul postului</Form.Label>
                    <Form.Control name="titlu" onChange={changeFormFields} type="text" placeholder="Introduceti titlul postului" /><br />
                    <Form.Label htmlFor="descriere">Introduceti descrierea postului</Form.Label>
                    <Form.Control name="salariu" onChange={changeFormFields} type="number" placeholder="Introduceti salariul postului" /><br />
                    <Form.Label htmlFor="programStart">Introduceti ora la care incepe programul postului</Form.Label>
                    <Form.Control name="programStart" onChange={changeFormFields} type="time" placeholder="Introduceti ora la care incepe programul postului" /><br />
                    <Form.Label htmlFor="programFinal">Introduceti ora la care se termina programul postului</Form.Label>
                    <Form.Control name="programFinal" onChange={changeFormFields} type="time" placeholder="Introduceti ora la care se termina programul postului" /><br />
                    
                    <Button variant="primary" type="submit" onClick={submitPost}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}