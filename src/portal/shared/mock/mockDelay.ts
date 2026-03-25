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

/**
 * Simulates network delay with occasional errors to test error handling
 * @param data - The data to return after delay
 * @param ms - Delay in milliseconds (default: 700ms)
 * @param errorRate - Probability of error occurring (0-1, default: 0.05 = 5%)
 * @returns Promise that resolves with data or rejects with error
 */
export const mockDelayWithError = <T>(
  data: T,
  ms: number = 700,
  errorRate: number = 0.05
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorRate) {
        reject(new Error('Mock network error - please try again'));
      } else {
        resolve(data);
      }
    }, ms);
  });
};

/**
 * Simulates realistic variations in response time
 * @param data - The data to return after delay
 * @param minMs - Minimum delay in milliseconds (default: 500ms)
 * @param maxMs - Maximum delay in milliseconds (default: 1000ms)
 * @returns Promise that resolves with the data after random delay
 */
export const mockVariableDelay = <T>(data: T, minMs: number = 500, maxMs: number = 1000): Promise<T> => {
  const randomDelay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return mockDelay(data, randomDelay);
};