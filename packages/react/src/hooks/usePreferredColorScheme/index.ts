import { useMediaQuery } from '../useMediaQuery';

export const usePreferredColorScheme = () => {
  const isLight = useMediaQuery('(prefers-color-scheme: light)');
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return isDark ? 'dark' : isLight ? 'light' : 'no-preference';
};
