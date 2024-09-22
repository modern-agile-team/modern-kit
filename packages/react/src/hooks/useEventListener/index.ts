import { usePreservedCallback } from '../../hooks/usePreservedCallback';
import { usePreservedState } from '../../hooks/usePreservedState';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

interface UseEventListenerOptions<
  T extends
    | Window
    | Document
    | HTMLElement
    | SVGElement
    | MediaQueryList = HTMLElement
> extends AddEventListenerOptions {
  beforeListenerAction?: (element: T) => void;
}

/**
 * @description 지정된 요소에 이벤트 리스너를 추가하고, 컴포넌트가 언마운트될 때 자동으로 제거합니다.
 *
 * @template W - Window에서 사용할 수 있는 이벤트 타입 (예: 'resize', 'scroll')
 * @template E - HTMLElement에서 사용할 수 있는 이벤트 타입 (예: 'click', 'keydown')
 * @template M - MediaQueryList에서 사용할 수 있는 이벤트 타입 (예: 'change')
 * @template T - 이벤트 리스너가 등록될 요소 타입 (기본값: HTMLElement)
 *
 * @param {T | null} element - 이벤트 리스너를 등록할 대상 요소입니다.
 * @param {W | E | M} eventName - 등록할 이벤트의 이름입니다. `click`, `resize`, `keydown` 등의 값이 올 수 있습니다.
 * @param {(
 * event:
 *   | WindowEventMap[W]
 *   | HTMLElementEventMap[E]
 *   | SVGElementEventMap[E]
 *   | MediaQueryListEventMap[M]
 *   | Event
 * ) => void} handler - 이벤트가 발생할 때 호출될 콜백 함수입니다.
 * @param {UseEventListenerOptions} options - 이벤트 리스너를 추가할 때 사용할 옵션입니다. `capture`, `once`, `passive`와 같은 옵션을 포함할 수 있습니다.
 * - 만약 이벤트 리스너를 등록하기 전에 특정 액션을 취하고 싶으면 `beforeListenerAction`를 추가할 수 있습니다.
 *
 * @example
 * // window
 * useEventListener(window, 'click', (event) => {
 *   console.log('Window clicked', event);
 * });
 *
 * @example
 * // element
 * const buttonRef = useRef<HTMLButtonElement>(null);
 *
 * useEventListener(buttonRef.current, 'click', (event) => {
 *   console.log('Button clicked', event);
 * });
 */
// MediaQueryList Event based useEventListener interface
export function useEventListener<K extends keyof MediaQueryListEventMap>(
  element: MediaQueryList,
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  options?: UseEventListenerOptions<MediaQueryList>
): void;

// Window Event based useEventListener interface
export function useEventListener<K extends keyof WindowEventMap>(
  element: Window,
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: UseEventListenerOptions<Window>
): void;

// Document Event based useEventListener interface
export function useEventListener<K extends keyof DocumentEventMap>(
  element: Document,
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions<Document>
): void;

// Element Event based useEventListener interface
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends Element = K extends keyof HTMLElementEventMap
    ? HTMLElement
    : SVGElement
>(
  element: T | null,
  eventName: K,
  handler:
    | ((event: HTMLElementEventMap[K]) => void)
    | ((event: SVGElementEventMap[K]) => void),
  options?: UseEventListenerOptions<HTMLElement | SVGElement>
): void;

export function useEventListener<
  W extends keyof WindowEventMap,
  E extends keyof HTMLElementEventMap,
  M extends keyof MediaQueryListEventMap,
  T extends
    | Window
    | Document
    | HTMLElement
    | SVGElement
    | MediaQueryList = HTMLElement
>(
  element: T | null,
  eventName: W | E | M,
  handler: (
    event:
      | WindowEventMap[W]
      | HTMLElementEventMap[E]
      | SVGElementEventMap[E]
      | MediaQueryListEventMap[M]
      | Event
  ) => void,
  options: UseEventListenerOptions<T> = {}
): void {
  const preservedOptions = usePreservedState(options);
  const preservedHandler = usePreservedCallback(handler);
  const preservedBeforeListenerAction = usePreservedCallback(
    preservedOptions?.beforeListenerAction
  );

  useIsomorphicLayoutEffect(() => {
    const targetElement: T | null = element;

    if (!targetElement || !targetElement.addEventListener) return;

    if (preservedBeforeListenerAction) {
      preservedBeforeListenerAction(targetElement);
    }

    // event registration
    targetElement.addEventListener(
      eventName,
      preservedHandler,
      preservedOptions
    );

    // clean up
    return () => {
      targetElement.removeEventListener(
        eventName,
        preservedHandler,
        preservedOptions
      );
    };
  }, [eventName, element, preservedOptions, preservedHandler]);
}
