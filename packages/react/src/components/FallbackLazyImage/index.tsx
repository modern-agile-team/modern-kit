import React, {
  CSSProperties,
  PropsWithoutRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { LazyImage, LazyImageProps } from '../LazyImage';

interface FallbackLazyImageProps extends LazyImageProps {
  fallback: JSX.Element;
  width: LazyImageProps['width'];
  height: LazyImageProps['height'];
  isLoading?: boolean;
  duration?: CSSProperties['transitionDuration'];
}

export const FallbackLazyImage = forwardRef<
  HTMLImageElement,
  PropsWithoutRef<FallbackLazyImageProps>
>(
  (
    {
      width,
      height,
      fallback,
      style,
      duration = '0.2s',
      isLoading = false,
      onLoad,
      ...restProps
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const isRenderFallback = isLoading || !isLoaded;

    const wrapperStyle: CSSProperties = useMemo(
      () => ({
        position: 'relative',
        width,
        height,
      }),
      [width, height]
    );

    const imgStyle: CSSProperties = useMemo(
      () => ({
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: !isRenderFallback ? 1 : 0,
        transition: `opacity ${duration}`,
        ...style,
      }),
      [isRenderFallback, duration, style]
    );

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (onLoad) onLoad(e);
        setIsLoaded(true);
      },
      [onLoad]
    );

    return (
      <div style={wrapperStyle}>
        {isRenderFallback && fallback}
        <LazyImage
          ref={ref}
          width={width}
          height={height}
          style={imgStyle}
          onLoad={handleLoad}
          {...restProps}
        />
      </div>
    );
  }
);

FallbackLazyImage.displayName = 'FallbackLazyImage';
