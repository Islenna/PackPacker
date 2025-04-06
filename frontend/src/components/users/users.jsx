// src/components/users/Users.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'; 

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="users-page">
            <h1>Users</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Users;
