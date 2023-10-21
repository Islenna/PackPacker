import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange, totalItems }) {

    const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

    const pageNumbersToDisplay = [];


    for (let i = 1; i <= totalPages; i++) {
        pageNumbersToDisplay.push(i);
    }

    return (
        
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            
            
            {/* Display pagination information */}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white">{currentPage * 10 - 9}</span>
                -
                <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * 10, totalItems)}</span>
                of
                <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
            </span>

            <ul className="inline-flex items-stretch -space-x-px">
                {/* Previous button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                        type="button"
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
                <li>
                    {/* First button */}
                    <button
                        onClick={() => onPageChange(1)}
                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        type="button"
                    >
                        First
                    </button>
                </li>
                <li>
                    {/* Last button */}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        type="button"
                    >
                        Last
                    </button>
                </li>
                {/* Next button */}
                <li>
                <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-r-lg border ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}

                        type="button"
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
