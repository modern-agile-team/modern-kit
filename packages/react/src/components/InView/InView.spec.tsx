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
  asChild?: boolean;
}

const TestComponent = ({
  onIntersectStart,
  onIntersectEnd,
  calledOnce,
  asChild,
}: TestComponentProps) => {
  return (
    <InView
      asChild={asChild}
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

    const boxWrapper = screen.getByText('box').parentElement as HTMLElement;

    expect(intersectStartMock).toBeCalledTimes(0);
    expect(intersectEndMock).toBeCalledTimes(0);

    await waitFor(() =>
      mockIntersecting({ type: 'view', element: boxWrapper })
    );
    expect(intersectStartMock).toBeCalledTimes(1);

    await waitFor(() =>
      mockIntersecting({ type: 'hide', element: boxWrapper })
    );
    expect(intersectEndMock).toBeCalledTimes(1);
  });

  it('asChild 프로퍼티가 true이면 자식 요소가 그대로 렌더링되야 하며, 자식 요소를 관찰 대상으로 설정해야 합니다.', async () => {
    renderSetup(
      <TestComponent
        onIntersectStart={intersectStartMock}
        onIntersectEnd={intersectEndMock}
        asChild={true}
      />
    );

    const boxWrapper = screen.getByText('box').parentElement as HTMLElement;
    const box = screen.getByText('box');

    await waitFor(() =>
      mockIntersecting({ type: 'view', element: boxWrapper })
    );
    expect(intersectStartMock).toBeCalledTimes(0);

    await waitFor(() => mockIntersecting({ type: 'view', element: box }));
    expect(intersectStartMock).toBeCalledTimes(1);

    await waitFor(() =>
      mockIntersecting({ type: 'hide', element: boxWrapper })
    );
    expect(intersectEndMock).toBeCalledTimes(0);

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

  it('asChild 프로퍼티가 true일 경우 자식 요소로 단일 요소가 아닐 경우 에러가 발생합니다.', () => {
    expect(() =>
      renderSetup(
        <InView asChild={true}>
          <div>box1</div>
          <div>box2</div>
        </InView>
      )
    ).toThrow(
      'InView 컴포넌트는 asChild 프로퍼티가 true일 경우 자식으로 단일 요소만 허용합니다.'
    );
  });
});
