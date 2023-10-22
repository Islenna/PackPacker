import React, { useState } from 'react';
import SearchBar from '../Search/Search';
import Pagination from './Pagination';
function CommonTable({
    data,
    columns,
    title,
    onAdd,
    onRowClick,
    currentPage,
    totalPages,
    totalItems,
    onSearch,
    onPageChange,
    searchFields
}
) {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <h1 className="text-2xl font-semibold">{title}</h1>
                        </div>
                        <button
                            onClick={onAdd ? onAdd : toggleModal}
                            className="inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 mb-4" // Added mb-4 for spacing
                        >
                            <svg
                                className="h-3.5 w-3.5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                />
                            </svg>
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Add {title}
                            </span>
                        </button>
                    </div>
                    <SearchBar onSearch={onSearch} className="mb-4" />
                    <div className="table-container" style={{ width: '800px', height: '530px', overflowY: 'auto' }}>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.key} className="px-4 py-3">
                                            {column.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => onRowClick(item)}
                                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {item[column.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Pagination controls */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={onPageChange}
            />
        </section>
    );
}

export default CommonTable;