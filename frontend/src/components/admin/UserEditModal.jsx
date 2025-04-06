import React, { useState } from 'react';
import { useEffect } from 'react';
import CommonModal from '../Shared/CommonModal';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const roles = ["admin", "tech"];

const UserEditModal = ({ user, onClose, onSave }) => {
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [selectedClinics, setSelectedClinics] = useState(user.clinics?.map(c => c.id) || []);
    const [availableClinics, setAvailableClinics] = useState([]);


    useEffect(() => {
        axiosInstance.get('/clinics')
            .then(res => setAvailableClinics(res.data))
            .catch(err => console.error("Error loading clinics:", err));
    }, []);

    const handleSave = async () => {
        try {
            const response = await axiosInstance.patch(`/user/${user.id}`, {
                email,
                role,
                password: null,
                clinic_ids: selectedClinics,
            });

            toast.success("User updated successfully.");
            onSave(response.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update user.");
        }
    };


    return (
        <CommonModal isOpen={true} onClose={onClose} title={`Edit ${user.email}`}>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Clinics
                    </label>
                    <select
                        multiple
                        value={selectedClinics}
                        onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions);
                            const ids = options.map(opt => parseInt(opt.value));
                            setSelectedClinics(ids);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-32"
                    >
                        {availableClinics.map(clinic => (
                            <option key={clinic.id} value={clinic.id}>
                                {clinic.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Role
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        {roles.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between items-center pt-4">
                    {/* Delete Button */}
                    <button
                        type="button"
                        onClick={async () => {
                            if (confirm(`Are you sure you want to delete ${user.email}?`)) {
                                try {
                                    await axiosInstance.delete(`/user/${user.id}`);
                                    toast.success("User deleted.");
                                    onSave(); // Refresh list
                                } catch (err) {
                                    console.error(err);
                                    toast.error("Failed to delete user.");
                                }
                            }
                        }}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Delete
                    </button>

                    {/* Cancel / Save Buttons */}
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
        </CommonModal >
    );
};

export default UserEditModal;
