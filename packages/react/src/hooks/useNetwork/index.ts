import { noop } from '@modern-kit/utils';
import { usePreservedCallback } from '../usePreservedCallback';
import { useSyncExternalStore } from 'react';

interface UseNetworkProps {
  onlineAction?: (event: Event) => void;
  offlineAction?: (event: Event) => void;
}

const getSnapshot = () => {
  return navigator.onLine;
};

/**
 * @see https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering
 */
const getServerSnapshot = () => {
  return true;
};

const subscribe = (
  onStoreChange: () => void,
  onlineAction: (event: Event) => void,
  offlineAction: (event: Event) => void
) => {
  const handleOnlineCallback = (event: Event) => {
    onlineAction(event);
    return onStoreChange();
  };

  const handleOfflineCallback = (event: Event) => {
    offlineAction(event);
    return onStoreChange();
  };

  window.addEventListener('online', handleOnlineCallback);
  window.addEventListener('offline', handleOfflineCallback);

  return () => {
    window.removeEventListener('online', handleOnlineCallback);
    window.removeEventListener('offline', handleOfflineCallback);
  };
};

/**
 * @description 네트워크 상태 변화를 감지하고, 현재 온라인 상태를 나타내는 `isOnline` 값을 반환합니다.
 * 또한, 네트워크 상태가 온라인 또는 오프라인으로 변경될 때 실행될 콜백 함수를 전달할 수 있습니다.
 *
 * @see https://react.dev/reference/react/useSyncExternalStore#subscribing-to-a-browser-api
 *
 * @param {UseNetworkProps} props - 네트워크 상태 변경 시 호출될 콜백 함수 설정을 위한 객체입니다.
 * @param {(event: Event) => void} [props.onlineAction] - 네트워크가 온라인 상태로 변경될 때 호출되는 콜백 함수입니다.
 * @param {(event: Event) => void} [props.offlineAction] - 네트워크가 오프라인 상태로 변경될 때 호출되는 콜백 함수입니다.
 *
 * @returns {boolean} 현재 네트워크가 온라인 상태인지 여부를 나타냅니다.
 *
 * @example
 * const isOnline = useNetwork({
 *   onlineAction: () => console.log('온라인 상태입니다!'),
 *   offlineAction: () => console.log('오프라인 상태입니다!')
 * });
 */
export function useNetwork({
  onlineAction = noop,
  offlineAction = noop,
}: UseNetworkProps = {}): boolean {
  const preservedSubscribe = usePreservedCallback((onStoreChange: () => void) =>
    subscribe(onStoreChange, onlineAction, offlineAction)
  );

  const isOnline = useSyncExternalStore(
    preservedSubscribe,
    getSnapshot,
    getServerSnapshot
  );

  return isOnline;
}
