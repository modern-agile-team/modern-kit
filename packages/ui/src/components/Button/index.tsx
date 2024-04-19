import { forwardRef } from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton } from './Button.styled';
import { Loader } from '../Loader';
import { getButtonLoaderSize } from './Button.utils';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      fontColor,
      isLoading = false,
      fullWidth = false,
      fontWeight = 700,
      size = 'medium',
      variant = 'contained',
      shape = 'round',
      colorTheme = 'blue',
      bodyStyle,
      ...restProps
    }: ButtonProps,
    ref
  ) => {
    const { width: loaderWidth, height: loaderHeight } =
      getButtonLoaderSize(size);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { onClick } = restProps;

      if (isLoading) return;
      if (onClick) onClick(e);
    };

    return (
      <StyledButton
        {...restProps}
        ref={ref}
        isLoading={isLoading}
        fullWidth={fullWidth}
        fontWeight={fontWeight}
        size={size}
        colorTheme={colorTheme}
        variant={variant}
        shape={shape}
        fontColor={fontColor}
        onClick={handleClick}
        bodyStyle={bodyStyle}>
        {isLoading && <Loader width={loaderWidth} height={loaderHeight} />}
        {children}
      </StyledButton>
    );
  }
);
