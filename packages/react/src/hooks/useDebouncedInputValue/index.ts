import { ChangeEvent, useCallback, useState } from 'react';
import { type DebounceParameters } from '../../hooks/useDebounce';
import { useDebouncedState } from '../../hooks/useDebouncedState';

interface UseDebouncedInputValueReturnType {
  value: string;
  debouncedValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
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
 * @returns {UseDebouncedInputValueReturnType} - 현재 입력 값(`value`), 디바운싱된 입력 값(`debouncedValue`),
 * 입력 값을 업데이트하는 함수(`onChange`), 그리고 두 값을 모두 리셋하는 함수(`onReset`)을 포함하는 객체를 반환합니다.
 *
 * @example
 * const { value, debouncedValue, onChange, onReset } = useDebouncedInputValue(300);
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

  return { value, debouncedValue, onChange, onReset };
}
