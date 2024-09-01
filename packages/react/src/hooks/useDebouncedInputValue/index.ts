import { useCallback, useState } from 'react';
import {
  DebounceParameters,
  useDebounce,
  usePreservedCallback,
} from '../../hooks';

interface UseDebouncedInputValueReturnType {
  value: string;
  debouncedValue: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

/**
 * @description `input value`를 관리하고, 디바운싱(debouncing)을 적용하는 커스텀 React 훅입니다
 *
 * 현재 입력 값과 디바운싱된 값을 제공하며, 값을 업데이트하고 리셋할 수 있는 함수도 함께 제공합니다.
 *
 * @param {DebounceParameters[1]} [wait=300] - 입력 값에 디바운싱을 적용할 때의 지연 시간(밀리초)입니다. 기본값은 300ms입니다.
 * @param {DebounceParameters[2]} [options={}] - 디바운스 동작에 대한 선택적 구성 옵션입니다.
 *
 * @returns {{
 *   value: string;
 *   debouncedValue: string;
 *   onChange: (value: string) => void;
 *   onReset: () => void;
 * }} - 현재 입력 값(`value`), 디바운싱된 입력 값(`debouncedValue`),
 * 입력 값을 업데이트하는 함수(`onChange`), 그리고 두 값을 모두 리셋하는 함수(`onReset`)을 포함하는 객체를 반환합니다.
 *
 * @example
 * const { value, debouncedValue, onChange, onReset } = useDebouncedInputValue(300);
 */
export function useDebouncedInputValue(
  wait: DebounceParameters[1] = 300,
  options: DebounceParameters[2] = {}
): UseDebouncedInputValueReturnType {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const debounceCallback = useCallback((value: string) => {
    setDebouncedValue(value);
  }, []);

  const debouncedChangeValue = usePreservedCallback(
    useDebounce(debounceCallback, wait, options)
  );

  const onChange = useCallback(
    (value: string) => {
      setValue(value);
      debouncedChangeValue(value);
    },
    [debouncedChangeValue]
  );

  const onReset = useCallback(() => {
    setValue('');
    setDebouncedValue('');
  }, []);

  return { value, debouncedValue, onChange, onReset };
}
