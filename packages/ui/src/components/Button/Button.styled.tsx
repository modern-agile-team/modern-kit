import styled from '@emotion/styled';
import { ButtonStyledOptions } from './Button.types';
import {
  getButtonBorderRadiusByShape,
  getButtonSize,
  getButtonColorThemeByVariant,
} from './Button.utils';
import { colors } from '../../config/theme';
import { css } from '@emotion/react';

export const StyledButton = styled.button<ButtonStyledOptions>`
  position: relative;
  white-space: nowrap;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  line-height: 1;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor }) => fontColor};
  border-radius: ${({ shape }) => getButtonBorderRadiusByShape(shape)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  opacity: ${({ isLoading }) => (isLoading ? 0.7 : 1)};
  cursor: ${({ isLoading }) => (isLoading ? 'default' : 'pointer')};

  svg {
    margin-right: 6px;
  }

  &:disabled {
    background-color: ${({ variant }) =>
      variant === 'text' ? 'transparent' : colors.gray[100]};
    border: ${({ variant }) =>
      variant === 'text'
        ? '1px solid transparent'
        : `1px solid ${colors.gray[400]}`};
    color: ${colors.gray[400]};
    cursor: not-allowed;
  }

  &:disabled:hover,
  &:disabled:active {
    background-color: ${({ variant }) =>
      variant === 'text' ? 'transparent' : colors.gray[100]};
  }

  ${({ size }) => {
    const { height, padding, fontSize } = getButtonSize(size);
    return css`
      height: ${height};
      padding: ${padding};
      font-size: ${fontSize};
    `;
  }};

  ${({ variant, colorTheme, fontColor }) => {
    const { defaultBgColor, hoverBgColor, activeBgColor, borderColor, color } =
      getButtonColorThemeByVariant(variant, fontColor, colorTheme);

    return css`
      background-color: ${defaultBgColor};
      border: 1px solid ${borderColor};
      color: ${color};

      &:hover {
        background-color: ${hoverBgColor};
      }

      &:active {
        background-color: ${activeBgColor};
      }
    `;
  }}

  ${({ bodyStyle }) =>
    bodyStyle &&
    css`
      ${{ ...bodyStyle }};
    `}
`;
