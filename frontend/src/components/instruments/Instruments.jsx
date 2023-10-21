import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InstrumentEditModal from '../instruments/InstrumentComponents/InstrumentEditModal'
import Pagination from '../Shared/Pagination'
import useSearch from '../../hooks/useSearch'
import CommonTable from '../Shared/CommonTable'

function Instruments() {
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [instrument, setInstrument] = useState(null);
    const [itemsPerPage] = useState(10);
    const [mode, setMode] = useState(null);

    //Filtering
    const { handleSearch, filteredData, searchTerm } = useSearch();
    const [filteredInventory, setFilteredInventory] = useState([]);

    //Dropdown
    const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);

    const toggleActionsDropdown = () => {
        setIsActionsDropdownOpen(!isActionsDropdownOpen);
    };

    // Pagination
    const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredInventory.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const handlePageChange = async (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const maxPageNumbersToShow = 3;
    const leftPageNumber = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const rightPageNumber = Math.min(
        leftPageNumber + maxPageNumbersToShow - 1,
        Math.ceil(filteredInventory.length / itemsPerPage)
    );
    const pageNumbersToDisplay = [];
    for (let i = leftPageNumber; i <= rightPageNumber; i++) {
        pageNumbersToDisplay.push(i);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/instruments?page=${currentPage}&items_per_page=${itemsPerPage}&search=${searchTerm}`);

                // Filter the data based on partial match of name or description
                const filteredData = res.data.filter(instrument => {
                    const instrumentName = instrument.name.toLowerCase();
                    const instrumentDescription = instrument.description.toLowerCase();
                    const instrumentManufacturer = instrument.manufacturer.toLowerCase();
                    const instrumentSerialNumber = instrument.serial_number
                        ? instrument.serial_number.toLowerCase()
                        : ""; // handle potential undefined serial_number
                    const searchTermLower = searchTerm.toLowerCase();

                    return (
                        instrumentName.includes(searchTermLower) ||
                        instrumentDescription.includes(searchTermLower) ||
                        instrumentManufacturer.includes(searchTermLower) ||
                        instrumentSerialNumber.includes(searchTermLower)
                    );
                });

                setFilteredInventory(filteredData);
            } catch (err) {
                console.log(err);
                console.log("Axios Error:", err);
                console.log("Response Data:", err.response?.data);
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage, searchTerm, modal]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    //Modals
    const toggleModal = () => {
        setModal(!modal); // toggle the state
        // if modal is being closed, reset the instrument and mode
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
    
    // Usage for adding an instrument, where you don't need instrument data
    const openAddModal = () => {
        handleModal('add');
    };
    
    // Usage for editing an instrument
    const handleInstrumentClick = (instrument) => {
        handleModal('edit', instrument);
    };
    

    return (
        <>
            <CommonTable
                data={filteredInventory}
                columns={[
                    { key: 'name', header: 'Instrument Name' },
                    { key: 'description', header: 'Description' }
                ]}
                onRowClick={handleInstrumentClick}
                onAdd={openAddModal}
                title="Instruments"
                mode={mode}
                searchFields={['name', 'description', 'serial_number', 'manufacturer']}
            />
            {modal && (
                <InstrumentEditModal
                    isOpen={modal}
                    id={instrument ? instrument.id : null} // Ensure 'instrument' is not null when trying to access 'id'
                    mode={mode}
                    onClose={toggleModal} // 'onClose' should handle the visibility
                />
            )}
        </>
    )
}

export default Instruments