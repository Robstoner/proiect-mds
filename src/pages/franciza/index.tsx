import WebsiteLayout from "@layouts/WebsiteLayout";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import  Router from "next/router";

export default function FrancizaView() {

    const [columnDefs] = useState([
        { headerName: "Nume detinator", field: "numeDetinator", sortable: true, filter: true },
        { headerName: "Locatie", field: "locatie", sortable: true, filter: true },
        { headerName: "Actiuni", field: "actiuni", sortable: false, filter: false, cellRenderer: "actiuniRenderer" }
    ]);

    const [defaultColDef] = useState({
        sizeColumnsToFit: true,

    });

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
                        defaultColDef={defaultColDef}

                        ref={gridRef}
                        onGridReady={onGridReady}

                        columnDefs={columnDefs}
                        rowData={rowData}
                    ></AgGridReact>
                </div>

            </Container>
        </WebsiteLayout>
    )
}