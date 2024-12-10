import { usePreservedCallback } from '../../hooks/usePreservedCallback';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import {
  EventListenerAvailableElement,
  TargetElement,
  isRefObject,
} from './useEventListener.utils';

/**
 * @description 지정된 요소에 이벤트 리스너를 추가하고, 컴포넌트가 언마운트될 때 자동으로 제거합니다.
 *
 * @template W - Window에서 사용할 수 있는 이벤트 타입
 * @template D - Document에서 사용할 수 있는 이벤트 타입
 * @template M - MediaQueryList에서 사용할 수 있는 이벤트 타입
 * @template E - HTMLElement에서 사용할 수 있는 이벤트 타입
 * @template S - SVGElement에서 사용할 수 있는 이벤트 타입
 * @template T - 이벤트 리스너가 등록될 요소 타입
 *
 * @param {TargetElement<T>} element - 이벤트 리스너를 등록할 대상 요소입니다.
 * @param {W | D | M | E | S} type - 등록할 이벤트 타입입니다. `click`, `resize`, `keydown` 등의 값이 올 수 있습니다.
 * @param {(
 * event:
 *   | WindowEventMap[W]
 *   | DocumentEventMap[K]
 *   | MediaQueryListEventMap[M]
 *   | HTMLElementEventMap[E]
 *   | SVGElementEventMap[E]
 *   | Event
 * ) => void} listener - 이벤트가 발생할 때 호출될 콜백 함수입니다.
 * @param {boolean | AddEventListenerOptions} options - 이벤트 리스너에 대한 옵션 객체 또는 `useCapture`를 의미하는 `boolean` 값이 올 수 있습니다.
 * - 옵션 객체에는 `once`, `capture`, `passive`와 같은 기본 이벤트 리스너 옵션들을 포함합니다.
 * - useCapture는 이벤트 전파 단계를 결정하는 값으로, `true`일 경우 `캡처링` 단계에서, `false`일 경우 `버블링` 단계에서 이벤트가 처리됩니다. 기본값은 `false`입니다.
 *
 * @returns {void}
 *
 * @example
 * // window 타겟 및 options/useCapture 사용 예제
 * useEventListener(window, 'resize', callback);
 *
 * useEventListener(window, 'resize', callback, options);
 *
 * useEventListener(window, 'resize', callback, true); // 캡처링 설정
 *
 * @example
 * // document
 * useEventListener(document, 'click', callback);
 *
 * @example
 * // element
 * const buttonRef = useRef<HTMLButtonElement | null>(null);
 * useEventListener(buttonRef, 'click', callback);
 *
 * @example
 * // media query
 * const mediaQueryList = window.matchMedia(mediaQueryString);
 * useEventListener(mediaQueryList, 'change', handleChange);
 */
// Window Event based useEventListener interface
export function useEventListener<K extends keyof WindowEventMap>(
  element: Window,
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

// Document Event based useEventListener interface
export function useEventListener<K extends keyof DocumentEventMap>(
  element: Document,
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

// MediaQueryList Event based useEventListener interface
export function useEventListener<K extends keyof MediaQueryListEventMap>(
  element: MediaQueryList,
  type: K,
  listener: (event: MediaQueryListEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

// Element Event based useEventListener interface
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  element: TargetElement<T>,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

// SVGElement Event based useEventListener interface
export function useEventListener<
  K extends keyof SVGElementEventMap,
  T extends SVGElement
>(
  element: TargetElement<T>,
  type: K,
  listener: (event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<
  W extends keyof WindowEventMap,
  D extends keyof DocumentEventMap,
  M extends keyof MediaQueryListEventMap,
  E extends keyof HTMLElementEventMap,
  S extends keyof SVGElementEventMap,
  T extends EventListenerAvailableElement
>(
  element: TargetElement<T>,
  type: W | D | M | E | S,
  listener: (
    event:
      | WindowEventMap[W]
      | DocumentEventMap[D]
      | HTMLElementEventMap[E]
      | SVGElementEventMap[S]
      | MediaQueryListEventMap[M]
      | Event
  ) => void,
  options?: boolean | AddEventListenerOptions
): void {
  const preservedListener = usePreservedCallback(listener);

  useIsomorphicLayoutEffect(() => {
    const targetElement = isRefObject(element) ? element.current : element;

    if (!targetElement) return;

    // event registration
    targetElement.addEventListener(type, preservedListener, options);

    // clean up
    return () => {
      targetElement.removeEventListener(type, preservedListener, options);
    };
  }, [type, element, options, preservedListener]);
}
