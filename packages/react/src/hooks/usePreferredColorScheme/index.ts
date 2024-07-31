import { useMediaQuery } from '../useMediaQuery';

export function usePreferredColorScheme() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return isDark ? 'dark' : 'light';
}
