import { usePreservedCallback } from '../../hooks/usePreservedCallback';
import { usePreservedState } from '../../hooks/usePreservedState';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * @description 지정된 요소에 이벤트 리스너를 추가하고, 컴포넌트가 언마운트될 때 자동으로 제거합니다.
 *
 * @template W - Window에서 사용할 수 있는 이벤트 타입
 * @template D - Document에서 사용할 수 있는 이벤트 타입
 * @template E - HTMLElement에서 사용할 수 있는 이벤트 타입
 * @template M - MediaQueryList에서 사용할 수 있는 이벤트 타입
 * @template T - 이벤트 리스너가 등록될 요소 타입
 *
 * @param {T | null} element - 이벤트 리스너를 등록할 대상 요소입니다.
 * @param {W | D | M | E} type - 등록할 이벤트 타입입니다. `click`, `resize`, `keydown` 등의 값이 올 수 있습니다.
 * @param {(
 * event:
 *   | WindowEventMap[W]
 *   | DocumentEventMap[K]
 *   | MediaQueryListEventMap[M]
 *   | HTMLElementEventMap[E]
 *   | SVGElementEventMap[E]
 *   | Event
 * ) => void} listener - 이벤트가 발생할 때 호출될 콜백 함수입니다.
 * @param {AddEventListenerOptions} [options={}] 이벤트 리스너에 대한 옵션 객체입니다.
 * 옵션에는 `once`, `capture`, `passive`와 같은 기본 이벤트 리스너 옵션과 `onBeforeAddListener`과 같은 커스텀 옵션이 포함될 수 있습니다.
 * - `onBeforeAddListener`: 이벤트 리스너를 등록하기 전에 특정 작업을 수행하고자 할 때 사용됩니다.
 *
 * @returns {void}
 *
 * @example
 * // window
 * useEventListener(window, 'click', callback);
 *
 * @example
 * // element
 * const buttonRef = useRef<HTMLButtonElement | null>(null);
 * useEventListener(buttonRef.current, 'click', callback);
 *
 * @example
 * // onBeforeAddListener
 * const buttonRef = useRef<HTMLButtonElement | null>(null);
 * useEventListener(buttonRef.current, 'click', callback, { onBeforeAddListener });
 */
// Window Event based useEventListener interface
export function useEventListener<K extends keyof WindowEventMap>(
  element: Window,
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
): void;

// Document Event based useEventListener interface
export function useEventListener<K extends keyof DocumentEventMap>(
  element: Document,
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions
): void;

// MediaQueryList Event based useEventListener interface
export function useEventListener<K extends keyof MediaQueryListEventMap>(
  element: MediaQueryList,
  type: K,
  listener: (event: MediaQueryListEventMap[K]) => void,
  options?: AddEventListenerOptions
): void;

// Element Event based useEventListener interface
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  element: T | null,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): void;

// SVGElement Event based useEventListener interface
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends SVGElement
>(
  element: T | null,
  type: K,
  listener: (event: SVGElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): void;

export function useEventListener<
  W extends keyof WindowEventMap,
  D extends keyof DocumentEventMap,
  M extends keyof MediaQueryListEventMap,
  E extends keyof HTMLElementEventMap,
  T extends Window | Document | HTMLElement | SVGElement | MediaQueryList
>(
  element: T | null,
  type: W | D | M | E,
  listener: (
    event:
      | WindowEventMap[W]
      | DocumentEventMap[D]
      | HTMLElementEventMap[E]
      | SVGElementEventMap[E]
      | MediaQueryListEventMap[M]
      | Event
  ) => void,
  options: AddEventListenerOptions = {}
): void {
  const preservedOptions = usePreservedState(options);
  const preservedListener = usePreservedCallback(listener);

  useIsomorphicLayoutEffect(() => {
    if (!element) return;

    // event registration
    element.addEventListener(type, preservedListener, preservedOptions);

    // clean up
    return () => {
      element.removeEventListener(type, preservedListener, preservedOptions);
    };
  }, [type, element, preservedOptions, preservedListener]);
}
