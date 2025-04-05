import React from 'react';
import axiosInstance from '../../utils/axiosInstance';

const TestAuthButton = () => {
    const test = async () => {
        try {
            const res = await axiosInstance.get('/procedures'); // Auth protected route
            console.log("✅ Success!", res.data);
        } catch (err) {
            console.error("❌ Auth Failed", err);
        }
    };

    return <button onClick={test}>Test Auth</button>;
};

export default TestAuthButton;
