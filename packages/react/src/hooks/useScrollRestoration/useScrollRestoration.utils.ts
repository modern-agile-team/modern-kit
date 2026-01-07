import { getUniqId } from '@modern-kit/utils';

/**
 * @description 현재 URL에 hash가 있는지 확인합니다.
 *
 * @returns {boolean} hash 존재 여부
 */
export const hasHash = (): boolean => {
  if (typeof window === 'undefined') return false;
  return Boolean(window.location.hash);
};

/**
 * @description 현재 window.history의 고유 식별자(Key)를 가져오거나 생성합니다.
 *
 * history.state에 이미 key가 존재하면 해당 값을 반환하고,
 * 없다면 새로운 고유 키를 생성하여 state에 주입(`replaceState`) 후 반환합니다.
 *
 * @returns {string} 현재 히스토리 스택의 고유 Key
 */
export const getHistoryKey = (): string => {
  if (typeof window === 'undefined') return '';

  const state = window.history.state;
  const historyKey = state?.key || state?.['mk-scroll-key'];

  if (historyKey) return historyKey;

  const newKey = getUniqId('scroll_key_');
  window.history.replaceState({ ...state, ['mk-scroll-key']: newKey }, '');
  return newKey;
};

/**
 * @description 오래된 스크롤 위치 데이터를 정리하여 sessionStorage 크기를 관리합니다.
 *
 * @param {Record<string, number>} scrollPositionMap - 현재 저장된 스크롤 위치 맵
 * @param {number} maxKeepEntries - 최대 보관할 항목 수 (기본값: 50)
 * @returns {Record<string, number>} 정리된 스크롤 위치 맵
 */
export const pruneScrollPositionMap = (
  scrollPositionMap: Record<string, number>,
  maxKeepEntries: number
): Record<string, number> => {
  const entries = Object.entries(scrollPositionMap);
  if (entries.length <= maxKeepEntries) return scrollPositionMap;

  return Object.fromEntries(entries.slice(-maxKeepEntries));
};
