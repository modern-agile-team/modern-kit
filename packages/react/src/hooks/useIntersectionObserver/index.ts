import { useRef } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { Nullable } from '@modern-kit/types';
import { noop } from '@modern-kit/utils';

export interface UseIntersectionObserverProps extends IntersectionObserverInit {
  onIntersectStart?: (entry: IntersectionObserverEntry) => void;
  onIntersectEnd?: (entry: IntersectionObserverEntry) => void;
  calledOnce?: boolean;
  enabled?: boolean;
}

const useIntersectionObserver: <T extends HTMLElement>({
  onIntersectStart,
  onIntersectEnd,
  enabled,
  calledOnce,
  root,
  threshold,
  rootMargin,
}: UseIntersectionObserverProps) => {
  ref: (node: T) => void;
};
export const useIntersectionObserver = <T extends HTMLElement>({
  onIntersectStart = noop,
  onIntersectEnd = noop,
  enabled = true,
  calledOnce = false,
  root = null,
  threshold = 0,
  rootMargin = '0px 0px 0px 0px',
}: UseIntersectionObserverProps) => {
  const calledCount = useRef(0);
  const isVisible = useRef(false);
  const intersectionObserverRef = useRef<Nullable<IntersectionObserver>>(null);

  const intersectionObserverCallback = usePreservedCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (!enabled || !entry) return;

      const targetElement = entry.target as T;

      if (entry.isIntersecting) {
        isVisible.current = true;
        calledCount.current += 1;

        onIntersectStart(entry);
      } else if (isVisible.current) {
        // 최초 mount 시에 호출을 방지하고, 타겟 요소가 viewport에서 나갈 때만 호출
        isVisible.current = false;
        calledCount.current += 1;

        onIntersectEnd(entry);
      }

      if (calledOnce && calledCount.current > 1) {
        observer.unobserve(targetElement);
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
