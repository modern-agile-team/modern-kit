import { isClient } from '@modern-kit/utils';
import { useEventListener } from '../../hooks/useEventListener';
import { useCallback, useState } from 'react';

const getMatchMedia = (mediaQueryString: string, defaultValue?: boolean) => {
  if (isClient()) {
    return window.matchMedia(mediaQueryString).matches;
  }
  return defaultValue ?? false;
};

/**
 * @description `useMediaQuery` 훅은 주어진 미디어 쿼리 문자열에 맞춰 현재 viewport가 미디어 쿼리 조건을 만족하는지 여부를 반환합니다.
 *
 * @param {string} mediaQueryString - 미디어 쿼리 조건을 나타내는 문자열 (예: '(max-width: 768px)').
 * @param {boolean} defaultValue - 미디어 쿼리 결과를 확인할 수 없는 경우 사용할 기본 값 (옵션).
 *
 * @returns {boolean} 현재 뷰포트가 주어진 미디어 쿼리 조건을 만족하면 `true`, 만족하지 않으면 `false`를 반환합니다.
 *
 * @example
 * const isBigScreen = useMediaQuery('(min-width: 768px)');
 *
 * isBigScreen; // viewport가 768px 이상이면 true, 768px 이하면 false
 */
export function useMediaQuery(
  mediaQueryString: string,
  defaultValue?: boolean
): boolean {
  const [isMatch, setIsMatch] = useState(
    getMatchMedia(mediaQueryString, defaultValue)
  );

  const handleChange = useCallback(
    (e: MediaQueryListEvent) => setIsMatch(e.matches),
    []
  );

  useEventListener(window.matchMedia(mediaQueryString), 'change', handleChange);

  return isMatch;
}
