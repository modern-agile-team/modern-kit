import { useRef, useMemo } from 'react';
import { isMobile } from '@modern-kit/utils';
import { useEventListener } from '../useEventListener';

/**
 * @description 특정 요소 외부에서 마우스 또는 터치 이벤트가 발생할 때 호출되는 콜백을 등록하는 커스텀 훅입니다.
 *
 * `useOutsidePointerDown` 훅은 지정된 요소(ref로 지정된 요소) 외부에서 사용자가 마우스를 클릭하거나
 * 터치 이벤트가 발생할 때마다 제공된 `callback` 함수를 호출합니다.
 *
 * 모바일 환경에서는 `touchstart` 이벤트를, 데스크탑 환경에서는 `mousedown` 이벤트를 감지합니다.
 *
 * @template T - HTML 요소의 타입. 기본적으로 `HTMLElement`를 상속합니다.
 * @param {(targetElement: T) => void} callback - 요소 외부에서 포인터 다운 이벤트가 발생할 때 호출되는 콜백 함수입니다.
 * 해당 요소의 레퍼런스를 매개변수로 받습니다.
 * @param {UseOutsidePointerDownOptions} options - `useOutsidePointerDown` 훅의 옵션 객체입니다.
 * @param {React.RefObject<HTMLElement>[]} options.excludeRefs - 외부 클릭 및 터치 감지를 제외할 요소의 ref 배열입니다.
 *
 * @returns {React.RefObject<T>} - 외부 클릭 감지를 원하는 DOM 요소에 연결할 ref 객체를 반환합니다.
 *
 * @example
 * ```tsx
 * const Example = () => {
 *   const targetRef = useOutsidePointerDown<HTMLDivElement>((targetElement) => {
 *   console.log('외부 클릭 감지:', targetElement);
 * });
 *
 *  return (
 *    <div ref={targetRef}>
 *      target box
 *    </div>
 *  );
 * };
 * ```
 *
 * @example
 * ```tsx
 * const Example = () => {
 *   // 외부 요소에서 특정 요소를 제외하고 클릭/터치 감지
 *   const excludeRef = useRef<HTMLDivElement>(null);
 *   const targetRef = useOutsidePointerDown<HTMLDivElement>(callback, { excludeRefs: [excludeRef] });
 *
 *  return (
 *     <div>
 *       <div ref={targetRef}>
 *         target box
 *       </div>
 *       <div ref={excludeRef}>
 *         exclude box
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 */
export function useOutsidePointerDown<T extends HTMLElement>(
  callback: (targetElement: T) => void,
  options?: { excludeRefs: React.RefObject<HTMLElement>[] }
): React.RefObject<T> {
  const { excludeRefs } = options ?? {};
  const targetRef = useRef<T>(null);
  const eventType = useMemo(
    () => (isMobile() ? 'touchstart' : 'mousedown'),
    []
  );

  const handleOutsidePointerDown = ({ target }: MouseEvent | TouchEvent) => {
    if (!targetRef.current) return;
    const targetElement = targetRef.current;

    const isInExcluded = excludeRefs?.some((excludeRef) =>
      excludeRef.current?.contains(target as Node)
    );
    const isOutside = !targetElement.contains(target as Node);
    const shouldTriggerCallback = isOutside && !isInExcluded;

    if (shouldTriggerCallback) {
      callback(targetElement);
    }
  };

  useEventListener(document, eventType, handleOutsidePointerDown);

  return targetRef;
}
