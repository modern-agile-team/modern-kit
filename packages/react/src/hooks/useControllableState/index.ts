import { SetStateAction, useCallback, useState } from 'react';

interface UseControllableStateOptions<T> {
  value?: T | undefined;
  defaultValue: T;
}
/**
 * @description 제어된 상태와 비제어된 상태를 관리하는 훅입니다.
 *
 * value가 제공되면 제어 상태(controlled mode)로 처리되며, 제공되지 않으면 비제어 상태(uncontrolled mode)로 처리됩니다.
 *
 * controlled mode에서는 value는 외부에서 제어되며,
 * 해당 훅이 반환하는 setValue 함수를 통해 value를 변경할 수 없습니다.
 *
 * uncontrolled mode에서는 defaultValue가 초기값으로 사용되며,
 * 해당 훅이 반환하는 setValue 함수를 통해 value를 변경할 수 있습니다.
 *
 * @template T - 상태의 타입입니다.
 * @param {T} params.value - 제어된 상태의 값입니다.
 * @param {T} params.defaultValue - 비제어된 상태의 초기값입니다.
 * @returns {UseControllableStateReturn<T>} value와 setValue 함수를 반환합니다.
 *
 * @example
 * const [outerValue, setOuterValue] = useState(1);
 * const [value, setValue] = useControllableState({ value: outerValue, defaultValue: 0 });
 *
 * value; // 1
 *
 * setValue(2); // controlled mode에서는 value가 외부에서 제어되기 때문에 변경되지 않음
 * value; // 1
 *
 * setOuterValue(3); // 외부 value 변경
 * value; // 3
 *
 * @example
 * const [value, setValue] = useControllableState({ defaultValue: 0 });
 *
 * // or
 * // const [value, setValue] = useControllableState({
 * //   value: undefined,
 * //   defaultValue: 0
 * // });
 *
 * value; // 0
 *
 * setValue(1); // uncontrolled mode에서는 setValue로 value 변경
 * value; // 1
 */
export function useControllableState<T>({
  value,
  defaultValue,
}: UseControllableStateOptions<T>): [
  T,
  (nextValue: SetStateAction<T>) => void
] {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: SetStateAction<T>) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
    },
    [isControlled]
  );

  return [currentValue, setValue];
}
