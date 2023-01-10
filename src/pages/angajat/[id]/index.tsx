import Preloader from "@layouts/Preloader";
import WebsiteLayout from "@layouts/WebsiteLayout";
import { angajat } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';

export default function AngajatEdit() {
    const router = useRouter();

    const { id } = router.query;

    const { data, error: dataError, isLoading } = useSWR<angajat>(`/api/angajat/${id}`, fetcher);

    const [error, setError] = useState();

    const [fields, setFields] = useState<angajat>();

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitAngajat(event) {
        event.preventDefault();

        fetch(`/api/angajat/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            router.push("/angajat");
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
                <h1>Edit Angajat</h1>
                <Form>
                    <Form.Control name="nume" defaultValue={fields.nume} onChange={changeFormFields} type="text" placeholder="Introduceti numele angajatului" /><br />
                    <Form.Control name="prenume" defaultValue={fields.prenume} onChange={changeFormFields} type="text" placeholder="Introduceti prenumele angajatului" /><br />
                    <Form.Control name="dataAngajarii" defaultValue={fields.dataAngajarii.toString().slice(0, 10)} onChange={changeFormFields} readOnly type="date" placeholder="Introduceti prima data la care a fost angajat" /><br />

                    <Button variant="primary" type="submit" onClick={submitAngajat}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}