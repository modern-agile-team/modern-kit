import { useRef, useState } from 'react';

export const useBlockMultipleClick = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isClicked = useRef(false);

  const blockMultipleClick = async (callback: () => Promise<unknown>) => {
    if (isClicked.current) {
      return;
    }

    isClicked.current = true;
    setIsLoading(true);

    await callback();

    isClicked.current = false;
    setIsLoading(false);
  };

  return {
    isLoading,
    blockMultipleClick,
  };
};
