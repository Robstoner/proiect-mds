import WebsiteLayout from "@layouts/WebsiteLayout";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import Router from "next/router";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function PostView() {

    const [columnDefs] = useState([
        { headerName: "Titlul postului", field: "titlu", sortable: true, filter: true },
        { headerName: "Salariul", field: "salariu", sortable: true, filter: true },
        { headerName: "Inceputul programului", field: "programStart", sortable: true, filter: true },
        { headerName: "Sfarsitul programului", field: "programFinal", sortable: true, filter: true },
        { headerName: "Actiuni", field: "actiuni", sortable: false, filter: false, cellRenderer: actionCellRenderer }
    ]);

    const { data, error, isLoading, mutate } = useSWR('/api/post', fetcher)

    const gridRef = useRef();

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (data) {
            setRowData(data);
        }
    }, [data]);

    const onGridReady = e => {
        e.api.sizeColumnsToFit();
    }

    function deletePost(e, id) {
        e.preventDefault();

        fetch(`/api/post/${id}`, {
            method: "DELETE"
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            mutate();
        }).catch(err => {
            console.log(err);
        });
    }

    const [show, setShow] = useState(false);
    const [id, setId] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function actionCellRenderer(params) {
        return (<>
            <Button className="btn btn-primary" onClick={() => Router.push(`/post/${params.data.id}`)}>Edit</Button>
            <Button className="btn btn-danger" onClick={() => { setId(params.data.id); handleShow(); }}>Delete</Button>
        </>);
    }

    if (isLoading) return <Preloader />

    return (
        <WebsiteLayout>
            <Container>
                <h1>View Post</h1>
                <Button variant="primary" onClick={() => {
                    Router.push("/post/create");
                }}>Creeaza un Post</Button>

                <div
                    className="ag-theme-alpine-dark"
                    style={{ height: '600px' }}
                >
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={onGridReady}
                        animateRows={true}
                        columnDefs={columnDefs}
                        rowData={rowData}
                    ></AgGridReact>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sterge postul {id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Sunteti sigur ca doriti sa stergeti postul cu id-ul {id}?<br/>
                    Acest lucru va seta toate contractele asociate lui ca neavand post.</Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleClose}>
                            Inchide
                        </Button>
                        <Button variant="danger" onClick={(e) => { deletePost(e, id); handleClose(); }}>
                            Sterge
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </WebsiteLayout>
    )
}