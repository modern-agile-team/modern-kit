import { usePreservedCallback } from '../usePreservedCallback';
import { useCallback, useEffect, useRef, useState } from 'react';

type ContentRect = Omit<DOMRectReadOnly, 'toJSON'>;

export function useResizeObserver<T extends HTMLElement>(
  action?: (entry: ResizeObserverEntry) => void
) {
  const [contentRect, setContentRect] = useState<ContentRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const ref = useRef<T>(null);
  const callbackAction = usePreservedCallback(action);

  const observerCallback = useCallback(
    ([entry]: ResizeObserverEntry[]) => {
      if (entry) {
        callbackAction(entry);
        setContentRect(entry.contentRect);
      }
    },
    [callbackAction]
  );

  useEffect(() => {
    const targetElement = ref.current;

    if (!targetElement) {
      return;
    }

    const observer = new ResizeObserver(observerCallback);

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [observerCallback]);

  return { ref, contentRect };
}
