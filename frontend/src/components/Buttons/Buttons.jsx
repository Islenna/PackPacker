import React from 'react';

//Submit Button:
export function SubmitButton({ handleSubmit }) {
    return (
        <button onClick={handleSubmit} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
            </span>
        </button>
    )
}

//Edit Button:
export function EditButton() {
    return (
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="-5 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7071 1.29289C15.0976 1.68342 15.0976 2.31658 14.7071 2.70711L14.1213 3.29289L11.1213 0.292892L11.7071 -0.292892C12.0976 0.097632 12.7308 0.0976312 13.1213 0.292892L14.7071 1.29289ZM10.1213 2.70711L13.1213 5.70711L6.41421 12.4142L3.41421 13.7071L4.70711 10.7071L10.1213 2.70711ZM2.29289 16.2929L3 20L6.70711 18.7071L2.29289 14.2929L0.292892 17.2929C-0.0976314 17.6834 -0.0976314 18.3166 0.292892 18.7071L2.29289 20.7071C2.68342 21.0976 3.31658 21.0976 3.70711 20.7071L5.70711 18.7071L2.29289 15.2929L1.29289 16.2929C0.902369 16.6834 0.902369 17.3166 1.29289 17.7071L2.29289 16.2929Z" fill="currentColor" />
            </svg>
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Edit
            </span>
        </button>
    )
}

//Delete Button:
export function DeleteButton({ handleDelete }) {
    return (
        <button onClick={handleDelete} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"><svg className="mr-1 -ml-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Remove
            </span>
        </button>
    )
}
