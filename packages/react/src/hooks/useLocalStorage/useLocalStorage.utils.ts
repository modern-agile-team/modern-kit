import { getCustomEventHandler } from '../../_internal/storage';

export const localStorageEventHandler = getCustomEventHandler('localStorage');

export const getSnapshot = (key: string) => {
  return window.localStorage.getItem(key);
};

// SSR 환경에서 initialValue를 반환
export const getServerSnapshot = <T>(initialValue: T | null) => {
  return JSON.stringify(initialValue);
};

export const subscribe = (callback: () => void) => {
  localStorageEventHandler.subscribe(callback);
  return () => {
    localStorageEventHandler.unsubscribe(callback);
  };
};
