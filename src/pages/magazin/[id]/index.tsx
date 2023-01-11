import Preloader from "@layouts/Preloader";
import WebsiteLayout from "@layouts/WebsiteLayout";
import { magazin } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';

export default function MagazinEdit() {
    const router = useRouter();

    const { id } = router.query;

    const { data, error: dataError, isLoading } = useSWR<magazin>(`/api/magazin/${id}`, fetcher);

    const { data: francize, error: francizeError, isLoading: isLoadingFrancize } = useSWR(`/api/franciza/`, fetcher);

    const [error, setError] = useState();

    const [fields, setFields] = useState<magazin>();

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitMagazin(event) {
        event.preventDefault();

        fetch(`/api/magazin/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            router.push("/magazin");
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

    if (isLoading || !fields || isLoadingFrancize) return <Preloader />

    return (
        <WebsiteLayout>
            <Container>
                <h1>Edit Magazin</h1>
                <Form>
                    <Form.Label htmlFor="adresa">Introduceti adresa</Form.Label>
                    <Form.Control name="adresa" defaultValue={fields.adresa} onChange={changeFormFields} type="text" placeholder="Introduceti adresa" /><br />
                    <Form.Label htmlFor="programStart">Introduceti ora la care incepe programul magazinului</Form.Label>
                    <Form.Control name="programStart" defaultValue={fields.programStart} onChange={changeFormFields} type="time" placeholder="Introduceti ora la care incepe programul magazinului" /><br />
                    <Form.Label htmlFor="programFinal">Introduceti ora la care se termina programul magazinului</Form.Label>
                    <Form.Control name="programFinal" defaultValue={fields.programFinal} onChange={changeFormFields} type="time" placeholder="Introduceti ora la care se termina programul magazinului" /><br />
                    <Form.Label htmlFor="dataDeschiderii">Introduceti data la care a fost deschis magazinul</Form.Label>
                    <Form.Control name="dataDeschiderii" defaultValue={fields.dataDeschiderii.toString().slice(0, 10)} onChange={changeFormFields} readOnly type="date" placeholder="Introduceti data la care a fost deschis magazinul" /><br />
                    <Form.Label htmlFor="idFranciza">Introduceti id-ul francizei la care apartine magazinul</Form.Label>
                    <Form.Control as="select" defaultValue={fields.idFranciza} name="idFranciza" onChange={changeFormFields} placeholder="Introduceti id-ul francizei la care apartine magazinul">
                        {francize.map(franciza => (
                            <option key={franciza.id} value={franciza.id}>{franciza.numeDetinator}</option>
                        ), francizeError)}
                    </Form.Control><br />
                    <Button variant="primary" type="submit" onClick={submitMagazin}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}