import WebsiteLayout from "@layouts/WebsiteLayout";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import Router from "next/router";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function RaionView() {

    const [columnDefs] = useState([
        { headerName: "Numele raionului", field: "nume", sortable: true, filter: true },
        { headerName: "Tipul raionului", field: "tipRaion", sortable: true, filter: true },
        { headerName: "Magazinul", field: "idMagazin", sortable: true, filter: true },
        { headerName: "Actiuni", field: "actiuni", sortable: false, filter: false, cellRenderer: actionCellRenderer }
    ]);

    const { data, error, isLoading, mutate } = useSWR('/api/raion', fetcher)

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

    function deleteRaion(e, id) {
        e.preventDefault();

        fetch(`/api/raion/${id}`, {
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

    function actionCellRenderer(params) {
        return (<>
            <Button className="btn btn-primary" onClick={() => Router.push(`/raion/${params.data.id}`)}>Edit</Button>
            <Button className="btn btn-danger" onClick={e => deleteRaion(e, params.data.id)}>Delete</Button>
        </>);
    }

    if (isLoading) return <Preloader />

    return (
        <WebsiteLayout>
            <Container>
                <h1>View Raion</h1>
                <Button variant="primary" onClick={() => {
                    Router.push("/raion/create");
                }}>Creeaza un Raion</Button>

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

            </Container>
        </WebsiteLayout>
    )
}