import Preloader from "@layouts/Preloader";
import WebsiteLayout from "@layouts/WebsiteLayout";
import { contract } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';

export default function ContractEdit() {
    const router = useRouter();

    const { id } = router.query;

    const { data, error: dataError, isLoading } = useSWR<contract>(`/api/contract/${id}`, fetcher);

    const { data: magazine, error: magazineError, isLoading: isLoadingMagazine } = useSWR(`/api/magazin/`, fetcher);
    const { data: posturi, error: posturiError, isLoading: isLoadingPosturi } = useSWR(`/api/post/`, fetcher);
    const { data: angajati, error: angajatiError, isLoading: isLoadingAngajati } = useSWR(`/api/angajat/`, fetcher);

    const [error, setError] = useState();

    const [fields, setFields] = useState<contract>();

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function submitContract(event) {
        event.preventDefault();

        fetch(`/api/contract/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            router.push("/contract");
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

    if (isLoading || !fields || isLoadingMagazine || isLoadingAngajati || isLoadingPosturi) return <Preloader />

    return (
        <WebsiteLayout>
            <Container>
                <h1>Edit Contract</h1>
                <Form>
                    <Form.Control name="dataInceput" defaultValue={fields.dataInceput.toString().slice(0, 10)} onChange={changeFormFields} type="date" placeholder="Introduceti data la care incepe contractul" /><br />
                    <Form.Control name="dataFinal" defaultValue={fields.dataFinal.toString().slice(0, 10)} onChange={changeFormFields} type="date" placeholder="Introduceti data la care se termina contractul" /><br />
                    <Form.Control as="select" defaultValue={fields.idAngajat} name="idAngajat" onChange={changeFormFields} placeholder="Introduceti id-ul angajatului la care apartine contractul">
                        <option key="" value={null}>Selectati un angajat</option>
                        {angajati.map(angajat => (
                            <option key={angajat.id} value={angajat.id}>{angajat.id}</option>
                        ), angajatiError)}
                    </Form.Control><br />
                    <Form.Control as="select" defaultValue={fields.idPost} name="idPost" onChange={changeFormFields} placeholder="Introduceti id-ul postului la care apartine contractul">
                        <option key="" value={null}>Selectati un Post</option>
                        {posturi.map(post => (
                            <option key={post.id} value={post.id}>{post.id}</option>
                        ), posturiError)}
                    </Form.Control><br />
                    <Form.Control as="select" defaultValue={fields.idMagazin} name="idMagazin" onChange={changeFormFields} placeholder="Introduceti id-ul magazinului la care apartine contractul">
                        <option key="" value={null}>Selectati un Magazin</option>
                        {magazine.map(magazin => (
                            <option key={magazin.id} value={magazin.id}>{magazin.id}</option>
                        ), magazineError)}
                    </Form.Control><br />
                    <Button variant="primary" type="submit" onClick={submitContract}>Submit</Button>
                </Form>
            </Container>
        </WebsiteLayout>
    )
}