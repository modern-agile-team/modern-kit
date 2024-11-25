import React, { forwardRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useMergeRefs } from '../../hooks/useMergeRefs';

export interface LazyImageProps
  extends React.ComponentProps<'img'>,
    IntersectionObserverInit {
  src: string;
}

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, threshold, root, rootMargin, ...restProps }, ref) => {
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

    return <img ref={useMergeRefs(ref, imgRef)} {...restProps} />;
  }
);

LazyImage.displayName = 'LazyImage';
