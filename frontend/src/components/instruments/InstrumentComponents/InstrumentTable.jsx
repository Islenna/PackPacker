import React, { useState, useEffect } from 'react'
import AddInstrumentForm from './AddInstrumentForm'
import PackEditInstrumentModal from '../../packs/PackComponents/PackEditInstrumentModal';

function InstrumentTable({ instruments, packId, onRefresh }) {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);
    const [selectedInstrument, setSelectedInstrument] = useState(null);


    const toggleAddModal = () => {
        setModal(!modal);
        if (modal) { // it means modal is about to close
            onRefresh(); // Assuming you've destructured onRefresh from props.
        }
    };

    const onInstrumentClick = (instrument) => {
        if (editModal) { // If modal is currently open
            setSelectedInstrumentId(null); // Reset the instrument ID
            setSelectedInstrument(null);
        } else {
            setSelectedInstrumentId(instrument.id); // Store the instrument ID
            setSelectedInstrument(instrument);
        }
        setEditModal(!editModal);
        if (editModal) { // it means modal is about to close
            onRefresh(); // Assuming you've destructured onRefresh from props.
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>

                            </form>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <button onClick={toggleAddModal} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                        </svg>
                                        Add Instrument
                                    </button>
                                    {modal && (
                                        <AddInstrumentForm onClose={toggleAddModal} />
                                    )}
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
                                    <th scope="col" className="px-4 py-3">Quantity</th>
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {instruments.map((instrument) => (
                                    <tr key={instrument.id} onClick={() => onInstrumentClick(instrument)}
                                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                                    >
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{instrument.name}</th>
                                        <td className="px-4 py-3">
                                            <a href={instrument.img_url} target="_blank" rel="noopener noreferrer">
                                                View Image
                                            </a>
                                        </td>
                                        <td className="px-4 py-3">{instrument.description}</td>
                                        <td className="px-4 py-3">{instrument.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editModal && (
                            <PackEditInstrumentModal 
                            instrument={selectedInstrument}
                            packId={packId}
                            onClose={onInstrumentClick} />
                        )}
                    </div>
                </div>
            </div>
        </section>)
}

export default InstrumentTable