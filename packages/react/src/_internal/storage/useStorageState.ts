import { isFunction } from '@modern-kit/utils';
import {
  SetStateAction,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  getServerSnapshot,
  parseSnapshot,
  storageStores,
  StorageType,
} from './storageStore';
import { useVisibilityChange } from '../../hooks/useVisibilityChange';

export interface UseStorageStateOptions<T> {
  key: string;
  initialValue?: T | (() => T);
  visibilityChange?: boolean;
  throwOnError?: boolean;
}

/**
 * @description `useLocalStorage` / `useSessionStorage` 의 공통 구현입니다.
 *
 * 공개 API 의 오버로드 시그니처와 문서는 각 훅에서 관리하고, 상태 동기화 로직은 이 훅에서만 관리합니다.
 *
 * @param {StorageType} storageType - 사용할 스토리지 타입
 * @param {UseStorageStateOptions<T>} options - 각 훅에서 전달받은 옵션
 */
export function useStorageState<T>(
  storageType: StorageType,
  options: UseStorageStateOptions<T>
) {
  const { key, visibilityChange = false, throwOnError = true } = options;
  const store = storageStores[storageType];

  const [initialValueToUse] = useState(() => {
    const initialValue =
      'initialValue' in options ? options.initialValue : null;
    return (
      isFunction(initialValue) ? initialValue() : initialValue
    ) as T | null;
  });

  const externalStoreState = useSyncExternalStore(
    store.subscribe,
    () => store.getSnapshot(key, throwOnError),
    () => getServerSnapshot(initialValueToUse)
  );

  const state = useMemo(() => {
    return parseSnapshot<T>(
      externalStoreState,
      initialValueToUse,
      throwOnError
    );
  }, [externalStoreState, initialValueToUse, throwOnError]);

  const setState = useCallback(
    (value: SetStateAction<T | null>) => {
      try {
        const prevState = parseSnapshot<T>(
          store.getSnapshot(key, throwOnError),
          initialValueToUse,
          throwOnError
        );
        const valueToUse = isFunction(value) ? value(prevState) : value;

        window[storageType].setItem(key, JSON.stringify(valueToUse));
        store.dispatchEvent();
      } catch (err) {
        throw new Error(
          `"${storageType}"에 키 "${key}"의 데이터를 저장하는 데 실패했습니다: ${err}`,
          { cause: err }
        );
      }
    },
    [store, storageType, key, initialValueToUse, throwOnError]
  );

  const removeState = useCallback(() => {
    try {
      window[storageType].removeItem(key);
      store.dispatchEvent();
    } catch (err) {
      throw new Error(
        `"${storageType}"에서 키 "${key}"를 제거하는 데 실패했습니다: ${err}`,
        { cause: err }
      );
    }
  }, [store, storageType, key]);

  useVisibilityChange({
    onShow: () => store.dispatchEvent(),
    enabled: visibilityChange,
  });

  return { state, setState, removeState };
}
