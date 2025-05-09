import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state in localStorage
 * @param key - The key to store the value under in localStorage
 * @param initialValue - The initial value if nothing is stored
 */
export function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [key, state]);

  return [state, setState] as const;
} 