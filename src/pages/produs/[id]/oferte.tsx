import WebsiteLayout from "@layouts/WebsiteLayout";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import Router, { useRouter } from "next/router";
import fetcher from "src/lib/fetcher";
import useSWR from 'swr';
import Preloader from "@layouts/Preloader";

export default function ProdusView() {
    const router = useRouter();

    const { id } = router.query;

    const [columnDefs] = useState([
        { headerName: "Numele produsului", field: "produs", sortable: true, filter: true },
        { headerName: "Pretul produsului", field: "pret", valueFormatter: params => params.data.pret.toFixed(2), sortable: true, filter: true },
        { headerName: "ID-ul ofertei", field: "idOferta", sortable: true, filter: true },
        { headerName: "Numele ofertei", field: "oferta", sortable: true, filter: true },
        { headerName: "Procentajul redus din pretul produsului", field: "procentajReducere", valueFormatter: params => params.data.procentajReducere.toFixed(2), sortable: true, filter: true },
        { headerName: "Data la care incepe oferta", field: "dataInceput", valueFormatter: params => params.data.dataInceput.split('T')[0], sortable: true, filter: true },
        { headerName: "Data la care se termina oferta", field: "dataFinal", valueFormatter: params => params.data.dataFinal.split('T')[0], sortable: true, filter: true }
    ]);

    const { data, error, isLoading, mutate } = useSWR(`/api/produs/${id}/oferte`, fetcher)

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

    if (isLoading) return <Preloader />

    return (
        <WebsiteLayout>
            <Container>
                <h1>View asociere Produs - Oferta cu procentaj {'>'} 15</h1>

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