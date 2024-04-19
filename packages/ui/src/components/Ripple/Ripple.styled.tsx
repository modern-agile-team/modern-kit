import styled from '@emotion/styled';
import { RippleProps } from '.';
import { RippleItem } from './useRipple';

export const RippleCircleItem = styled.span<
  Omit<RippleItem, 'id'> & RippleProps
>`
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  animation: ${({ duration }) => `rippleEffect ${duration}ms linear`};
  background-color: ${({ rippleColor }) => rippleColor};
  border-radius: 50%;
  position: absolute;
  transform: scale(0);
  opacity: 0.5;
  z-index: 0;

  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

export const RippleWrapper = styled.div<{
  borderRadius: RippleProps['borderRadius'];
  fullWidth: boolean;
}>`
  position: relative;
  overflow: hidden;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  cursor: pointer;
  isolation: isolate; /* desktop safari border-radius issue */
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius};
`;

export const RippleInnerWrapper = styled.div<{
  bgColor: RippleProps['bgColor'];
}>`
  background-color: ${({ bgColor }) => bgColor};
`;
