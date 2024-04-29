import { useRef, useState } from 'react';

const useBlockDoubleClick = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isClicked = useRef(false);

  const blockDoubleClick = async (callback: () => Promise<unknown>) => {
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
    blockDoubleClick,
  };
};

export default useBlockDoubleClick;
