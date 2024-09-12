import { useMediaQuery } from '../useMediaQuery';

/**
 * @description `usePreferredColorScheme` 훅은 사용자의 시스템에서 설정된 색상 모드를 확인하고, 'dark' 또는 'light' 문자열을 반환합니다.
 * 이 훅은 사용자 환경의 `prefers-color-scheme` 미디어 쿼리를 사용하여 다크 모드 또는 라이트 모드를 감지합니다.
 *
 * MDN - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 *
 * @returns {'dark' | 'light'} - 사용자의 색상 모드가 다크 모드이면 'dark', 그렇지 않으면 'light'를 반환합니다.
 *
 * @example
 * const colorScheme = usePreferredColorScheme();
 * // colorScheme; // 'dark' 또는 'light' 반환
 */
export function usePreferredColorScheme() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return isDark ? 'dark' : 'light';
}
