import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useOutsidePointerDown } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';
import { useRef } from 'react';

const TestComponent = ({ onAction }: { onAction: () => void }) => {
  const excludeRef = useRef<HTMLDivElement>(null);
  const targetRef = useOutsidePointerDown<HTMLDivElement>(onAction, {
    excludeRefs: [excludeRef],
  });

  return (
    <div role="outside-box">
      outside
      <div ref={targetRef} role="inner-box">
        inner
      </div>
      <div role="exclude-box" ref={excludeRef}>
        exclude
      </div>
    </div>
  );
};

describe('useOutsidePointerDown', () => {
  it('타겟 요소 외부의 요소를 클릭할 때 콜백 함수가 호출되어야 합니다.', async () => {
    const mockFn = vi.fn();
    const { user } = renderSetup(<TestComponent onAction={mockFn} />);

    const outsideBox = screen.getByRole('outside-box');
    const innerBox = screen.getByRole('inner-box');

    await user.click(innerBox);
    expect(mockFn).toBeCalledTimes(0);

    await user.click(outsideBox);
    expect(mockFn).toBeCalledTimes(1);

    await user.click(innerBox);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('외부 요소 클릭 탐지 제외 요소를 클릭할 때 콜백 함수가 호출되지 않아야 합니다.', async () => {
    const mockFn = vi.fn();
    const { user } = renderSetup(<TestComponent onAction={mockFn} />);

    const excludeBox = screen.getByRole('exclude-box');
    const outsideBox = screen.getByRole('outside-box');

    await user.click(excludeBox);
    expect(mockFn).toBeCalledTimes(0);

    await user.click(outsideBox);
    expect(mockFn).toBeCalledTimes(1);
  });
});
