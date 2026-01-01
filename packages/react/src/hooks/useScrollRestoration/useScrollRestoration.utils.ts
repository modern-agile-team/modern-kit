import { getUniqId } from '@modern-kit/utils';
/**
 * @description 현재 window.history의 고유 식별자(Key)를 가져오거나 생성합니다.
 *
 * history.state에 이미 key가 존재하면 해당 값을 반환하고,
 * 없다면 새로운 고유 키를 생성하여 state에 주입(`replaceState`) 후 반환합니다.
 *
 * 주로 스크롤 복원 시 현재 페이지(히스토리 스택)를 식별하기 위해 사용됩니다.
 *
 * @returns {string} 현재 히스토리 스택의 고유 Key
 */
export const getHistoryKey = () => {
  if (typeof window === 'undefined') return '';

  const state = window.history.state;
  const historyKey = state?.key || state?.__scroll_key;

  if (historyKey) return historyKey;

  const newKey = getUniqId('scroll_key_');
  window.history.replaceState({ ...state, __scroll_key: newKey }, '');
  return newKey;
};

/**
 * @description 오래된 스크롤 위치 데이터를 정리하여 sessionStorage 크기를 관리합니다.
 *
 * 사용자가 계속 페이지를 이동하면 historyKey가 무한정 누적될 수 있으므로,
 * 최근 항목만 유지하고 오래된 항목은 제거합니다.
 *
 * @param {Record<string, number>} storageMap - 현재 저장된 스크롤 위치 맵
 * @param {number} maxEntries - 최대 보관할 항목 수 (기본값: 50)
 * @returns {Record<string, number>} 정리된 스크롤 위치 맵
 */
export const cleanupOldScrollData = (
  storageMap: Record<string, number>,
  maxEntries: number
): Record<string, number> => {
  const entries = Object.entries(storageMap);
  if (entries.length <= maxEntries) return storageMap;

  // 최근 항목만 유지
  return Object.fromEntries(entries.slice(-maxEntries));
};
