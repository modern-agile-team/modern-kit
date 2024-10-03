import { useCallback, useState } from 'react';
/**
 * @description 두 개의 값을 토글하는 기능을 제공하는 훅입니다.
 * 기본값으로 제공된 두 개의 값을 관리하며, 선택된 값과 두 값을 토글할 수 있는 함수를 반환합니다.
 *
 * @template T - 토글할 값의 타입을 나타냅니다.
 * @param {T} value1 - 초기값이자 첫 번째 토글 값입니다.
 * @param {T} value2 - 두 번째 토글 값입니다.
 * @returns {[T, () => void]}
 *
 * @example
 * const [value, toggle] = useToggle('ON', 'OFF');
 *
 * value; // 'ON'
 * toggle();
 * value; // 'OFF'
 */
export function useToggleState<T>(value1: T, value2: T): [T, () => void] {
  const [value, setValue] = useState(value1);

  const toggle = useCallback(() => {
    setValue((prev) => (prev === value1 ? value2 : value1));
  }, [value1, value2]);

  return [value, toggle];
}
