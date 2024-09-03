import { getCustomEventHandler } from '../../_internal/storage';

export const sessionStorageEventHandler =
  getCustomEventHandler('sessionStorage');

export const getSnapshot = (key: string) => {
  return window.sessionStorage.getItem(key);
};

// SSR 환경에서 initialValue를 반환
export const getServerSnapshot = <T>(initialValue: T | null) => {
  return JSON.stringify(initialValue);
};

export const subscribe = (callback: () => void) => {
  sessionStorageEventHandler.subscribe(callback);
  return () => {
    sessionStorageEventHandler.unsubscribe(callback);
  };
};
