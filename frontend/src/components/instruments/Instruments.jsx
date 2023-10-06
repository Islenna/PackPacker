import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InstrumentForm from '../instruments/InstrumentComponents/InstrumentForm'
import InstrumentEditModal from '../instruments/InstrumentComponents/InstrumentEditModal'
import Pagination from '../Pagination'
import useSearch from '../../hooks/useSearch'

function Instruments() {
    const [instruments, setInstruments] = useState([]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [instrument, setInstrument] = useState(null);
    const [itemsPerPage] = useState(10);


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

    //Edit Modal
    const handleInstrumentClick = (instrument) => {
        setInstrument(instrument);
        setEditModal(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/instruments?page=${currentPage}&items_per_page=${itemsPerPage}&search=${searchTerm}`);

                // Filter the data based on partial match of name or description
                const filteredData = res.data.filter(instrument => {
                    const instrumentName = instrument.name.toLowerCase();
                    const instrumentDescription = instrument.description.toLowerCase();
                    const searchTermLower = searchTerm.toLowerCase();

                    return (
                        instrumentName.includes(searchTermLower) ||
                        instrumentDescription.includes(searchTermLower)
                    );
                });

                setInstruments(res.data);
                setFilteredInventory(filteredData);
            } catch (err) {
                console.log(err);
                console.log("Axios Error:", err);
                console.log("Response Data:", err.response?.data);

            }
        };

        fetchData();
    }, [currentPage, itemsPerPage, searchTerm, modal, editModal]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);



    const toggleAddModal = () => {
        setModal(!modal);
    };

    const toggleEditModal = (instrumentId) => {
        // Pass the instrumentId to the edit modal function
        setEditModal(!editModal);
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1>Instruments</h1>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search instruments..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">

                                <button onClick={toggleAddModal} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Add Instrument
                                    </span>
                                </button>

                                {modal && (
                                    <InstrumentForm onClose={toggleAddModal} />
                                )}

                                <div className="flex items-center space-x-3 w-full md:w-auto">

                                    <div id="actionsDropdown" className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${isActionsDropdownOpen ? 'block' : 'hidden'}`}>
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add to Pack</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add to Procedure</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="table-container" style={{ width: '800px', height: '530px', overflowY: 'auto' }}>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Instrument Name</th>
                                        <th scope="col" className="px-4 py-3">Instrument Image</th>
                                        <th scope="col" className="px-4 py-3">Description</th>
                                        <th scope="col" className="px-4 py-3">On Hand</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(instrument => (
                                        <tr key={instrument.id}
                                            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 "
                                            onClick={() => handleInstrumentClick(instrument)}
                                        >
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{instrument.name}</th>
                                            <td className="px-4 py-3">
                                                <a href={instrument.img_url} target="_blank" rel="noopener noreferrer">
                                                    View Image
                                                </a>
                                            </td>
                                            <td className="px-4 py-3">{instrument.description}</td>
                                            <td className="px-4 py-3">{instrument.onHand}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {editModal && (
                            <InstrumentEditModal id={instrument.id} onClose={toggleEditModal} />
                        )}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={filteredInventory.length}
                        />
                    </div>
                </div>
            </section >
        </>
    )
}

export default Instruments