import React from 'react';
import logo from '../../assets/PackNestLogo.jpg'; // make sure the path is correct

function CommonModal({ isOpen, onClose, children, title, img_url }) {
    // Use the provided image URL or fall back to the default logo
    const imageUrl = img_url || logo;

    return (
        <>
            <div className={isOpen ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}>
                {/* Other modal structures */}
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 border-b">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                        {/* Close button and structures */}
                        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="flex justify-center">
                        {img_url ? (
                            <a href={img_url} target="_blank" rel="noopener noreferrer" className="items-center mb-4 block">
                                <img src={img_url} alt="Modal content" className="w-24 h-24 object-cover rounded-md shadow-md" />
                            </a>
                        ) : (
                            <img src={logo} alt="Default logo" className="mb-4 w-24 h-24 object-cover rounded-md shadow-md" />
                        )}
                    </div>
                    {children} {/* Modal specific content will be rendered here */}
                </div>
            </div>
        </>
    );
}

export default CommonModal;
