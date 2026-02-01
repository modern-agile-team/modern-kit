import {
  UseIntersectionObserverProps,
  useIntersectionObserver,
} from '../../hooks/useIntersectionObserver';
import React, { PropsWithChildren } from 'react';

export interface InfiniteScrollProps
  extends Omit<
    UseIntersectionObserverProps,
    'onIntersectStart' | 'onIntersectEnd' | 'calledOnce'
  > {
  children: React.ReactNode;
  onScrollAction: (entry: IntersectionObserverEntry) => void;
  triggerPosition?: 'before' | 'after';
}

/**
 * @description 무한 스크롤 기능을 선언적으로 활용 할 수 있는 컴포넌트입니다.
 *
 * `@modern-kit/react`의 `useIntersectionObserver` 훅을 사용하여 구현되었습니다.
 *
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/hooks/useIntersectionObserver
 *
 * @param {InfiniteScrollProps} props
 * @param {React.ReactNode} props.children - 래핑할 자식 컴포넌트
 * @param {'before' | 'after'} props.triggerPosition - 스크롤 트리거 요소의 위치 ('before' | 'after', 기본값: 'after')
 * @param {(entry: IntersectionObserverEntry) => void} props.onScrollAction - 트리거 요소가 뷰포트와 교차할 때 실행될 콜백 함수
 * @param {number | number[]} props.threshold - 관찰을 시작할 viewport의 가시성 비율입니다.
 * @param {Element | Document | null} props.root - 교차할 때 기준이 되는 root 요소입니다. 기본값은 `null`이며 이는 viewport를 의미합니다.
 * @param {string} [props.rootMargin='150px 0px'] - 루트 요소에 대한 마진을 지정합니다. 이는 뷰포트 또는 루트 요소의 경계를 확장하거나 축소하는데 사용됩니다. (기본값: '150px 0px')
 * @param {boolean} props.enabled - Observer를 활성화할지 여부를 나타냅니다. `false`일 경우 Observer가 작동하지 않습니다.
 *
 * @returns {React.JSX.Element} 자식 컴포넌트와 Intersection Observer 트리거 요소를 포함한 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
 *   <InfiniteScroll
 *     onScrollAction={loadMoreData}
 *     triggerPosition="after"
 *     rootMargin="200px 0px"
 *   >
 *     <div>box1</div>
 *     <div>box2</div>
 *     <div>box3</div>
 *     ...
 *     <div>box99</div>
 *     <div>box100</div>
 *   </InfiniteScroll>
 * </div>
 * ```
 */
export const InfiniteScroll = ({
  onScrollAction,
  children,
  root,
  threshold,
  enabled,
  triggerPosition = 'after',
  rootMargin = '150px 0px',
}: PropsWithChildren<InfiniteScrollProps>): React.JSX.Element => {
  const { ref: observedRef } = useIntersectionObserver({
    onIntersectStart: onScrollAction,
    root,
    threshold,
    enabled,
    rootMargin,
  });

  return (
    <>
      {triggerPosition === 'before' && <div ref={observedRef} />}
      {children}
      {triggerPosition === 'after' && <div ref={observedRef} />}
    </>
  );
};
