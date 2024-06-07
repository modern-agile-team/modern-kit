import { useRef } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { Nullable } from '@modern-kit/types';
import { noop } from '@modern-kit/utils';

export interface UseIntersectionObserverProps extends IntersectionObserverInit {
  onIntersectStart?: (entry: IntersectionObserverEntry) => void;
  onIntersectEnd?: (entry: IntersectionObserverEntry) => void;
  calledOnceVisible?: boolean;
}

export const useIntersectionObserver = <T extends HTMLElement>({
  onIntersectStart = noop,
  onIntersectEnd = noop,
  calledOnceVisible = false,
  root = null,
  threshold = 0,
  rootMargin = '0px 0px 0px 0px',
}: UseIntersectionObserverProps) => {
  const isVisible = useRef(false);
  const intersectionObserverRef = useRef<Nullable<IntersectionObserver>>(null);

  const intersectionObserverCallback = usePreservedCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (!entry) return;

      if (entry.isIntersecting) {
        const targetElement = entry.target as T;

        isVisible.current = true;
        onIntersectStart(entry);

        if (calledOnceVisible) {
          observer.unobserve(targetElement);
        }
      } else if (isVisible.current) {
        // 최초 mount 시에 호출을 방지하고, 타겟 요소가 viewport에서 나갈 때만 호출
        isVisible.current = false;
        onIntersectEnd(entry);
      }
    }
  );

  const targetRef = (node: T) => {
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }

    intersectionObserverRef.current = new IntersectionObserver(
      intersectionObserverCallback,
      {
        threshold,
        root,
        rootMargin,
      }
    );

    if (node) {
      intersectionObserverRef.current.observe(node);
    }
  };

  return { ref: targetRef };
};
