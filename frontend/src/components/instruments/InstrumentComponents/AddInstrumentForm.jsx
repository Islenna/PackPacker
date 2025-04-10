import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axiosInstance';
import Pagination from '../../Shared/Pagination'
import { useParams } from 'react-router-dom'
import { SubmitButton } from '../../Buttons/Buttons'
import { toast } from 'react-toastify'

function AddInstrumentForm({ onClose, type }) {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [instruments, setInstruments] = useState([]);
    const [filteredInstruments, setFilteredInventory] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedInstruments, setSelectedInstruments] = useState([]);
    const [showQuantityInput, setShowQuantityInput] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/instruments/pages?page=${currentPage}&items_per_page=${itemsPerPage}&search=${searchTerm}`);
                setInstruments(res.data.instruments);
                setFilteredInventory(res.data.instruments);
                setTotalPages(res.data.total_pages);
                setTotalRecords(res.data.total_records);

            } catch (err) {
                console.log(err);
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

    const currentItems = filteredInstruments;


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

    // Commit selected instruments to the pack
    const handleBulkCommit = async () => {
        console.log("Selected Instruments:", selectedInstruments);

        try {
            if (type === 'pack') {
                // Handle bulk commit for Packs
                const res = await axiosInstance.post(`/packs/${id}/add-instruments`, {
                    instruments: selectedInstruments,
                });
                console.log('Selected instrument IDs for Packs:', selectedInstruments);
                console.log('Response:', res);
                toast.success(res.data.message);
            } else if (type === 'procedure') {
                // Handle bulk commit for Procedures
                const res = await axiosInstance.post(`/procedures/${id}/add-instruments`, {
                    instruments: selectedInstruments,
                });
                toast.success(res.data.message);
                console.log('Selected instrument IDs for Procedures:', selectedInstruments);
                console.log('Response:', res);
            }
        } catch (err) {
            console.log(err);
        }
        // Close the modal
        onClose();
    };



    return (
        <>

            <div className={onClose ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}>
                <div id="defaultModal" tabIndex="-1" aria-hidden="true">
                    <div className="relative w-full max-w-lg sm:mx-auto max-h-[90vh] p-4">
                        {/* Modal Shell */}
                        <div className="flex flex-col bg-white rounded-lg shadow dark:bg-gray-800 max-h-[90vh] sm:p-5">

                            {/* Modal Header */}
                            <div className="flex justify-between items-center pb-4 mb-2 border-b dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Add Instrument
                                </h3>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal Body (scrollable) */}
                            <div className="overflow-y-auto pr-1 flex-grow">
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
                                                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 cursor-pointer"
                                                onClick={() => handleInstrumentClick(instrument)}
                                            >
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {instrument.name}
                                                    {isInstrumentSelected(instrument) && (
                                                        <span className="ml-2 text-green-500">&#10003;</span>
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
                                    totalItems={totalRecords}
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="mt-4">
                                <SubmitButton handleSubmit={handleBulkCommit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddInstrumentForm