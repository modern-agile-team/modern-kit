import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePreferredColorScheme } from '../../hooks/usePreferredColorScheme';
import { useCallback } from 'react';

const STORAGE_DARK_MODE = 'isDarkMode';

interface UseDarkModeReturnType {
  isDarkMode: boolean;
  isDarkModeOS: boolean;
  setToggle: () => void;
  setDarkMode: () => void;
  setLightMode: () => void;
}

/**
 * @description 사용자 환경에 맞는 다크 모드 상태를 관리합니다.
 *
 * 기본적으로는 사용자 운영체제에 설정된 화면 모드(`prefers-color-scheme`)를 통해 dark 모드 여부를 반환하며,
 * `useDarkMode` 훅이 반환하는 set함수를 호출하게 되면 로컬 스토리지에 dark 모드 여부가 저장되는데, 스토리지에 값이 있으면 이를 반환합니댜.
 *
 * @param {string} [localStorageKey=STORAGE_DARK_MODE] - 다크 모드 상태를 저장할 로컬 스토리지 키입니다.
 * @returns {UseDarkModeReturnType} 다크 모드 상태와 관련된 메서드를 반환합니다.
 * - `isDarkMode`: 현재 다크 모드 상태를 나타냅니다. 만약, 스토리지에 `localStorageKey`에 매칭되는 값이 없으면 `isDarkModeOS`를 기본 값으로 갖습니다.
 * - `isDarkModeOS`: 사용자의 운영체제 설정이 다크 모드인지 여부를 나타냅니다.
 * - `setToggle`: 다크 모드 상태를 토글하는 함수입니다.
 * - `setDarkMode`: 다크 모드 상태로 설정하는 함수입니다.
 * - `setLightMode`: 라이트 모드 상태로 설정하는 함수입니다.
 *
 * @example
 * // 운영체제 설정이 Light 모드인 경우
 * const { isDarkMode, isDarkModeOS, setDarkMode, setLightMode, setToggle } = useDarkMode();
 *
 * // 초기 상태
 * isDarkModeOS; // false
 * isDarkMode; // false
 *
 * // 스트리지 저장
 * setToggle(); // isDarkMode: true, isDarkModeOS: false
 *
 * setLightMode(); // isDarkMode: false, isDarkModeOS: false
 *
 * setDarkMode(); // isDarkMode: true, isDarkModeOS: false
 */
export function useDarkMode(
  localStorageKey: string = STORAGE_DARK_MODE
): UseDarkModeReturnType {
  const colorScheme = usePreferredColorScheme();
  const isDarkModeOS = colorScheme === 'dark';

  const { state: isDarkMode, setState: setIsDarkMode } =
    useLocalStorage<boolean>({
      key: localStorageKey,
      initialValue: isDarkModeOS,
    });

  const setToggle = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, [setIsDarkMode]);

  const setDarkMode = useCallback(() => {
    setIsDarkMode(true);
  }, [setIsDarkMode]);

  const setLightMode = useCallback(() => {
    setIsDarkMode(false);
  }, [setIsDarkMode]);

  return { isDarkMode, isDarkModeOS, setToggle, setDarkMode, setLightMode };
}
