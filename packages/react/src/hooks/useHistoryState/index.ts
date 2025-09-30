import { isFunction } from '@modern-kit/utils';
import { useCallback, useMemo, useState } from 'react';
import { at } from '@modern-kit/utils';

interface UseHistoryStateReturn<T> {
  state: T;
  canForward: boolean;
  canBack: boolean;
  setState: (newState: T | ((prevState: T) => T)) => void;
  replaceState: (newState: T | ((prevState: T) => T)) => void;
  back: () => void;
  forward: () => void;
  go: (index: number) => void;
}

interface HistoryState<T> {
  history: T[];
  current: T;
  pointer: number;
}

/**
 * @description 상태와 상태 변경 이력을 관리하는 훅입니다.
 *
 * 상태 변경 시마다 이력이 저장되며, 상태 히스토리를 이전(`back`)과 다음(`forward`)으로 이동할 수 있습니다. 또한 특정 시점의 상태로 이동(`go`)할 수 있으며, 현재 상태를 대체(`replaceState`)할 수 있습니다.
 *
 * 저장되는 이력의 최대 개수(`capacity`)를 제한할 수 있습니다.
 *
 * @template T - 상태의 타입
 * @param {T | (() => T)} initialValue - 초기 상태 값 또는 초기 상태를 반환하는 함수
 * @param {number} [capacity=10] - 상태 변경 이력의 최대 저장 개수. 기본값은 10
 * @returns {UseHistoryStateReturn<T>} 상태 관리를 위한 객체
 * - `state`: 현재 상태 값
 * - `canForward`: 다음 상태로 이동할 수 있는지 여부
 * - `canBack`: 이전 상태로 이동할 수 있는지 여부
 * - `setState`: 상태 히스토리에 상태를 추가하고 새로운 상태로 업데이트합니다.
 * - `replaceState`: 상태 히스토리에 현재 상태를 대체하고 새로운 상태로 업데이트합니다.
 * - `back`: 상태 히스토리에서 이전 상태로 되돌리는 함수
 * - `forward`: 상태 히스토리에서 다음 상태로 이동하는 함수
 * - `go`: 상태 히스토리에서 특정 인덱스의 상태로 이동하는 함수
 *
 * @example
 * const { state, setState, replaceState, back, forward, go } = useHistoryState(0, 5);
 *
 * setState(1);  // history: [0, 1], state: 1
 * setState(2);  // history: [0, 1, 2], state: 2
 * replaceState(3);  // history: [0, 1, 3], state: 3
 * back();       // history: [0, 1, 3], state: 1
 * forward();    // history: [0, 1, 3], state: 3
 * go(0); // history: [0, 1, 2], state: 0
 * setState(4);  // history: [0, 1, 3, 4], state: 4
 */
export function useHistoryState<T>(
  initialValue: T | (() => T),
  capacity: number = 10
): UseHistoryStateReturn<T> {
  const initialValueToUse = isFunction(initialValue)
    ? initialValue()
    : initialValue;

  const [state, innerSetState] = useState<HistoryState<T>>({
    history: [initialValueToUse],
    current: initialValueToUse,
    pointer: 0,
  });

  const canForward = useMemo(
    () => state.pointer < state.history.length - 1,
    [state.pointer, state.history.length]
  );
  const canBack = useMemo(() => state.pointer > 0, [state.pointer]);

  const setState = useCallback(
    (newState: T | ((prevState: T) => T)) => {
      innerSetState((prev) => {
        const history = [...prev.history];
        const newStateToUse = isFunction(newState)
          ? newState(history[prev.pointer])
          : newState;

        if (history.length === capacity) {
          history.shift();
        }

        history.push(newStateToUse);
        prev.pointer = history.length - 1;

        return { history, current: newStateToUse, pointer: prev.pointer };
      });
    },
    [capacity]
  );

  const replaceState = useCallback((newState: T | ((prevState: T) => T)) => {
    innerSetState((prev) => {
      const history = [...prev.history];
      const newStateToUse = isFunction(newState)
        ? newState(history[prev.pointer])
        : newState;

      history[prev.pointer] = newStateToUse;
      return { ...prev, history, current: newStateToUse };
    });
  }, []);

  const back = useCallback(() => {
    innerSetState((prev) => {
      if (prev.pointer < 1) {
        return prev;
      }

      const pointer = prev.pointer - 1;

      return {
        ...prev,
        current: prev.history[pointer],
        pointer,
      };
    });
  }, []);

  const forward = useCallback(() => {
    innerSetState((prev) => {
      if (prev.pointer >= prev.history.length - 1) {
        return prev;
      }

      const pointer = prev.pointer + 1;

      return {
        ...prev,
        current: prev.history[pointer],
        pointer,
      };
    });
  }, []);

  const go = useCallback((index: number) => {
    innerSetState((prev) => {
      const element = at(prev.history, index);

      if (element == null) {
        return prev;
      }

      const pointer = index < 0 ? prev.history.length + index : index;

      return { ...prev, current: element, pointer };
    });
  }, []);

  return {
    state: state.current,
    canForward,
    canBack,
    setState,
    replaceState,
    forward,
    back,
    go,
  };
}
