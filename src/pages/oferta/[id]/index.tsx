import Preloader from "@layouts/Preloader";
import WebsiteLayout from "@layouts/WebsiteLayout";
import { oferta } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';

export default function OfertaEdit() {
    const router = useRouter();

    const { id } = router.query;

    const { data, error: dataError, isLoading } = useSWR<oferta>(`/api/oferta/${id}`, fetcher);

    const [error, setError] = useState();

    const [fields, setFields] = useState<oferta>();

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitOferta(event) {
        event.preventDefault();

        fetch(`/api/oferta/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            router.push("/oferta");
            setError(null);

            return;
        }).catch(err => {
            setError(err.message);
        });
    }

    useEffect(() => {
        if (data) {
            setFields(data);
        }
    }, [data]);

    if (isLoading || !fields) return <Preloader />

    return (
        <WebsiteLayout>
            <Container>
                <h1>Edit Oferta</h1>
                <Form>
                    <Form.Label htmlFor="nume">Introduceti numele ofertei</Form.Label>
                    <Form.Control name="nume" defaultValue={fields.nume} onChange={changeFormFields} type="text" placeholder="Introduceti numele ofertei" /><br />
                    <Form.Label htmlFor="dataInceput">Introduceti data la care incepe oferta</Form.Label>
                    <Form.Control name="dataInceput" defaultValue={fields.dataInceput.toString().slice(0, 10)} onChange={changeFormFields} type="date" placeholder="Introduceti data la care incepe oferta" /><br />
                    <Form.Label htmlFor="dataFinal">Introduceti data la care se termina oferta</Form.Label>
                    <Form.Control name="dataFinal" defaultValue={fields.dataFinal.toString().slice(0, 10)} onChange={changeFormFields} type="date" placeholder="Introduceti data la care se termina oferta" /><br />
                    <Form.Label htmlFor="procentajReducere">Introduceti procentajul scazut din produs</Form.Label>
                    <Form.Control name="procentajReducere" defaultValue={fields.procentajReducere} onChange={changeFormFields} type="number" placeholder="Introduceti procentajul scazut din produs" /><br />
                    
                    <Button variant="primary" type="submit" onClick={submitOferta}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}