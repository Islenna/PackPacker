import { useState } from 'react';

function usePagination(initialPage = 1, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  
  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };
  
  return {
    currentPage,
    totalPages,
    nextPage,
    setCurrentPage,
    prevPage,
    onPageChange,
    setTotalItems,
    totalItems,
    resetToFirstPage
  };
}

export default usePagination;
