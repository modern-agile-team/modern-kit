import React from 'react';
import {
  useIntersectionObserver,
  UseIntersectionObserverProps,
} from '../../hooks/useIntersectionObserver';
import { polymorphicForwardRef } from '../../utils/polymorphicForwardRef';
import { mergeRefs } from '../../utils/mergeRefs';
import { Slot } from '../../components/Slot';

interface InViewProps extends UseIntersectionObserverProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const IN_VIEW_ERROR_MESSAGE =
  'InView는 asChild가 true일 경우 children으로 유효한 React 요소만을 허용합니다. 단일 요소만 허용됩니다.';

/**
 * @description `InView`는 `IntersectionObserver`를 선언적으로 활용 할 수 있는 컴포넌트입니다.
 *
 * 관찰 대상이 `viewport`에 노출될 때(`onIntersectStart`) 혹은 나갈 때(`onIntersectEnd`) 특정 action 함수를 호출 할 수 있는 컴포넌트입니다.
 *
 * `@modern-kit/react`의 `useIntersectionObserver` 훅을 사용하여 구현되었습니다.
 *
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/hooks/useIntersectionObserver
 *
 * `다형성(polymorphism)`을 위해 `as` 속성을 지원합니다.
 * - 기본적으로 `div` 태그로 자식 요소를 감싸서 렌더링하며, `as` 속성을 통해 감싸는 요소를 특정 요소로 변경해 렌더링할 수 있습니다.
 * - 이때 해당 요소가 `IntersectionObserver`의 관찰 대상입니다.
 *
 * `리액트 컴포넌트 합성(Composition)`을 지원하기 위해 `asChild` 속성을 지원합니다.
 * - `asChild` 속성이 `true`라면 `Slot`을 통해 래퍼 요소 없이 자식 요소를 그대로 렌더링 합니다.
 * - 이때, 자식 요소가 `IntersectionObserver`의 관찰 대상입니다.
 * - `asChild`를 사용 할 경우 아래 링크를 참고하세요.
 *
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/components/Slot
 *
 *
 * @param {InViewProps} props - 컴포넌트에 전달되는 속성들입니다.
 * @param {React.ReactNode} props.children - 관찰할 자식 요소입니다.
 * @param {string} props.as - 관찰할 요소의 타입입니다. 기본값은 `div`입니다.
 * @param {boolean} [props.asChild=false] - 자식 요소를 래퍼 요소 없이 렌더링하고, 관찰 대상으로 설정할지 여부입니다. `true`일 경우 `Slot` 컴포넌트를 통해 자식 요소에 직접 props를 전달합니다.
 * @param {(entry: IntersectionObserverEntry) => void} props.onIntersectStart - 타겟 요소가 viewport 내에 들어갈 때 호출되는 콜백 함수입니다.
 * @param {(entry: IntersectionObserverEntry) => void} props.onIntersectEnd - 타겟 요소가 viewport에서 나갈 때 호출되는 콜백 함수입니다.
 * @param {number | number[]} props.threshold - 관찰을 시작할 viewport의 가시성 비율입니다.
 * @param {Element | Document | null} props.root - 교차할 때 기준이 되는 root 요소입니다. 기본값은 `null`이며 이는 viewport를 의미합니다.
 * @param {string} props.rootMargin - 루트 요소에 대한 마진을 지정합니다. 이는 뷰포트 또는 루트 요소의 경계를 확장하거나 축소하는데 사용됩니다.
 * @param {boolean} props.enabled - Observer를 활성화할지 여부를 나타냅니다. `false`일 경우 Observer가 작동하지 않습니다.
 * @param {boolean} props.calledOnce - 요소가 교차할 때 콜백을 `한 번`만 호출할지 여부를 나타냅니다.
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * // default
 * <InView onIntersectStart={onIntersectStart} onIntersectEnd={onIntersectEnd}>
 *   <div>Contents</div>
 * </InView>
 * ```
 *
 * @example
 * ```tsx
 * // as: ul
 * <InView as="ul" onIntersectStart={onIntersectStart} onIntersectEnd={onIntersectEnd}>
 *   <li>List Item1</li>
 *   <li>List Item2</li>
 * </InView>
 * ```
 *
 * @example
 * ```tsx
 * // asChild
 * <InView asChild onIntersectStart={onIntersectStart} onIntersectEnd={onIntersectEnd}>
 *   <div>Contents</div>
 * </InView>
 * ```
 */
export const InView = polymorphicForwardRef<'div', InViewProps>(
  ({ children, as = 'div', asChild = false, ...props }, ref) => {
    const InViewWrapper = asChild ? Slot : as;
    const { ref: intersectionObserverRef } = useIntersectionObserver(props);

    if (asChild && !React.isValidElement(children)) {
      throw new Error(IN_VIEW_ERROR_MESSAGE);
    }

    return (
      <InViewWrapper ref={mergeRefs(ref, intersectionObserverRef)} {...props}>
        {children}
      </InViewWrapper>
    );
  }
);
