import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { LazyImage, LazyImageProps } from '../LazyImage';

interface FallbackLazyImageProps extends LazyImageProps {
  fallback: JSX.Element;
  width: string | number;
  height: string | number;
  duration?: CSSProperties['transitionDuration'];
}

export const FallbackLazyImage = forwardRef<
  HTMLImageElement,
  FallbackLazyImageProps
>(
  (
    {
      width,
      height,
      fallback,
      className,
      style,
      duration = '0.2s',
      onLoad,
      ...restProps
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const isRenderFallback = !isLoaded;

    const wrapperStyle: CSSProperties = useMemo(
      () => ({
        position: 'relative',
        width,
        height,
      }),
      [width, height]
    );

    const imageStyle: CSSProperties = useMemo(
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

    const customClassName = className
      ? `lazy-image-wrapper ${className}`
      : 'lazy-image-wrapper';

    return (
      <div className={customClassName} style={wrapperStyle}>
        {isRenderFallback && fallback}
        <LazyImage
          ref={ref}
          width={width}
          height={height}
          style={imageStyle}
          onLoad={handleLoad}
          {...restProps}
        />
      </div>
    );
  }
);

FallbackLazyImage.displayName = 'FallbackLazyImage';
