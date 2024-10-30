import { describe, expect, it, vi } from 'vitest';
import { Slot, Slottable } from '.';
import { ComponentProps, PropsWithChildren, ReactElement } from 'react';
import { renderSetup } from '../../utils/test/renderSetup';
import { screen } from '@testing-library/dom';

const TestButton = ({
  asChild,
  ...props
}: PropsWithChildren<{ asChild?: boolean } & ComponentProps<'button'>>) => {
  const Comp = asChild ? Slot : 'button';

  return <Comp {...props} />;
};

const SlottableTestButton = ({
  asChild,
  leftElement,
  rightElement,
  ...props
}: PropsWithChildren<
  {
    asChild?: boolean;
    leftElement: ReactElement;
    rightElement: ReactElement;
  } & ComponentProps<'button'>
>) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp {...props}>
      {leftElement}
      <Slottable>{props.children}</Slottable>
      {rightElement}
    </Comp>
  );
};

describe('Slot', () => {
  const onClickMock = vi.fn();

  describe('Default', () => {
    it('', async () => {
      const { user } = renderSetup(
        <TestButton onClick={onClickMock}>Default Button</TestButton>
      );

      const button = screen.getByRole('button');

      await user.click(button);

      expect(onClickMock).toBeCalledTimes(1);
    });

    it('', async () => {
      const { user } = renderSetup(
        <TestButton asChild onClick={onClickMock}>
          <div role="custom-button">Custom Button</div>
        </TestButton>
      );

      const button = screen.getByRole('custom-button');

      await user.click(button);

      expect(onClickMock).toBeCalledTimes(1);
    });
  });

  describe('Slottable', () => {
    it('', async () => {
      const { user } = renderSetup(
        <SlottableTestButton
          onClick={onClickMock}
          leftElement={<span>left</span>}
          rightElement={<span>right</span>}>
          Button
        </SlottableTestButton>
      );

      const button = screen.getByRole('button');
      const leftElement = screen.getByText('left');
      const rightElement = screen.getByText('right');

      await user.click(button);

      expect(leftElement).toBeInTheDocument();
      expect(rightElement).toBeInTheDocument();
      expect(onClickMock).toBeCalledTimes(1);
    });

    it('', async () => {
      const { user } = renderSetup(
        <SlottableTestButton
          asChild
          onClick={onClickMock}
          leftElement={<span>left</span>}
          rightElement={<span>right</span>}>
          <div role="custom-button">Custom Button</div>
        </SlottableTestButton>
      );

      const button = screen.getByRole('custom-button');
      const leftElement = screen.getByText('left');
      const rightElement = screen.getByText('right');

      await user.click(button);

      expect(leftElement).toBeInTheDocument();
      expect(rightElement).toBeInTheDocument();
      expect(onClickMock).toBeCalledTimes(1);
    });
  });
});
