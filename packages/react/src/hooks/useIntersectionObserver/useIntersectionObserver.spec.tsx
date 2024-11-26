import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  mockIntersecting,
  mockIntersectionObserverCleanup,
  mockIntersectionObserverSetup,
} from '../../_internal/test/mockIntersectionObserver';
import { useIntersectionObserver } from '.';
import { waitFor, screen } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';

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
  enabled?: boolean;
}

const TestComponent = ({
  onIntersectStart,
  onIntersectEnd,
  calledOnce,
  enabled,
}: TestComponentProps) => {
  const { ref: boxRef } = useIntersectionObserver<HTMLDivElement>({
    onIntersectStart,
    onIntersectEnd,
    calledOnce,
    enabled,
  });

  return <div ref={boxRef}>box</div>;
};

describe('useIntersectionObserver', () => {
  const intersectStartMock = vi.fn();
  const intersectEndMock = vi.fn();

  it('should call the action callback function when the target element assigned to the returned "ref" is exposed to the Viewport', async () => {
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

  it('should call the action callback function only once when the calledOnce option is true', async () => {
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

  it('should not call the action callback functions when the enabled option is false', async () => {
    const { rerender } = renderSetup(
      <TestComponent
        onIntersectStart={intersectStartMock}
        onIntersectEnd={intersectEndMock}
        enabled={false}
      />
    );

    const box = screen.getByText('box');

    expect(intersectStartMock).toBeCalledTimes(0);
    expect(intersectEndMock).toBeCalledTimes(0);

    await waitFor(() => mockIntersecting({ type: 'view', element: box }));
    expect(intersectStartMock).toBeCalledTimes(0);

    await waitFor(() => mockIntersecting({ type: 'hide', element: box }));
    expect(intersectEndMock).toBeCalledTimes(0);

    rerender(
      <TestComponent
        onIntersectStart={intersectStartMock}
        onIntersectEnd={intersectEndMock}
        enabled={true}
      />
    );

    await waitFor(() => mockIntersecting({ type: 'view', element: box }));
    expect(intersectStartMock).toBeCalledTimes(1);

    await waitFor(() => mockIntersecting({ type: 'hide', element: box }));
    expect(intersectEndMock).toBeCalledTimes(1);
  });
});
