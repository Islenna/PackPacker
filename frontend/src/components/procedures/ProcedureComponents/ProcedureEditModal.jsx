import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { Link } from 'react-router-dom';
import { SubmitButton, EditButton, DeleteButton } from '../../Buttons/Buttons';
import { toast } from 'react-toastify'
import CommonModal from '../../Shared/CommonModal';
import TextInput from '../../Shared/TextInput';

// AddToPackModal component
function ProcedureEditModal({ id, onClose, isOpen, mode }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (mode === "edit") {

            const getProcedure = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/procedures/${id}`);
                    const procedureData = response.data;
                    setName(procedureData.name);
                    setDescription(procedureData.description);
                } catch (err) {
                    console.log(err);
                }
            }
            getProcedure();
        }
    }
        , [id]);

    const validateForm = () => {
        const newFieldErrors = {};
        if (!name.trim()) newFieldErrors.name = "Procedure name is required.";
        if (!description.trim()) newFieldErrors.description = "Description is required.";
        // ... any other validations ...

        setFieldErrors(newFieldErrors);
        return Object.keys(newFieldErrors).length === 0;
    };

    const handleChange = (setter) => (e) => {
        // clear errors if exist
        setError(null);
        setter(e.target.value);
    };
    const handleSubmit = async (e) => { // Make the function asynchronous
        e.preventDefault();
        // Validate the form first
        if (!validateForm()) {
            return; // Stop here if form is invalid
        }
        // Depending on the mode, choose the appropriate URL and HTTP method
        const url = mode === "edit" ?
            `http://localhost:8000/api/procedures/${id}` :
            'http://localhost:8000/api/procedures/new';

        const method = mode === "edit" ? 'patch' : 'post';

        try {
            const response = await axiosInstance({
                method: method,
                url: url,
                data: {
                    name,
                    description,
                },
            });
            toast.success("Procedure saved successfully.");
            onClose();

        } catch (err) {
            if (err.response && err.response.status === 422) {
                const errors = err.response.data.errors;
                setFieldErrors(errors); 
            } else {
            }
            setError(err.response?.data?.message || "An error occurred while submitting the data.");
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/procedures/${id}`);
            toast.success(response.data.message);
            onClose();
        } catch (error) {
            console.error('An error occurred:', error);
            if (!error.response || !error.response.data || !error.response.data.message) {
                toast.error('An unexpected error occurred. Please check your network connection or contact support.');
            } else {
                toast.error(error.response.data.message);
            }
        }
    };
    const modalContent = (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
                <TextInput
                    label="Procedure Name"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={fieldErrors.name}
                    placeholder="Enter pack name"
                />
                <TextInput
                    asTextarea
                    label="Description"  
                    name="description"
                    value={description}
                    onChange={handleChange(setDescription)}
                    error={fieldErrors.description}
                    placeholder="Enter description"
                />
                <div className="flex space-x-4">  {/* Container for buttons to provide spacing */}
                    <SubmitButton handleSubmit={handleSubmit} />
                    <Link to={`/procedures/${id}`}>
                        <EditButton />
                    </Link>
                    <DeleteButton handleDelete={handleDelete} />
                </div>
            </div>
        </form>
    );

    return (
        <>
            <CommonModal
                isOpen={isOpen}
                onClose={onClose}
                title="Edit Pack"
            >
                {error && <div className="alert alert-danger">{error}</div>}
                {modalContent}
            </CommonModal>
        </>
    );
}

export default ProcedureEditModal;
