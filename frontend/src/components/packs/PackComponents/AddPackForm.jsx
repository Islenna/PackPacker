import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axiosInstance';
import Pagination from '../../Shared/Pagination'
import { useParams } from 'react-router-dom'
import { SubmitButton } from '../../Buttons/Buttons'


function AddPackForm({ onClose, }) {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [packs, setPacks] = useState([]);
    const [selectedPacks, setSelectedPacks] = useState([]);
    const [filteredPacks, setFilteredPacks] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`packs/pages?page=${currentPage}&items_per_page=${itemsPerPage}&search=${searchTerm}`);

                const packs = res.data.packs || [];
                console.log("Fetched Packs:", packs);

                const filteredData = packs.filter(pack => {
                    const packName = pack.name.toLowerCase();
                    const packDescription = pack.description.toLowerCase();
                    const searchTermLower = searchTerm.toLowerCase();

                    return (
                        packName.includes(searchTermLower) ||
                        packDescription.includes(searchTermLower)
                    );
                });

                setPacks(packs);
                setFilteredPacks(filteredData);
                setTotalPages(res.data.total_pages);
            } catch (err) {
                console.log("Axios Error:", err);
                console.log("Response Data:", err.response?.data);
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage, searchTerm]);



    // Search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    //Pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = filteredPacks;

    const handleBulkCommit = async () => {
        try {
            const res = await axiosInstance.post(`/procedures/${id}/add-packs`, {
                packs: selectedPacks,
            });
        } catch (err) {
            console.log(err);
        }
        // Close the modal
        onClose();
    };

    const handlePackClick = (pack) => {
        if (selectedPacks.includes(pack.id)) {
            setSelectedPacks(selectedPacks.filter(packId => packId !== pack.id));
        } else {
            setSelectedPacks([...selectedPacks, pack.id]);
        }
    }

    const isPackSelected = (pack) => selectedPacks.includes(pack.id);

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
                                    Add Pack
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
                                    {currentItems.map((pack) => (
                                        <tr key={pack.id}
                                            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 "
                                            onClick={() => handlePackClick(pack)}
                                        >
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {pack.name}
                                                {isPackSelected(pack) && (
                                                    <span className="ml-2 text-green-500">&#10003;</span> // Checkmark icon for selected packs
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
                                totalItems={filteredPacks.length}
                            />
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

export default AddPackForm