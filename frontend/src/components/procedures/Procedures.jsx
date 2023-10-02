import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProcedureForm from '../procedures/ProcedureForm';
import Pagination from '../Pagination';
import usePagination from '../../hooks/usePagination';
import ProcedureEditModal from '../procedures/ProcedureComponents/ProcedureEditModal';
import useSearch from '../../hooks/useSearch';

function Procedures() {
    const [procedures, setProcedures] = useState([]);
    const [modal, setModal] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const { searchTerm, handleSearch, filteredData } = useSearch(procedures, ['name', 'description']);

    const {
        currentPage,
        nextPage,
        prevPage,
        goToPage,
        setTotalItems,
        totalItems
    } = usePagination();

    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleEditModal = () => {
        setEditModal(!editModal);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Extract the items to display on the current page from the filteredData
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages based on the number of items and items per page
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/procedures');
                setProcedures(res.data);
                setTotalItems(res.data.length); // Set total items for pagination
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [searchTerm, modal, editModal, setTotalItems]);

    const handleProcedureClick = (procedure) => {
        setSelectedProcedure(procedure);
        toggleEditModal();
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1>Procedures</h1>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Search procedures..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        />
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                        <button onClick={toggleModal} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                            </svg>
                                            New Procedure
                                        </button>
                                        {modal && (
                                            <ProcedureForm onClose={toggleModal} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-container" style={{ width: '800px', height: '530px', overflowY: 'auto' }}>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Procedure Name</th>
                                        <th scope="col" className="px-4 py-3">Procedure Description</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((procedure) => (
                                        <tr
                                            key={procedure.id}
                                            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 "
                                            onClick={() => handleProcedureClick(procedure)}
                                        >
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{procedure.name}</th>
                                            <td className="px-4 py-3">{procedure.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {editModal && (
                        <ProcedureEditModal id={selectedProcedure.id} onClose={toggleEditModal} />
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        totalItems={totalItems}
                    />
                </div>
            </section>
        </>
    );
}

export default Procedures;
``
