// Desc: Custom hook to filter data based on search term

import { useState, useEffect, useMemo } from 'react';

function useSearch(data, searchKeys, resetToFirstPage) {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredData = useMemo(() => {
        if (!searchTerm || !Array.isArray(data)) {
            return data; // Display all data when the search term is empty or data is not an array
        } else {
            const lowerCaseValue = searchTerm.toLowerCase();
            return data.filter((item) =>
                searchKeys.some((key) => {
                    const itemValue = item[key];
                    // Check if itemValue is not null or undefined before accessing it
                    return itemValue && itemValue.toLowerCase().includes(lowerCaseValue);
                })
            );
        }
    }, [data, searchTerm, searchKeys]);

    const handleSearch = (value) => {
        // Check if the search term actually changes to prevent unnecessary reset.
        if (value !== searchTerm) {
            setSearchTerm(value);  // set the new search term.
            if (resetToFirstPage) {
                resetToFirstPage();  // Only reset pagination if there's a new search term.
            }
        }
    };
    
    useEffect(() => {
        if (searchTerm !== '') { // Only reset to the first page if a search term is entered
            resetToFirstPage();
        }
    }, [searchTerm, resetToFirstPage]); // Dependencies ensure this effect runs only when searchTerm or resetToFirstPage changes

    return { searchTerm, handleSearch, filteredData };
}

export default useSearch;
