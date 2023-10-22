import { useState, useMemo } from 'react';

function useSearch(data, searchKeys) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = useMemo(() => {
        
        if (!searchTerm || !Array.isArray(data)) {
            return data;
        } else {
            const lowerCaseValue = searchTerm.toLowerCase();
            return data.filter((item) =>
                searchKeys.some((key) =>
                    item[key].toLowerCase().includes(lowerCaseValue)
                )
            );
        }
        
    }, [data, searchTerm, searchKeys]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    return { searchTerm, handleSearch, filteredData };
}

export default useSearch;
