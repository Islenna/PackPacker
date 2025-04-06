// src/components/users/Users.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import UserEditModal from './UserEditModal'; // Assuming you have a UserEditModal component


const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axiosInstance.get('/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('usertoken')}`
            }
        })
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
                setLoading(false);
            });
    }, []);



    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    }

    return (
        <div className="users-page">
            <h1>Users</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Clinics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr
                                key={user.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                onClick={() => handleUserClick(user)}
                            >

                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
                                    {user.clinics && user.clinics.length > 0
                                        ? user.clinics.map(clinic => clinic.name).join(', ')
                                        : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModal && selectedUser && (
                <UserEditModal
                    user={selectedUser}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedUser(null);
                    }}
                    onSave={() => {
                        axiosInstance.get('/users')
                            .then(res => setUsers(res.data))
                            .catch(console.error);
                        setShowModal(false);
                        setSelectedUser(null);
                    }}
                />
            )}

        </div>
    );
}

export default Users;
