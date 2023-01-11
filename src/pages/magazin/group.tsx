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

export default function MagazinView() {

    const [columnDefs] = useState([
        // { headerName: "Adresa", field: "adresa", sortable: true, filter: true },
        // { headerName: "Inceputul programului", field: "programStart", sortable: true, filter: true },
        // { headerName: "Sfarsitul programului", field: "programFinal", sortable: true, filter: true },
        // { headerName: "Data deschiderii", field: "dataDeschiderii", valueFormatter: params => params.data.dataDeschiderii.split('T')[0], sortable: true, filter: true },
        { headerName: "Franciza", field: "idFranciza", sortable: true, filter: true },
        { headerName: "Numar magazine", field: "numar_magazine", sortable: true, filter: true }

    ]);

    const { data, error, isLoading, mutate } = useSWR('/api/magazin/group', fetcher)

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
                <h1>View Magazine grupate</h1>

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