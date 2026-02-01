import React, { forwardRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useMergeRefs } from '../../hooks/useMergeRefs';

export interface LazyImageProps
  extends React.ComponentProps<'img'>,
    IntersectionObserverInit {
  src: string;
}

/**
 * @description 이미지가 viewport에 노출 될 때 할당된 이미지를 `Lazy Loading(지연 로딩)` 하는 이미지 컴포넌트입니다.
 *
 * `@modern-kit/react`의 `useIntersectionObserver` 훅을 사용하여 구현되었습니다.
 *
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/hooks/useIntersectionObserver
 *
 * @param {LazyImageProps} props - img 태그의 모든 속성 및 IntersectionObserverInit 속성을 지원합니다.
 * @param {Element} [params.root=null] - 교차할 때 기준이 되는 root 요소입니다. 기본값은 `null`이며 이는 viewport를 의미합니다.
 * @param {number | number[]} [params.threshold=0] - Observer가 콜백을 호출하는 임계값을 나타냅니다.
 * @param {string} [params.rootMargin='100px 0px'] - 루트 요소에 대한 마진을 지정합니다. 이는 뷰포트 또는 루트 요소의 경계를 확장하거나 축소하는데 사용됩니다.
 *
 * @returns {React.JSX.Element} 지연 로딩을 지원하는 이미지 컴포넌트를 반환합니다.
 *
 * @example
 * ```tsx
 * <LazyImage
 *   src="imageUrl"
 *   alt="Lazy loaded image"
 *   rootMargin="100px 0px"
 * />
 * ```
 */
export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, threshold, root, rootMargin, ...restProps }, ref): React.JSX.Element => {
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
