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
  const { action, calledOnce, threshold, root, rootMargin, ...restProps } =
    props;

  const intersectionObserverRef = useIntersectionObserver<HTMLDivElement>({
    action,
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
