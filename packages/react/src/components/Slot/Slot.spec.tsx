import { describe, expect, it, vi } from 'vitest';
import { Slot, Slottable } from '.';
import {
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  forwardRef,
} from 'react';
import { renderSetup } from '../../_internal/test/renderSetup';
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
    it('button 태그가 렌더링되야 합니다.', async () => {
      const { user } = renderSetup(
        <TestButton onClick={onClickMock}>Default Button</TestButton>
      );

      const button = screen.getByRole('button');

      await user.click(button);

      expect(onClickMock).toBeCalledTimes(1);
    });

    it('asChild 속성이 있으면 자식 요소가 그대로 렌더링되야 합니다.', async () => {
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
    it('Slottable이 있을 경우 Slottable 자식에 렌더링되야 합니다.', async () => {
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

    it('asChild가 있을 경우 자식 요소가 그대로 Slottable 자식에 렌더링되야 합니다.', async () => {
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

  describe('에러 케이스', () => {
    // 기본 버튼
    const DefaultButton = ({ children }: PropsWithChildren) => (
      <button>{children}</button>
    );

    // forwardRef/Props 허용 버튼
    const ButtonWithForwardRefAndProps = forwardRef<
      HTMLButtonElement,
      ComponentProps<'button'>
    >((props, ref) => <button ref={ref} {...props} />);

    ButtonWithForwardRefAndProps.displayName = 'Button';

    it('Slot은 단일 요소만을 허용해야 합니다.', async () => {
      expect(() => {
        renderSetup(
          <Slot>
            <p>안녕하세요.</p>
            <p>안녕하세요.</p>
          </Slot>
        );
      }).toThrow(
        'React.Children.only expected to receive a single React element child.'
      );
    });

    it('Slot은 정상적인 ReactElement 타입이 아니면 null을 반환해야 합니다.', async () => {
      renderSetup(<Slot>안녕하세요.</Slot>);

      const text = screen.queryByText('안녕하세요.');
      expect(text).toBeNull();
    });

    it('Slot은 자식으로 컴포넌트를 사용 할 경우 forwardRef/Props를 허용해야 정상적으로 동작해야 합니다.', async () => {
      const { user } = renderSetup(
        <Slot onClick={onClickMock}>
          <ButtonWithForwardRefAndProps>Button</ButtonWithForwardRefAndProps>
        </Slot>
      );

      const button = screen.getByRole('button');

      await user.click(button);

      expect(onClickMock).toBeCalledTimes(1); // 정상 호출
    });

    it('Slot은 자식으로 컴포넌트를 사용 할 경우 forwardRef/Props를 전달하지 않으면 정상적으로 동작하지 않아야 합니다.', async () => {
      const { user } = renderSetup(
        <Slot onClick={onClickMock}>
          <DefaultButton>Button</DefaultButton>
        </Slot>
      );

      const button = screen.getByRole('button');

      await user.click(button);

      expect(onClickMock).toBeCalledTimes(0); // 정상 호출 X
    });
  });
});
