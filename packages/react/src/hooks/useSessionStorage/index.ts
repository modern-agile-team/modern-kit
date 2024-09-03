import { isFunction, parseJSON } from '@modern-kit/utils';
import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { usePreservedState } from '../usePreservedState';
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
  setState: (value: T | ((state: T) => T)) => void;
  removeState: () => void;
};

export function useSessionStorage<T = unknown>({
  key,
}: UseSessionStorageWithoutInitialValueProps): {
  state: T | null;
  setState: (value: T | ((state: T | null) => T)) => void;
  removeState: () => void;
};

export function useSessionStorage<T>(props: UseSessionStorageProps<T>) {
  const { key } = props;
  const initialValue = 'initialValue' in props ? props.initialValue : null;

  const initialValueToUse = usePreservedState(
    isFunction(initialValue) ? initialValue() : initialValue
  );

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
    (value: T | ((state: T | null) => T)) => {
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
          `Failed to store data for key "${key}" in sessionStorage: ${err}`
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
        `Failed to remove key "${key}" from sessionStorage: ${err}`
      );
    }
  }, [key]);

  return { state, setState, removeState };
}
