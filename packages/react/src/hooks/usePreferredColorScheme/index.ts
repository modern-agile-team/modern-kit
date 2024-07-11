import { useMediaQuery } from '../useMediaQuery';

export const usePreferredColorScheme = () => {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return isDark ? 'dark' : 'light';
};
