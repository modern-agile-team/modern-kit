import React, { PropsWithoutRef, forwardRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useMergeRefs } from '../../hooks/useMergeRefs';

export interface LazyImageProps
  extends React.ComponentProps<'img'>,
    IntersectionObserverInit {
  src: string;
}

export const LazyImage = forwardRef<
  HTMLImageElement,
  PropsWithoutRef<LazyImageProps>
>(({ src, threshold, root, rootMargin, alt, className, ...restProps }, ref) => {
  const { ref: imgRef } = useIntersectionObserver<HTMLImageElement>({
    onIntersectStart: (entry) => {
      const targetImgElement = entry.target as HTMLImageElement;
      targetImgElement.src = src;
    },
    calledOnce: true,
    threshold,
    root,
    rootMargin,
  });

  const customClassName = className ? `lazy-image ${className}` : 'lazy-image';

  return (
    <img
      className={customClassName}
      ref={useMergeRefs(ref, imgRef)}
      alt={alt}
      {...restProps}
    />
  );
});

LazyImage.displayName = 'LazyImage';
