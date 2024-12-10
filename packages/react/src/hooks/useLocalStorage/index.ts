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

interface UseLocalStorageWithoutInitialValueProps {
  key: string;
}

interface UseLocalStorageWithInitialValueProps<T> {
  key: string;
  initialValue: T | (() => T);
}

type UseLocalStorageProps<T> =
  | UseLocalStorageWithoutInitialValueProps
  | UseLocalStorageWithInitialValueProps<T>;

// 함수 오버로딩
export function useLocalStorage<T>({
  key,
  initialValue,
}: UseLocalStorageWithInitialValueProps<T>): {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  removeState: () => void;
};

export function useLocalStorage<T = unknown>({
  key,
}: UseLocalStorageWithoutInitialValueProps): {
  state: T | null;
  setState: Dispatch<SetStateAction<T | null>>;
  removeState: () => void;
};

export function useLocalStorage<T>(props: UseLocalStorageProps<T>) {
  const { key } = props;
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

  return { state, setState, removeState };
}
