import React from 'react'
import axios from 'axios'

function ProcedureEditInstrumentModal({ parentId, instrument, onClose }) {

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/procedure/${parentId}/delete-instrument/${instrument.id}`);
            alert('Instrument removed from procedure successfully!');
            onClose();
        } catch (error) {
            console.error("Failed to delete instrument from pack:", error);
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
                                    Remove {instrument.name} from Procedure
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <button onClick={handleDelete} className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="mr-1 -ml-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                </svg>
                                Remove from Procedure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcedureEditInstrumentModal