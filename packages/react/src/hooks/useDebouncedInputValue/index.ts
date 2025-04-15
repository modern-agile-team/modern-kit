import { ChangeEvent, useCallback, useState } from 'react';
import { type DebounceParameters } from '../../hooks/useDebounce';
import { useDebouncedState } from '../../hooks/useDebouncedState';

interface UseDebouncedInputValueReturnType {
  value: string;
  debouncedValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onClear: () => void;
}

/**
 * @description `input value`를 관리하고, 디바운스(지연)을 적용하는 커스텀 React 훅입니다
 *
 * 현재 입력 값과 디바운싱된 값을 제공하며, 값을 업데이트하고 리셋할 수 있는 함수도 함께 제공합니다.
 *
 * @param {string} initialValue - 초기 입력 값입니다.
 * @param {DebounceParameters[1]} [wait] - 입력 값에 디바운싱을 적용할 때의 지연 시간(밀리초)입니다.
 * @param {DebounceParameters[2]} [options={}] - 디바운스 동작에 대한 선택적 구성 옵션입니다.
 *
 * @returns {UseDebouncedInputValueReturnType}
 * - `value`: 현재 입력 값
 * - `debouncedValue`: 디바운싱된 입력 값
 * - `onChange`: 입력 값을 업데이트하는 함수
 * - `onReset`: 두 값을 초기값(initialValue)으로 초기화하는 함수
 * - `onClear`: 두 값을 빈 문자열('')로 초기화하는 함수
 *
 * @example
 * const { value, debouncedValue, onChange, onReset, onClear } = useDebouncedInputValue(300);
 *
 * onChange('test');
 *
 * value; // 곧바로 변경
 * debouncedValue; // 300ms 이후에 변경
 */
export function useDebouncedInputValue(
  initialValue: string,
  wait: DebounceParameters[1],
  options: DebounceParameters[2] = {}
): UseDebouncedInputValueReturnType {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useDebouncedState(
    initialValue,
    wait,
    options
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValue(value);
      setDebouncedValue(value);
    },
    [setDebouncedValue]
  );

  const onReset = useCallback(() => {
    setValue(initialValue);
    setDebouncedValue(initialValue);
  }, [setDebouncedValue, initialValue]);

  const onClear = useCallback(() => {
    setValue('');
    setDebouncedValue('');
  }, [setDebouncedValue]);

  return { value, debouncedValue, onChange, onReset, onClear };
}
