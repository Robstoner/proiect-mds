import Router from "next/router";
import { Alert, Button, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import WebsiteLayout from "@layouts/WebsiteLayout";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function ContractCreate() {

    const [error, setError] = useState(false);

    const [fields, setFields] = useState({});

    function changeFormFields(event) {
        setFields((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const { data: angajati, error: angajatiError, isLoading: isLoadingAngajati } = useSWR(`/api/angajat/`, fetcher);
    const { data: posturi, error: posturiError, isLoading: isLoadingPosturi } = useSWR(`/api/post/`, fetcher);
    const { data: magazine, error: magazineError, isLoading: isLoadingMagazine } = useSWR(`/api/magazin/`, fetcher);

    function submitContract(event) {
        event.preventDefault();
        
        fetch(`/api/contract/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            const data = await res.json();
            
            if (!res.ok)
                return Promise.reject(data);

            Router.push("/contract");
            setError(true);

            return;
        }).catch(err => {
            setError(false);
        }
        );
    }

    if (isLoadingAngajati || isLoadingMagazine || isLoadingPosturi) return <Preloader/>

    return (
        <WebsiteLayout>
            <Container>
                <Form validated={error}>
                    <Form.Label htmlFor="dataInceput">Introduceti data la care incepe contractul</Form.Label>
                    <Form.Control name="dataInceput" onChange={changeFormFields} required type="date" placeholder="Introduceti data la care incepe contractul" /><br />
                    <Form.Label htmlFor="dataFinal">Introduceti data la care se termina contractul</Form.Label>
                    <Form.Control name="dataFinal" onChange={changeFormFields} required type="date" placeholder="Introduceti data la care se termina contractul" /><br />
                    <Form.Label htmlFor="salariu">Introduceti id-ul angajatului la care apartine contractul</Form.Label>
                    <Form.Control as="select" name="idAngajat" onChange={changeFormFields} placeholder="Introduceti id-ul angajatului la care apartine contractul">
                        <option key="" value={null}>Selectati un angajat</option>
                        {angajati.map(angajat => (
                            <option key={angajat.id} value={angajat.id}>{angajat.id}</option>
                        ), angajatiError)}
                    </Form.Control><br />
                    <Form.Label htmlFor="salariu">Introduceti id-ul postului la care apartine contractul</Form.Label>
                    <Form.Control as="select" name="idPost" onChange={changeFormFields} placeholder="Introduceti id-ul postului la care apartine contractul">
                        <option key="" value={null}>Selectati un Post</option>
                        {posturi.map(post => (
                            <option key={post.id} value={post.id}>{post.id}</option>
                        ), posturiError)}
                    </Form.Control><br />
                    <Form.Label htmlFor="salariu">Introduceti id-ul magazinului la care apartine contractul</Form.Label>
                    <Form.Control as="select" name="idMagazin" onChange={changeFormFields} placeholder="Introduceti id-ul magazinului la care apartine contractul">
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