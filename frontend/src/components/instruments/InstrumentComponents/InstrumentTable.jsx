import React, { useState } from 'react';
import AddInstrumentForm from './AddInstrumentForm';
import PackEditInstrumentModal from '../../packs/PackComponents/PackEditInstrumentModal';
import ProcedureEditInstrumentModal from '../../procedures/ProcedureComponents/ProcedureEditInstrumentModal';

function InstrumentTable({ instruments = [], parentId, type, onRefresh, toggleTable }) {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedInstrument, setSelectedInstrument] = useState(null);

    const toggleAddModal = () => {
        setModal(!modal);
        if (modal) onRefresh();
    };

    const onInstrumentClick = (instrument) => {
        if (editModal) {
            setSelectedInstrument(null);
        } else {
            setSelectedInstrument(instrument);
        }
        setEditModal(!editModal);
        if (editModal) onRefresh();
    };

    const EditModal = type === 'pack' ? PackEditInstrumentModal : ProcedureEditInstrumentModal;

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-wrap justify-between items-center p-4 gap-2">
                        <h2 className="text-xl font-semibold text-white">Instruments</h2>
                        <div className="flex gap-2">
                            {type === 'procedure' && (
                                <button
                                    onClick={toggleTable}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition"
                                >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 6h12M4 10h12M4 14h12" />
                                    </svg>
                                    View Packs
                                </button>
                            )}
                            <button
                                onClick={toggleAddModal}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add Instrument
                            </button>
                            {modal && <AddInstrumentForm onClose={toggleAddModal} type={type} />}
                        </div>
                    </div>

                    <div className="overflow-x-auto max-h-[80vh]">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3">Instrument Name</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3">Qty</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instruments.map((instrument) => (
                                    <tr
                                        key={instrument.id}
                                        onClick={() => onInstrumentClick(instrument)}
                                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                                    >
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {instrument.name}
                                        </th>
                                        <td className="px-4 py-3">{instrument.quantity}</td>
                                        <td className="px-2 py-2 text-xs sm:text-sm truncate max-w-[160px]">
                                            {instrument.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {editModal && selectedInstrument && (
                            <EditModal
                                instrument={selectedInstrument}
                                parentId={parentId}
                                onClose={onInstrumentClick}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InstrumentTable;
