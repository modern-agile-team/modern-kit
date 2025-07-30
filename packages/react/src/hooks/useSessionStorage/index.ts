import { isFunction, parseJSON } from '@modern-kit/utils';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import {
  getServerSnapshot,
  getSnapshot,
  sessionStorageEventHandler,
  subscribe,
  getParsedState,
} from './useSessionStorage.utils';

interface UseSessionStorageWithoutInitialValueOptions {
  key: string;
}

interface UseSessionStorageWithInitialValueOptions<T> {
  key: string;
  initialValue: T | (() => T);
}

type UseSessionStorageOptions<T> =
  | UseSessionStorageWithoutInitialValueOptions
  | UseSessionStorageWithInitialValueOptions<T>;

/**
 * @description `useSessionStorage` 훅은 지정된 `key`를 사용하여 `sessionStorage`에 데이터를 저장하고 불러오는 기능을 제공합니다.
 *
 * @template T - `state`의 데이터 타입입니다.
 *
 * @param {UseSessionStorageWithInitialValueOptions<T>} options - initialValue를 포함한 useSessionStorage 훅의 속성입니다.
 * @param {string} options.key - `sessionStorage`에서 데이터를 저장하고 가져올 때 사용하는 키입니다. 필수 속성입니다.
 * @param {T | (() => T)} options.initialValue - `state`의 초기 값을 설정합니다. 함수로 전달할 경우 함수의 반환값이 초기 값으로 사용됩니다.
 *
 * @returns {{
 *  state: T;
 *  setState: Dispatch<SetStateAction<T>>;
 *  removeState: () => void;
 * }}
 * - `state`: 현재 `sessionStorage`에 저장된 값입니다. 값이 없을 경우 initialValue로 초기화됩니다.
 * - `setState`: `sessionStorage`에 저장된 값을 업데이트합니다. 새로운 값 또는 이전 상태를 인자로 받는 함수를 전달할 수 있습니다.
 * - `removeState`: `sessionStorage`에서 해당 `key`의 값을 삭제합니다.
 *
 * @example
 * const { state, setState, removeState } = useSessionStorage<string>({
 *   key: 'username',
 *   initialValue: 'Guest',
 * });
 *
 * state; // string
 */
export function useSessionStorage<T>({
  key,
  initialValue,
}: UseSessionStorageWithInitialValueOptions<T>): {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  removeState: () => void;
};

/**
 * @description `useSessionStorage` 훅은 지정된 `key`를 사용하여 `sessionStorage`에 데이터를 저장하고 불러오는 기능을 제공합니다.
 *
 * @template T - `state`의 데이터 타입입니다.
 *
 * @param {UseSessionStorageWithoutInitialValueOptions} options - initialValue가 없는 useSessionStorage 훅의 속성입니다.
 * @param {string} options.key - `sessionStorage`에서 데이터를 저장하고 가져올 때 사용하는 키입니다. 필수 속성입니다.
 *
 * @returns {{
 *  state: T | null;
 *  setState: Dispatch<SetStateAction<T | null>>;
 *  removeState: () => void;
 * }}
 * - `state`: 현재 `sessionStorage`에 저장된 값입니다. 값이 없을 경우 `null`을 반환합니다.
 * - `setState`: `sessionStorage`에 저장된 값을 업데이트합니다. 새로운 값 또는 이전 상태를 인자로 받는 함수를 전달할 수 있습니다.
 * - `removeState`: `sessionStorage`에서 해당 `key`의 값을 삭제합니다.
 *
 * @example
 * const { state, setState, removeState } = useSessionStorage<string>({
 *   key: 'username',
 * });
 *
 * state; // string | null
 */
export function useSessionStorage<T = unknown>({
  key,
}: UseSessionStorageWithoutInitialValueOptions): {
  state: T | null;
  setState: Dispatch<SetStateAction<T | null>>;
  removeState: () => void;
};

export function useSessionStorage<T>(options: UseSessionStorageOptions<T>) {
  const { key } = options;
  const initialValue = 'initialValue' in options ? options.initialValue : null;

  const initialValueToUse = useMemo(() => {
    return isFunction(initialValue) ? initialValue() : initialValue;
  }, [initialValue]);

  const externalStoreState = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key),
    () => getServerSnapshot(initialValueToUse)
  );

  const state = useMemo(() => {
    return getParsedState<T>(externalStoreState, initialValueToUse);
  }, [externalStoreState, initialValueToUse]);

  const setState = useCallback(
    (value: SetStateAction<T | null>) => {
      try {
        const prevStateString = getSnapshot(key);
        const prevState = getParsedState<T>(prevStateString, initialValueToUse);
        const valueToUse = isFunction(value) ? value(prevState) : value;

        window.sessionStorage.setItem(key, JSON.stringify(valueToUse));
        sessionStorageEventHandler.dispatchEvent();
      } catch (err) {
        throw new Error(
          `세션 스토리지 "${key}" key에 데이터를 저장하는데 실패했습니다: ${err}`
        );
      }
    },
    [key, initialValueToUse]
  );

  const removeState = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key);
      sessionStorageEventHandler.dispatchEvent();
    } catch (err) {
      throw new Error(
        `세션 스토리지 "${key}" key의 데이터를 삭제하는데 실패했습니다: ${err}`
      );
    }
  }, [key]);

  return { state, setState, removeState };
}
