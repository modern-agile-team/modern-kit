import { useEffect } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { noop } from '@modern-kit/utils';

type VisibilityChangeCallbackAction = (
  event: Event,
  visibilityState: DocumentVisibilityState
) => void;

interface UseVisibilityChangeProps {
  onShow?: VisibilityChangeCallbackAction;
  onHide?: VisibilityChangeCallbackAction;
}

export const useVisibilityChange = ({
  onShow = noop,
  onHide = noop,
}: UseVisibilityChangeProps) => {
  const handleVisibilityChange = usePreservedCallback((event: Event) => {
    const isVisible = document.visibilityState === 'visible';
    const callbackAction = isVisible ? onShow : onHide;

    callbackAction(event, document.visibilityState);
  });

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
};
