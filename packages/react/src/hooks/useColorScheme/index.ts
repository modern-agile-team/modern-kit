import { isFunction } from '@modern-kit/utils';
import { useLocalStorage } from '../useLocalStorage';
import { usePreferredColorScheme } from '../usePreferredColorScheme';
import { useCallback, useEffect } from 'react';

const COLOR_SCHEME_DEFAULT_KEY = 'color-scheme';

type ColorScheme = 'dark' | 'light';

interface UseColorSchemeReturnType {
  colorScheme: ColorScheme;
  preferredColorScheme: ColorScheme;
  setToggleMode: () => void;
  setDarkMode: () => void;
  setLightMode: () => void;
  setColorSchemeToPreferredMode: () => void;
}

interface UseColorSchemeOptions {
  key?: string;
  defaultValue?: (() => ColorScheme) | ColorScheme;
  shouldSetBodyClass?: boolean;
}

/**
 * @description 사용자의 색상 테마(다크 모드 또는 라이트 모드)를 관리하기 위한 훅입니다.
 *
 * @param {UseColorSchemeOptions} [options={}] - 색상 테마를 관리를 위한 추가 옵션입니다.
 * - `key`: 스토리지에 저장 할 key 값입니다. 기본 값은 `'color-scheme'`입니다.
 * - `defaultValue`: 기본 값으로 셋팅 값입니다. `prefers-color-scheme`를 지원하지 않는 OS의 경우 `defaultValue`를 활용 할 수 있습니다.
 * - `shouldSetBodyClass`: document.body의 클래스에 색상 테마를 저장 할 여부를 결정하는 값입니다. 기본 값은 `false`입니다.
 *
 * @returns {UseColorSchemeReturnType}
 * - `colorScheme`: 현재 적용된 색상 테마(`dark`, `light`)입니다. 스토리지에 저장된 값이 있다면 해당 값을 가져옵니다.
 * 스토리지에 저장된 값이 없는 상황에서 `defaultValue`가 설정되어 있다면 우선적으로 `defaultValue` 값을 갖습니다.
 * 만약, `defaultValue`가 없다면 다음으로 사용자 선호 색상(`prefers-color-scheme`) 값을 가져옵니다.
 * - `preferredColorScheme`: 사용자의 선호 색상 테마입니다. 사용자 시스템 설정에 따라 달라집니다.
 * - `setToggleMode`: 현재 색상 테마를 `다크 모드`와 `라이트 모드` 사이에서 전환합니다.
 * - `setDarkMode`: 현제 색상 테마를 `다크 모드`로 설정합니다.
 * - `setLightMode`: 현재 색상 테마를 `라이트 모드`로 설정합니다.
 * - `setColorSchemeToPreferredMode` - 현재 색상 테마를 사용자의 선호 색상(`prefers-color-scheme`)으로 설정합니다.
 *
 * @example
 * // 사용자의 선호 색상(`prefers-color-scheme`)이 Light 모드인 경우
 * const {
 *  colorScheme,
 *  preferredColorScheme,
 *  setDarkMode,
 *  setLightMode,
 *  setToggleMode,
 *  setColorSchemeToPreferredMode
 * } = useColorScheme();
 *
 * // 초기 상태
 * // colorScheme: 'light', preferredColorScheme; // 'light'
 *
 * // 스트리지 저장
 * setToggleMode(); // colorScheme: 'dark', preferredColorScheme: 'light'
 * setLightMode(); // colorScheme: 'light', preferredColorScheme: 'light'
 * setDarkMode(); // colorScheme: 'dark', preferredColorScheme: 'light'
 * setColorSchemeToPreferredMode(); // colorScheme: 'light', preferredColorScheme: 'light'
 *
 * @example
 * // 옵션 설정
 * // 앱에서 userAgent로 dark mode 관련 프로퍼티를 전달 받아서 사용하는 경우
 * const userAgent = window.navigator.userAgent
 *
 * useColorScheme({
 *   key: 'custom-key', // 스토리지에 저장 할 key입니다.
 *   defaultValue: userAgent.includes('{Dark Mode Property}') ? 'dark' : 'light',
 *   shouldSetBodyClass: true, // document.body 클래스에 colorScheme을 셋팅합니다.
 * });
 */
export function useColorScheme({
  defaultValue,
  key = COLOR_SCHEME_DEFAULT_KEY,
  shouldSetBodyClass = false,
}: UseColorSchemeOptions = {}): UseColorSchemeReturnType {
  const preferredColorScheme = usePreferredColorScheme();
  const defaultValueToUse = isFunction(defaultValue)
    ? defaultValue()
    : defaultValue;

  const { state: colorScheme, setState: setColorScheme } =
    useLocalStorage<ColorScheme>({
      key,
      initialValue: defaultValueToUse ?? preferredColorScheme,
    });

  const setToggleMode = useCallback(() => {
    setColorScheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setColorScheme]);

  const setDarkMode = useCallback(() => {
    setColorScheme('dark');
  }, [setColorScheme]);

  const setLightMode = useCallback(() => {
    setColorScheme('light');
  }, [setColorScheme]);

  const setColorSchemeToPreferredMode = useCallback(() => {
    setColorScheme(preferredColorScheme);
  }, [setColorScheme, preferredColorScheme]);

  useEffect(() => {
    if (shouldSetBodyClass) {
      document.body.classList.add(COLOR_SCHEME_DEFAULT_KEY, colorScheme);
    }
  }, [colorScheme, shouldSetBodyClass]);

  return {
    colorScheme,
    preferredColorScheme,
    setToggleMode,
    setDarkMode,
    setLightMode,
    setColorSchemeToPreferredMode,
  };
}
