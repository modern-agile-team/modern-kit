import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { InfiniteScroll, InfiniteScrollProps } from '.';
import {
  mockIntersecting,
  mockIntersectionObserverCleanup,
  mockIntersectionObserverSetup,
} from '../../utils/test/mockIntersectionObserver';
import { renderSetup } from '../../utils/test/renderSetup';

beforeEach(() => {
  mockIntersectionObserverSetup();
});

afterEach(() => {
  mockIntersectionObserverCleanup();
});

const TestComponent = ({
  onScrollAction,
  triggerPosition,
  enabled,
}: Omit<InfiniteScrollProps, 'children'>) => {
  return (
    <InfiniteScroll
      onScrollAction={onScrollAction}
      enabled={enabled}
      triggerPosition={triggerPosition}>
      <div>box</div>
    </InfiniteScroll>
  );
};

describe('InfiniteScroll', () => {
  const onScrollActionMock = vi.fn();

  it('InfiniteScroll 자식 요소 이후에 있는 트리거 요소가 viewport에 노출될 때 onScrollAction 콜백 함수를 호출해야 합니다.', async () => {
    renderSetup(<TestComponent onScrollAction={onScrollActionMock} />);

    const triggerElement = screen.getByText('box').nextSibling as HTMLElement;

    expect(onScrollActionMock).toBeCalledTimes(0);

    await waitFor(() =>
      mockIntersecting({ type: 'view', element: triggerElement })
    );
    expect(onScrollActionMock).toBeCalledTimes(1);

    await waitFor(() =>
      mockIntersecting({ type: 'hide', element: triggerElement })
    );
    expect(onScrollActionMock).toBeCalledTimes(1);
  });

  it('triggerPosition이 "before"일 때, InfiniteScroll 자식 요소 이전에 있는 트리거 요소가 viewport에 노출될 때 onScrollAction 콜백 함수를 호출해야 합니다.', async () => {
    renderSetup(
      <TestComponent
        onScrollAction={onScrollActionMock}
        triggerPosition="before"
      />
    );

    const triggerElement = screen.getByText('box')
      .previousSibling as HTMLElement;

    expect(onScrollActionMock).toBeCalledTimes(0);

    await waitFor(() =>
      mockIntersecting({ type: 'view', element: triggerElement })
    );
    expect(onScrollActionMock).toBeCalledTimes(1);
  });

  it('enabled가 false일 때, onScrollAction 콜백 함수를 호출하지 않아야 합니다.', async () => {
    renderSetup(
      <TestComponent onScrollAction={onScrollActionMock} enabled={false} />
    );

    const triggerElement = screen.getByText('box').nextSibling as HTMLElement;

    expect(onScrollActionMock).toBeCalledTimes(0);

    await waitFor(() =>
      mockIntersecting({ type: 'view', element: triggerElement })
    );
    expect(onScrollActionMock).toBeCalledTimes(0);
  });
});
