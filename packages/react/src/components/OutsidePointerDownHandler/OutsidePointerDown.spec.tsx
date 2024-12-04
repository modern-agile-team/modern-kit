import { describe, it, expect, vi } from 'vitest';
import { waitFor, screen } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';
import { OutsidePointerDownHandler } from './index';

const TestComponent = ({ onPointerDown }: { onPointerDown: () => void }) => {
  return (
    <>
      <OutsidePointerDownHandler onPointerDown={onPointerDown}>
        <div role="inside-element">inside</div>
      </OutsidePointerDownHandler>

      <div role="outside-element">outside</div>
    </>
  );
};

describe('OutsidePointerDownHandler', () => {
  const onPointerDownMockFn = vi.fn();

  it('컴포넌트 외부를 클릭 혹은 터치했을 때 onPointerDown으로 전달한 함수가 호출되어야 합니다.', async () => {
    const { user } = renderSetup(
      <TestComponent onPointerDown={onPointerDownMockFn} />
    );

    await user.click(screen.getByRole('inside-element'));
    expect(onPointerDownMockFn).not.toHaveBeenCalled();

    await user.click(screen.getByRole('outside-element'));

    await waitFor(() => {
      expect(onPointerDownMockFn).toHaveBeenCalledTimes(1);
    });

    await user.click(document.body);

    await waitFor(() => {
      expect(onPointerDownMockFn).toHaveBeenCalledTimes(2);
    });
  });

  it('컴포넌트 내부를 클릭 혹은 터치했을 때 onPointerDown으로 전달한 함수가 호출되지 않아야 합니다.', async () => {
    const { user } = renderSetup(
      <TestComponent onPointerDown={onPointerDownMockFn} />
    );

    await user.click(screen.getByRole('inside-element'));
    expect(onPointerDownMockFn).not.toHaveBeenCalled();
  });
});
