import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PackEditModal from '../packs/PackComponents/PackEditModal';
import CommonTable from '../Shared/CommonTable';
import usePagination from '../../hooks/usePagination';
import useSearch from '../../hooks/useSearch';

function Packs() {
    const [isLoading, setIsLoading] = useState(true);
    const [pack, setPack] = useState(null);
    const [packs, setPacks] = useState([]);
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
        packs,
        ['name', 'description'], // adjust these fields based on what is searchable within your packs
        resetToFirstPage
    );

    const fetchPacks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/packs/pages?page=${currentPage}&items_per_page=${itemsPerPage}&search=${searchTerm}`);
            setPacks(res.data.packs);
            setTotalItems(res.data.total_records);
            setTotals(res.data.total_records);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching packs:", err);
            setError(err); // Set error for displaying error message
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPacks();
    }, [currentPage, searchTerm, modal]);

    const toggleModal = () => {
        setModal(!modal);
        if (modal) {
            setPack(null);
            setMode(null);
        }
    };

    const handleModal = (newMode, packData = null) => {
        setMode(newMode);
        setPack(packData);
        setModal(true);
    };

    const openAddModal = () => {
        handleModal('add');
    };

    const handlePackClick = (pack) => {
        handleModal('edit', pack);
    };

    return (
        <>
            <CommonTable
                data={filteredData}
                columns={[
                    { key: 'name', header: 'Pack Name' },
                    { key: 'description', header: 'Description' }
                ]}
                onRowClick={handlePackClick}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totals}
                onPageChange={onPageChange}
                onAdd={openAddModal}
                title="Packs"
                mode={mode}
                searchFields={['name', 'description']} // adjust based on your pack's attributes
                onSearch={handleSearch}
            />
            {modal && (
                <PackEditModal
                    isOpen={modal}
                    id={pack ? pack.id : null}
                    mode={mode}
                    onClose={toggleModal}
                />
            )}
        </>

    )
}

export default Packs