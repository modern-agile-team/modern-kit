import { noop } from '@modern-kit/utils';
import { useEventListener } from '../../hooks/useEventListener';
import { useCallback } from 'react';

type VisibilityChangeCallbackAction = (
  event: Event,
  visibilityState: DocumentVisibilityState
) => void;

interface UseVisibilityChangeProps {
  onShow?: VisibilityChangeCallbackAction;
  onHide?: VisibilityChangeCallbackAction;
}

export function useVisibilityChange({
  onShow = noop,
  onHide = noop,
}: UseVisibilityChangeProps = {}) {
  const handleVisibilityChange = useCallback(
    (event: Event) => {
      const isVisible = document.visibilityState === 'visible';
      const callbackAction = isVisible ? onShow : onHide;

      callbackAction(event, document.visibilityState);
    },
    [onShow, onHide]
  );

  useEventListener(document, 'visibilitychange', handleVisibilityChange);
}
