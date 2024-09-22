import { useCallback, useRef, useMemo } from 'react';
import { isMobile } from '@modern-kit/utils';
import { useEventListener } from '../useEventListener';

/**
 * @description 특정 요소 외부에서 마우스 또는 터치 이벤트가 발생할 때 호출되는 콜백을 등록하는 커스텀 훅입니다.
 *
 * `useOutsidePointerDown` 훅은 지정된 요소(ref로 지정된 요소) 외부에서 사용자가 마우스를 클릭하거나
 * 터치 이벤트가 발생할 때마다 제공된 `callback` 함수를 호출합니다. 모바일 환경에서는 `touchstart` 이벤트를,
 * 데스크탑 환경에서는 `mousedown` 이벤트를 감지합니다.
 *
 * @template T - HTML 요소의 타입. 기본적으로 `HTMLElement`를 상속합니다.
 * @param {(targetElement: T) => void} callback - 요소 외부에서 포인터 다운 이벤트가 발생할 때 호출되는 콜백 함수입니다.
 * 해당 요소의 레퍼런스를 매개변수로 받습니다.
 *
 * @returns {React.RefObject<T>} - 외부 클릭 감지를 원하는 DOM 요소에 연결할 ref 객체를 반환합니다.
 *
 * @example
 * ```tsx
 * const targetRef = useOutsidePointerDown<HTMLDivElement>((targetElement) => {
 *   console.log('외부 클릭 감지:', targetElement);
 * });
 *
 * <div className='outside-box'>
 *   <div ref={targetRef} className='inner-box' />
 * </div>
 * ```
 */
export function useOutsidePointerDown<T extends HTMLElement>(
  callback: (targetElement: T) => void
): React.RefObject<T> {
  const targetRef = useRef<T>(null);
  const eventType = useMemo(
    () => (isMobile() ? 'touchstart' : 'mousedown'),
    []
  );

  const handleOutsideClick = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      const targetElement = targetRef.current;

      if (targetElement && !targetElement.contains(target as Node)) {
        callback(targetElement);
      }
    },
    [callback]
  );

  useEventListener(document, eventType, handleOutsideClick);

  return targetRef;
}
