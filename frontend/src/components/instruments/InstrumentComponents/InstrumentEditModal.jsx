import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextInput from '../../Shared/TextInput'
import CommonModal from '../../Shared/CommonModal'
import { SubmitButton, DeleteButton } from '../../Buttons/Buttons'
import { toast } from 'react-toastify'

function InstrumentEditModal({ id, onClose, isOpen, mode }) {
    const [name, setName] = useState("")
    const [onHand, setOnHand] = useState("")
    const [img_url, setImgUrl] = useState("")
    const [description, setDescription] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [serial_number, setSerialNumber] = useState("")
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (mode === "edit") {
            axios.get(`http://127.0.0.1:8000/api/instrument/${id}`)
                .then((res) => {
                    setName(res.data.name || "")
                    setOnHand(res.data.onHand || "")
                    setImgUrl(res.data.img_url || "")
                    setDescription(res.data.description || "")
                    setManufacturer(res.data.manufacturer || "")
                    setSerialNumber(res.data.serial_number || "")
                })
                .catch((err) => {
                    console.log(err)
                    setError(err.response?.data?.message || "An error occurred while submitting the data.");
                })
        }
    }, [id]);

    const validateForm = () => {
        // Start with an empty object and populate it with errors if any.
        const newFieldErrors = {};

        // Validate 'name' field
        if (!name.trim()) newFieldErrors.name = "Name is required.";

        // Validate 'description' field
        if (!description.trim()) newFieldErrors.description = "Description is required.";

        // Validate 'onHand' field. Assuming it should be a positive number.
        if (onHand === "") {
            newFieldErrors.onHand = "Please enter an amount.";
        } else if (isNaN(onHand) || Number(onHand) < 0) {
            newFieldErrors.onHand = "Invalid amount. Must be a positive number.";
        }
        // Validate 'manufacturer' field
        if (!manufacturer.trim()) newFieldErrors.manufacturer = "Manufacturer is required.";
        // If the object remains empty, the form is valid.
        setFieldErrors(newFieldErrors);
        return Object.keys(newFieldErrors).length === 0;
    };

    const handleSubmit = async (e) => { // Make the function asynchronous
        e.preventDefault();
        // Validate the form first
        if (!validateForm()) {
            return; // Stop here if form is invalid
        }
        // Depending on the mode, choose the appropriate URL and HTTP method
        const url = mode === "edit" ?
            `http://127.0.0.1:8000/api/instrument/${id}` :
            'http://127.0.0.1:8000/api/instrument/new';

        const method = mode === "edit" ? 'patch' : 'post';

        try {
            const response = await axios({
                method: method,
                url: url,
                data: {
                    name,
                    onHand,
                    img_url,
                    description,
                    manufacturer,
                    serial_number,
                },
            });
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
            setError(err.response?.data?.message || "An error occurred while submitting the data.");
        }
    }
        

    const handleChange = (setter) => (e) => {
        // clear errors if exist
        setError(null);
        setter(e.target.value);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/instrument/${id}`);
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
                    label="Name"  // Add the label prop
                    name="name"
                    value={name}
                    onChange={handleChange(setName)}
                    error={fieldErrors.name}
                    placeholder="Enter name"  // Update placeholder to be more descriptive if necessary
                />
                <TextInput
                    label="On Hand Amount"
                    name="onHand"
                    value={onHand}
                    onChange={handleChange(setOnHand)}
                    error={fieldErrors.onHand}
                    placeholder="Enter amount on hand"
                />
                <TextInput
                    label="Image URL"
                    name="img_url"
                    value={img_url}
                    onChange={handleChange(setImgUrl)}
                    placeholder="Enter image URL"
                />
                <TextInput
                    label="Serial Number"
                    name="serial_number"
                    value={serial_number}
                    onChange={handleChange(setSerialNumber)}
                    placeholder="Enter serial number"
                />
                <TextInput
                    label="Manufacturer"
                    name="manufacturer"
                    value={manufacturer}
                    onChange={handleChange(setManufacturer)}
                    error={fieldErrors.manufacturer}
                    placeholder="Enter manufacturer"
                />
                <TextInput
                    asTextarea
                    label="Description"  // Since it's a textarea, adding a label makes sense here too
                    name="description"
                    value={description}
                    onChange={handleChange(setDescription)}
                    placeholder="Enter description"
                />
                <div className="flex space-x-4">  {/* Container for buttons to provide spacing */}
                    <SubmitButton handleSubmit={handleSubmit}/> 
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
                title="Edit Instrument" // You can customize this per modal instance
            >
                {error && <div className="alert alert-danger">{error}</div>}
                {modalContent}
            </CommonModal>
        </>
    );
}

export default InstrumentEditModal