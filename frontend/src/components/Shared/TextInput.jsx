import React from 'react';

const TextInput = ({
    asTextarea,
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    ...otherProps
}) => {
    // Common classes for both textarea and input elements.
    const commonClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";

    // Conditionally apply error class.
    const inputClasses = `${commonClasses} ${error ? 'input-error' : ''}`;

    if (asTextarea) {
        return (
            <div className="form-control">
                {label && <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
                <textarea
                    className={inputClasses} // Use the combined classes string.
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    {...otherProps}
                ></textarea>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
        );
    }

    return (
        <div className="form-control">
            {label && <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
            <input
                type="text"
                className={inputClasses} // Use the combined classes string.
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...otherProps}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default TextInput;
