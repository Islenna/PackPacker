import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AddPackForm from './AddPackForm'
import ProcedureEditPackModal from '../../procedures/ProcedureComponents/ProcedureEditPackModal'


function PackTable({packs = [], onRefresh, parentId}) {
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
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <h2>Packs</h2>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    
                                <button onClick={toggleAddModal} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Add Pack
                                    </span>
                                </button>
                                    {modal && (
                                        <AddPackForm onClose={toggleAddModal} />
                                    )}
                                </div>
                            </div>
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
                                    <tr key={pack.id} onClick = {() => handlePackClick(pack)}
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