import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axiosInstance';
import { useParams } from 'react-router-dom'
import AddPackForm from './AddPackForm'
import ProcedureEditPackModal from '../../procedures/ProcedureComponents/ProcedureEditPackModal'


function PackTable({ packs = [], onRefresh, parentId, toggleTable }) {
    const [packModal, setPackModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedPackId, setSelectedPackId] = useState(null)
    const [selectedPack, setSelectedPack] = useState(null)


    const toggleAddModal = () => {
        setModal(!modal)
        if (modal) { // it means modal is about to close
            onRefresh()
        }
    }

    const handlePackClick = (pack) => {
        if (editModal) { // If modal is currently open
            setSelectedPackId(null) // Reset the pack ID
            setSelectedPack(null)
        } else {
            setSelectedPackId(pack.id) // Store the pack ID
            setSelectedPack(pack)
        }
        setEditModal(!editModal)
        if (editModal) { // it means modal is about to close
            onRefresh()
        }
    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-wrap justify-between items-center p-4 gap-2">
                            <h2 className="text-xl font-semibold text-white">Packs</h2>
                            <div className="flex gap-2">
                                {/* Toggle Table Button */}
                                <button
                                    onClick={toggleTable}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition"
                                >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 6h12M4 10h12M4 14h12" />
                                    </svg>
                                    View Instruments
                                </button>


                                {/* Add Pack Button */}
                                <button
                                    onClick={toggleAddModal}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-br from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition"
                                >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        />
                                    </svg>
                                    Add Pack
                                </button>

                                {/* Modal */}
                                {modal && <AddPackForm onClose={toggleAddModal} />}
                            </div>
                        </div>

                        <div className="table-container" style={{ width: '800px', height: '530px', overflowY: 'auto' }}>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Pack Name</th>
                                        <th scope="col" className="px-4 py-3">Description</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packs.map((pack) => (
                                        <tr key={pack.id} onClick={() => handlePackClick(pack)}
                                            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                                        >
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pack.name}</th>

                                            <td className="px-4 py-3">{pack.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {editModal && (
                                <ProcedureEditPackModal
                                    parentId={parentId}
                                    onClose={handlePackClick}
                                    pack={selectedPack} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PackTable