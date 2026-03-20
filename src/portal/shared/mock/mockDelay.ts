// src/portal/shared/mock/mockDelay.ts
// Mock delay helper for realistic async simulation in demo mode

/**
 * Simulates network delay for mock API responses
 * @param data - The data to return after delay
 * @param ms - Delay in milliseconds (default: 700ms)
 * @returns Promise that resolves with the data after specified delay
 */
export const mockDelay = <T>(data: T, ms: number = 700): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
};