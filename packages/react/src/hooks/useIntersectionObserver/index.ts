import { useRef } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { noop } from '@modern-kit/utils';

export interface UseIntersectionObserverProps extends IntersectionObserverInit {
  action: (entry: IntersectionObserverEntry) => void;
  calledOnce?: boolean;
}

export const useIntersectionObserver = <T extends HTMLElement>({
  action,
  calledOnce = false,
  root = null,
  threshold = [0],
  rootMargin = '0px 0px 0px 0px',
}: UseIntersectionObserverProps) => {
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  const callbackAction = usePreservedCallback(action ?? noop);

  const observerAction = usePreservedCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry && entry.isIntersecting) {
        const targetElement = entry.target as T;

        if (callbackAction) {
          callbackAction(entry);
        }

        if (calledOnce) {
          observer.unobserve(targetElement);
        }
      }
    }
  );

  const targetRef = usePreservedCallback((node: T) => {
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }

    intersectionObserverRef.current = new IntersectionObserver(observerAction, {
      root,
      threshold,
      rootMargin,
    });

    if (node) {
      intersectionObserverRef.current.observe(node);
    }
  });

  return targetRef;
};
