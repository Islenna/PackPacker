import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import ClinicEditModal from './ClinicEditModal';
import AddClinicForm from './AddClinicForm';

const Clinics = () => {
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const toggleAddModal = () => {
        setAddModal(!addModal);
        if (addModal) { // it means modal is about to close
            // Refresh the clinic list after adding a new clinic
            axiosInstance.get('/clinics/')
                .then(response => {
                    setClinics(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('There was an error fetching the clinics!', error);
                    setLoading(false);
                });
        }
    };


    useEffect(() => {
        axiosInstance.get('/clinics/')
            .then(response => {
                setClinics(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the clinics!', error);
                setLoading(false);
            });
    }, []);

    const handleClinicClick = (clinic) => {
        setSelectedClinic(clinic);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedClinic(null);
    };

    const handleSave = (updatedClinic) => {
        // Update the clinic list after editing
        setClinics(clinics.map(clinic => clinic.id === updatedClinic.id ? updatedClinic : clinic));
        handleCloseModal();
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    {/* Top Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Clinics</h2>
                        </div>
                        <button onClick={toggleAddModal} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Add Clinic
                            </span>
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <p className="p-4 text-gray-700 dark:text-gray-300">Loading...</p>
                        ) : (
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">ID</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Location</th>
                                        <th scope="col" className="px-6 py-3">Phone</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clinics.map(clinic => (
                                        <tr
                                            key={clinic.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                            onClick={() => handleClinicClick(clinic)}
                                        >
                                            <td className="px-6 py-4">{clinic.id}</td>
                                            <td className="px-6 py-4">{clinic.name}</td>
                                            <td className="px-6 py-4">{clinic.location}</td>
                                            <td className="px-6 py-4">{clinic.phone}</td>
                                            <td className="px-6 py-4">{clinic.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Clinic Edit Modal */}
            {showModal && selectedClinic && (
                <ClinicEditModal
                    clinic={selectedClinic}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
            {/* Add Clinic Modal */}
            {addModal && (
                <AddClinicForm
                    onClose={toggleAddModal}
                    onSave={toggleAddModal} // Save will refresh the list
                />
            )}
        </section>
    );
};

export default Clinics;
