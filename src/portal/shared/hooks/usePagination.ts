import { useState, useCallback } from 'react';

interface UsePaginationResult {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotal: (total: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  reset: () => void;
}

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  initialTotal?: number;
}

/**
 * Custom hook for managing pagination state
 * @param options - Configuration options
 */
export function usePagination(options: UsePaginationOptions = {}): UsePaginationResult {
  const {
    initialPage = 0, // 0-based for MUI compatibility
    initialPageSize = 10,
    initialTotal = 0,
  } = options;

  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [total, setTotalState] = useState(initialTotal);

  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = page < totalPages - 1;
  const hasPreviousPage = page > 0;

  const setPage = useCallback((newPage: number) => {
    const maxPage = totalPages > 0 ? totalPages - 1 : 0;
    const validPage = Math.max(0, Math.min(newPage, maxPage));
    setPageState(validPage);
  }, [totalPages]);

  const setPageSize = useCallback((newPageSize: number) => {
    const validPageSize = Math.max(1, newPageSize);
    setPageSizeState(validPageSize);
    // Reset to first page when page size changes
    setPageState(0);
  }, []);

  const setTotal = useCallback((newTotal: number) => {
    const validTotal = Math.max(0, newTotal);
    setTotalState(validTotal);

    // Adjust current page if it's beyond the new total
    const newTotalPages = Math.ceil(validTotal / pageSize);
    if (page >= newTotalPages && newTotalPages > 0) {
      setPageState(newTotalPages - 1);
    }
  }, [page, pageSize]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  }, [hasNextPage, page, setPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage(page - 1);
    }
  }, [hasPreviousPage, page, setPage]);

  const reset = useCallback(() => {
    setPageState(initialPage);
    setPageSizeState(initialPageSize);
    setTotalState(initialTotal);
  }, [initialPage, initialPageSize, initialTotal]);

  return {
    page,
    pageSize,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setPage,
    setPageSize,
    setTotal,
    nextPage,
    previousPage,
    reset,
  };
}