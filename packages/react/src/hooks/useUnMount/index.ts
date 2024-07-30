import { usePreservedCallback } from '../usePreservedCallback';
import { useEffect } from 'react';

export function useUnmount(callback: () => any) {
  const callbackAction = usePreservedCallback(callback);

  // update the ref each render so if it change the newest callback will be invoked
  useEffect(() => () => callbackAction(), [callbackAction]);
}
