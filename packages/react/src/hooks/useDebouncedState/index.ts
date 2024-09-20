import {
  DebounceParameters,
  DebounceReturnType,
  useDebounce,
} from '../../hooks/useDebounce';
import { useState, Dispatch } from 'react';

/**
 * @description useState의 디바운스 버전의 훅입니다.
 *
 * @template T - 상태의 타입을 나타냅니다.
 * @param {T} initialState - 초기 상태 값입니다.
 * @param {DebounceParameters[1]} [wait] - 상태 업데이트 전에 기다리는 지연 시간(밀리초)입니다.
 * @param {DebounceParameters[2]} [options={}] - 디바운스 동작에 영향을 주는 추가 옵션입니다. `leading(default: false)`, `trailing(default: true)`, `maxWait` 옵션을 받을 수 있습니다.
 * @returns {[T, DebounceReturnType<Dispatch<React.SetStateAction<T>>>]} - 현재 디바운스된 상태와 상태를 업데이트하는 함수를 포함하는 배열을 반환합니다.
 *
 * @example
 * const [searchTerm, setSearchTerm] = useDebouncedState<string>("", 500);
 */
export function useDebouncedState<T>(
  initialState: T,
  wait: DebounceParameters[1],
  options: DebounceParameters[2] = {}
): [T, DebounceReturnType<Dispatch<React.SetStateAction<T>>>] {
  const [debouncedState, setState] = useState(initialState);
  const debouncedSetState = useDebounce(setState, wait, options);

  return [debouncedState, debouncedSetState];
}
