import { ReactNode } from 'react';
import { useOutsidePointerDown } from '../../hooks/useOutsidePointerDown';
import { mergeRefs } from '../../utils/mergeRefs';
import { polymorphicForwardRef } from '../../utils/polymorphicForwardRef';
import { Slot } from '../Slot';
import React from 'react';

interface OutsidePointerDownHandlerProps {
  children: ReactNode;
  onPointerDown: (targetElement: HTMLElement) => void;
  excludeRefs?: React.RefObject<HTMLElement>[];
  asChild?: boolean;
}

const OUTSIDE_POINTER_DOWN_HANDLER_ERROR_MESSAGE =
  'OutsidePointerDownHandler는 asChild가 true일 경우 children으로 유효한 React 요소만을 허용합니다. 또한, 단일 요소만 허용합니다.';

/**
 * @description `OutsidePointerDownHandler`는 컴포넌트 외부 영역 클릭 및 터치를 감지하여 `onPointerDown` 함수를 호출하는 컴포넌트입니다.
 *
 * @modern-kit/react의 `useOutsidePointerDown` 훅을 기반으로 구현됐습니다.
 *
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/hooks/useOutsidePointerDown
 *
 * `as` 속성을 통해 `다형성(polymorphism)`을 지원합니다:
 * - 기본적으로 `div` 태그로 자식 요소를 감싸서 렌더링하며, `as` 속성을 통해 감싸는 Wrapper 요소의 태그를 변경해 렌더링할 수 있습니다. (ex. div -> article)
 * - 이때, 해당 Wrapper 요소의 외부 영역을 클릭 혹은 터치 시 `onPointerDown` 콜백 함수가 호출됩니다.
 *
 * `asChild` 속성을 통해 `합성(Composition)`, `렌더링 위임(Rendering Delegation)` 패턴을 지원합니다:
 * - `asChild` 속성이 `true`라면 `Slot`을 통해 래퍼 요소 없이 자식 요소를 렌더링합니다.
 * - 이때, 자식 요소의 외부 영역을 클릭 혹은 터치 시 `onPointerDown` 콜백 함수가 호출됩니다.
 * - `asChild`를 사용 할 경우 아래 링크를 참고하세요.
 *
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/components/Slot
 *
 * @param {OutsidePointerDownHandlerProps} props - OutsidePointerDownHandler 컴포넌트의 속성입니다.
 * @param {string} [props.as='div'] - 자식 요소를 감싸는 요소를 지정합니다. 기본 값은 `div`입니다. 해당 요소 외부를 클릭 혹은 터치 시 onPointerDown 함수가 호출됩니다.
 * @param {boolean} [props.asChild=false] - `true`일 경우 `Slot`을 통해 자식 요소를 그대로 렌더링하고, 해당 자식 요소 외부를 클릭 혹은 터치 시 onPointerDown 함수가 호출됩니다.
 * @param {() => void} props.onPointerDown - 외부 영역 클릭 혹은 터치 시 실행될 함수
 * @param {React.RefObject<HTMLElement>[]} [props.excludeRefs] - 외부 클릭 및 터치 감지를 제외할 요소의 ref 배열입니다.
 * @param {ReactNode} props.children - 자식 컴포넌트
 *
 * @returns {JSX.Element} 외부 영역 클릭 혹은 터치 시 onPointerDown 함수가 호출되는 컴포넌트를 반환합니다.
 *
 * @example
 * ```tsx
 * // default
 * <OutsidePointerDownHandler onPointerDown={onPointerDown}>
 *   <div>Contents</div>
 * </OutsidePointerDownHandler>
 *
 * // excludeRefs 속성을 통해 외부 클릭 및 터치 감지를 제외할 요소를 지정할 수 있습니다.
 * <div>
 *  <OutsidePointerDownHandler onPointerDown={onPointerDown} excludeRefs={[excludeRef]}>
 *    <div>Contents</div>
 *  </OutsidePointerDownHandler>
 *  <div ref={excludeRef}>Exclude Box</div>
 * </div>
 * ```
 *
 * @example
 * // as: ul
 *  <OutsidePointerDownHandler as='ul' onPointerDown={onPointerDown}>
 *   <li>List Item1</li>
 *   <li>List Item2</li>
 * </OutsidePointerDownHandler>
 *
 * @example
 * // asChild
 * <OutsidePointerDownHandler asChild onPointerDown={onPointerDown}>
 *   <input type="text" />
 * </OutsidePointerDownHandler>
 */
export const OutsidePointerDownHandler = polymorphicForwardRef<
  'div',
  OutsidePointerDownHandlerProps
>(
  (
    {
      children,
      as = 'div',
      asChild = false,
      onPointerDown,
      excludeRefs = [],
      ...props
    },
    ref
  ) => {
    const { ref: targetRef } = useOutsidePointerDown<HTMLElement>(
      onPointerDown,
      {
        excludeRefs,
      }
    );

    const Wrapper = asChild ? Slot : as;

    if (asChild && !React.isValidElement(children)) {
      throw new Error(OUTSIDE_POINTER_DOWN_HANDLER_ERROR_MESSAGE);
    }

    return (
      <Wrapper ref={mergeRefs(targetRef, ref)} {...props}>
        {children}
      </Wrapper>
    );
  }
);
