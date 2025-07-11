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
  localStorageEventHandler,
  subscribe,
} from './useLocalStorage.utils';
import { useVisibilityChange } from '../useVisibilityChange';

interface UseLocalStorageWithoutInitialValueProps {
  key: string;
  visibilityChange?: boolean;
}

interface UseLocalStorageWithInitialValueProps<T> {
  key: string;
  initialValue: T | (() => T);
  visibilityChange?: boolean;
}

type UseLocalStorageProps<T> =
  | UseLocalStorageWithoutInitialValueProps
  | UseLocalStorageWithInitialValueProps<T>;

/**
 * @description `useLocalStorage` 훅은 지정된 `key`를 사용하여 `localStorage`에 데이터를 저장하고 불러오는 기능을 제공합니다.
 *
 * @template T - `state`의 데이터 타입입니다.
 *
 * @param {UseLocalStorageWithInitialValueProps<T>} props - initialValue를 포함한 useLocalStorage 훅의 속성입니다.
 * @param {string} props.key - `localStorage`에서 데이터를 저장하고 가져올 때 사용하는 키입니다. 필수 속성입니다.
 * @param {T | (() => T)} props.initialValue - `state`의 초기 값을 설정합니다. 함수로 전달할 경우 함수의 반환값이 초기 값으로 사용됩니다.
 * @param {boolean} [props.visibilityChange=false] - 브라우저 탭의 가시성 변경 이벤트를 감지하여 가시성 상태가 되면 `state`를 동기화합니다. 사용 케이스로 `sessionStorage`와 다르게 탭 간 공유되는 저장소이기 때문에 탭 간 동기화가 필요할 때 사용합니다.
 *
 * @returns {{
 *  state: T;
 *  setState: Dispatch<SetStateAction<T>>;
 *  removeState: () => void;
 * }}
 * - `state`: 현재 `localStorage`에 저장된 값입니다. 값이 없을 경우 initialValue로 초기화됩니다.
 * - `setState`: `localStorage`에 저장된 값을 업데이트합니다. 새로운 값 또는 이전 상태를 인자로 받는 함수를 전달할 수 있습니다.
 * - `removeState`: `localStorage`에서 해당 `key`의 값을 삭제합니다.
 *
 * @example
 * const { state, setState, removeState } = useLocalStorage<string>({
 *   key: 'username',
 *   initialValue: 'Guest',
 * });
 *
 * state; // string
 */
export function useLocalStorage<T>({
  key,
  initialValue,
  visibilityChange,
}: UseLocalStorageWithInitialValueProps<T>): {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  removeState: () => void;
};

/**
 * @description `useLocalStorage` 훅은 지정된 `key`를 사용하여 `localStorage`에 데이터를 저장하고 불러오는 기능을 제공합니다.
 *
 * @template T - `state`의 데이터 타입입니다.
 *
 * @param {UseLocalStorageWithoutInitialValueProps} props - initialValue가 없는 useLocalStorage 훅의 속성입니다.
 * @param {string} props.key - `localStorage`에서 데이터를 저장하고 가져올 때 사용하는 키입니다. 필수 속성입니다.
 * @param {boolean} [props.visibilityChange=false] - 브라우저 탭의 가시성 변경 이벤트를 감지하여 가시성 상태가 되면 `state`를 동기화합니다.
 * 사용 케이스로 `sessionStorage`와 다르게 탭 간 공유되는 저장소이기 때문에 탭 간 동기화가 필요할 때 사용합니다.
 *
 * @returns {{
 *  state: T | null;
 *  setState: Dispatch<SetStateAction<T | null>>;
 *  removeState: () => void;
 * }}
 * - `state`: 현재 `localStorage`에 저장된 값입니다. 값이 없을 경우 `null`을 반환합니다.
 * - `setState`: `localStorage`에 저장된 값을 업데이트합니다. 새로운 값 또는 이전 상태를 인자로 받는 함수를 전달할 수 있습니다.
 * - `removeState`: `localStorage`에서 해당 `key`의 값을 삭제합니다.
 *
 * @example
 * const { state, setState, removeState } = useLocalStorage<string>({
 *   key: 'username',
 * });
 *
 * state; // string | null
 */
export function useLocalStorage<T = unknown>({
  key,
  visibilityChange,
}: UseLocalStorageWithoutInitialValueProps): {
  state: T | null;
  setState: Dispatch<SetStateAction<T | null>>;
  removeState: () => void;
};
export function useLocalStorage<T>(props: UseLocalStorageProps<T>) {
  const { key, visibilityChange = false } = props;
  const initialValue = 'initialValue' in props ? props.initialValue : null;

  const initialValueToUse = isFunction(initialValue)
    ? initialValue()
    : initialValue;

  const externalStoreState = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key),
    () => getServerSnapshot(initialValueToUse)
  );

  const state = useMemo(() => {
    return externalStoreState
      ? parseJSON<T>(externalStoreState)
      : initialValueToUse;
  }, [externalStoreState, initialValueToUse]);

  const setState = useCallback(
    (value: SetStateAction<T | null>) => {
      try {
        const prevStateString = getSnapshot(key);
        const prevState = prevStateString
          ? parseJSON<T>(prevStateString)
          : initialValueToUse;
        const valueToUse = isFunction(value) ? value(prevState) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToUse));
        localStorageEventHandler.dispatchEvent();
      } catch (err) {
        throw new Error(
          `로컬 스토리지 "${key}" key에 데이터를 저장하는데 실패했습니다: ${err}`
        );
      }
    },
    [key, initialValueToUse]
  );

  const removeState = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      localStorageEventHandler.dispatchEvent();
    } catch (err) {
      throw new Error(
        `로컬 스토리지 "${key}" key의 데이터를 삭제하는데 실패했습니다: ${err}`
      );
    }
  }, [key]);

  useVisibilityChange({
    onShow: () => localStorageEventHandler.dispatchEvent(),
    enabled: visibilityChange,
  });

  return { state, setState, removeState };
}
