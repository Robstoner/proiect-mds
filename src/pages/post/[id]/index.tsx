import Preloader from "@layouts/Preloader";
import WebsiteLayout from "@layouts/WebsiteLayout";
import { post } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';

export default function PostEdit() {
    const router = useRouter();

    const { id } = router.query;

    const { data, error: dataError, isLoading } = useSWR<post>(`/api/post/${id}`, fetcher);

    const [error, setError] = useState();

    const [fields, setFields] = useState<post>();

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitPost(event) {
        event.preventDefault();

        fetch(`/api/post/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            router.push("/post");
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
                <h1>Edit Post</h1>
                <Form>
                    <Form.Control name="titlu" defaultValue={fields.titlu} onChange={changeFormFields} type="text" placeholder="Introduceti titlul postului" /><br />
                    <Form.Control name="salariu" defaultValue={fields.salariu} onChange={changeFormFields} type="number" placeholder="Introduceti salariul postului" /><br />
                    <Form.Control name="programStart" defaultValue={fields.programStart} onChange={changeFormFields} type="time" placeholder="Introduceti ora la care incepe programul postului" /><br />
                    <Form.Control name="programFinal" defaultValue={fields.programFinal} onChange={changeFormFields} type="time" placeholder="Introduceti ora la care se termina programul postului" /><br />
                    
                    <Button variant="primary" type="submit" onClick={submitPost}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}