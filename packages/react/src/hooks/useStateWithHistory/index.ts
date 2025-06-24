import { isFunction } from '@modern-kit/utils';
import { useCallback, useRef, useState } from 'react';
import { at } from '@modern-kit/utils';

interface UseStateWithHistoryReturn<T> {
  state: T;
  setState: (newState: T | ((prevState: T) => T)) => void;
  back: () => void;
  forward: () => void;
  goToIndex: (index: number) => void;
}

/**
 * @description 상태와 상태 변경 이력을 관리하는 훅입니다.
 *
 * 상태 변경 시마다 이력이 저장되며, 상태 히스토리를 이전(`back`)과 다음(`forward`)으로 이동할 수 있습니다. 또한 특정 시점의 상태로 이동(`goToIndex`)할 수 있으며, 저장되는 이력의 최대 개수(`capacity`)를 제한할 수 있습니다.
 *
 * @template T - 상태의 타입
 * @param {T | (() => T)} initialValue - 초기 상태 값 또는 초기 상태를 반환하는 함수
 * @param {number} [capacity=10] - 상태 변경 이력의 최대 저장 개수. 기본값은 10
 * @returns {UseStateWithHistoryReturn<T>} 상태 관리를 위한 객체
 * - `state`: 현재 상태 값
 * - `setState`: 상태 히스토리에 상태를 추가하고 새로운 상태로 업데이트합니다.
 * - `back`: 상태 히스토리에서 이전 상태로 되돌리는 함수
 * - `forward`: 상태 히스토리에서 다음 상태로 이동하는 함수
 * - `goToIndex`: 상태 히스토리에서 특정 인덱스의 상태로 이동하는 함수
 *
 * @example
 * const { state, setState, back, forward, goToIndex } = useStateWithHistory(0, 5);
 *
 * setState(1);      // history: [0, 1], state: 1
 * setState(2);      // history: [0, 1, 2], state: 2
 * back();       // history: [0, 1, 2], state: 1
 * forward();       // history: [0, 1, 2], state: 2
 * goToIndex(0); // history: [0, 1, 2], state: 0
 */
export function useStateWithHistory<T>(
  initialValue: T | (() => T),
  capacity: number = 10
): UseStateWithHistoryReturn<T> {
  const initialValueToUse = isFunction(initialValue)
    ? initialValue()
    : initialValue;
  const [state, innerSetState] = useState<T>(initialValueToUse);
  const history = useRef<T[]>([initialValueToUse]);
  const pointer = useRef<number>(0);

  // 상태 변경
  const setState = useCallback(
    (newState: T | ((prevState: T) => T)) => {
      const newStateToUse = isFunction(newState) ? newState(state) : newState;

      if (history.current.length === capacity) {
        history.current.shift();
      }
      history.current.push(newStateToUse);
      pointer.current = history.current.length - 1;
      innerSetState(newStateToUse);
    },
    [capacity, state]
  );

  const back = useCallback(() => {
    if (pointer.current < 1) {
      return;
    }
    pointer.current--;
    innerSetState(history.current[pointer.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointer.current >= history.current.length - 1) {
      return;
    }
    pointer.current++;
    innerSetState(history.current[pointer.current]);
  }, []);

  const goToIndex = useCallback((index: number) => {
    if (at(history.current, index) == null) {
      return;
    }
    pointer.current = index;
    innerSetState(at(history.current, pointer.current) as T);
  }, []);

  return { state, setState, forward, back, goToIndex };
}
