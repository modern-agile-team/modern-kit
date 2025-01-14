const CUSTOM_EVENT_KEYS = 'modern-kit-local-storage';

export const localStorageEventHandler = {
  key: CUSTOM_EVENT_KEYS,
  subscribe: (callback: () => void) => {
    window.addEventListener(CUSTOM_EVENT_KEYS, callback);
  },
  unsubscribe: (callback: () => void) => {
    window.removeEventListener(CUSTOM_EVENT_KEYS, callback);
  },
  dispatchEvent: () => {
    window.dispatchEvent(new StorageEvent(CUSTOM_EVENT_KEYS));
  },
};

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
