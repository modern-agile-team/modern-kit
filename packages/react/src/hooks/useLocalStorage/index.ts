import { isFunction } from '@modern-kit/utils';
import { usePreservedState } from '../usePreservedState';
import { useCallback, useMemo, useSyncExternalStore } from 'react';

interface UseLocalStorageProps<T> {
  key: string;
  initialValue?: T | (() => T) | null;
}

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('storage', callback);
  };
};

const getSnapshot = (key: string) => {
  return window.localStorage.getItem(key);
};

// SSR 환경에서 initialValue를 반환
const getServerSnapshot = <T>(initialValue: T | null) => {
  return JSON.stringify(initialValue);
};

export const useLocalStorage = <T>({
  key,
  initialValue = null,
}: UseLocalStorageProps<T>) => {
  const initialValueToUse = usePreservedState(
    isFunction(initialValue) ? initialValue() : initialValue
  );

  const externalStoreState = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key),
    () => getServerSnapshot(initialValueToUse)
  );

  const state = useMemo((): T | null => {
    try {
      return externalStoreState
        ? JSON.parse(externalStoreState)
        : initialValueToUse;
    } catch (err: any) {
      throw new Error(
        `Failed to parse localStorage data for key "${key}": ${err}`
      );
    }
  }, [key, externalStoreState, initialValueToUse]);

  const setState = useCallback(
    (value: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        throw new Error(
          `Failed to store data for key "${key}" in localStorage: ${err}`
        );
      }
    },
    [key]
  );

  const removeState = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      throw new Error(
        `Failed to remove key "${key}" from localStorage: ${err}`
      );
    }
  }, [key]);

  return { state, setState, removeState } as const;
};
