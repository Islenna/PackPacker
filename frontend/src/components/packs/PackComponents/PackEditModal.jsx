import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { Link } from 'react-router-dom';
import { SubmitButton, EditButton, DeleteButton } from '../../Buttons/Buttons'
import CommonModal from '../../Shared/CommonModal';
import TextInput from '../../Shared/TextInput';
import { toast } from 'react-toastify'

function PackEditModal({ id, onClose, isOpen, mode }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img_url, setImg_url] = useState('');
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (mode === "edit") {
            const getPack = async () => {
                try {
                    const response = await axiosInstance.get(`/packs/${id}`);
                    const packData = response.data;
                    setName(packData.name || "");
                    setDescription(packData.description || "");
                    setImg_url(packData.img_url || "");
                } catch (err) {
                    console.log(err);
                }
            };
            getPack();
        }
    }, [id]);

    const validateForm = () => {
        const newFieldErrors = {};
        if (!name.trim()) newFieldErrors.name = "Pack Name is required.";
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
            `/packs/${id}` :
            '/packs/new';


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
            toast.success("Pack saved successfully.");
            onClose();

        } catch (err) { // Change 'error' to 'err' here
            if (err.response && err.response.status === 422) { // Corrected 'error' to 'err' here
                const errors = err.response.data.errors;
                // 'errors' will contain validation messages from the server, you might need to adapt this line depending on the actual structure of your server response
                // Now, set these error messages in your component's state to display them
                setFieldErrors(errors); // assuming your state and server response have matching keys
            } else {
                // handle other types of errors (like network errors) here
            }
            console.log(err);
            setError(err.response?.data?.message || "An error occurred while submitting the data.");
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/packs/${id}`);

            console.log(response.data); // Log the server response for debugging.
            toast.success(response.data.message);
            onClose();
        } catch (error) {
            console.error('An error occurred:', error);

            // Check if the error response is undefined or does not have a 'message' field.
            if (!error.response || !error.response.data || !error.response.data.message) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx, or no response was received, or there's no 'message' field.
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
                    label="Pack Name" // Change fields accordingly
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={fieldErrors.name}
                    placeholder="Enter pack name"
                />
                <TextInput
                    asTextarea
                    label="Description"  // Since it's a textarea, adding a label makes sense here too
                    name="description"
                    value={description}
                    onChange={handleChange(setDescription)}
                    error={fieldErrors.description}
                    placeholder="Enter description"
                />
                <div className="flex space-x-4">  {/* Container for buttons to provide spacing */}
                    <SubmitButton handleSubmit={handleSubmit} />
                    <Link to={`/packs/${id}/instruments`}>
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
                title={mode === "edit" ? "Edit Pack" : "Add New Pack"}
                img_url={img_url}
            >
                {error && <div className="alert alert-danger">{error}</div>}
                {modalContent}
            </CommonModal>
        </>
    );
}

export default PackEditModal;
