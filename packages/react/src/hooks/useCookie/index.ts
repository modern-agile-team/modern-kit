import { isFunction } from '@modern-kit/utils';
import { usePreservedState } from '../../hooks/usePreservedState';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useSyncExternalStore,
} from 'react';
import {
  cookieEventHandler,
  subscribe,
  getSnapshot,
  getServerSnapshot,
} from './useCookie.utils';
import Cookies, { CookieAttributes } from 'js-cookie';

interface UseCookieWithoutInitialValueProps {
  key: string;
}

interface UseCookieWithInitialValueProps {
  key: string;
  initialValue: string | (() => string);
}

type UseCookieProps =
  | UseCookieWithoutInitialValueProps
  | UseCookieWithInitialValueProps;

// 함수 오버로딩
export function useCookie({
  key,
  initialValue,
}: UseCookieWithInitialValueProps): {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  removeState: () => void;
  getAllCookies: () => Record<string, string>;
};

export function useCookie({ key }: UseCookieWithoutInitialValueProps): {
  state: string | null;
  setState: Dispatch<SetStateAction<string>>;
  removeState: () => void;
  getAllCookies: () => Record<string, string>;
};

export function useCookie(props: UseCookieProps) {
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

  const setState = useCallback(
    (value: SetStateAction<string>, options?: CookieAttributes) => {
      try {
        const prevStateString = getSnapshot(key);
        const valueToUse = isFunction(value)
          ? value(prevStateString ?? initialValueToUse ?? '')
          : value;

        Cookies.set(key, valueToUse, options);
        cookieEventHandler.dispatchEvent();
      } catch (err) {
        throw new Error(
          `Failed to store data for key "${key}" in cookie: ${err}`
        );
      }
    },
    [key]
  );

  const removeState = useCallback(() => {
    try {
      cookieEventHandler.dispatchEvent();
      Cookies.remove(key);
    } catch (err) {
      throw new Error(`Failed to remove key "${key}" from cookie: ${err}`);
    }
  }, [key]);

  const getAllCookies = useCallback(() => {
    return Cookies.get();
  }, []);

  return {
    state: externalStoreState ?? initialValueToUse,
    setState,
    removeState,
    getAllCookies,
  };
}
