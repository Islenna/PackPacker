import React, { useRef } from 'react';
import logo from '../../assets/PackNestLogo.jpg';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

function CommonModal({ isOpen, onClose, children, title, img_url, onImageChange }) {
    const imageUrl = img_url || logo;
    const fileInputRef = useRef();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Only JPG and PNG images are allowed.");
            return;
        }
    
        const maxSizeMB = 5;
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error("Image too large. Maximum size is 5MB.");
            return;
        }
    
        onImageChange && onImageChange(file);
    };
    


    return (
        <div className={isOpen ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}>
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">

                <div className="flex justify-between items-center pb-4 mb-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="relative flex justify-center mb-4">
                    <div className="relative w-24 h-24">
                        <img
                            src={img_url ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${img_url}` : logo}
                        alt="Modal content"
                        className="w-full h-full object-cover rounded-md shadow-md"
                        />


                        {/* Zoom/View Icon - Top Left */}
                        <button
                            className="absolute top-1 left-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-opacity-100 transition"
                            onClick={() => window.open(`${img_url}`, "_blank")}
                            title="View full image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5 5m-5-5a6 6 0 111.414-1.414L21 21" />
                            </svg>
                        </button>

                        {/* Edit/Upload Icon - Top Right */}
                        <button
                            className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-opacity-100 transition"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current.click();
                            }}
                            title="Change image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l7-7a1 1 0 00-1.414-1.414l-7 7v3z" />
                            </svg>
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>



                {children}
            </div>
        </div>
    );
}

export default CommonModal;
