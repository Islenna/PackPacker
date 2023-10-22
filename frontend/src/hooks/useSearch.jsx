// Desc: Custom hook to filter data based on search term

import { useState, useMemo } from 'react';

function useSearch(data, searchKeys) {
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
        setSearchTerm(value);
    };

    return { searchTerm, handleSearch, filteredData };
}

export default useSearch;
