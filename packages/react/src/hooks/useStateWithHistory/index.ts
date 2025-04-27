import { isFunction } from '@modern-kit/utils';
import { useCallback, useRef, useState } from 'react';

interface UseStateWithHistoryReturn<T> {
  state: T;
  push: (newState: T | ((prevState: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  goToIndex: (index: number) => void;
  saveSnapshot: () => void;
  restoreSnapshot: () => void;
}

/**
 * @description 상태와 상태 변경 이력을 관리하는 훅입니다.
 *
 * 상태 변경 시마다 이력이 저장되며, 실행 취소(`undo`)와 다시 실행(`redo`)이 가능합니다. 또한 특정 시점의 상태로 이동(`goToIndex`)할 수 있으며, 저장되는 이력의 최대 개수(`capacity`)를 제한할 수 있습니다.
 *
 * 또한 특정 시점의 상태를 스냅샷(`saveSnapshot`)으로 저장하고, 스냅샷으로 저장된 상태를 복원(`restoreSnapshot`)할 수 있습니다.
 *
 * @template T 상태의 타입
 * @param {T | (() => T)} initialValue - 초기 상태 값 또는 초기 상태를 반환하는 함수
 * @param {number} [capacity=10] - 상태 변경 이력의 최대 저장 개수. 기본값은 10
 * @returns {UseStateWithHistoryReturn<T>} 상태 관리를 위한 객체
 * - `state`: 현재 상태 값
 * - `push`: 새로운 상태를 추가하는 함수
 * - `undo`: 이전 상태로 되돌리는 함수
 * - `redo`: 되돌린 상태를 다시 적용하는 함수
 * - `goToIndex`: 특정 이력의 상태로 이동하는 함수
 * - `saveSnapshot`: 현재 상태를 스냅샷으로 저장하는 함수
 * - `restoreSnapshot`: 스냅샷으로 저장된 상태를 복원하는 함수
 *
 * @example
 * const { state, push, undo, redo, goToIndex, saveSnapshot, restoreSnapshot } = useStateWithHistory(0, 5);
 *
 * push(1);      // history: [0, 1], state: 1
 * push(2);      // history: [0, 1, 2], state: 2
 * undo();       // history: [0, 1, 2], state: 1
 * redo();       // history: [0, 1, 2], state: 2
 * goToIndex(0); // history: [0, 1, 2], state: 0
 *
 * saveSnapshot(); // snapshot: 0
 *
 * push(3);      // history: [0, 1, 2, 3], state: 3
 *
 * restoreSnapshot(); // history: [0, 1, 2, 3, 0], state: 0
 */
export function useStateWithHistory<T>(
  initialValue: T | (() => T),
  capacity: number = 10
): UseStateWithHistoryReturn<T> {
  const initialValueToUse = isFunction(initialValue)
    ? initialValue()
    : initialValue;
  const [state, setState] = useState<T>(initialValueToUse);
  const history = useRef<T[]>([initialValueToUse]);
  const pointer = useRef<number>(0);
  const snapshot = useRef<T | null>(null);

  // 상태 변경
  const push = useCallback(
    (newState: T | ((prevState: T) => T)) => {
      const newStateToUse = isFunction(newState) ? newState(state) : newState;

      if (history.current.length === capacity) {
        history.current.shift();
      }
      history.current.push(newStateToUse);
      pointer.current = history.current.length - 1;
      setState(newStateToUse);
    },
    [capacity]
  );

  // 실행 취소
  const undo = useCallback(() => {
    if (pointer.current < 1) {
      throw new Error('더 이상 실행 취소할 수 없습니다');
    }
    pointer.current--;
    setState(history.current[pointer.current]);
  }, [capacity]);

  // 다시 실행
  const redo = useCallback(() => {
    if (pointer.current >= history.current.length - 1) {
      throw new Error('더 이상 다시 실행할 수 없습니다');
    }
    pointer.current++;
    setState(history.current[pointer.current]);
  }, [capacity]);

  // 특정 인덱스로 이동
  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= history.current.length) {
        throw new Error('유효하지 않은 인덱스입니다');
      }
      pointer.current = index;
      setState(history.current[pointer.current]);
    },
    [capacity]
  );

  // 스냅샷 저장
  const saveSnapshot = useCallback(() => {
    snapshot.current = history.current[pointer.current];
  }, []);

  // 스냅샷 복원
  const restoreSnapshot = useCallback(() => {
    if (snapshot.current === null) {
      throw new Error('저장된 스냅샷이 없습니다');
    }
    setState(snapshot.current);
    history.current.push(snapshot.current);
    pointer.current = history.current.length - 1;
  }, []);

  return { state, push, redo, undo, goToIndex, saveSnapshot, restoreSnapshot };
}
