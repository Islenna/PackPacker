import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import ProcedureEditModal from './ProcedureComponents/ProcedureEditModal';
import CommonTable from '../Shared/CommonTable';
import usePagination from '../../hooks/usePagination';
import useSearch from '../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

function Procedures() {
    const navigate = useNavigate();
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
        const usertoken = localStorage.getItem("usertoken");
        if (!usertoken) {
            navigate("/");
            return;
        }
        
        setIsLoading(true);
        try {
            const query = `page=${currentPage}&items_per_page=${itemsPerPage}`;
            const url = searchTerm?.trim()
                ? `http://localhost:8000/api/procedures/pages?${query}&search=${encodeURIComponent(searchTerm)}`
                : `http://localhost:8000/api/procedures/pages?${query}`;

            const res = await axiosInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${usertoken}`
                }
            });
            if (res.status !== 200) {
                throw new Error("Failed to fetch procedures");
            }

            setProcedures(res.data.procedures);
            setTotalItems(res.data.total_records);
            setTotals(res.data.total_records);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching procedures:", err);
            setError(err); // Set error for displaying error message
            setIsLoading(false);
            if (err.response?.status === 401) {
                localStorage.removeItem("usertoken");
                navigate("/");
            }
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
