import { CSSProperties, PropsWithChildren } from 'react';
import { noop } from '@devgrace/utils';
import * as S from './Ripple.styled';
import useRipple from './useRipple';
import { colors } from '../../config/theme';

export interface RippleProps {
  rippleColor?: CSSProperties['backgroundColor'];
  bgColor?: CSSProperties['backgroundColor'];
  borderRadius?: CSSProperties['borderRadius'];
  duration?: number;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Ripple = ({
  children,
  disabled = false,
  fullWidth = false,
  borderRadius = '0',
  rippleColor = colors.gray[300],
  bgColor = colors.white[500],
  duration = 800,
}: PropsWithChildren<RippleProps>) => {
  const { ripples, onMouseDownAddRipple, onTouchStartAddRipple } =
    useRipple(duration);

  return (
    <S.RippleWrapper
      fullWidth={fullWidth}
      borderRadius={borderRadius}
      onMouseDown={disabled ? noop : onMouseDownAddRipple}
      onTouchStart={disabled ? noop : onTouchStartAddRipple}>
      <S.RippleInnerWrapper bgColor={bgColor}>{children}</S.RippleInnerWrapper>

      {ripples.map(({ id, ...style }, index) => (
        <S.RippleCircleItem
          key={`ripple-${index}-${id}`}
          rippleColor={rippleColor}
          duration={duration}
          {...style}
        />
      ))}
    </S.RippleWrapper>
  );
};
