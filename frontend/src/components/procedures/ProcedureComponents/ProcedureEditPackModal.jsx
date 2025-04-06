import React from 'react'
import axiosInstance from '../../../utils/axiosInstance';
import { DeleteButton } from '../../Buttons/Buttons';
import { toast } from 'react-toastify'

function ProcedureEditPackModal({parentId, pack, onClose}) {

    const handleDelete = async () => {
        try {
            const res = await axiosInstance.delete(`procedures/${parentId}/delete-pack/${pack.id}`);
            toast.success(res.data.message); // ✅ now it works
            onClose();
        } catch (error) {
            console.error("Failed to delete instrument from pack:", error);
            toast.error("Failed to delete pack."); // optional UX polish
        }
    };
    


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
                                    Remove {pack.name} from Procedure
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <DeleteButton handleDelete={handleDelete} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcedureEditPackModal