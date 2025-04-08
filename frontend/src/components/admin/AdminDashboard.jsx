import React, { useState } from 'react';
import Users from './Users'
import Clinics from './Clinics'
import Logs from './Logs'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <div className="flex space-x-4 mb-4">
                <button onClick={() => setActiveTab("users")} className="btn">Users</button>
                <button onClick={() => setActiveTab("clinics")} className="btn">Clinics</button>
                <button onClick={() => setActiveTab("logs")} className="btn">Logs</button>
            </div>

            {activeTab === "users" && <Users />}
            {activeTab === "clinics" && <Clinics />}
            {activeTab === "logs" && <Logs />}

        </div>
    );
};

export default AdminDashboard;
