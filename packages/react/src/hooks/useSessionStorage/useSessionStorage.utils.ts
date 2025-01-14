const CUSTOM_EVENT_KEYS = 'modern-kit-session-storage';

export const sessionStorageEventHandler = {
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
