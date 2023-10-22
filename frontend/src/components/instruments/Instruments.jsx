import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InstrumentEditModal from '../instruments/InstrumentComponents/InstrumentEditModal';
import CommonTable from '../Shared/CommonTable';
import usePagination from '../../hooks/usePagination';
import useSearch from '../../hooks/useSearch';

function Instruments() {
    const [isLoading, setIsLoading] = useState(true);
    const [instrument, setInstrument] = useState(null);
    const [instruments, setInstruments] = useState([]);
    const [error, setError] = useState(null); // Used for error handling in axios requests
    const [totals, setTotals] = useState({}); // Used for total number of records

    //Edit vs Add mode for modal, and the modal's visibility.
    const [mode, setMode] = useState(null);
    const [modal, setModal] = useState(false);

    //Pagination
    const {
        currentPage,
        totalPages,
        onPageChange,
        setTotalItems,
        resetToFirstPage,
    } = usePagination(1, 10); // Initialize with default values
    const itemsPerPage = 10;

    //Search
    const { handleSearch, searchTerm, filteredData } = useSearch(
        instruments,
        ['name', 'description', 'serial_number', 'manufacturer'],
        resetToFirstPage
    );
    const fetchInstruments = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/instruments/pages?page=${currentPage}&items_per_page=${itemsPerPage}&search=${searchTerm}`);
            setInstruments(res.data.instruments);
            setTotalItems(res.data.total_records);
            setTotals(res.data.total_records);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching instruments:", err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInstruments();
    }, [currentPage, searchTerm, modal]);

    const toggleModal = () => {
        setModal(!modal);
        if (modal) {
            setInstrument(null);
            setMode(null);
        }
    };

    const handleModal = (newMode, instrumentData = null) => {
        setMode(newMode);
        setInstrument(instrumentData);
        setModal(true);
    };

    const openAddModal = () => {
        handleModal('add');
    };

    const handleInstrumentClick = (instrument) => {
        handleModal('edit', instrument);
    };



    return (
        <>
            <CommonTable
                data={filteredData}
                columns={[
                    { key: 'name', header: 'Instrument Name' },
                    { key: 'description', header: 'Description' }
                ]}
                onRowClick={handleInstrumentClick}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totals}
                onPageChange={onPageChange}
                onAdd={openAddModal}
                title="Instruments"
                mode={mode}
                searchFields={['name', 'description', 'serial_number', 'manufacturer']}
                onSearch={handleSearch}
            />
            {modal && (
                <InstrumentEditModal
                    isOpen={modal}
                    id={instrument ? instrument.id : null}
                    mode={mode}
                    onClose={toggleModal}
                />
            )}
        </>
    )
}

export default Instruments;
