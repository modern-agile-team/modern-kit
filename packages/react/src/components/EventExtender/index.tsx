import { isFunction } from '@modern-kit/utils';
import React from 'react';

/**
 * @description HTML 요소들의 태그 이름 타입 (예: "div", "span", "input" 등)
 */
type HTMLElementType = keyof JSX.IntrinsicElements;

/**
 * @description React.DOMAttributes<HTMLElement>에 정의된 이벤트
 * - "on"으로 시작하는 이벤트 핸들러 이름만 포함 (예: "onClick", "onChange", "onSubmit" 등)
 */
type EventNames = keyof React.DOMAttributes<HTMLElement> & `on${string}`;

/**
 * @description 특정 HTML 요소의 특정 이벤트에 대한 이벤트 객체 타입을 추론하는 제네릭 타입
 * @template K - HTML 요소 타입 (예: "button", "input" 등)
 * @template E - 이벤트 핸들러 이름 (예: "onClick", "onChange" 등)
 * @returns 해당 이벤트의 이벤트 객체 타입 또는 never
 * @example
 * type InputChangeEvent = ElementEventType<"input", "onChange">; // React.ChangeEvent<HTMLInputElement>
 * type FormSubmitEvent = ElementEventType<"form", "onSubmit">; // React.FormEvent<HTMLFormElement>
 * type ButtonClickEvent = ElementEventType<"button", "onClick">; // React.MouseEvent<HTMLButtonElement, MouseEvent>
 */
type ElementEventType<
  K extends HTMLElementType,
  E extends EventNames
> = JSX.IntrinsicElements[K][E] extends ((e: infer Event) => void) | undefined
  ? Event
  : never;

interface EventExtenderProps<K extends HTMLElementType, E extends EventNames> {
  children: JSX.Element;
  capture: E;
  isAsync?: boolean;
  beforeEvent?: (e: ElementEventType<K, E>) => void | Promise<void>;
  afterEvent?: (e: ElementEventType<K, E>) => void | Promise<void>;
}

/**
 * @description 자식 컴포넌트의 이벤트 핸들러를 확장하여 `전후 처리`를 가능하게 하는 컴포넌트입니다.
 *
 * 기본적으로 `isAsync` 옵션은 `false`이며, `동기 이벤트`를 처리합니다.
 *
 * `isAsync` 옵션을 `true`로 주고, `비동기 이벤트` 를 처리 할 수 있습니다. 이를 통해 `비동기 이벤트 순서 보장`을 할 수 있습니다.
 *
 * 단, `비동기 이벤트`를 처리 할 경우 일반적인 이벤트 호출 순서가 아닌 순서로 이벤트가 호출될 수 있습니다.
 *
 * 이런 현상은 대표적으로 `MouseEvent`를 캡처하는 경우에 발생합니다.
 * - 예를 들어, `onMouseUp` 이벤트는 `onClick` 이벤트 이전에 호출되는게 일반적이지만, 해당 컴포넌트로 `onMouseUp` 이벤트를 캡처하면 `onMouseUp` 이벤트가 `onClick` 이벤트 이후에 호출됩니다.
 * - 이러한 현상은 `isAsync`가 `true`일 시 이벤트를 `await` 하기 때문입니다.
 *
 * @template K - HTML 요소 타입 (예: "button", "input" 등)
 * @template E - 이벤트 핸들러 이름 (예: "onClick", "onChange" 등)
 * @param {EventExtenderProps<K, E>} props - 컴포넌트 속성
 * @param {JSX.Element} props.children - 단일 자식 컴포넌트 (React 엘리먼트)
 * @param {E} props.capture - 확장하고자 하는 이벤트 핸들러 이름
 * @param {boolean} [props.isAsync=false] - 이벤트 동기 여부
 * @param {(e: ElementEventType<K, E>) => void | Promise<void>} [props.beforeEvent] - 이벤트 발생 전 실행할 함수, 비동기 함수 허용
 * @param {(e: ElementEventType<K, E>) => void | Promise<void>} [props.afterEvent] - 이벤트 발생 후 실행할 함수, 비동기 함수 허용
 * @returns {JSX.Element} 이벤트가 확장된 자식 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <EventExtender
 *   capture="onClick"
 *   beforeEvent={(e: React.MouseEvent<HTMLButtonElement>) => {
 *     console.log('클릭 전', e);
 *   }}
 *   afterEvent={(e: React.MouseEvent<HTMLButtonElement>) => {
 *     console.log('클릭 후', e);
 *   }}
 * >
 *   <button onClick={(e) => console.log('클릭', e)}>
 *     Button
 *   </button>
 * </EventExtender>
 * ```
 *
 * @example
 * ```tsx
 * // 비동기 함수를 사용할 수 있습니다.
 * <EventExtender
 *   isAsync={true} // (*)
 *   capture="onClick"
 *   beforeEvent={async (e: React.MouseEvent<HTMLButtonElement>) => {
 *     console.log('클릭 전', e);
 *     await asyncFunction();
 *   }}
 *   afterEvent={async (e: React.MouseEvent<HTMLButtonElement>) => {
 *     console.log('클릭 후', e);
 *     await asyncFunction();
 *   }}
 * >
 *   <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => console.log('클릭', e)}>
 *     Button
 *   </button>
 * </EventExtender>
 * ```
 */
export const EventExtender = <K extends HTMLElementType, E extends EventNames>({
  children,
  capture,
  isAsync = false,
  beforeEvent,
  afterEvent,
}: EventExtenderProps<K, E>): JSX.Element => {
  const child = React.Children.only(children);

  const asyncEvent = async (eventType: ElementEventType<K, E>) => {
    if (beforeEvent) {
      await beforeEvent(eventType);
    }

    const originEvent = child.props[capture];
    if (isFunction(originEvent)) {
      await originEvent(eventType);
    }

    if (afterEvent) {
      await afterEvent(eventType);
    }
  };

  const syncEvent = (eventType: ElementEventType<K, E>) => {
    if (beforeEvent) {
      beforeEvent(eventType);
    }

    const originEvent = child.props[capture];
    if (isFunction(originEvent)) {
      originEvent(eventType);
    }

    if (afterEvent) {
      afterEvent(eventType);
    }
  };

  const enhancedProps = {
    [capture]: isAsync ? asyncEvent : syncEvent,
  };

  return React.cloneElement(child, enhancedProps);
};
