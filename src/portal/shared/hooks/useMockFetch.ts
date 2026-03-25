import { useState, useEffect, useCallback, useRef } from 'react';

interface UseMockFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseMockFetchOptions {
  immediate?: boolean;
}

/**
 * Custom hook for handling mock API calls with loading, error, and data state
 * @param serviceFn - Function that returns a Promise with data
 * @param deps - Dependencies array that triggers refetch when changed
 * @param options - Configuration options
 */
export function useMockFetch<T>(
  serviceFn: () => Promise<T>,
  deps: any[] = [],
  options: UseMockFetchOptions = {}
): UseMockFetchResult<T> {
  const { immediate = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const result = await serviceFn();

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setData(result);
    } catch (err) {
      // Don't set error if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('useMockFetch error:', err);
    } finally {
      // Only set loading to false if request wasn't aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [serviceFn]);

  // Effect to fetch data when dependencies change
  useEffect(() => {
    if (immediate) {
      fetchData();
    }

    // Cleanup function to cancel ongoing requests
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, immediate, ...deps]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Variant of useMockFetch that doesn't auto-fetch on mount
 * Useful for user-triggered actions like form submissions
 */
export function useLazyMockFetch<T>(
  serviceFn: () => Promise<T>
): [() => Promise<T | null>, UseMockFetchResult<T>] {
  const { data, loading, error, refetch } = useMockFetch(serviceFn, [], { immediate: false });

  const execute = useCallback(async (): Promise<T | null> => {
    try {
      await refetch();
      return data;
    } catch (err) {
      return null;
    }
  }, [refetch, data]);

  return [execute, { data, loading, error, refetch }];
}