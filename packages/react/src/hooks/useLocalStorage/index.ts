import { isFunction, parseJSON } from '@modern-kit/utils';
import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { getCustomEventHandler } from '../../utils/customEventHandler';

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

const localStorageEventHandler = getCustomEventHandler('localStorage');

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

// 함수 오버로딩
export function useLocalStorage<T>({
  key,
  initialValue,
}: UseLocalStorageWithInitialValueProps<T>): {
  readonly state: T;
  readonly setState: (value: T | ((state: T) => T)) => void;
  readonly removeState: () => void;
};

export function useLocalStorage<T = unknown>({
  key,
}: UseLocalStorageWithoutInitialValueProps): {
  readonly state: T | null;
  readonly setState: (value: T | ((state: T | null) => T)) => void;
  readonly removeState: () => void;
};

export function useLocalStorage<T>(props: UseLocalStorageProps<T>) {
  const { key } = props;
  const initialValue = 'initialValue' in props ? props.initialValue : null;

  const initialValueToUse = useMemo(() => {
    return isFunction(initialValue) ? initialValue() : initialValue;
  }, [initialValue]);

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

        window.localStorage.setItem(key, JSON.stringify(valueToUse));
        localStorageEventHandler.dispatchEvent();
      } catch (err) {
        throw new Error(
          `Failed to store data for key "${key}" in localStorage: ${err}`
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
        `Failed to remove key "${key}" from localStorage: ${err}`
      );
    }
  }, [key]);

  return { state, setState, removeState } as const;
}
