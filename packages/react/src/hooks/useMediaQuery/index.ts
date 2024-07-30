import { isClient } from '@modern-kit/utils';
import { useCallback, useEffect, useState } from 'react';

const getMatchMedia = (query: string, defaultValue?: boolean) => {
  if (defaultValue != null) return defaultValue;

  if (isClient()) {
    return window.matchMedia(query).matches;
  }
  return false;
};

export function useMediaQuery(query: string, defaultValue?: boolean) {
  const [isMatch, setIsMatch] = useState(getMatchMedia(query, defaultValue));

  const handleChange = useCallback(() => {
    setIsMatch(getMatchMedia(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    matchMedia.addEventListener('change', handleChange);

    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query, handleChange]);

  return isMatch;
}
