import { noop } from '@modern-kit/utils';
import { useEventListener } from '../useEventListener';
import { usePreservedCallback } from '../usePreservedCallback';

type VisibilityChangeCallbackAction = (
  event: Event,
  visibilityState: DocumentVisibilityState
) => void;

interface UseVisibilityChangeProps {
  onShow?: VisibilityChangeCallbackAction;
  onHide?: VisibilityChangeCallbackAction;
  enabled?: boolean;
}

/**
 * @description 문서의 가시성(visibility) 상태 변경 시 실행할 콜백 함수를 등록하는 커스텀 훅입니다.
 *
 * `document.visibilityState`가 문서가 보이는 상태가 되면(`visible`) `onShow` 콜백이 호출되며, 보이지 않는 상태가 되면(`hidden`) `onHide` 콜백이 호출됩니다.
 *
 * @param {UseVisibilityChangeProps} props - 가시성 변경 시 호출할 콜백 함수를 포함한 객체입니다.
 * @param {VisibilityChangeCallbackAction} props.onShow - 문서가 보이는 상태가 될 때 호출될 콜백 함수입니다.
 * @param {VisibilityChangeCallbackAction} props.onHide - 문서가 보이지 않는 상태가 될 때 호출될 콜백 함수입니다.
 * @param {boolean} [props.enabled=true] - 가시성 변경 이벤트 핸들러를 등록할지 여부를 결정하는 불리언 값입니다.
 *
 * @returns {void}
 *
 * @example
 * useVisibilityChange({
 *   onShow: () => console.log('문서가 보이는 상태입니다.'),
 *   onHide: () => console.log('문서가 보이지 않는 상태입니다.'),
 * });
 */
export function useVisibilityChange({
  onShow = noop,
  onHide = noop,
  enabled = true,
}: UseVisibilityChangeProps = {}): void {
  const handleVisibilityChange = usePreservedCallback((event: Event) => {
    const isVisible = document.visibilityState === 'visible';
    const callbackAction = isVisible ? onShow : onHide;

    callbackAction(event, document.visibilityState);
  });

  useEventListener(
    typeof document !== 'undefined' && enabled ? document : null,
    'visibilitychange',
    handleVisibilityChange
  );
}
