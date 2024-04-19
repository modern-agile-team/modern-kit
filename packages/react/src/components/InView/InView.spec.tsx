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

const TestComponent = ({
  action1,
  action2,
}: {
  action1: () => void;
  action2: () => void;
}) => {
  return (
    <div>
      <InView action={action1} calledOnce>
        box1
      </InView>
      <InView action={action2}>box2</InView>
    </div>
  );
};

describe('InView Component', () => {
  it('should call the action function when the InView component is exposed to the viewport', async () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    renderSetup(<TestComponent action1={mockFn1} action2={mockFn2} />);

    const box1 = screen.getByText('box1');
    const box2 = screen.getByText('box2');

    expect(mockFn1).toBeCalledTimes(0);
    expect(mockFn2).toBeCalledTimes(0);

    await waitFor(() => mockIntersecting({ type: 'view', element: box1 }));
    expect(mockFn1).toBeCalledTimes(1);

    await waitFor(() => mockIntersecting({ type: 'view', element: box2 }));
    expect(mockFn2).toBeCalledTimes(1);
  });

  it('should call the action callback function once if the calledOnce prop is true', async () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    renderSetup(<TestComponent action1={mockFn1} action2={mockFn2} />);

    const box1 = screen.getByText('box1');

    expect(mockFn2).toBeCalledTimes(0);

    await waitFor(() => mockIntersecting({ type: 'view', element: box1 }));
    expect(mockFn1).toBeCalledTimes(1);

    await waitFor(() => mockIntersecting({ type: 'hide', element: box1 }));
    await waitFor(() => mockIntersecting({ type: 'view', element: box1 }));
    await waitFor(() => mockIntersecting({ type: 'hide', element: box1 }));
    await waitFor(() => mockIntersecting({ type: 'view', element: box1 }));

    expect(mockFn1).toBeCalledTimes(1);
  });

  it('should call the action callback function every time it is exposed to the viewport if the calledOnce prop is false', async () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    renderSetup(<TestComponent action1={mockFn1} action2={mockFn2} />);

    const box2 = screen.getByText('box2');

    expect(mockFn2).toBeCalledTimes(0);

    await waitFor(() => mockIntersecting({ type: 'view', element: box2 }));
    expect(mockFn2).toBeCalledTimes(1);

    await waitFor(() => mockIntersecting({ type: 'hide', element: box2 }));
    await waitFor(() => mockIntersecting({ type: 'view', element: box2 }));
    expect(mockFn2).toBeCalledTimes(2);

    await waitFor(() => mockIntersecting({ type: 'hide', element: box2 }));
    await waitFor(() => mockIntersecting({ type: 'view', element: box2 }));
    expect(mockFn2).toBeCalledTimes(3);
  });
});
