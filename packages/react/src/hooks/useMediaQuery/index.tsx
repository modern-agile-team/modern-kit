import { isClient } from '@devgrace/utils';
import { useCallback, useEffect, useState } from 'react';

const getMatchMedia = (query: string) => {
  if (isClient()) {
    return window.matchMedia(query).matches;
  }
  return false;
};

export const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState(getMatchMedia(query));

  const handleChange = useCallback(() => {
    setIsMatch(getMatchMedia(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    matchMedia.addEventListener('change', handleChange);

    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query, handleChange]);

  return { isMatch };
};
