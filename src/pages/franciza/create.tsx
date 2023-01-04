import Router, { useRouter } from "next/router";
import { Alert, Button, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";

export default function FrancizaCreate() {

    const [error, setError] = useState();

    const [fields, setFields] = useState({});

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitFranciza(event) {
        event.preventDefault();
        

        fetch(`/api/franciza/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();
            
            if (!res.ok)
                return Promise.reject(data);

            Router.push("/");
            setError(null);

            return;
        }).catch(err => {
            setError(err.message);
        }
        );
    }

    return (
        <WebsiteLayout>
            <Container>
                <Form>
                    <Form.Control name="numeDetinator" onChange={changeFormFields} type="text" placeholder="Introduceti numele detinatorului" /><br />
                    <Form.Control name="locatie" onChange={changeFormFields} type="text" placeholder="Introduceti tara in care opereaza franciza" /><br />
                    <Button variant="primary" type="submit" onClick={submitFranciza}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}