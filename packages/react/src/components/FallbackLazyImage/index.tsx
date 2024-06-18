import React, {
  CSSProperties,
  PropsWithoutRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { LazyImage, LazyImageProps } from '../LazyImage';

interface FallbackLazyImageProps extends Omit<LazyImageProps, 'style'> {
  fallback: JSX.Element;
  width: string | number;
  height: string | number;
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
      className,
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
      }),
      [isRenderFallback, duration]
    );

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (onLoad) onLoad(e);
        setIsLoaded(true);
      },
      [onLoad]
    );

    return (
      <div className={`lazy-image-wrapper ${className}`} style={wrapperStyle}>
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
