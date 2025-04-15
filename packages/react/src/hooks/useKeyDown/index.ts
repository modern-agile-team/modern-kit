import { usePreservedCallback } from '../usePreservedCallback';
import { RefObject, useEffect, useRef } from 'react';
import { KeyDownCallbackMap } from './useKeyDown.utils';
import { isFunction } from '@modern-kit/utils';

interface UseKeyDownProps {
  enabled?: boolean;
  keyDownCallbackMap?: Partial<KeyDownCallbackMap>;
  allKeyDownCallback?: (event: KeyboardEvent) => void;
}

/**
 * @description 특정 요소에 keydown 이벤트 리스너를 추가하고, 설정된 키보드 이벤트 콜백 함수를 호출하는 기능을 제공합니다.
 * `enabled`가 `true`일 때 이벤트가 활성화되며, `targetRef`가 할당되지 않은 경우 window 객체에 이벤트가 바인딩됩니다.
 *
 * @template T
 * @param {UseKeyDownProps} props - 옵션 객체입니다.
 * - `enabled`: 키보드 이벤트 리스너를 활성화할지 여부를 결정합니다. `true`일 경우 이벤트 리스너가 추가됩니다. 기본값은 `true` 입니다.
 * - `keyDownCallbackMap`: 특정 키와 해당 키가 눌렸을 때 호출될 콜백 함수들을 매핑한 객체입니다. 예를 들어, `{ 'Enter': handleEnterKey }`와 같이 설정할 수 있습니다.
 * - `allKeyDownCallback`: 모든 키가 눌렸을 때 호출될 공통 콜백 함수입니다. 이 함수가 설정되면 `keyDownCallbackMap`보다 우선 호출됩니다.
 *
 * @returns {React.RefObject<T | Window>} 키보드 이벤트 리스너가 부착된 요소의 참조 객체(Ref)를 반환합니다.
 *
 *  * @example
 * // window에 이벤트 바인딩
 * useKeyDown<HTMLInputElement>({
 *   enabled: true,
 *   keyDownCallbackMap: {
 *     Enter: (event) => console.log('Enter', event),
 *     Escape: (event) => console.log('Escape', event),
 *     ' ': (event) => console.log('Space', event),
 *   },
 * });
 *
 * @example
 * ```tsx
 * // 특정 요소에 이벤트 바인딩
 * const inputRef = useKeyDown<HTMLInputElement>({
 *   enabled: true,
 *   keyDownCallbackMap: {
 *     Enter: (event) => console.log('Enter', event),
 *     Escape: (event) => console.log('Escape', event),
 *     ' ': (event) => console.log('Space', event),
 *   },
 * });
 *
 * <input ref={inputRef} type="text" />;
 * ```
 */
export function useKeyDown({
  enabled,
  keyDownCallbackMap,
  allKeyDownCallback,
}: UseKeyDownProps): { ref: RefObject<Window> };

export function useKeyDown<T extends HTMLElement>({
  enabled,
  keyDownCallbackMap,
  allKeyDownCallback,
}: UseKeyDownProps): { ref: RefObject<T> };

export function useKeyDown<T extends HTMLElement>({
  enabled = true,
  keyDownCallbackMap = {},
  allKeyDownCallback,
}: UseKeyDownProps): { ref: RefObject<Window | T> } {
  const targetRef = useRef<T | null | Window>(null);

  const onKeyDown = usePreservedCallback((event: KeyboardEvent) => {
    event.stopPropagation();

    if (allKeyDownCallback) {
      allKeyDownCallback(event);
      return;
    }

    const key = event.key as keyof KeyDownCallbackMap;

    const keyDownCallback = keyDownCallbackMap[key];

    if (isFunction(keyDownCallback)) {
      keyDownCallback(event);
    }
  });

  useEffect(() => {
    if (!enabled) return;
    if (!targetRef.current) {
      targetRef.current = window;
    }

    const targetElement = targetRef.current;

    targetElement.addEventListener(
      'keydown',
      onKeyDown as EventListenerOrEventListenerObject
    );

    return () =>
      targetElement.removeEventListener(
        'keydown',
        onKeyDown as EventListenerOrEventListenerObject
      );
  }, [enabled, onKeyDown]);

  return { ref: targetRef };
}
