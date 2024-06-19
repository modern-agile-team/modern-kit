import { isFunction } from '@modern-kit/utils';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

interface UseLocalStorageProps<T> {
  key: string;
  initialValue?: T | (() => T) | null;
}

const LOCAL_STORAGE_EVENT_KEY = 'local-storage';

const localStorageEventHandler = {
  key: LOCAL_STORAGE_EVENT_KEY,
  subscribe: (callback: () => void) => {
    window.addEventListener(LOCAL_STORAGE_EVENT_KEY, callback);
  },
  unsubscribe: (callback: () => void) => {
    window.removeEventListener(LOCAL_STORAGE_EVENT_KEY, callback);
  },
  dispatchEvent: () => {
    window.dispatchEvent(new StorageEvent(LOCAL_STORAGE_EVENT_KEY));
  },
};

const subscribe = (callback: () => void) => {
  localStorageEventHandler.subscribe(callback);
  return () => {
    localStorageEventHandler.unsubscribe(callback);
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
  useState;
  const initialValueToUse = useMemo(() => {
    return isFunction(initialValue) ? initialValue() : initialValue;
  }, [initialValue]);

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
    (value: T | ((state: T | null) => T)) => {
      try {
        const valueToUse = isFunction(value) ? value(state) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToUse));
        localStorageEventHandler.dispatchEvent();
      } catch (err) {
        throw new Error(
          `Failed to store data for key "${key}" in localStorage: ${err}`
        );
      }
    },
    [key, state]
  );

  const removeState = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      localStorageEventHandler.dispatchEvent();
    } catch (err) {
      throw new Error(
        `Failed to remove key "${key}" from localStorage: ${err}`
      );
    }
  }, [key]);

  return { state, setState, removeState } as const;
};
