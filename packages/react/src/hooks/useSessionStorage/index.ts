import { isFunction, parseJSON } from '@modern-kit/utils';
import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { getCustomEventHandler } from '../../utils/customEventHandler';

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

const sessionStorageEventHandler = getCustomEventHandler('sessionStorage');

const subscribe = (callback: () => void) => {
  sessionStorageEventHandler.subscribe(callback);
  return () => {
    sessionStorageEventHandler.unsubscribe(callback);
  };
};

const getSnapshot = (key: string) => {
  return window.sessionStorage.getItem(key);
};

// SSR 환경에서 initialValue를 반환
const getServerSnapshot = <T>(initialValue: T | null) => {
  return JSON.stringify(initialValue);
};

export function useSessionStorage<T>({
  key,
  initialValue,
}: UseSessionStorageWithInitialValueProps<T>): {
  readonly state: T;
  readonly setState: (value: T | ((state: T) => T)) => void;
  readonly removeState: () => void;
};

export function useSessionStorage<T = unknown>({
  key,
}: UseSessionStorageWithoutInitialValueProps): {
  readonly state: T | null;
  readonly setState: (value: T | ((state: T | null) => T)) => void;
  readonly removeState: () => void;
};

export function useSessionStorage<T>(props: UseSessionStorageProps<T>) {
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

  return { state, setState, removeState } as const;
}
