import { useCallback, useEffect, useRef, useState } from 'react';

interface UseChildrenObserverReturnType<T extends HTMLElement> {
  ref: React.RefObject<T>;
  children: Node[];
}

/**
 * @description 대상 요소의 자식 요소 변경을 실시간으로 관찰하는 React 훅
 *
 * MutationObserver를 사용하여 자식 요소의 추가, 제거, 변경을 감지합니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 *
 * @template T - 관찰할 HTML 요소 타입
 * @returns {UseChildrenObserverReturnType<T>} 다음을 포함하는 객체:
 * - `ref`: 관찰할 타겟 요소에 전달할 ref
 * - `childrenCount`: 현재 자식 요소의 개수
 * - `children`: 현재 자식 요소들의 배열
 *
 * @example
 * ```tsx
 * const Example = () => {
 *   const { ref, childrenCount, children } = useChildrenObserver<HTMLDivElement>();
 *
 *   return ();
 * };
 * ```
 */
export function useChildrenObserver<T extends HTMLElement>({
  observeSubtree = false,
}: {
  observeSubtree?: boolean;
} = {}): UseChildrenObserverReturnType<T> {
  const ref = useRef<T>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const [children, setChildren] = useState<Node[]>([]);

  const updateChildren = useCallback(() => {
    if (!ref.current) return;
    const targetElement = ref.current;
    const children = targetElement.childNodes;

    setChildren(Array.from(children));
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    updateChildren();

    observerRef.current = new MutationObserver(updateChildren);

    observerRef.current.observe(element, {
      childList: true, // 자식 요소 변경 감지
      subtree: observeSubtree, // 하위 트리의 변경도 감지
      attributes: true,
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [updateChildren]);

  return { ref, children };
}
