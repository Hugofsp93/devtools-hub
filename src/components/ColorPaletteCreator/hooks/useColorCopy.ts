import { useState, useCallback } from 'react';

/**
 * Custom hook for handling color copying functionality
 * Provides copy function and copied state with auto-reset
 */
export function useColorCopy(resetDelay = 1200) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = useCallback((hex: string, idx: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), resetDelay);
  }, [resetDelay]);

  return {
    copiedIdx,
    handleCopy
  };
} 