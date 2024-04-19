import { useCallback, useEffect, useRef } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';

export interface UseIntersectionObserverProps {
  action: (entry: IntersectionObserverEntry) => void;
  calledOnce?: boolean;
  threshold?: number | number[];
  root?: Document | Element | null;
  rootMargin?: string;
}

export const useIntersectionObserver = <T extends HTMLElement>({
  action,
  calledOnce = false,
  root = null,
  threshold = 0,
  rootMargin = '0px 0px 0px 0px',
}: UseIntersectionObserverProps) => {
  const ref = useRef<T>(null);
  const callbackAction = usePreservedCallback(action);

  const observerCallback = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry) {
        if (entry.isIntersecting) {
          const targetElement = entry.target as HTMLElement;

          if (callbackAction) {
            callbackAction(entry);
          }

          if (calledOnce) {
            observer.unobserve(targetElement);
          }
        }
      }
    },
    [callbackAction, calledOnce]
  );

  useEffect(() => {
    const targetElement = ref.current;

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (!targetElement) {
      return;
    }

    const observer = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [root, threshold, rootMargin, observerCallback]);

  return ref;
};
