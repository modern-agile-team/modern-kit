import { describe, it, expect, Mock, vi } from 'vitest';
import { useHover } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';
import { screen, waitFor } from '@testing-library/react';

describe('useHover', () => {
  const TestComponent = ({
    enterMockFn,
    leaveMockFn,
  }: {
    enterMockFn?: Mock<any>;
    leaveMockFn?: Mock<any>;
  }) => {
    const { ref, isHovered } = useHover<HTMLDivElement>({
      onEnter: enterMockFn,
      onLeave: leaveMockFn,
    });

    return (
      <div>
        <div ref={ref} role="hover-target">
          Hover me
        </div>
        {isHovered && <div role="conditional-render-text">hovered</div>}
      </div>
    );
  };

  it('타겟 요소에 hover와 leave 이벤트가 발생하면 콜백이 트리거되어야 합니다', async () => {
    const enterMockFn = vi.fn();
    const leaveMockFn = vi.fn();

    const { user } = renderSetup(
      <TestComponent enterMockFn={enterMockFn} leaveMockFn={leaveMockFn} />
    );

    const hoverTarget = screen.getByRole('hover-target');

    await user.hover(hoverTarget);

    expect(enterMockFn).toBeCalled();

    await user.unhover(hoverTarget);

    expect(leaveMockFn).toBeCalled();
  });

  it('요소가 hover 상태인지에 따라 isHover 값이 반환되어야 합니다', async () => {
    const { user } = renderSetup(<TestComponent />);

    const hoverTarget = screen.getByRole('hover-target');

    expect(
      screen.queryByRole('conditional-render-text')
    ).not.toBeInTheDocument();

    await user.hover(hoverTarget);

    await waitFor(() => {
      expect(screen.queryByRole('conditional-render-text')).toBeInTheDocument();
    });

    await user.unhover(hoverTarget);

    await waitFor(() => {
      expect(
        screen.queryByRole('conditional-render-text')
      ).not.toBeInTheDocument();
    });
  });
});
