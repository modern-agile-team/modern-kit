import {
  CSSProperties,
  Children,
  ComponentProps,
  PropsWithChildren,
  forwardRef,
  useMemo,
} from 'react';
import classNames from 'classnames';
import styles from './AspectRatio.module.css';

interface AspectRatioProps extends ComponentProps<'div'> {
  ratio: number;
}

export const AspectRatio = forwardRef<
  HTMLDivElement,
  PropsWithChildren<AspectRatioProps>
>(({ ratio, children, className, style, ...props }, ref) => {
  const customStyle: CSSProperties = useMemo(
    () => ({
      paddingTop: `calc(100% * (1 / ${ratio}))`,
      ...style,
    }),
    [ratio, style]
  );

  if (Children.count(children) > 1) {
    throw new Error('AspectRatio component expects exactly one child element.');
  }
  return (
    <div
      ref={ref}
      className={classNames(styles['wrapper'], className)}
      style={customStyle}
      {...props}>
      {Children.only(children)}
    </div>
  );
});

AspectRatio.displayName = 'AspectRatio';
