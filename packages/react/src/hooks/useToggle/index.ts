import { useToggleState } from '../useToggleState';

/**
 * @description boolean 값을 토글하는 기능을 제공하는 훅입니다.
 * 기본값으로 제공된 불리언 상태를 관리하며, 해당 값을 토글할 수 있는 함수를 반환합니다.
 *
 * @param {boolean} [defaultValue=false] - 초기 boolean 값입니다. 기본값은 `false`입니다.
 * @returns {[boolean, () => void]}
 * 현재 boolean 상태(value)와 상태를 토글하는 함수(toggle), 상태를 직접 설정(setValue)할 수 있는 함수의 배열을 반환합니다.
 *
 * @example
 * const [isToggled, toggle, setValue] = useToggle(true);
 *
 * isToggled; // true
 * toggle();
 * isToggled; // false
 * setValue(true);
 * isToggled; // true
 */
export function useToggle(
  defaultValue: boolean = false
): [boolean, () => void] {
  return useToggleState(defaultValue, !defaultValue);
}
