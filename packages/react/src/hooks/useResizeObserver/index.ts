import { noop } from '@modern-kit/utils';
import { usePreservedCallback } from '../usePreservedCallback';
import { useEffect, useRef, useState } from 'react';

interface UseResizeObserver<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  contentRect: ContentRect;
}

type ContentRect = Omit<DOMRectReadOnly, 'toJSON'>;

const initialState: ContentRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
};

/**
 * @description 지정된 타겟 요소의 크기 변화를 감지하는 React 커스텀 훅입니다.
 * 이 훅은 `ResizeObserver` API를 사용하여 요소의 크기가 변경될 때마다 특정 액션을 호출 할 수 있습니다.
 *
 * @template T - 관찰하려는 타겟 요소의 타입
 * @param {((entry: ResizeObserverEntry) => void) | undefined} [action] - 요소의 크기가 변경될 때마다 호출되는 콜백 함수. `ResizeObserverEntry` 객체를 인자로 받습니다.
 *
 * @returns {UseResizeObserver<T>} 타겟 요소에 대한 참조 객체(`ref`)와 해당 요소의 현재 크기 정보(`contentRect`)입니다.
 *
 * @example
 * ```tsx
 * const { ref, contentRect } = useResizeObserver<HTMLDivElement>();
 *
 * return (
 *   <div ref={ref}>
 *     <p>Width: {contentRect.width}</p>
 *     <p>Height: {contentRect.height}</p>
 *   </div>
 * );
 * ```
 */
export function useResizeObserver<T extends HTMLElement>(
  action: (entry: ResizeObserverEntry) => void = noop
): UseResizeObserver<T> {
  const [contentRect, setContentRect] = useState<ContentRect>(initialState);
  const targetRef = useRef<T>(null);

  const preservedCallbackAction = usePreservedCallback(
    ([entry]: ResizeObserverEntry[]) => {
      if (!entry) return;

      action(entry);
      setContentRect(entry.contentRect);
    }
  );

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    const targetElement = targetRef.current;

    const observer = new ResizeObserver(preservedCallbackAction);

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [preservedCallbackAction]);

  return { ref: targetRef, contentRect };
}
