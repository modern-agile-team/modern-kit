import { css } from '@emotion/react';
import { BaseTypographyProps } from '.';
import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { colors } from '../../config/theme';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';

interface CreateTypographyStyledComponentProps {
  tag: TypographyTag;
  defaultFontSize: CSSProperties['fontSize'];
  defaultFontWeight: CSSProperties['fontWeight'];
}

interface StyledTypographyProps extends BaseTypographyProps {
  color?: CSSProperties['color'];
}

/**
 * @description
 * StyledComponent creation utility functions with currying
 *
 * @param tag - The tag you want to create (ex: h1, h2, h3, p, etc.)
 * @param defaultFontSize - Default font size
 * @param defaultFontWeight - Default font weight
 */
export const createTypographyStyledComponent = ({
  tag,
  defaultFontSize,
  defaultFontWeight,
}: CreateTypographyStyledComponentProps) => {
  return styled(tag)<StyledTypographyProps>`
    ${({
      color = colors.gray[900],
      textAlign = 'inherit',
      whiteSpace = 'normal',
      fontSize = defaultFontSize,
      fontWeight = defaultFontWeight,
      bodyStyle,
    }) => {
      return css`
        color: ${color};
        font-size: ${typeof fontSize === 'number' ? `${fontSize}px` : fontSize};
        font-weight: ${fontWeight};
        text-align: ${textAlign};
        white-space: ${whiteSpace};

        ${{ ...bodyStyle }};
      `;
    }}
  `;
};
