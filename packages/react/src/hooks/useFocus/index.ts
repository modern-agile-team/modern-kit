import { noop } from '@modern-kit/utils';
import { RefObject, useCallback, useRef, useState } from 'react';
import { useEventListener } from '../../hooks/useEventListener';
import { usePreservedCallback } from '../usePreservedCallback';

interface UseFocusProps {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

interface UseFocusReturnType<T extends HTMLElement> {
  ref: RefObject<T>;
  isFocus: boolean;
  setFocus: () => void;
}

/**
 * @description 대상 요소를 기준으로 포커스 상태를 반환하고, 포커스 상태에 따른 액션을 정의할 수 있는 커스텀 훅입니다.
 *
 * @template T - HTML 엘리먼트 타입을 지정합니다.
 * @param {{
 *  onFocus?: (event: FocusEvent) => void;
 *  onBlur?: (event: FocusEvent) => void;
 * }} props - 포커스 상태에 따른 콜백 함수를 포함한 선택적 속성입니다.
 * - `onFocus`: 요소에 포커스가 들어올 때 호출되는 함수입니다. 기본값은 `noop` 함수입니다.
 * - `onBlur`: 요소에서 포커스가 빠져나갈 때 호출되는 함수입니다. 기본값은 `noop` 함수입니다.
 *
 * @returns {UseFocusReturnType<T>} `ref`, `isFocus`, `setFocus`를 포함한 객체를 반환합니다.
 * - `ref`: 추적할 대상 요소의 참조입니다.
 * - `isFocus`: 요소가 포커스 상태인지 여부를 나타내는 불리언 값입니다.
 * - `setFocus`: 요소에 포커스를 참 값으로 설정하는 함수입니다.
 *
 * @example
 * ```tsx
 * const { ref, isFocused, setFocus } = useFocus<HTMLInputElement>({
 *   onFocus: () => console.log("focus"),
 *   onBlur: () => console.log("blur")
 * });
 *
 * <input ref={ref} />
 * <button onClick={() => setFocus()}>focus trigger</button>
 * <div>{isFocused ? 'focus' : 'blur'}</div>
 * ```
 */
export function useFocus<T extends HTMLElement>({
  onFocus = noop,
  onBlur = noop,
}: UseFocusProps = {}): UseFocusReturnType<T> {
  const [isFocus, setIsFocus] = useState(false);

  const ref = useRef<T>(null);

  const preservedFocusAction = usePreservedCallback((event: FocusEvent) => {
    setIsFocus(true);
    onFocus(event);
  });

  const preservedBlurAction = usePreservedCallback((event: FocusEvent) => {
    setIsFocus(false);
    onBlur(event);
  });

  const setFocus = useCallback(() => {
    if (!ref.current) return;

    ref.current.focus();
    setIsFocus(true);
  }, []);

  useEventListener(ref, 'focus', preservedFocusAction);
  useEventListener(ref, 'blur', preservedBlurAction);

  return { ref, isFocus, setFocus };
}
