import styled from '@emotion/styled';
import { DimmedWrapperProps } from './Dimmed.types';
import { css } from '@emotion/react';

export const DimmedWrapper = styled.div<DimmedWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ alpha }) => `rgba(0, 0, 0, ${alpha})`};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex};

  &.devgrace-dimmed-enter {
    opacity: 0;
  }
  &.devgrace-dimmed-enter-active {
    opacity: 1;
    transition: ${({ timeout }) => `opacity ${timeout}ms`};
  }
  &.devgrace-dimmed-exit {
    opacity: 1;
  }
  &.devgrace-dimmed-exit-active {
    opacity: 0;
    transition: ${({ timeout }) => `opacity ${timeout}ms`};
  }

  ${({ bodyStyle }) =>
    bodyStyle &&
    css`
      ${{ ...bodyStyle }};
    `}
`;
