const CUSTOM_EVENT_KEYS = {
  localStorage: 'modern-kit-local-storage',
  sessionStorage: 'modern-kit-session-storage',
  cookie: 'modern-kit-cookie',
} as const;

const customEventHandler = {
  localStorage: {
    key: CUSTOM_EVENT_KEYS['localStorage'],
    subscribe: (callback: () => void) => {
      window.addEventListener(CUSTOM_EVENT_KEYS['localStorage'], callback);
    },
    unsubscribe: (callback: () => void) => {
      window.removeEventListener(CUSTOM_EVENT_KEYS['localStorage'], callback);
    },
    dispatchEvent: () => {
      window.dispatchEvent(new StorageEvent(CUSTOM_EVENT_KEYS['localStorage']));
    },
  },
  sessionStorage: {
    key: CUSTOM_EVENT_KEYS['sessionStorage'],
    subscribe: (callback: () => void) => {
      window.addEventListener(CUSTOM_EVENT_KEYS['sessionStorage'], callback);
    },
    unsubscribe: (callback: () => void) => {
      window.removeEventListener(CUSTOM_EVENT_KEYS['sessionStorage'], callback);
    },
    dispatchEvent: () => {
      window.dispatchEvent(
        new StorageEvent(CUSTOM_EVENT_KEYS['sessionStorage'])
      );
    },
  },
  cookie: {
    key: CUSTOM_EVENT_KEYS['cookie'],
    subscribe: (callback: () => void) => {
      window.addEventListener(CUSTOM_EVENT_KEYS['cookie'], callback);
    },
    unsubscribe: (callback: () => void) => {
      window.removeEventListener(CUSTOM_EVENT_KEYS['cookie'], callback);
    },
    dispatchEvent: () => {
      window.dispatchEvent(new StorageEvent(CUSTOM_EVENT_KEYS['cookie']));
    },
  },
};

export const getCustomEventHandler = (key: keyof typeof CUSTOM_EVENT_KEYS) => {
  return customEventHandler[key];
};
