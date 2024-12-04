import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';
import { OutsidePointerDownHandler } from './index';
import { ElementType } from 'react';

const OUTSIDE_POINTER_DOWN_HANDLER_ERROR_MESSAGE =
  'OutsidePointerDownHandler는 asChild가 true일 경우 children으로 유효한 React 요소만을 허용합니다. 또한, 단일 요소만 허용합니다.';

const TestComponent = ({
  onPointerDown,
  asChild = false,
  as = 'div',
}: {
  onPointerDown: () => void;
  asChild?: boolean;
  as?: ElementType;
}) => {
  return (
    <>
      <OutsidePointerDownHandler
        onPointerDown={onPointerDown}
        asChild={asChild}
        as={as}>
        <div role="inside-element">inside</div>
      </OutsidePointerDownHandler>

      <div role="outside-element">outside</div>
    </>
  );
};

describe('OutsidePointerDownHandler', () => {
  const onPointerDownMockFn = vi.fn();

  describe('as 속성 사용', () => {
    it('기본적으로 `div` 태그로 감싸서 렌더링되어야 합니다.', () => {
      renderSetup(<TestComponent onPointerDown={onPointerDownMockFn} />);

      const insideElement = screen.getByRole('inside-element');
      const insideElementWrapper = insideElement.parentElement;
      expect(insideElementWrapper?.tagName).toBe('DIV');
    });

    it('`as` 속성을 통해 감싸는 요소를 변경할 수 있습니다.', () => {
      renderSetup(
        <TestComponent onPointerDown={onPointerDownMockFn} as="section" />
      );

      const insideElement = screen.getByRole('inside-element');
      const insideElementWrapper = insideElement.parentElement;
      expect(insideElementWrapper?.tagName).toBe('SECTION');
    });

    it('자식 요소 wrapper 외부를 클릭 혹은 터치 시 onPointerDown으로 전달한 함수가 호출되어야 합니다.', async () => {
      const { user } = renderSetup(
        <TestComponent onPointerDown={onPointerDownMockFn} />
      );
      const outsideElement = screen.getByRole('outside-element');

      await user.click(outsideElement); // 외부 요소
      expect(onPointerDownMockFn).toHaveBeenCalledTimes(1);

      await user.click(document.body); // document.body
      expect(onPointerDownMockFn).toHaveBeenCalledTimes(2);
    });

    it('자식 요소 wrapper를 포함한 내부 클릭 혹은 터치 시 onPointerDown으로 전달한 함수가 호출되지 않아야 합니다.', async () => {
      const { user } = renderSetup(
        <TestComponent onPointerDown={onPointerDownMockFn} />
      );

      const insideElement = screen.getByRole('inside-element');
      const insideElementWrapper = insideElement.parentElement as HTMLElement;

      await user.click(insideElementWrapper); // wrapper
      expect(onPointerDownMockFn).not.toHaveBeenCalled();

      await user.click(insideElement); // 내부 요소
      expect(onPointerDownMockFn).not.toHaveBeenCalled();
    });
  });

  describe('asChild 속성 사용', () => {
    it('자식 요소 외부를 클릭 혹은 터치 시 onPointerDown으로 전달한 함수가 호출되어야 합니다.', async () => {
      const { user } = renderSetup(
        <TestComponent onPointerDown={onPointerDownMockFn} asChild />
      );

      const insideElement = screen.getByRole('inside-element');
      // 참고: 테스트 환경에서 기본적으로 div로 감싸주기 때문에 이를 테스트 코드로 활용합니다.
      const insideElementWrapper = insideElement.parentElement as HTMLElement;
      const outsideElement = screen.getByRole('outside-element');

      await user.click(insideElementWrapper);
      expect(onPointerDownMockFn).toHaveBeenCalledTimes(1);

      await user.click(outsideElement); // 외부 요소
      expect(onPointerDownMockFn).toHaveBeenCalledTimes(2);

      await user.click(document.body); // document.body
      expect(onPointerDownMockFn).toHaveBeenCalledTimes(3);
    });

    it('자식 요소 클릭 혹은 터치 시 onPointerDown으로 전달한 함수가 호출되지 않아야 합니다.', async () => {
      const { user } = renderSetup(
        <TestComponent onPointerDown={onPointerDownMockFn} asChild />
      );

      const insideElement = screen.getByRole('inside-element');

      await user.click(insideElement); // 내부 요소
      expect(onPointerDownMockFn).not.toHaveBeenCalled();
    });
  });

  describe('에러 케이스', () => {
    it('asChild가 true일 경우 children으로 유효한 React 요소만을 허용합니다.', () => {
      expect(() =>
        renderSetup(
          <OutsidePointerDownHandler
            onPointerDown={onPointerDownMockFn}
            asChild={true}>
            일반 text 노드
          </OutsidePointerDownHandler>
        )
      ).toThrow(OUTSIDE_POINTER_DOWN_HANDLER_ERROR_MESSAGE);
    });
  });
});
