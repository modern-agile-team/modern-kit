import { parseJSON } from '@modern-kit/utils';

export type StorageType = 'localStorage' | 'sessionStorage';

const STORAGE_EVENT_KEYS: Record<StorageType, string> = {
  localStorage: 'modern-kit-local-storage',
  sessionStorage: 'modern-kit-session-storage',
};

/**
 * @description 스토리지 타입별로 `useSyncExternalStore` 에 연결할 외부 스토어를 생성합니다.
 *
 * `subscribe` 는 렌더링마다 새로 만들어지면 재구독이 일어나므로, 모듈 단위로 한 번만 생성해 참조를 유지합니다.
 *
 * @param {StorageType} storageType - 스토리지 타입
 */
const createStorageStore = (storageType: StorageType) => {
  const eventKey = STORAGE_EVENT_KEYS[storageType];

  return {
    storageType,
    /**
     * @description 스토리지에서 원본 문자열을 읽습니다.
     * 스토리지 접근이 막힌 환경(SecurityError 등)에서 `throwOnError` 가 false 이면 값이 없는 것(`null`)으로 처리합니다.
     */
    getSnapshot: (key: string, throwOnError = true) => {
      try {
        return window[storageType].getItem(key);
      } catch (err) {
        if (throwOnError) {
          throw err;
        }
        return null;
      }
    },
    subscribe: (callback: () => void) => {
      window.addEventListener(eventKey, callback);
      return () => {
        window.removeEventListener(eventKey, callback);
      };
    },
    dispatchEvent: () => {
      window.dispatchEvent(new StorageEvent(eventKey));
    },
  };
};

export type StorageStore = ReturnType<typeof createStorageStore>;

export const storageStores: Record<StorageType, StorageStore> = {
  localStorage: createStorageStore('localStorage'),
  sessionStorage: createStorageStore('sessionStorage'),
};

// SSR 환경에서 initialValue를 반환
export const getServerSnapshot = <T>(initialValue: T | null) => {
  return JSON.stringify(initialValue);
};

/**
 * @description 스토리지 snapshot 문자열을 파싱합니다. 키가 없으면 `fallback` 을 반환합니다.
 *
 * @param {string | null | undefined} snapshot - 스토리지에 저장된 문자열
 * @param {T | null} fallback - 키가 없거나, 파싱에 실패하고 `throwOnError` 가 false 일 때 반환할 값
 * @param {boolean} throwOnError - 파싱에 실패했을 때 에러를 발생시킬지 여부
 *
 * @throws {Error} - `throwOnError` 가 true 일 때 파싱에 실패하면 오류를 발생시킵니다.
 */
export const parseSnapshot = <T>(
  snapshot: string | null | undefined,
  fallback: T | null,
  throwOnError: boolean
): T | null => {
  if (snapshot == null) {
    return fallback;
  }

  if (snapshot === 'undefined') {
    return undefined as T;
  }

  try {
    return parseJSON<T>(snapshot);
  } catch (err) {
    if (throwOnError) {
      throw err;
    }
    return fallback;
  }
};
