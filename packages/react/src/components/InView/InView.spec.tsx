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
      box
    </InView>
  );
};

describe('InView Component', () => {
  const intersectStartMock = vi.fn();
  const intersectEndMock = vi.fn();

  it('should call the action function when the InView component is exposed to the viewport', async () => {
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

  it('should call the action callback function once if the calledOnce prop is true', async () => {
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
