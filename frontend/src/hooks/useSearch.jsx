import { useState, useEffect, useMemo } from 'react';

function useSearch(data, searchKeys) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = useMemo(() => {
        if (!searchTerm || !Array.isArray(data)) {
            return data; // Display all procedures when search term is empty or data is not an array
        } else {
            const lowerCaseValue = searchTerm.toLowerCase();
            return data.filter((item) =>
                searchKeys.some((key) =>
                    item[key].toLowerCase().includes(lowerCaseValue)
                )
            );
        }
    }, [data, searchTerm, searchKeys]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return { searchTerm, handleSearch, filteredData };
}

export default useSearch;