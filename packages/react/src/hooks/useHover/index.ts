import { useRef, useState } from 'react';
import { useEventListener } from '../../hooks/useEventListener';

interface UseHoverProps {
  onEnter?: (event: MouseEvent) => void;
  onLeave?: (event: MouseEvent) => void;
}

interface UseHoverReturnType<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  isHovered: boolean;
}

/**
 * @description 대상 컴포넌트를 기준으로 마우스가 올라가거나 내려갔을 때의 상태를 반환하고, 마우스가 올라가거나 내려갔을 때의 액션을 정의할 수 있는 커스텀 훅입니다.
 *
 * @template T - HTML 엘리먼트 타입을 지정합니다.
 * @param {{
 *   onEnter?: (event: MouseEvent) => void;
 *   onLeave?: (event: MouseEvent) => void;
 * }} props - 콜백 함수를 포함한 선택적 속성입니다.
 * - `onEnter`: 요소에 마우스가 진입할 때 호출되는 함수입니다. 기본값은 `noop` 함수입니다.
 * - `onLeave`: 요소에서 마우스가 떠날 때 호출되는 함수입니다. 기본값은 `noop` 함수입니다.
 *
 * @returns {UseHoverReturnType<T>} `ref`와 `isHovered`를 포함한 객체를 반환합니다.
 * - `ref`: 추적할 대상 요소의 참조입니다.
 * - `isHovered`: 요소가 호버 상태인지 여부를 나타내는 불리언 값입니다.
 *
 * @example
 * const { ref, isHovered } = useHover<HTMLDivElement>({
 *   onEnter: () => console.log('마우스 진입'),
 *   onLeave: () => console.log('마우스 퇴장'),
 * });
 *
 * return <div ref={ref}> {isHovered ? 'Hovered' : 'Not Hovered'} </div>;
 */
export function useHover<T extends HTMLElement>({
  onEnter,
  onLeave,
}: UseHoverProps = {}): UseHoverReturnType<T> {
  const [isHovered, setIsHovered] = useState(false);

  const targetRef = useRef<T>(null);

  const enterAction = (event: MouseEvent) => {
    setIsHovered(true);
    onEnter?.(event);
  };

  const leaveAction = (event: MouseEvent) => {
    setIsHovered(false);
    onLeave?.(event);
  };

  useEventListener(targetRef, 'mouseenter', enterAction);
  useEventListener(targetRef, 'mouseleave', leaveAction);

  return { ref: targetRef as React.RefObject<T>, isHovered };
}
