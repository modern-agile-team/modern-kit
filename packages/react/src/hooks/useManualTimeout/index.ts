import { useRef, useEffect, useCallback } from 'react';

/**
 * @description 수동으로 타임아웃을 설정하고, 초기화할 수 있는 훅입니다.
 *
 * `useTimeout` 훅과 다르게 초기 자동 실행이 없으며, 명시적으로 타임아웃을 설정해야 합니다.
 * 모든 타임아웃은 해당 훅 언마운트 시 자동으로 초기화됩니다.
 *
 * `useTimeout`은 hooks rule에 따라 중첩 타임아웃 등 복잡한 타임아웃 설정에 적절하지 않습니다.
 * `useManualTimeout`은 병렬/중첩된 타임아웃을 실행하고, 한번에 초기화 해야 될 때 유용합니다.
 *
 * @returns {{
 *   set: (callback: () => void, delay: number) => number;
 *   clearAll: () => void;
 * }}
 * - set: 타임아웃을 설정하는 함수
 * - clearAll: 모든 타임아웃을 초기화하는 함수
 *
 * @example
 * const { set, clearAll } = useManualTimeout();
 *
 * useEffect(() => {
 *   // 병렬 실행
 *   set(() => console.log('timeout1'), 1000);
 *   set(() => console.log('timeout2'), 2000);
 * }, [set]);
 *
 * @example
 * const { set, clearAll } = useManualTimeout();
 *
 * useEffect(() => {
 *   // 중첩 실행
 *   set(() => {
 *     console.log('timeout1');
 *     set(() => {
 *       console.log('timeout2');
 *       set(() => {
 *         console.log('timeout3');
 *       }, 1000);
 *     }, 2000);
 *   }, 3000);
 * }, [set]);
 */
export const useManualTimeout = (): {
  set: (callback: () => void, delay: number) => number;
  clearAll: () => void;
} => {
  const timeoutIds = useRef<number[]>([]);

  const clearAll = useCallback(() => {
    for (let i = 0; i < timeoutIds.current.length; i++) {
      clearTimeout(timeoutIds.current[i]);
    }
    timeoutIds.current = [];
  }, []);

  const set = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      timeoutIds.current = timeoutIds.current.filter(
        (timeoutId) => timeoutId !== id
      );
      callback();
    }, delay);

    timeoutIds.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    return clearAll;
  }, [clearAll]);

  return { set, clearAll };
};
