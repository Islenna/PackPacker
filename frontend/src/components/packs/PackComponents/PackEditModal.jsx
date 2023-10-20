import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SubmitButton, EditButton, DeleteButton } from '../../Buttons/Buttons'
import logo from '../../../assets/PackNestLogo.jpg'
import { toast } from 'react-toastify'

function PackEditModal({ id, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img_url, setImg_url] = useState('');

    useEffect(() => {
        const getPack = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/pack/${id}`);
                const packData = response.data;
                setName(packData.name);
                setDescription(packData.description);
                setImg_url(packData.img_url);
            } catch (err) {
                console.log(err);
            }
        };
        getPack();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://127.0.0.1:8000/api/pack/${id}`, {
                name,
                description,
            });
            // Clear form fields and close the modal
            setName('');
            setNotes('');
            onClose(); // Close the modal using passed function
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/pack/${id}`);
            toast.success(response.data.message);
            onClose();
        } catch (error) {
            console.error("Failed to delete pack:", error);
        }
    }

    return (
        <>

            <div className={onClose ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}>
                {/* <!-- Main modal --> */}
                <div id="defaultModal" tabIndex="-1" aria-hidden="true">
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* <!-- Modal content --> */}
                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            {/* <!-- Modal header --> */}
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Pack
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <form action="#">
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pack Name</label>
                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={name} required=""
                                            onChange={(e) => setName(e.target.value)} value={name}
                                        />
                                    </div>
                                    
                                    <div className="thumbnail-container">
                                        <a href={img_url || logo} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={img_url || logo}
                                                alt="Pack Image"
                                                className="thumbnail"
                                            />
                                        </a>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <textarea
                                            id="description"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder={description}
                                            onChange={(e) => setNotes(e.target.value)}
                                            value={description}
                                        ></textarea>
                                    </div>
                                </div>
                            </form>
                            <div className="button-container">
                                <SubmitButton handleSubmit={handleSubmit} />
                                <Link to={`/pack/${id}/instruments`}>
                                    <EditButton />
                                </Link>
                                <DeleteButton handleDelete={handleDelete} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PackEditModal;
