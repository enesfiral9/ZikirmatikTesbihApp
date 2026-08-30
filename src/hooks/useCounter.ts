import { useState, useRef, useCallback } from 'react';

interface UseCounterOptions {
  target: number;
  onTargetReached?: () => void;
}

export const useCounter = ({ target, onTargetReached }: UseCounterOptions) => {
  const [count, setCount] = useState(0);
  const targetReachedFired = useRef(false);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      if (target > 0 && next >= target && !targetReachedFired.current) {
        targetReachedFired.current = true;
        onTargetReached?.();
      }
      return next;
    });
  }, [target, onTargetReached]);

  const reset = useCallback(() => {
    setCount(0);
    targetReachedFired.current = false;
  }, []);

  return { count, increment, reset };
};
