import Preloader from "@layouts/Preloader";
import WebsiteLayout from "@layouts/WebsiteLayout";
import { produs } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';

export default function ProdusEdit() {
    const router = useRouter();

    const { id } = router.query;

    const { data, error: dataError, isLoading } = useSWR<produs>(`/api/produs/${id}`, fetcher);

    const [error, setError] = useState();

    const [fields, setFields] = useState<produs>();

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitProdus(event) {
        event.preventDefault();

        fetch(`/api/produs/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            router.push("/produs");
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
                <h1>Edit Produs</h1>
                <Form>
                    <Form.Label htmlFor="nume">Introduceti numele produsului</Form.Label>
                    <Form.Control name="nume" defaultValue={fields.nume} onChange={changeFormFields} type="text" placeholder="Introduceti numele produsului" /><br />
                    <Form.Label htmlFor="pret">Introduceti pretul produsului</Form.Label>
                    <Form.Control name="pret" defaultValue={fields.pret} onChange={changeFormFields} step=".01" type="number" placeholder="Introduceti pretul produsului" /><br />

                    <Button variant="primary" type="submit" onClick={submitProdus}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}