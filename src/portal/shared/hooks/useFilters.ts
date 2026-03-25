import { useState, useCallback } from 'react';
import { FilterParams } from '../types';

interface UseFiltersResult<T extends FilterParams> {
  filters: T;
  setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
  setFilters: (newFilters: Partial<T>) => void;
  clearFilter: <K extends keyof T>(key: K) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

/**
 * Custom hook for managing filter state
 * @param initialFilters - Initial filter values
 */
export function useFilters<T extends FilterParams>(
  initialFilters: T = {} as T
): UseFiltersResult<T> {
  const [filters, setFiltersState] = useState<T>(initialFilters);

  const setFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFiltersState(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const setFilters = useCallback((newFilters: Partial<T>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const clearFilter = useCallback(<K extends keyof T>(key: K) => {
    setFiltersState(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFiltersState({} as T);
  }, []);

  const activeFilterCount = Object.keys(filters).filter(
    key => filters[key] !== undefined && filters[key] !== null && filters[key] !== ''
  ).length;

  const hasActiveFilters = activeFilterCount > 0;

  return {
    filters,
    setFilter,
    setFilters,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}