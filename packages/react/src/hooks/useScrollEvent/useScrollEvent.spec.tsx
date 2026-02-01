import { renderHook, waitFor, screen, fireEvent } from '@testing-library/react';
import { useScrollEvent } from '.';
import { describe, beforeEach, expect, it, vi } from 'vitest';
import { renderSetup } from '../../_internal/test/renderSetup';

const windowInitialData = {
  scrollX: 0,
  scrollY: 0,
  scrollWidth: 1000,
  scrollHeight: 2000,
  direction: {
    x: 'none',
    y: 'none',
  },
  progress: {
    x: 0,
    y: 0,
  },
};

// 테스트용 컴포넌트
const TestComponent = ({
  throttleDelay = 0,
  throttleLeading = true,
  throttleTrailing = true,
  enabled = true,
}: {
  throttleDelay?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;
  enabled?: boolean;
}) => {
  const { ref, scrollState } = useScrollEvent<HTMLDivElement>({
    throttleDelay,
    throttleLeading,
    throttleTrailing,
    enabled,
  });

  return (
    <div
      ref={ref}
      role="scroll-container"
      style={{
        width: '200px',
        height: '200px',
        overflow: 'scroll',
      }}>
      <div
        style={{
          width: '200px',
          height: '1000px',
        }}>
        <div role="scroll-position">
          x: {scrollState.scrollX}, y: {scrollState.scrollY},
        </div>
        <div role="scroll-dimensions">
          w: {scrollState.scrollWidth}, h: {scrollState.scrollHeight}
        </div>
      </div>
    </div>
  );
};

describe('useScrollEvent', () => {
  beforeEach(() => {
    // Mock window scroll properties
    Object.defineProperty(window, 'scrollX', { value: 0, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(window, 'innerWidth', {
      value: 500,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 500,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollWidth', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });
  });

  it('기본적으로 window의 스크롤 위치를 추적해야 합니다.', async () => {
    const { result } = renderHook(() => useScrollEvent());

    expect(result.current.scrollState).toEqual(windowInitialData);

    Object.defineProperty(window, 'scrollX', { value: 100 });
    Object.defineProperty(window, 'scrollY', { value: 200 });
    window.dispatchEvent(new Event('scroll'));
    await waitFor(() => {
      expect(result.current.scrollState).toEqual({
        scrollX: 100,
        scrollY: 200,
        scrollWidth: 1000,
        scrollHeight: 2000,
        direction: {
          y: 'down',
          x: 'right',
        },
        progress: {
          y: 13, // (200 / 1500) * 100
          x: 20, // (100 / 500) * 100
        },
      });
    })
  });

  it('enabled 옵션으로 스크롤 이벤트를 제어해야 합니다.', async () => {
    const { result, rerender } = renderHook(
      ({ enabled }) => useScrollEvent({ enabled }),
      {
        initialProps: {
          enabled: true,
        },
      }
    );

    expect(result.current.scrollState).toEqual(windowInitialData);

    rerender({ enabled: false }); // 스크롤 이벤트 비활성화

    await waitFor(() => {
      Object.defineProperty(window, 'scrollX', { value: 100 });
      Object.defineProperty(window, 'scrollY', { value: 200 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrollState).toEqual(windowInitialData);
  });

  it('ref 요소의 스크롤 위치를 추적해야 합니다.', async () => {
    renderSetup(<TestComponent />);

    const container = screen.getByRole('scroll-container');

    // JSDOM의 한계로 명시적으로 scrollHeight와 scrollWidth 설정
    Object.defineProperty(container, 'scrollHeight', {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(container, 'scrollWidth', {
      value: 200,
      configurable: true,
    });

    // 스크롤 이벤트 발생
    await waitFor(() => {
      container.scrollLeft = 50;
      container.scrollTop = 100;
      fireEvent.scroll(container);
    });

    expect(screen.getByRole('scroll-position')).toHaveTextContent(
      'x: 50, y: 100'
    );
    expect(screen.getByRole('scroll-dimensions')).toHaveTextContent(
      'w: 200, h: 1000'
    );
  });

  describe('throttle 옵션', () => {
    it('throttleDelay 옵션으로 스크롤 이벤트를 제한해야 합니다.', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      renderSetup(<TestComponent throttleDelay={100} />);

      const container = screen.getByRole('scroll-container');

      // 빠르게 연속된 스크롤 이벤트 발생
      await waitFor(() => {
        container.scrollTop = 100;
        fireEvent.scroll(container);
      });

      // 첫 번째 스크롤 위치만 반영되어 있어야 함
      expect(screen.getByRole('scroll-position')).toHaveTextContent(
        'x: 0, y: 100'
      );

      vi.advanceTimersByTime(50);

      // throttle 간격보다 짧은 시간 내에 다시 스크롤
      await waitFor(() => {
        container.scrollTop = 200;
        fireEvent.scroll(container);
      });

      expect(screen.getByRole('scroll-position')).toHaveTextContent(
        'x: 0, y: 100'
      );

      vi.advanceTimersByTime(50);

      // throttle 간격이 지난 후 스크롤
      await waitFor(() => {
        container.scrollTop = 200;
        fireEvent.scroll(container);
      });

      expect(screen.getByRole('scroll-position')).toHaveTextContent(
        'x: 0, y: 200'
      );
    });

    it('throttleLeading 옵션을 false로 설정하면 시작 시점에 이벤트가 발생하지 않아야 합니다.', async () => {
      renderSetup(
        <TestComponent
          throttleDelay={100}
          throttleLeading={false}
          throttleTrailing={true}
        />
      );

      const container = screen.getByRole('scroll-container');

      await waitFor(() => {
        container.scrollTop = 100;
        fireEvent.scroll(container);
      });

      expect(screen.getByRole('scroll-position')).toHaveTextContent(
        'x: 0, y: 0'
      );

      await waitFor(() => {
        container.scrollTop = 200;
        fireEvent.scroll(container);
      });

      vi.advanceTimersByTime(100);

      // <-- 시작 이벤트 무시 -->
      await waitFor(() => {
        container.scrollTop = 300;
        fireEvent.scroll(container);
      });

      expect(screen.getByRole('scroll-position')).toHaveTextContent(
        'x: 0, y: 200'
      );
    });

    it('throttleTrailing 옵션을 false로 설정하면 마지막 이벤트가 발생하지 않아야 합니다.', async () => {
      renderSetup(
        <TestComponent
          throttleDelay={100}
          throttleLeading={true}
          throttleTrailing={false}
        />
      );

      const container = screen.getByRole('scroll-container');

      await waitFor(() => {
        container.scrollTop = 100;
        fireEvent.scroll(container);
      });

      expect(screen.getByRole('scroll-position')).toHaveTextContent(
        'x: 0, y: 100'
      );

      // <-- 마지막 이벤트 무시 -->
      await waitFor(() => {
        container.scrollTop = 200;
        fireEvent.scroll(container);
      });

      vi.advanceTimersByTime(100);

      expect(screen.getByRole('scroll-position')).toHaveTextContent(
        'x: 0, y: 100'
      );
    });
  });

  it('enabled 옵션을 false로 설정하면 스크롤 이벤트가 발생하지 않아야 합니다.', async () => {
    renderSetup(<TestComponent enabled={false} />);

    const container = screen.getByRole('scroll-container');

    await waitFor(() => {
      container.scrollTop = 100;
      fireEvent.scroll(container);
    });

    expect(screen.getByRole('scroll-position')).toHaveTextContent('x: 0, y: 0');
  });
});
