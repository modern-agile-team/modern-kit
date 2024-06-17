import React, { forwardRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useMergeRefs } from '../../hooks/useMergeRefs';

interface LazyImageProps
  extends React.ComponentProps<'img'>,
    IntersectionObserverInit {
  src: string;
}

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  (
    { src, style, threshold, root, rootMargin, ...restProps }: LazyImageProps,
    ref
  ) => {
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

    return <img ref={useMergeRefs(ref, imgRef)} style={style} {...restProps} />;
  }
);

LazyImage.displayName = 'LazyImage';
