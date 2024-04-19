import { CSSProperties, PropsWithChildren } from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export interface DimmedProps
  extends PropsWithChildren<React.ComponentProps<'div'>> {
  alpha?: string | number;
  zIndex?: CSSProperties['zIndex'];
  isShow?: CSSTransitionProps['in'];
  isTransition?: boolean;
  timeout?: CSSTransitionProps['timeout'];
  bodyStyle?: CSSProperties;
}

export type DimmedWrapperProps = Pick<
  DimmedProps,
  'alpha' | 'zIndex' | 'timeout' | 'bodyStyle'
>;
