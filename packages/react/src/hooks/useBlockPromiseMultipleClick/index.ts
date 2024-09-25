import { useCallback, useRef, useState } from 'react';

export function useBlockPromiseMultipleClick() {
  const [isLoading, setIsLoading] = useState(false);
  const isClicked = useRef(false);

  const blockMultipleClick = useCallback(
    async <T>(callback: () => Promise<T>) => {
      if (isClicked.current) {
        return;
      }

      isClicked.current = true;
      setIsLoading(true);

      try {
        const result = await callback();
        return result;
      } finally {
        isClicked.current = false;
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    isLoading,
    blockMultipleClick,
  };
}
