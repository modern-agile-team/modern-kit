import {
  useIntersectionObserver,
  UseIntersectionObserverProps,
} from '../../hooks/useIntersectionObserver';
import { useMergeRefs } from '../../hooks/useMergeRefs';
import React, { forwardRef, PropsWithChildren } from 'react';

type InViewProps = React.ComponentProps<'div'> & UseIntersectionObserverProps;

export const InView = forwardRef<
  HTMLDivElement,
  PropsWithChildren<InViewProps>
>((props, ref) => {
  const {
    onIntersectStart,
    onIntersectEnd,
    calledOnce,
    threshold,
    root,
    rootMargin,
    ...restProps
  } = props;

  const { ref: intersectionObserverRef } =
    useIntersectionObserver<HTMLDivElement>({
      onIntersectStart,
      onIntersectEnd,
      calledOnce,
      threshold,
      root,
      rootMargin,
    });

  return (
    <div ref={useMergeRefs(ref, intersectionObserverRef)} {...restProps}>
      {props.children}
    </div>
  );
});

InView.displayName = 'InView';
