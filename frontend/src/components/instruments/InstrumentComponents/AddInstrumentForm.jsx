import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Pagination from '../../Pagination'

function AddInstrumentForm({ onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [instruments, setInstruments] = useState([]);
    const [filteredInstruments, setFilteredInventory] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedInstruments, setSelectedInstruments] = useState([]);
    const [showQuantityInput, setShowQuantityInput] = useState(false);

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
                console.log("Axios Error:", err);
                console.log("Response Data:", err.response?.data);

            }
        };


        fetchData();
    }, [currentPage, itemsPerPage, searchTerm]);

    //Pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = filteredInstruments.slice(indexOfFirstItem, indexOfLastItem);

    // Search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Add instrument to pack
    const handleInstrumentClick = (instrument) => {
        // Toggle selection by adding/removing the instrument's ID from selectedInstruments
        if (selectedInstruments.includes(instrument.id)) {
            setSelectedInstruments(selectedInstruments.filter(id => id !== instrument.id));
        } else {
            setSelectedInstruments([...selectedInstruments, instrument.id]);
        }
    };

    const isInstrumentSelected = (instrument) => selectedInstruments.includes(instrument.id);

    // Function to commit selected instruments to the pack
    const handleBulkCommit = () => {

        console.log('Selected instrument IDs:', selectedInstruments);
        // Reset the selected instruments
        setSelectedInstruments([]);

        // Implement the logic to add selected instruments to the pack
    };



    return (
        <>
            <div className={onClose ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}>

                {/* <!-- Main modal --> */}
                <div id="defaultModal" tabIndex="-1" aria-hidden="true">
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* <!-- Modal content --> */}
                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            {/* <!-- Modal header --> */}
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Add Instrument
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <form action="#">
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
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
                                </div>
                            </form>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Instrument Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((instrument) => (
                                        <tr key={instrument.id}
                                            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 "
                                            onClick={() => handleInstrumentClick(instrument)}
                                        >
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {instrument.name}
                                                {isInstrumentSelected(instrument) && (
                                                    <span className="ml-2 text-green-500">&#10003;</span> // Checkmark icon for selected instruments
                                                )}
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                totalItems={filteredInstruments.length}
                            />
                            <div className="mt-4">
                                <button
                                    onClick={handleBulkCommit}
                                    className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddInstrumentForm