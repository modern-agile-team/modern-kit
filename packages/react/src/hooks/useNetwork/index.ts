import { usePreservedCallback } from '../usePreservedCallback';
import { noop } from '@modern-kit/utils';
import { useSyncExternalStore } from 'react';

interface UseNetworkProps {
  onlineCallback?: (event: Event) => void;
  offlineCallback?: (event: Event) => void;
}

const getSnapshot = () => {
  return navigator.onLine;
};

const getServerSnapshot = () => {
  return true;
};

const subscribe = (
  onStoreChange: () => void,
  onlineCallback: (event: Event) => void,
  offlineCallback: (event: Event) => void
) => {
  const handleOnlineCallback = (event: Event) => {
    onlineCallback(event);
    return onStoreChange();
  };

  const handleOfflineCallback = (event: Event) => {
    offlineCallback(event);
    return onStoreChange();
  };

  window.addEventListener('online', handleOnlineCallback);
  window.addEventListener('offline', handleOfflineCallback);

  return () => {
    window.removeEventListener('online', handleOnlineCallback);
    window.removeEventListener('offline', handleOfflineCallback);
  };
};

export const useNetwork = ({
  onlineCallback = noop,
  offlineCallback = noop,
}: UseNetworkProps = {}) => {
  const preservedSubscribe = usePreservedCallback((onStoreChange: () => void) =>
    subscribe(onStoreChange, onlineCallback, offlineCallback)
  );

  const isOnline = useSyncExternalStore(
    preservedSubscribe,
    getSnapshot,
    getServerSnapshot
  );

  return { isOnline };
};
