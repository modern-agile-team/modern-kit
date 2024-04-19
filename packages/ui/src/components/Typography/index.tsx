import React, { PropsWithChildren, CSSProperties } from 'react';
import { createTypographyStyledComponent } from './Typography.utils';
import { rem } from '../../utils';

export interface BaseTypographyProps {
  textAlign?: CSSProperties['textAlign'];
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  whiteSpace?: CSSProperties['whiteSpace'];
  bodyStyle?: CSSProperties;
}

export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadElement>,
    BaseTypographyProps {
  level?: 1 | 2 | 3 | 4 | 5;
}

export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> &
  BaseTypographyProps;

export type TextProps = React.HTMLAttributes<HTMLSpanElement> &
  BaseTypographyProps;

const TITLE_DEFAULT_SIZE = 32;
const TITLE_DECREASE_PER_SIZE = 4;

const Title = ({
  children,
  level = 1,
  ...restProps
}: PropsWithChildren<TitleProps>) => {
  const titleFontSizeByLevel =
    TITLE_DEFAULT_SIZE - TITLE_DECREASE_PER_SIZE * (level - 1);
  const HeadingComponent = createTypographyStyledComponent({
    tag: `h${level}`,
    defaultFontSize: rem(titleFontSizeByLevel),
    defaultFontWeight: 700,
  });

  return <HeadingComponent {...restProps}>{children}</HeadingComponent>;
};

const Paragraph = ({
  children,
  ...restProps
}: PropsWithChildren<ParagraphProps>) => {
  const ParagraphTag = createTypographyStyledComponent({
    tag: 'p',
    defaultFontSize: rem(16),
    defaultFontWeight: 500,
  });

  return <ParagraphTag {...restProps}>{children}</ParagraphTag>;
};

const Text = ({ children, ...restProps }: PropsWithChildren<TextProps>) => {
  const SpanTag = createTypographyStyledComponent({
    tag: 'span',
    defaultFontSize: rem(16),
    defaultFontWeight: 500,
  });

  return <SpanTag {...restProps}>{children}</SpanTag>;
};

export const Typography = Object.assign(
  {},
  {
    Title,
    Paragraph,
    Text,
  }
);
