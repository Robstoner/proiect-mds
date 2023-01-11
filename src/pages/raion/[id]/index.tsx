import Preloader from "@layouts/Preloader";
import WebsiteLayout from "@layouts/WebsiteLayout";
import { magazin, raion } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';

export default function RaionEdit() {
    const router = useRouter();

    const { id } = router.query;

    const { data, error: dataError, isLoading } = useSWR<raion>(`/api/raion/${id}`, fetcher);

    const { data: magazine, error: magazineError, isLoading: isLoadingMagazine } = useSWR(`/api/magazin/`, fetcher);

    const [error, setError] = useState();

    const [fields, setFields] = useState<raion>();

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitRaion(event) {
        event.preventDefault();

        fetch(`/api/raion/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            router.push("/raion");
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

    if (isLoading || !fields || isLoadingMagazine) return <Preloader />

    return (
        <WebsiteLayout>
            <Container>
                <h1>Edit Magazin</h1>
                <Form>
                    <Form.Label htmlFor="nume">Introduceti numele raionului</Form.Label>
                    <Form.Control name="nume" defaultValue={fields.nume} onChange={changeFormFields} type="text" placeholder="Introduceti numele raionului" /><br />
                    <Form.Label htmlFor="tipRaion">Introduceti tipul raionului</Form.Label>
                    <Form.Control name="tipRaion" defaultValue={fields.tipRaion} onChange={changeFormFields} type="text" placeholder="Introduceti tipul raionului" /><br />
                    <Form.Label htmlFor="idMagazin">Introduceti id-ul magazinului la care apartine raionul</Form.Label>
                    <Form.Control as="select" defaultValue={fields.idMagazin} name="idMagazin" onChange={changeFormFields} placeholder="Introduceti id-ul magazinului la care apartine raionul">
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