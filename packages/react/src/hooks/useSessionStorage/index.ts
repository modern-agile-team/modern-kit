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
} from './useSessionStorage.utils';

interface UseSessionStorageWithoutInitialValueProps {
  key: string;
}

interface UseSessionStorageWithInitialValueProps<T> {
  key: string;
  initialValue: T | (() => T);
}

type UseSessionStorageProps<T> =
  | UseSessionStorageWithoutInitialValueProps
  | UseSessionStorageWithInitialValueProps<T>;

export function useSessionStorage<T>({
  key,
  initialValue,
}: UseSessionStorageWithInitialValueProps<T>): {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  removeState: () => void;
};

export function useSessionStorage<T = unknown>({
  key,
}: UseSessionStorageWithoutInitialValueProps): {
  state: T | null;
  setState: Dispatch<SetStateAction<T | null>>;
  removeState: () => void;
};

export function useSessionStorage<T>(props: UseSessionStorageProps<T>) {
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
