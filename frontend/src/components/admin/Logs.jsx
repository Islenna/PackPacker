import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Logs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axiosInstance.get("/logs")
            .then((res) => setLogs(res.data))
            .catch((err) => console.error("Failed to fetch logs", err));
    }, []);

    return (
        <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold text-white">Activity Logs</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 max-h-[600px] overflow-y-auto">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Action</th>
                            <th>Target</th>
                            <th>Message</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-t border-gray-700">
                                <td>{log.user.email}</td>
                                <td>{log.action}</td>
                                <td>{`${log.target_type} #${log.target_id}`}</td>
                                <td>{log.message}</td>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
