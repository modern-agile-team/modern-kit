import { useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useTimeout } from '../useTimeout';
import { useVisibilityChange } from '../useVisibilityChange';
import { useThrottle } from '../useThrottle';

interface UseIdleProps {
  timeout: number;
  onIdle?: () => void;
  onActive?: () => void;
}

/**
 * @description 사용자의 `비활성(idle)` 상태를 감지하는 훅입니다.
 *
 * 지정된 시간 동안 사용자 활동이 없으면 `idle` 상태로 판단하며, 마우스 움직임, 키보드 입력, 터치 이벤트 등 사용자 활동을 감지합니다.
 * 페이지 visibility 변경도 감지하여 탭이 다시 활성화되면 `active` 상태로 전환됩니다.
 *
 * 모든 이벤트는 `500ms`로 스로틀링되어 불필요한 이벤트 호출을 방지합니다.
 *
 * @param {UseIdleProps} props - idle 감지 설정을 위한 객체입니다.
 * @param {number} props.timeout - 비활성 상태로 간주되기까지의 시간(밀리초)
 * @param {() => void} [props.onIdle] - idle 상태 진입 시 콜백
 * @param {() => void} [props.onActive] - active 상태 진입 시 콜백
 *
 * @returns {boolean} 현재 사용자가 idle 상태인지 여부를 반환합니다.
 *
 * @example
 * const isIdle = useIdle({
 *   timeout: 5000, // 5초
 *   onIdle: () => console.log('사용자가 비활성 상태입니다'),
 *   onActive: () => console.log('사용자가 활성 상태입니다')
 * });
 */
export function useIdle({ timeout, onIdle, onActive }: UseIdleProps): boolean {
  const [isIdle, setIsIdle] = useState(false);

  const { reset: resetTimer } = useTimeout(() => {
    setIsIdle(true);
    onIdle?.();
  }, timeout);

  const handleActive = useThrottle(
    () => {
      if (isIdle) {
        setIsIdle(false);
        onActive?.();
      }
      resetTimer();
    },
    500,
    { trailing: false }
  );

  const windowElement = typeof window !== 'undefined' ? window : null;

  useEventListener(windowElement, 'pointermove', handleActive);
  useEventListener(windowElement, 'pointerdown', handleActive);
  useEventListener(windowElement, 'resize', handleActive);
  useEventListener(windowElement, 'keydown', handleActive);
  useEventListener(windowElement, 'wheel', handleActive);
  useVisibilityChange({ onShow: handleActive });

  return isIdle;
}
