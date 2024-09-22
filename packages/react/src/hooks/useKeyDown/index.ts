import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { usePreservedCallback } from '../usePreservedCallback';
import { useRef } from 'react';
import { KeyDownCallbackMap } from './keyDownCallbackMap';
import { isFunction } from '@modern-kit/utils';
import { usePreservedState } from '../../hooks/usePreservedState';

interface UseKeyDownProps {
  enabled?: boolean;
  autoFocus?: boolean;
  keyDownCallbackMap?: Partial<KeyDownCallbackMap>;
  allKeyDownCallback?: (event: KeyboardEvent) => void;
}

/**
 * @description 특정 요소에 키보드 이벤트 리스너를 추가하고, 설정된 키보드 이벤트 콜백 함수를 호출하는 기능을 제공합니다.
 *
 * @template T
 * @param {{
 *   enabled?: boolean;
 *   autoFocus?: boolean;
 *   keyDownCallbackMap?: Record<string, (event: KeyboardEvent) => void>;
 *   allKeyDownCallback?: (event: KeyboardEvent) => void
 * }} props - 훅의 옵션 객체입니다.
 * - `enabled`: 키보드 이벤트 리스너를 활성화할지 여부를 결정합니다. `true`일 경우 이벤트 리스너가 추가됩니다. 기본값은 `true` 입니다.
 * - `autoFocus`: 요소가 마운트될 때 자동으로 포커스를 설정할지 여부를 결정합니다.
 * - `keyDownCallbackMap`: 특정 키와 해당 키가 눌렸을 때 호출될 콜백 함수들을 매핑한 객체입니다. 예를 들어, `{ 'Enter': handleEnterKey }`와 같이 설정할 수 있습니다.
 * - `allKeyDownCallback`: 모든 키가 눌렸을 때 호출될 공통 콜백 함수입니다. 이 함수가 설정되면 `keyDownCallbackMap`보다 우선 호출됩니다.
 *
 * @returns {React.RefObject<T>} 키보드 이벤트 리스너가 부착된 요소의 참조 객체(Ref)를 반환합니다.
 *
 * @example
 * const inputRef = useKeyDown<HTMLInputElement>({
 *   enabled: true,
 *   autoFocus: true,
 *   keyDownCallbackMap: {
 *     Enter: (event) => alert('Enter key pressed!'),
 *     Escape: (event) => alert('Escape key pressed!'),
 *   },
 * });
 *
 * <input ref={inputRef} type="text" />;
 */
export function useKeyDown<T extends HTMLElement>({
  enabled = true,
  autoFocus = false,
  keyDownCallbackMap = {},
  allKeyDownCallback,
}: UseKeyDownProps): React.RefObject<T> {
  const targetRef = useRef<T>(null);
  const preservedCallbackMap = usePreservedState(keyDownCallbackMap);

  const onKeyDown = usePreservedCallback((event: KeyboardEvent) => {
    try {
      if (allKeyDownCallback) {
        allKeyDownCallback(event);
        return;
      }

      const keyDownCallback = preservedCallbackMap[event.key];

      if (isFunction(keyDownCallback)) {
        keyDownCallback(event);
      }
      event.stopPropagation();
    } catch (err: any) {
      console.error(
        `Failed to call the onKeyDown function. message: ${err.message}`
      );
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (!targetRef.current || !enabled) return;

    const targetElement = targetRef.current;

    if (autoFocus) {
      targetElement.focus();
    }

    targetElement.addEventListener('keydown', onKeyDown);

    return () => targetElement.removeEventListener('keydown', onKeyDown);
  }, [enabled, autoFocus, onKeyDown]);

  return targetRef;
}
