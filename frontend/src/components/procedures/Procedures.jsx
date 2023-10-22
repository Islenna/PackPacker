import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProcedureForm from '../procedures/ProcedureForm';

import CommonTable from '../Shared/CommonTable';
import usePagination from '../../hooks/usePagination';
import useSearch from '../../hooks/useSearch';

function Procedures() {
    const [isLoading, setIsLoading] = useState(true);

    const [procedure, setProcedure] = useState(null);
    const [procedures, setProcedures] = useState([]);
    const [error, setError] = useState(null);
    const [totals, setTotals] = useState({});

    const [mode, setMode] = useState(null);
    const [modal, setModal] = useState(false);

    const {
        currentPage,
        totalPages,
        onPageChange,
        setTotalItems,
        resetToFirstPage,
    } = usePagination(1, 10);
    const itemsPerPage = 10;

    const { handleSearch, searchTerm, filteredData } = useSearch(
        procedures,
        ['name', 'description'], // adjust these fields based on what is searchable within your packs
        resetToFirstPage
    );

    const toggleModal = () => {
        setModal(!modal);
        if (modal) {
            setProcedure(null);
            setMode(null);
        }
    };

    const handleModal = (newMode, procedureData = null) => {
        setMode(newMode);
        setProcedure(procedureData);
        setModal(true);
    };

    const openAddModal = () => {
        handleModal('add');
    };

    const fetchProcedures = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/procedures/pages?page=${currentPage}&items_per_page=${itemsPerPage}&search=${searchTerm}`);
            setProcedures(res.data.procedures);
            setTotalItems(res.data.total_records);
            setTotals(res.data.total_records);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching procedures:", err);
            setError(err); // Set error for displaying error message
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProcedures();
    }, [currentPage, searchTerm, modal]);


    const handleProcedureClick = (procedure) => {
        handleModal('edit', procedure);
    }

    return (
        <>
            <CommonTable
                data={filteredData}
                columns={[
                    { key: 'name', header: 'Procedure Name' },
                    { key: 'description', header: 'Description' }
                ]}
                onRowClick={handleProcedureClick}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totals}
                onPageChange={onPageChange}
                onAdd={openAddModal}
                title="Procedures"
                mode={mode}
                searchFields={['name', 'description']} // adjust based on your procedure's attributes
                onSearch={handleSearch}
            />
            {modal && (
                <ProcedureEditModal
                    isOpen={modal}
                    id={procedure ? procedure.id : null}
                    mode={mode}
                    onClose={toggleModal}
                />
            )}
        </>
    );
}

export default Procedures;
