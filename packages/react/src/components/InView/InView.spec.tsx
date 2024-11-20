import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { InView } from '.';
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

interface TestComponentProps {
  onIntersectStart: () => void;
  onIntersectEnd: () => void;
  calledOnce?: boolean;
}

const TestComponent = ({
  onIntersectStart,
  onIntersectEnd,
  calledOnce,
}: TestComponentProps) => {
  return (
    <InView
      onIntersectStart={onIntersectStart}
      onIntersectEnd={onIntersectEnd}
      calledOnce={calledOnce}>
      <div>box</div>
    </InView>
  );
};

describe('InView', () => {
  const intersectStartMock = vi.fn();
  const intersectEndMock = vi.fn();

  it('InView 컴포넌트가 viewport에 노출되거나 숨겨질 때 onIntersect 콜백 함수를 호출해야 합니다.', async () => {
    renderSetup(
      <TestComponent
        onIntersectStart={intersectStartMock}
        onIntersectEnd={intersectEndMock}
      />
    );

    const box = screen.getByText('box');

    expect(intersectStartMock).toBeCalledTimes(0);
    expect(intersectEndMock).toBeCalledTimes(0);

    await waitFor(() => mockIntersecting({ type: 'view', element: box }));
    expect(intersectStartMock).toBeCalledTimes(1);

    await waitFor(() => mockIntersecting({ type: 'hide', element: box }));
    expect(intersectEndMock).toBeCalledTimes(1);
  });

  it('calledOnce 프로퍼티가 true이면 onIntersect 콜백 함수를 한 번 호출해야 합니다.', async () => {
    renderSetup(
      <TestComponent
        onIntersectStart={intersectStartMock}
        onIntersectEnd={intersectEndMock}
        calledOnce={true}
      />
    );

    const box = screen.getByText('box');

    await waitFor(() => mockIntersecting({ type: 'view', element: box }));
    expect(intersectStartMock).toBeCalledTimes(1);

    await waitFor(() => mockIntersecting({ type: 'hide', element: box }));
    expect(intersectEndMock).toBeCalledTimes(1);

    await waitFor(() => mockIntersecting({ type: 'view', element: box }));
    await waitFor(() => mockIntersecting({ type: 'hide', element: box }));
    await waitFor(() => mockIntersecting({ type: 'view', element: box }));

    expect(intersectStartMock).toBeCalledTimes(1);
    expect(intersectEndMock).toBeCalledTimes(1);
  });
});
