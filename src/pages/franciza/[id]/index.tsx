import Preloader from "@layouts/Preloader";
import WebsiteLayout from "@layouts/WebsiteLayout";
import { franciza } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';

export default function FrancizaEdit() {
    const router = useRouter();

    const { id } = router.query;

    const { data, error: dataError, isLoading } = useSWR<franciza>(`/api/franciza/${id}`, fetcher);

    const [error, setError] = useState();

    const [fields, setFields] = useState<franciza>();

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitFranciza(event) {
        event.preventDefault();

        fetch(`/api/franciza/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            router.push("/franciza");
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
                <h1>Edit Franciza {data.numeDetinator}</h1>
                <Form>
                    <Form.Control name="numeDetinator" defaultValue={fields.numeDetinator} onChange={changeFormFields} type="text" placeholder="Introduceti numele detinatorului" /><br />
                    <Form.Control name="locatie" defaultValue={fields.locatie} onChange={changeFormFields} type="text" placeholder="Introduceti tara in care opereaza franciza" /><br />
                    <Button variant="primary" type="submit" onClick={submitFranciza}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}