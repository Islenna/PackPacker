import React, { useState } from 'react'
import axios from 'axios'
import { DeleteButton, SubmitButton } from '../../Buttons/Buttons';

function ProcedureEditInstrumentModal({ parentId, instrument, onClose }) {

    const [quantity, setQuantity] = useState("")
    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/procedure/${parentId}/delete-instrument/${instrument.id}`);
            alert('Instrument removed from procedure successfully!');
            onClose();
        } catch (error) {
            console.error("Failed to delete instrument from pack:", error);
        }
    }

    const changeQuantity = async (e) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/procedure/${parentId}/update-instrument/${instrument.id}?quantity=${quantity}`, {
                quantity: e.target.value
            });
            alert('Instrument quantity updated successfully!');
            onClose();
        } catch (error) {
            console.error("Failed to update instrument quantity:", error);
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
                                    Edit {instrument.name}
                                </h3>

                                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                <input type="text" name="name" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}
                                />
                            </div>
                            <div>

                            <SubmitButton handleSubmit={changeQuantity} />
                            {/* <!-- Modal body --> */}
                            <DeleteButton handleDelete={handleDelete} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcedureEditInstrumentModal