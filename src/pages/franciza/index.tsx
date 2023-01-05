import WebsiteLayout from "@layouts/WebsiteLayout";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import Router from "next/router";

export default function FrancizaView() {

    const [columnDefs] = useState([
        { headerName: "Nume detinator", field: "numeDetinator", sortable: true, filter: true },
        { headerName: "Locatie", field: "locatie", sortable: true, filter: true },
        { headerName: "Actiuni", field: "actiuni", sortable: false, filter: false, cellRenderer: actionCellRenderer }
    ]);

    const gridRef = useRef();

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch("/api/franciza").then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            setRowData(data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const onGridReady = e => {
        e.api.sizeColumnsToFit();
    }

    function deleteFranciza(e, id) {
        e.preventDefault();

        fetch(`/api/franciza/${id}`, {
            method: "DELETE"
        }).then(async res => {
            const data = await res.json();

            if (!res.ok)
                return Promise.reject(data);

            
        }).catch(err => {
            console.log(err);
        });
    }

    function actionCellRenderer(params) {
        return (<>
            <Button className="btn btn-primary" onClick={() => Router.push(`/franciza/${params.data.id}`)}>Edit</Button>
            <Button className="btn btn-danger" onClick={e => deleteFranciza(e, params.data.id)}>Delete</Button>
        </>);
    }

    return (
        <WebsiteLayout>
            <Container>
                <h1>View Franciza</h1>
                <Button variant="primary" onClick={() => {
                    Router.push("/franciza/create");
                }}>Creeaza o franciza</Button>

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