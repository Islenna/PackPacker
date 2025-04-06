import React, { useState } from 'react';
import CommonModal from '../Shared/CommonModal';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const ClinicEditModal = ({ clinic, onClose, onSave }) => {
    const [name, setName] = useState(clinic.name);
    const [location, setLocation] = useState(clinic.location);
    const [email, setEmail] = useState(clinic.email);
    const [phone, setPhone] = useState(clinic.phone);

    const handleSave = async () => {
        try {
            const res = await axiosInstance.put(`/clinics/${clinic.id}`, {
                name,
                location,
                email,
                phone
            });
            toast.success("Clinic updated successfully.");
            onSave(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update clinic.");
        }
    };


    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${clinic.name}?`)) {
            try {
                await axiosInstance.delete(`/clinics/${clinic.id}`);
                toast.success("Clinic deleted.");
                onSave(); // refresh list
            } catch (err) {
                console.error(err);
                toast.error("Failed to delete clinic.");
            }
        }
    };

    return (
        <CommonModal isOpen={true} onClose={onClose} title={`Edit ${clinic.name}`}>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="flex justify-between items-center pt-4">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Delete
                    </button>
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </CommonModal>
    );
};

export default ClinicEditModal;
