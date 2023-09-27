import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InstrumentForm from '../instruments/InstrumentForm'

function Instruments() {
    const [instruments, setInstruments] = useState([]);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //Filtering
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredInventory, setFilteredInventory] = useState([]);

    //Add To Button
    const [actionsDropdownVisible, setActionsDropdownVisible] = useState(false);
    const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);

    const toggleActionsDropdown = () => {
        setActionsDropdownVisible(!actionsDropdownVisible);
    };
    // Toggle filter dropdown visibility
    const toggleFilterDropdown = () => {
        setFilterDropdownVisible(!filterDropdownVisible);
    };

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

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

                setInstruments(filteredData);
                setFilteredInventory(filteredData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage, searchTerm]);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };


    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
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
                                            placeholder="Search"
                                            required=""
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={toggleModal} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add Instrument
                                </button>
                                {modal && (
                                    <InstrumentForm onClose={toggleModal} />
                                )}

                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button
                                        onClick={toggleActionsDropdown}
                                        id="actionsDropdownButton"
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                        Add To
                                    </button>
                                    <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add to Pack</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add to Procedure</a>
                                        </div>
                                    </div>
                                    <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                        </svg>
                                        Filter
                                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
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
                                    {instruments.slice(indexOfFirstItem, indexOfLastItem).map(instrument => (
                                        <tr key={instrument.id} className="border-b dark:border-gray-700">
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
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white">{Math.min(indexOfFirstItem + 1, instruments.length)}</span>
                                -
                                <span className="font-semibold text-gray-900 dark:text-white">{Math.min(indexOfLastItem, instruments.length)}</span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white">{instruments.length}</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                        type="button"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="httpwww.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </li>
                                {pageNumbers.map((number) => (
                                    <li key={number}>
                                        <button onClick={() => handlePageChange(number)} className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{number}</button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={indexOfLastItem >= instruments.length}
                                        className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-r-lg border ${indexOfLastItem >= instruments.length ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                        type="button"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="httpwww.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Instruments