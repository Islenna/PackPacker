import React from 'react';


// Submit Button:
export function SubmitButton({ handleSubmit }) {
    return (
        <button
            type={handleSubmit ? "button" : "submit"}
            onClick={handleSubmit || undefined}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white rounded-md bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all"
        >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Submit
        </button>
    );
}


//Edit Button:
export function EditButton({ handleClick }) {
    return (
        <button
            onClick={handleClick}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white rounded-md bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all"
        >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4h12v12H4z" />
            </svg>
            View Contents
        </button>
    );
}


//Delete Button:
export function DeleteButton({ handleDelete }) {
    return (
        <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white rounded-md bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 transition-all"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
            Remove
        </button>
    );
}
