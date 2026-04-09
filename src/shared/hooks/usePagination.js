import { useState, useMemo } from 'react';

export function usePagination(items, pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);
  
  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * pageSize;
    const end = begin + pageSize;
    return items.slice(begin, end);
  }, [items, currentPage, pageSize]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
    pageSize
  };
}
